"use client";

import { Warp, GrainGradient } from "@paper-design/shaders-react";
import { useEffect, useRef, useState } from "react";
import { useBackground } from "@/components/providers/BackgroundProvider";

export default function WarpBackground() {
  const { backgroundType } = useBackground();
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      const viewport = window.visualViewport;

      const width = Math.floor(viewport?.width ?? window.innerWidth);
      const height = Math.floor(viewport?.height ?? window.innerHeight);

      setSize({ width, height });
    };

    updateSize();

    window.visualViewport?.addEventListener("resize", updateSize);
    window.addEventListener("orientationchange", updateSize);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateSize);
      window.removeEventListener("orientationchange", updateSize);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-black"
      style={{
        height: "100dvh",
        width: "100vw",
      }}
    >
      <div
        ref={ref}
        className={`absolute inset-0 brightness-70 ${
          backgroundType === "warp" ? "blur-[10px]" : ""
        }`}
      >
        {size.width > 0 && size.height > 0 && (
          <>
            {backgroundType === "warp" && (
              <Warp
                width={size.width}
                height={size.height}
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
                scale={10}
                rotation={120}
              />
            )}

            {backgroundType === "grain" && (
              <GrainGradient
                width={size.width}
                height={size.height}
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
