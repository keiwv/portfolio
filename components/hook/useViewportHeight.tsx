"use client";

import { useEffect } from "react";

/**
 * Custom hook to handle viewport height issues on mobile browsers
 * Particularly useful for iOS Safari where the viewport height changes
 * as the address bar hides/shows during scrolling
 */
export function useViewportHeight() {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();

    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);
}