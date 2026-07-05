"use client";

import { useEffect, useRef } from "react";

interface SunProps {
    width: number;
    /** Canvas height — the large viewport (URL bar hidden). */
    height: number;
    /** Geometry height — the small viewport (URL bar visible). */
    baseHeight?: number;
}

const INK = "#0a0a0a";

export default function Sun({ width, height, baseHeight }: SunProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Render at device resolution (capped at 2x) so high-DPI phones
        // don't get a blurry upscaled sun.
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        let animationFrameId: number;
        let startTime: number | null = null;

        const geometryHeight = baseHeight || height;
        const sunX = width * 0.85;
        const sunY = geometryHeight * 0.12;
        const sunRadius = Math.min(width, geometryHeight) * 0.06;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            ctx.clearRect(0, 0, width, height);

            // Rotating ink rays
            const rayCount = 12;
            const rayLength = sunRadius * 2.5;
            ctx.save();
            ctx.translate(sunX, sunY);
            ctx.rotate(elapsed * 0.0002);

            for (let i = 0; i < rayCount; i++) {
                const angle = (i / rayCount) * Math.PI * 2;
                const pulse = 1 + Math.sin(elapsed * 0.001 + i) * 0.15;

                ctx.beginPath();
                ctx.moveTo(
                    Math.cos(angle) * (sunRadius + 5),
                    Math.sin(angle) * (sunRadius + 5)
                );
                ctx.lineTo(
                    Math.cos(angle) * (rayLength * pulse),
                    Math.sin(angle) * (rayLength * pulse)
                );
                ctx.strokeStyle = "rgba(10, 10, 10, 0.8)";
                ctx.lineWidth = 3 * pulse;
                ctx.lineCap = "round";
                ctx.stroke();
            }
            ctx.restore();

            // White sun body with a thick ink outline
            ctx.beginPath();
            ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.strokeStyle = INK;
            ctx.lineWidth = 4;
            ctx.stroke();

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [width, height, baseHeight]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="absolute top-0 left-0 pointer-events-none"
            style={{ width, height }}
        />
    );
}
