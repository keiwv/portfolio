"use client";

import { motion } from "motion/react";
import { useBackground } from "@/components/providers/BackgroundProvider";
import { Sparkles, Waves } from "lucide-react";

export default function BackgroundToggle() {
  const { backgroundType, toggleBackground } = useBackground();

  return (
    <motion.button
      onClick={toggleBackground}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="relative w-6 h-6">
        <motion.div
          animate={{
            opacity: backgroundType === "warp" ? 1 : 0,
            rotate: backgroundType === "warp" ? 0 : 180,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Waves className="w-6 h-6 text-white" />
        </motion.div>
        <motion.div
          animate={{
            opacity: backgroundType === "grain" ? 1 : 0,
            rotate: backgroundType === "grain" ? 0 : -180,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
      </div>
      
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Switch to {backgroundType === "warp" ? "grain" : "warp"} background
      </div>
    </motion.button>
  );
}