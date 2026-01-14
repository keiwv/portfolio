"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type BackgroundType = "warp" | "grain";

interface BackgroundContextType {
  backgroundType: BackgroundType;
  setBackgroundType: (type: BackgroundType) => void;
  toggleBackground: () => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [backgroundType, setBackgroundType] = useState<BackgroundType>("warp");

  const toggleBackground = () => {
    setBackgroundType(prev => prev === "warp" ? "grain" : "warp");
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