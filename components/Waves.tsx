'use client';

import React, { useEffect, useRef } from 'react';
import { WAVE_CONFIG, waveSurfaceY } from '@/lib/waves';

interface WavesProps {
  /** Canvas height — the large viewport (URL bar hidden) so the ocean
      always reaches the bottom of the screen. */
  height: number;
  width: number;
  /** Geometry height — the small viewport (URL bar visible) so wave
      positions match what's on screen at rest. Defaults to `height`. */
  baseHeight?: number;
}

const Waves: React.FC<WavesProps> = ({ height, width, baseHeight }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const geometryHeight = baseHeight || height;
    let animationFrameId: number;

    const setCanvasSize = () => {
      if (canvas) {
        // Render at device resolution (capped at 2x) so high-DPI phones
        // don't get a blurry upscaled scene.
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }
    };

    const drawWaves = (timestamp: number) => {
      // Raw rAF timestamp — a shared clock with Ship.tsx so the boat stays
      // perfectly in phase with the wave drawn beneath it.
      const elapsed = timestamp;

      ctx.clearRect(0, 0, width, height);

      WAVE_CONFIG.forEach((wave, index) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x < width; x++) {
          ctx.lineTo(x, waveSurfaceY(index, x, elapsed, geometryHeight));
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fillStyle = wave.color;
        ctx.globalAlpha = wave.alpha ?? 0.5; // Set transparency
        ctx.fill();
        ctx.globalAlpha = 1; // Reset transparency

        // Ink contour along the crest (manga line-work)
        if (wave.strokeColor) {
          ctx.beginPath();
          ctx.moveTo(0, waveSurfaceY(index, 0, elapsed, geometryHeight));
          for (let x = 1; x < width; x++) {
            ctx.lineTo(x, waveSurfaceY(index, x, elapsed, geometryHeight));
          }
          ctx.strokeStyle = wave.strokeColor;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(drawWaves);
    };

    setCanvasSize();
    animationFrameId = requestAnimationFrame(drawWaves);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [height, width, baseHeight]);

  return (
    <div
      style={{ height }}
      className="overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ width, height }}
      />
    </div>
  );
};

export default Waves;
