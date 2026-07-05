"use client";

import { useEffect, useRef } from "react";
import {
    SHIP_RIDE_INDEX,
    amplitudeScale,
    waveSurfaceY,
    waveSlopeAt,
} from "@/lib/waves";

interface ShipProps {
    width: number;
    /** Canvas height — the large viewport (URL bar hidden). */
    height: number;
    /** Geometry height — the small viewport (URL bar visible) so the ship
        rides the same wave positions the Waves canvas draws. */
    baseHeight?: number;
    src: string;
}

// The hull is clipped by the ride wave's own surface, offset a little
// lower — sharing one phase means the bobbing and the waterline can
// never drift out of sync. (px at 1080p, scaled with the viewport.)
const WATERLINE_DIP = 14;

// Scrolling down sails the ship to the right (smoothed with a lerp)
const X_START = 0.7;
const X_END = 0.88;

/**
 * Converts the source image into an ink matte: pixel alpha comes from
 * darkness (white/light background disappears, line-work stays) and every
 * remaining pixel is painted in a single ink color.
 */
function buildShipSprite(
    img: HTMLImageElement,
    ink: "black" | "white"
): HTMLCanvasElement {
    const sprite = document.createElement("canvas");
    sprite.width = img.naturalWidth;
    sprite.height = img.naturalHeight;
    const ctx = sprite.getContext("2d");
    if (!ctx) return sprite;

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, sprite.width, sprite.height);
    const data = imageData.data;
    const inkValue = ink === "black" ? 0 : 255;

    for (let i = 0; i < data.length; i += 4) {
        const luminance = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = inkValue;
        data[i + 1] = inkValue;
        data[i + 2] = inkValue;
        data[i + 3] = Math.min(data[i + 3], 255 - luminance);
    }

    ctx.putImageData(imageData, 0, 0);
    return sprite;
}

export default function Ship({ width, height, baseHeight, src }: ShipProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const scrollProgressRef = useRef(0);
    const xRatioRef = useRef(X_START);

    useEffect(() => {
        const onScroll = () => {
            scrollProgressRef.current = window.scrollY;
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
        // don't get a blurry upscaled ship.
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        const geometryHeight = baseHeight || height;

        let blackSprite: HTMLCanvasElement | null = null;
        let whiteSprite: HTMLCanvasElement | null = null;
        const img = new Image();
        img.onload = () => {
            blackSprite = buildShipSprite(img, "black");
            whiteSprite = buildShipSprite(img, "white");
        };
        img.src = src;

        let animationFrameId: number;

        const animate = (timestamp: number) => {
            // Raw rAF timestamp — a shared clock with Waves.tsx so the boat
            // stays perfectly in phase with the wave drawn beneath it.
            const elapsed = timestamp;

            ctx.clearRect(0, 0, width, height);

            if (blackSprite && whiteSprite) {
                // Screens scrolled — device-independent timing (a phone's
                // taller page doesn't delay the transitions).
                const screens = scrollProgressRef.current / geometryHeight;

                // Ink fades from black to white as the night tide rises so
                // the ship stays visible on the black (white by 0.65
                // screens, matching the tide's 0.68 completion).
                const nightBlend = Math.min(
                    1,
                    Math.max(0, (screens - 0.25) / 0.4)
                );

                // Sail to the right as the page scrolls down — the target
                // follows scroll, the position eases toward it each frame.
                const xTarget =
                    X_START +
                    (X_END - X_START) *
                        Math.min(1, Math.max(0, (screens - 0.2) / 2.3));
                xRatioRef.current += (xTarget - xRatioRef.current) * 0.06;

                // Larger share of narrow screens so the boat reads well on
                // phones; scales with viewport height on desktop.
                const widthFraction = width < 768 ? 0.45 : 0.26;
                const shipW = Math.min(
                    width * widthFraction,
                    geometryHeight * 0.33
                );
                const shipH = shipW * (blackSprite.height / blackSprite.width);

                // Keep the whole hull on screen even when sailed fully right
                const shipX = Math.min(
                    xRatioRef.current * width,
                    width - shipW / 2 - 8
                );
                const waterY = waveSurfaceY(
                    SHIP_RIDE_INDEX,
                    shipX,
                    elapsed,
                    geometryHeight
                );
                const slope = waveSlopeAt(
                    SHIP_RIDE_INDEX,
                    shipX,
                    elapsed,
                    geometryHeight
                );
                const tilt =
                    Math.atan(slope) * 0.7 + Math.sin(elapsed * 0.0011) * 0.05;

                ctx.save();
                ctx.translate(shipX, waterY);
                ctx.rotate(tilt);
                if (nightBlend < 1) {
                    ctx.globalAlpha = 1 - nightBlend;
                    ctx.drawImage(
                        blackSprite,
                        -shipW / 2,
                        -shipH * 0.86,
                        shipW,
                        shipH
                    );
                }
                if (nightBlend > 0) {
                    ctx.globalAlpha = nightBlend;
                    ctx.drawImage(
                        whiteSprite,
                        -shipW / 2,
                        -shipH * 0.86,
                        shipW,
                        shipH
                    );
                }
                ctx.restore();
                ctx.globalAlpha = 1;

                // Clip everything below the ride wave's own surface — the
                // hull sits "in" the water at every scroll position.
                const dip = WATERLINE_DIP * amplitudeScale(geometryHeight);
                ctx.globalCompositeOperation = "destination-out";
                ctx.beginPath();
                ctx.moveTo(
                    0,
                    waveSurfaceY(SHIP_RIDE_INDEX, 0, elapsed, geometryHeight) +
                        dip
                );
                for (let x = 4; x <= width; x += 4) {
                    ctx.lineTo(
                        x,
                        waveSurfaceY(
                            SHIP_RIDE_INDEX,
                            x,
                            elapsed,
                            geometryHeight
                        ) + dip
                    );
                }
                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();
                ctx.fill();
                ctx.globalCompositeOperation = "source-over";
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [width, height, baseHeight, src]);

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
