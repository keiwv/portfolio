"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Must match the duration of the `gear5-bounce` animation in globals.css
const BOUNCE_PERIOD_MS = 6000;

/**
 * Gear 5 Luffy artwork, shared by the intro loader and the hero background.
 * The bounce animation is phase-locked to a global clock (negative
 * animation-delay), so every instance animates in perfect unison — the
 * intro→hero hand-off shows one continuous Luffy instead of two slightly
 * offset ones.
 */
export default function Gear5Luffy() {
    const wrapRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const img = wrapRef.current?.querySelector("img");
        if (img) {
            img.style.animationDelay = `-${
                performance.now() % BOUNCE_PERIOD_MS
            }ms`;
        }
    }, []);

    return (
        <span ref={wrapRef} className="contents">
            <Image
                src="/luffy-gear5.png"
                alt=""
                width={512}
                height={512}
                priority
                className="w-40 md:w-60 [@media(min-height:1200px)]:w-80 h-auto mix-blend-multiply gear5-bounce select-none"
            />
        </span>
    );
}
