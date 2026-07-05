"use client";

import { useEffect, useRef } from "react";

interface MangaFiguresProps {
    width: number;
    height: number;
}

// No "ring" — bare circle outlines read as stray UI artifacts near the
// navbar rather than night-sky decoration.
type FigureKind = "sparkle" | "star" | "burst" | "dots" | "cross";

interface Figure {
    x: number;      // 0..1 of width
    ySeed: number;  // 0..1 of the vertical wrap span
    depth: number;  // parallax factor — deeper figures scroll faster
    size: number;
    kind: FigureKind;
    phase: number;  // twinkle offset
}

const KINDS: FigureKind[] = ["sparkle", "star", "burst", "dots", "cross"];
const INK = "#ffffff";

function createFigures(width: number): Figure[] {
    const count = Math.max(16, Math.floor(width / 60));
    return Array.from({ length: count }, (_, i) => ({
        x: Math.random(),
        ySeed: Math.random(),
        depth: 0.5 + Math.random() * 1.5,
        size: 8 + Math.random() * 18,
        kind: KINDS[i % KINDS.length],
        phase: Math.random() * Math.PI * 2,
    }));
}

function drawSparkle(ctx: CanvasRenderingContext2D, s: number) {
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.22, -s * 0.22);
    ctx.lineTo(s, 0);
    ctx.lineTo(s * 0.22, s * 0.22);
    ctx.lineTo(0, s);
    ctx.lineTo(-s * 0.22, s * 0.22);
    ctx.lineTo(-s, 0);
    ctx.lineTo(-s * 0.22, -s * 0.22);
    ctx.closePath();
    ctx.fill();
}

function drawStar(ctx: CanvasRenderingContext2D, s: number) {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? s : s * 0.45;
        const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
        ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
}

function drawBurst(ctx: CanvasRenderingContext2D, s: number) {
    const rays = 10;
    ctx.lineWidth = 2;
    for (let i = 0; i < rays; i++) {
        const a = (i / rays) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * s * 0.45, Math.sin(a) * s * 0.45);
        ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
        ctx.stroke();
    }
}

function drawDots(ctx: CanvasRenderingContext2D, s: number) {
    const step = Math.max(4, s / 3);
    for (let dx = -s; dx <= s; dx += step) {
        for (let dy = -s; dy <= s; dy += step) {
            if (dx * dx + dy * dy <= s * s) {
                ctx.beginPath();
                ctx.arc(dx, dy, 1.4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

function drawCross(ctx: CanvasRenderingContext2D, s: number) {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-s, 0);
    ctx.lineTo(s, 0);
    ctx.moveTo(0, -s);
    ctx.lineTo(0, s);
    ctx.stroke();
}

function drawMoon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    ctx.save();
    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    // Punch out the crescent — erases to transparent so the black sky shows
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x + r * 0.45, y - r * 0.2, r * 0.85, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

const DRAWERS: Record<FigureKind, (ctx: CanvasRenderingContext2D, s: number) => void> = {
    sparkle: drawSparkle,
    star: drawStar,
    burst: drawBurst,
    dots: drawDots,
    cross: drawCross,
};

export default function MangaFigures({ width, height }: MangaFiguresProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const figuresRef = useRef<Figure[]>([]);
    const progressRef = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            progressRef.current = window.scrollY;
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Render at device resolution (capped at 2x) so high-DPI phones
        // don't get blurry upscaled figures.
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        if (figuresRef.current.length === 0) {
            figuresRef.current = createFigures(width);
        }

        let animationFrameId: number;

        const animate = (timestamp: number) => {
            ctx.clearRect(0, 0, width, height);

            // Screens scrolled — device-independent timing
            const screens = progressRef.current / height;
            // Fade the figures in while the ink tide rises
            const reveal = Math.min(1, Math.max(0, (screens - 0.3) / 0.55));

            if (reveal > 0.01) {
                ctx.globalAlpha = reveal;
                drawMoon(
                    ctx,
                    width * 0.82,
                    height * 0.16 + (1 - reveal) * 40,
                    Math.min(width, height) * 0.06
                );

                const span = height * 1.6;
                figuresRef.current.forEach((figure) => {
                    let sy = (figure.ySeed * span - screens * figure.depth * height * 0.2) % span;
                    if (sy < 0) sy += span;
                    sy -= height * 0.3;

                    const twinkle =
                        0.55 + 0.45 * Math.sin(timestamp * 0.001 + figure.phase);
                    ctx.globalAlpha = reveal * twinkle;
                    ctx.fillStyle = INK;
                    ctx.strokeStyle = INK;

                    ctx.save();
                    ctx.translate(figure.x * width, sy);
                    DRAWERS[figure.kind](ctx, figure.size);
                    ctx.restore();
                });

                ctx.globalAlpha = 1;
            }

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
            className="absolute top-0 left-0 pointer-events-none"
            style={{ width, height }}
        />
    );
}
