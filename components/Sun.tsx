"use client";

import { useEffect, useRef } from "react";

interface SunProps {
    width: number;
    height: number;
}

export default function Sun({ width, height }: SunProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = width;
        canvas.height = height;

        let animationFrameId: number;
        let startTime: number | null = null;

        const sunX = width * 0.85;
        const sunY = height * 0.12;
        const sunRadius = Math.min(width, height) * 0.06;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            ctx.clearRect(0, 0, width, height);

            // Animated glow rays
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
                ctx.strokeStyle = "rgba(255, 200, 50, 0.3)";
                ctx.lineWidth = 3 * pulse;
                ctx.lineCap = "round";
                ctx.stroke();
            }
            ctx.restore();

            // Outer glow
            const glowGradient = ctx.createRadialGradient(
                sunX, sunY, sunRadius * 0.5,
                sunX, sunY, sunRadius * 3
            );
            glowGradient.addColorStop(0, "rgba(255, 223, 80, 0.35)");
            glowGradient.addColorStop(0.5, "rgba(255, 200, 50, 0.1)");
            glowGradient.addColorStop(1, "rgba(255, 200, 50, 0)");

            ctx.beginPath();
            ctx.arc(sunX, sunY, sunRadius * 3, 0, Math.PI * 2);
            ctx.fillStyle = glowGradient;
            ctx.fill();

            // Sun body
            const sunGradient = ctx.createRadialGradient(
                sunX - sunRadius * 0.2, sunY - sunRadius * 0.2, sunRadius * 0.1,
                sunX, sunY, sunRadius
            );
            sunGradient.addColorStop(0, "#FFF176");
            sunGradient.addColorStop(0.6, "#FFD54F");
            sunGradient.addColorStop(1, "#FFB300");

            ctx.beginPath();
            ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
            ctx.fillStyle = sunGradient;
            ctx.fill();

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [width, height]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="absolute inset-0 pointer-events-none"
        />
    );
}
