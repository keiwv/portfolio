"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react";
import Waves from "@/components/Waves";
import Sun from "@/components/Sun";
import MangaFigures from "@/components/MangaFigures";
import Ship from "@/components/Ship";
import Gear5Luffy from "@/components/Gear5Luffy";

export default function Background() {
    // height = large viewport (URL bar hidden) so canvases always cover the
    // screen; baseHeight = small viewport (bar visible) so the scene's
    // proportions match what's on screen at rest. Neither changes when the
    // bar shows/hides, so nothing jumps mid-scroll.
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
        baseHeight: 0,
    });

    // A solid black "ink tide" rises from the bottom and covers the paper
    // scene during the first screen of scrolling. Measured in screens
    // (scrollY / small viewport), not page percentage, so the timing is
    // identical on phones with taller pages.
    const { scrollY, scrollYProgress } = useScroll();
    // Fully covered at 0.68 screens — just BEFORE the palette flips at
    // 0.7, so night-mode content never sits on a white sky.
    const tideY = useTransform(
        scrollY,
        [(dimensions.baseHeight || 0) * 0.05, (dimensions.baseHeight || 0) * 0.68],
        [dimensions.height || 0, 0]
    );

    // Relaxing Luffy: pinned to the left side (no horizontal drift — on
    // wide screens it used to push him off-screen). Vertically he enters
    // up high with the tide, HOLDS there until ~45% of the page, then
    // glides down smoothly (spring-eased). Animates `top` (not transform)
    // so the wrapper never isolates the image's screen blend.
    // Holds high until ~30% of the page (inside section 2), then glides
    // down over the rest of the scroll.
    const luffyTopRaw = useTransform(
        scrollYProgress,
        [0.15, 0.3, 1],
        [
            (dimensions.height || 0) * 0.1,
            (dimensions.height || 0) * 0.1,
            (dimensions.height || 0) * 0.48,
        ]
    );
    const luffyTop = useSpring(luffyTopRaw, { stiffness: 50, damping: 18 });

    // Gear 5 Luffy is anchored to the PAGE, not the screen: the background
    // layer is fixed, so his top position counter-moves with scroll 1:1 —
    // he stays with section 1 and scrolls away like normal content.
    // (Animates `top`, not transform, to keep the multiply blend working.)
    // 10% of the SMALL viewport — the same base the intro overlay's "10%"
    // resolves against, so the intro Luffy lands exactly on this spot.
    const gear5Top = useTransform(
        scrollY,
        (latest) => (dimensions.baseHeight || 0) * 0.1 - latest
    );

    useEffect(() => {
        // Mobile browsers fire resize when the URL bar collapses on the
        // first scroll, which used to re-size every canvas mid-scroll and
        // visibly cut the wave lines between sections. 100lvh (bar hidden)
        // and 100svh (bar visible) are both stable across bar show/hide,
        // so the scene never jumps.
        const measureViewport = () => {
            const probe = document.createElement("div");
            probe.style.cssText =
                "position:fixed;top:0;left:0;width:0;visibility:hidden;pointer-events:none";
            document.body.appendChild(probe);
            probe.style.height = "100lvh";
            const large = probe.offsetHeight || window.innerHeight;
            probe.style.height = "100svh";
            const small = probe.offsetHeight || window.innerHeight;
            probe.remove();
            return { large, small };
        };

        const updateDimensions = () => {
            const width = window.innerWidth;
            const { large, small } = measureViewport();
            setDimensions((prev) =>
                prev.width === width &&
                prev.height === large &&
                prev.baseHeight === small
                    ? prev
                    : { width, height: large, baseHeight: small }
            );
        };
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // The palette inverts (.manga-night) the moment the tide finishes
    // covering the screen — derived from the tide's OWN position (y ≈ 0),
    // not a separate scroll listener, so "covered" and "colors flipped"
    // are the same event by construction and can never disagree.
    useMotionValueEvent(tideY, "change", (latest) => {
        if (!dimensions.baseHeight) return;
        document.documentElement.classList.toggle("manga-night", latest <= 2);
    });
    useEffect(() => {
        if (!dimensions.baseHeight) return;
        document.documentElement.classList.toggle(
            "manga-night",
            tideY.get() <= 2
        );
        return () => document.documentElement.classList.remove("manga-night");
    }, [dimensions.baseHeight, tideY]);

    return (
        <div
            aria-hidden
            // Fixed PIXEL height (measured lvh + home-indicator pad), never
            // dynamic units: iOS re-evaluates lvh/env() exactly when the
            // URL bar collapses on downward scroll, which re-laid-out every
            // inset-0 layer mid-scroll and blacked out the scene. Plain px
            // gives Safari nothing to recompute. (inset-0 is the fallback
            // before the first measurement.)
            className="fixed inset-0 z-0"
            style={{
                height: dimensions.height
                    ? dimensions.height + 80
                    : undefined,
                background: `linear-gradient(135deg, var(--manga-bg-from), var(--manga-bg), var(--manga-bg-to))`,
            }}
        >
            {dimensions.width > 0 && (
                <div className="absolute inset-0 overflow-hidden">
                    <Sun
                        width={dimensions.width}
                        height={dimensions.height}
                        baseHeight={dimensions.baseHeight}
                    />
                    <Waves
                        height={dimensions.height}
                        width={dimensions.width}
                        baseHeight={dimensions.baseHeight}
                    />
                    {/* Gear 5 Luffy — day-sky emblem, top center, anchored
                        to section 1 (counter-scrolled). Multiply keys out
                        the white background against the paper sky. */}
                    <motion.div
                        className="absolute inset-x-0 flex justify-center pointer-events-none"
                        style={{ top: gear5Top }}
                    >
                        <Gear5Luffy />
                    </motion.div>
                </div>
            )}

            {dimensions.width > 0 && (
                <motion.div
                    className="absolute inset-0"
                    style={{ y: tideY }}
                    aria-hidden
                >
                    {/* Wavy ink crest riding on top of the rising tide */}
                    <svg
                        className="absolute bottom-full left-0 w-full h-16"
                        viewBox="0 0 1200 64"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,64 L0,40 C60,16 120,16 180,34 C240,52 300,20 360,18 C420,16 480,44 540,46 C600,48 660,14 720,14 C780,14 840,46 900,48 C960,50 1020,18 1080,20 C1140,22 1180,40 1200,36 L1200,64 Z"
                            fill="#0a0a0a"
                        />
                    </svg>
                    <div
                        className="absolute inset-0"
                        style={{ background: "#0a0a0a" }}
                    />
                    <MangaFigures
                        width={dimensions.width}
                        height={dimensions.height}
                    />
                    {/* Relaxing Luffy — rides up with the night tide on the
                        left, then drifts leftward as you scroll deeper.
                        Invert + screen turns the black-on-white art into
                        white ink on the black sky. */}
                    <motion.div
                        className="absolute left-[5%] pointer-events-none"
                        style={{ top: luffyTop }}
                    >
                        <Image
                            src="/luffy-relax.png"
                            alt=""
                            width={512}
                            height={512}
                            className="w-52 md:w-80 [@media(min-height:1200px)]:w-104 h-auto invert mix-blend-screen float-drift select-none"
                        />
                    </motion.div>
                </motion.div>
            )}

            {dimensions.width > 0 && (
                <Ship
                    width={dimensions.width}
                    height={dimensions.height}
                    baseHeight={dimensions.baseHeight}
                    src="/sunny-2.png"
                />
            )}

            {/* Extends the ocean's ink below the wave canvases (safe-area /
                home-indicator zone) so iOS chrome samples black instead of
                the page's white background */}
            {dimensions.height > 0 && (
                <div
                    className="absolute inset-x-0"
                    style={{
                        top: dimensions.height,
                        height: 80,
                        background: "#0a0a0a",
                    }}
                />
            )}
        </div>
    );
}
