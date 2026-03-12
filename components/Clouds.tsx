"use client";

import { useEffect, useRef } from "react";

interface CloudsProps {
    width: number;
    height: number;
}

interface Cloud {
    x: number;
    y: number;
    speed: number;
    scale: number;
    opacity: number;
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
    ctx.beginPath();
    ctx.arc(x, y, 30 * scale, 0, Math.PI * 2);
    ctx.arc(x + 25 * scale, y - 10 * scale, 25 * scale, 0, Math.PI * 2);
    ctx.arc(x + 50 * scale, y, 30 * scale, 0, Math.PI * 2);
    ctx.arc(x + 20 * scale, y + 5 * scale, 20 * scale, 0, Math.PI * 2);
    ctx.arc(x + 35 * scale, y + 5 * scale, 22 * scale, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function createCloud(width: number, height: number, offscreen = false): Cloud {
    return {
        x: offscreen ? width + Math.random() * 200 : Math.random() * width,
        y: 30 + Math.random() * (height * 0.35),
        speed: 0.15 + Math.random() * 0.35,
        scale: 0.8 + Math.random() * 1.2,
        opacity: 0.5 + Math.random() * 0.4,
    };
}

export default function Clouds({ width, height }: CloudsProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const cloudsRef = useRef<Cloud[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = width;
        canvas.height = height;

        if (cloudsRef.current.length === 0) {
            const count = Math.max(5, Math.floor(width / 250));
            cloudsRef.current = Array.from({ length: count }, () =>
                createCloud(width, height)
            );
        }

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            cloudsRef.current.forEach((cloud) => {
                ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
                drawCloud(ctx, cloud.x, cloud.y, cloud.scale);

                cloud.x -= cloud.speed;

                if (cloud.x + 80 * cloud.scale < 0) {
                    Object.assign(cloud, createCloud(width, height, true));
                }
            });

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
