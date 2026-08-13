> Cmon, you know AI can do this in an hour...

# nhrobertson.com

Noah Robertson's personal portfolio site — designed as a 1980s semiconductor
databook: a bound reference volume a chip manufacturer might have printed for
engineers. Cream paper, garnet masthead bars, rust part-designator labels, red
reserved strictly for the one primary call-to-action per screen, IBM Plex Mono
for anything numeric, hairline rules, sharp corners, and a running footer with
a revision number and page marker.

- **Home** — the cover and table of contents
- **About** — the "general description" chapter: prose column + a marginal
  specifications table
- **Work** — a parts catalog of numbered employer entries, most recent first,
  each opening into a datasheet-style subpage with outcomes as ratings rows
- **Projects** — a filesystem view (directory tree + file listing) of personal
  projects, each opening into a full datasheet page with a functional block
  diagram and an "Absolute Maximum Ratings" spec table
- **Contact** — a bordered order-card form (reCAPTCHA v3) plus a two-column
  parts table of contact channels

## Stack

Built with [Astro](https://astro.build) in fully static output mode. **No
client-side UI framework is used** — every page ships plain HTML/CSS by
default, with a handful of small hand-written vanilla-JS "sprinkles" only
where genuinely needed (the projects directory tree and the contact form).
That was a deliberate choice: this site is almost entirely content, so a
framework runtime would only exist for developer convenience, not user need —
and the brief called for it to load fast above all else.

Content (work history, project write-ups) lives in typed Astro content
collections so pages can't silently ship with a missing field. Images run
through Astro's built-in optimizer — multi-megabyte source photos come out
the other side as tens-of-kilobytes AVIF/WebP with no manual compression step.

## Commands

| Command            | Action                                             |
| :------------------ | :--------------------------------------------------|
| `npm install`        | Install dependencies                                |
| `npm run dev`         | Start the dev server at `localhost:4321`            |
| `npm run build`       | Build the production site to `./dist/`              |
| `npm run preview`     | Preview the production build locally                |
| `npx astro check`     | Type-check content collections and `.astro` files   |

## Structure

- `src/content/work/`, `src/content/projects/` — typed markdown content collections
- `src/layouts/BaseLayout.astro` — shared shell (fonts, header, footer)
- `src/components/` — SpecTable, BlockDiagram, Header, Footer
- `src/styles/tokens.css` — the palette and type scale as CSS custom properties
- `functions/` — Firebase Cloud Function for the `/api/contact` endpoint

## Deploying

Static output deploys to Firebase Hosting; the contact form is handled by a
Firebase Cloud Function (`functions/`) that verifies reCAPTCHA v3 server-side
and sends mail via Resend. One-time setup before that endpoint works end to
end:

1. `firebase login` and confirm access to the target Firebase project.
2. Register the site at the [reCAPTCHA admin console](https://www.google.com/recaptcha/admin)
   (v3), then set `PUBLIC_RECAPTCHA_SITE_KEY` in `.env` (see `.env.example`)
   and `firebase functions:secrets:set RECAPTCHA_SECRET`.
3. Create a [Resend](https://resend.com) account, verify the sending domain,
   then `firebase functions:secrets:set RESEND_API_KEY`.
4. `cd functions && npm install`, then from `site/`: `npm run build && firebase deploy --only functions,hosting`.
