// src/firebase/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Analytics import should be wrapped safely
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCLIpfZAoy5uMbnG6eJ0KlImIvnx86IAMw",
  authDomain: "leetcome-636ea.firebaseapp.com",
  projectId: "leetcome-636ea",
  storageBucket: "leetcome-636ea.firebasestorage.app",
  messagingSenderId: "653218056213",
  appId: "1:653218056213:web:422efc6d2a537594df661c",
  measurementId: "G-P6GE0LH6YP",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Initialize analytics only if supported (important for Next.js SSR)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, firestore, analytics };
