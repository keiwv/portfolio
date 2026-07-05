"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Gear5Luffy from "@/components/Gear5Luffy";

// Minimum time the intro stays on screen — long enough to register as an
// intro, short enough not to annoy on repeat visits.
const MIN_SHOW_MS = 2000;
// Never hold the page hostage if `load` takes too long.
const MAX_SHOW_MS = 5000;

/**
 * The intro visual, shared between the i18n provider's loading fallback and
 * the timed IntroLoader overlay so the whole boot sequence looks like ONE
 * screen. Gear 5 Luffy sits exactly where he lives in the hero background
 * (top center, same size and bounce), so when the overlay fades he appears
 * to simply stay behind.
 */
export function IntroScreenContent() {
    return (
        <>
            <div className="speed-lines absolute inset-0 pointer-events-none" />

            {/* Centered while loading; on exit he flies up to the exact
                spot where he lives in the hero background (top 10%), so
                when the white dissolves he appears to simply stay. Animates
                `top` (not transform) to keep the multiply blend working. */}
            <motion.div
                className="absolute inset-x-0 flex justify-center pointer-events-none"
                initial={{ top: "34%" }}
                exit={{ top: "10%" }}
                // Long ease-out glide — fast start, gentle settle, no
                // overshoot (same feel as the ship's lerp descent)
                transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
            >
                <Gear5Luffy />
            </motion.div>

            <motion.div
                className="absolute inset-x-0 top-[58%] flex flex-col items-center pointer-events-none"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            >
                <div className="halftone-strip w-44" />
                <p className="font-comic text-manga text-2xl md:text-3xl mt-6 tracking-wider">
                    LOADING
                    <span className="intro-dots" />
                </p>
            </motion.div>
        </>
    );
}

export default function IntroLoader() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const start = performance.now();
        let doneTimeout: number | undefined;

        const finish = () => {
            const elapsed = performance.now() - start;
            doneTimeout = window.setTimeout(
                () => setShow(false),
                Math.max(0, MIN_SHOW_MS - elapsed)
            );
        };

        if (document.readyState === "complete") {
            finish();
        } else {
            window.addEventListener("load", finish, { once: true });
        }
        const safetyTimeout = window.setTimeout(
            () => setShow(false),
            MAX_SHOW_MS
        );

        return () => {
            window.clearTimeout(doneTimeout);
            window.clearTimeout(safetyTimeout);
            window.removeEventListener("load", finish);
        };
    }, []);

    return (
        <AnimatePresence
            onExitComplete={() => {
                document.body.style.overflow = "";
            }}
        >
            {show && (
                <motion.div
                    className="fixed inset-0 z-[100] overflow-hidden"
                    style={{ background: "#ffffff" }}
                    // Fades late so Luffy visibly travels to his spot on the
                    // white first, then the page materializes as he lands.
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.65, ease: "easeInOut" }}
                    aria-hidden
                >
                    <IntroScreenContent />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
