"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type ThemeType = "light" | "dark";

interface BackgroundContextType {
  backgroundType: ThemeType;
  setBackgroundType: (type: ThemeType) => void;
  toggleBackground: () => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [backgroundType, setBackgroundType] = useState<ThemeType>("dark");

  const applyTheme = useCallback((theme: ThemeType) => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    applyTheme(backgroundType);
  }, [backgroundType, applyTheme]);

  const toggleBackground = () => {
    setBackgroundType(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <BackgroundContext.Provider value={{
      backgroundType,
      setBackgroundType,
      toggleBackground
    }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
}