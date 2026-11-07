/**
 * Copy to config.ts if a web app in this repo needs the Firebase JS SDK.
 * Hosting deploy does not read this file — see firebase/README.md.
 *
 * Values come from Firebase console → Project settings → Your apps → Web.
 */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "sab-digital-banking-ux.firebaseapp.com",
  projectId: "sab-digital-banking-ux",
  storageBucket: "sab-digital-banking-ux.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics, firebaseConfig };
