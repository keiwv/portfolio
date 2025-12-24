"use client";

import { Warp } from "@paper-design/shaders-react";
import { useEffect, useRef, useState } from "react";

export default function WarpBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      console.log("Resize observed:", width, height);
      setSize({
        width: Math.floor(width),
        height: Math.floor(height),
      });

    });
    console.log("Resize observed:", size.width, size.height);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10 overflow-hidden blur-[10px] brightness-70"
      aria-hidden
    >
      {size.width > 0 && (
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
          scale={4}
          rotation={120}
        />
      )}
    </div>
  );
}
