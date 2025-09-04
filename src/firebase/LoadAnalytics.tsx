// src/firebase/loadAnalytics.tsx
'use client'; // if you're using app directory

import { useEffect } from "react";
import { getAnalytics, isSupported } from "firebase/analytics";
import { app } from "./firebase";

export default function LoadAnalytics() {
  useEffect(() => {
    const load = async () => {
      const supported = await isSupported();
      if (supported) {
        getAnalytics(app);
        console.log("Analytics initialized");
      } else {
        console.log("Analytics not supported in this browser.");
      }
    };

    // Only in browser
    if (typeof window !== 'undefined') {
      load();
    }
  }, []);

  return null; // This component doesn't render anything
}
