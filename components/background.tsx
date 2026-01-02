"use client";

import { Warp, GrainGradient } from "@paper-design/shaders-react";
import { useEffect, useRef, useState } from "react";

interface WarpBackgroundProps {
  backgroundType?: string;
}

export default function WarpBackground({ backgroundType = "grain" }: WarpBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({
        width: Math.floor(width),
        height: Math.floor(height),
      });

    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-black"
      aria-hidden
    >
      <div
        ref={ref}
        className={`absolute -inset-5 brightness-70 ${backgroundType === "warp" ? "blur-[10px]" : ""} `}
      >
        {size.width > 0 && (
          <>
            {backgroundType === "warp" && (
              <Warp
                width={size.width + 40}
                height={size.height + 40}
                colors={[
                  "#000000",
                  "#0a0a1a",
                  "#000014",
                  "#7a0047",
                  "#00001f",
                  "#000152",
                  "#7a0047",
                  "#000014",
                  "#ff1492",
                  "#000000",
                ]}
                proportion={0.5}
                softness={1}
                distortion={0.5}
                swirl={0.5}
                swirlIterations={10}
                shape="checks"
                shapeScale={1}
                speed={0.2}
                scale={2}
                rotation={120}
              />
            )}
            {backgroundType === "grain" && (
              <GrainGradient
                width={size.width + 40}
                height={size.height + 40}
                colors={["#7300ff", "#eba8ff", "#00bfff", "#2b00ff"]}
                colorBack="#000000"
                softness={0.5}
                intensity={0.5}
                noise={0.25}
                shape="corners"
                speed={1}
                scale={1.5}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
