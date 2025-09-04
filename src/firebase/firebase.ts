// src/firebase/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Analytics import should be wrapped safely
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
 // confidential  keys
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
