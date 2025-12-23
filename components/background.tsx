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
      ref={ref}
      className="fixed inset-0 -z-10 overflow-hidden blur-lg"
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
          distortion={0.2}
          swirl={0.6}
          swirlIterations={50}
          shape="checks"
          shapeScale={1}
          speed={1}
          scale={4}
          rotation={130}
        />
      )}
    </div>
  );
}
