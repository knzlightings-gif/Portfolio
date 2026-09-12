/**
 * Server-side Firebase initialization for use in Next.js API routes.
 * Uses the client SDK in Node.js environment — safe for server routes.
 */
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const hasConfig = !!(firebaseConfig.apiKey && firebaseConfig.projectId);

function getServerApp() {
  if (!hasConfig) return null;
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

function getServerDb() {
  const app = getServerApp();
  if (!app) return null;
  return getFirestore(app);
}

export { getServerDb, doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc, updateDoc };
