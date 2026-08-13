import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { Resend } from "resend";

const RECAPTCHA_SECRET = defineSecret("RECAPTCHA_SECRET");
const RESEND_API_KEY = defineSecret("RESEND_API_KEY");

const TO_ADDRESS = "nhrobertson4@gmail.com";
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

// simple in-memory per-IP rate limit — resets on cold start, good enough to
// deter naive bot floods without needing a datastore.
const submissionsByIp = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

async function verifyRecaptcha(token, secret) {
  if (!token) return false;
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const result = await res.json();
  return result.success === true && (result.score ?? 1) >= RECAPTCHA_SCORE_THRESHOLD;
}

export const contact = onRequest(
  { cors: true, secrets: [RECAPTCHA_SECRET, RESEND_API_KEY] },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const ip = req.headers["fastly-client-ip"] ?? req.ip ?? "unknown";
    if (isRateLimited(ip)) {
      res.status(429).json({ error: "Too many requests" });
      return;
    }

    const { name = "", email, message, recaptchaToken } = req.body ?? {};

    if (typeof email !== "string" || !email.trim() || typeof message !== "string" || !message.trim()) {
      res.status(400).json({ error: "Email and message are required" });
      return;
    }

    const recaptchaOk = await verifyRecaptcha(recaptchaToken, RECAPTCHA_SECRET.value());
    if (!recaptchaOk) {
      res.status(400).json({ error: "reCAPTCHA verification failed" });
      return;
    }

    const resend = new Resend(RESEND_API_KEY.value());

    try {
      await resend.emails.send({
        from: "nhrobertson.com <contact@nhrobertson.com>",
        to: TO_ADDRESS,
        replyTo: email,
        subject: `Contact form: ${name || email}`,
        text: `From: ${name || "(no name)"} <${email}>\n\n${message}`,
      });
      res.status(200).json({ ok: true });
    } catch (err) {
      console.error("Failed to send contact email", err);
      res.status(502).json({ error: "Failed to send message" });
    }
  }
);
