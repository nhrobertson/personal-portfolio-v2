// Firebase client config — the apiKey here is not a secret; Firebase access
// control is enforced by Security Rules, not by hiding this object. Safe to
// ship in client-side code and commit to the repo.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBztr5A9IQf7WTO9GGZ73S39bKUp-Sdu-w",
  authDomain: "personalportfolio-8904c.firebaseapp.com",
  projectId: "personalportfolio-8904c",
  storageBucket: "personalportfolio-8904c.firebasestorage.app",
  messagingSenderId: "1027655698113",
  appId: "1:1027655698113:web:2e944d0a5224f33a547640",
  measurementId: "G-WXL0J0Z9N7",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
