"use client";

import { motion } from "motion/react";
import { useBackground } from "@/components/providers/BackgroundProvider";
import { Moon, Sun } from "lucide-react";

export default function BackgroundToggle() {
  const { backgroundType, toggleBackground } = useBackground();
  const isDark = backgroundType === "dark";

  return (
    <motion.button
      onClick={toggleBackground}
      className="fixed bottom-6 right-6 z-50 flex items-center w-16 h-9 rounded-full pixel-border cursor-pointer transition-colors duration-500"
      style={{ backgroundColor: "var(--y2k-toggle-track)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        className="w-7 h-7 rounded-full shadow-md flex items-center justify-center"
        style={{ backgroundColor: "var(--y2k-toggle-knob)" }}
        animate={{ x: isDark ? 4 : 30 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5" style={{ color: "var(--y2k-toggle-track)" }} />
        ) : (
          <Sun className="w-3.5 h-3.5" style={{ color: "var(--y2k-toggle-track)" }} />
        )}
      </motion.div>
    </motion.button>
  );
}