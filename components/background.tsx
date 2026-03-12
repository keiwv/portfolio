"use client";

import { useState, useEffect } from "react";
import { useBackground } from "@/components/providers/BackgroundProvider";
import Waves from "@/components/Waves";
import Clouds from "@/components/Clouds";
import Sun from "@/components/Sun";

const WAVE_CONFIG = [
    // 1. Far Horizon (Deep navy, very slow)
    { color: "#1e4d7b", speed: 0.1, amplitude: 25, height: 680 },
    
    // 2. Mid Ocean (True Blue)
    { color: "#287ab5", speed: 0.2, amplitude: 30, height: 720 },
    
    // 3. Tropical Shallow (Cyan/Teal)
    { color: "#32a6d8", speed: 0.3, amplitude: 25, height: 760 },
    
    // 4. Shoreline (Bright Seafoam)
    { color: "#4cc9f0", speed: 0.45, amplitude: 20, height: 800 },
];

export default function Background() {
    const { backgroundType } = useBackground();
    const isLight = backgroundType === "light";
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return (
        <div
            aria-hidden
            className="fixed inset-0 z-0 transition-all duration-700"
            style={{
                background: `linear-gradient(135deg, var(--y2k-bg-from), var(--y2k-bg), var(--y2k-bg-to))`,
            }}
        >
            {isLight && dimensions.width > 0 && (
                <div className="absolute inset-0 overflow-hidden">
                    <Sun
                        width={dimensions.width}
                        height={dimensions.height}
                    />
                    <Clouds
                        width={dimensions.width}
                        height={dimensions.height}
                    />
                    <Waves
                        height={dimensions.height}
                        width={dimensions.width}
                        waves={WAVE_CONFIG}
                        baseSpeed={0.5}
                        baseAmplitude={20}
                    />
                </div>
            )}
        </div>
    );
}
