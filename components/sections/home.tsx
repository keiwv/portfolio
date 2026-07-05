"use client";

import TextType from "@/components/ui/TextType";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { FaChevronDown } from "react-icons/fa";
import { useIsMobile } from "@/components/hook/useIsMobile";
import { useInView } from "react-intersection-observer";
import { socials } from "@/lib/data";
import { oups } from "@/app/fonts";

const HERO_SPARKLES: Array<{
    top: string;
    left?: string;
    right?: string;
    size: number;
    color: string;
    delay: string;
}> = [
    { top: "16%", left: "14%", size: 20, color: "var(--manga-accent)", delay: "0s" },
    { top: "24%", right: "16%", size: 26, color: "var(--manga-accent-pink)", delay: "1.4s" },
    { top: "68%", left: "20%", size: 16, color: "var(--manga-accent-pink)", delay: "2.6s" },
    { top: "60%", right: "12%", size: 22, color: "var(--manga-accent)", delay: "3.8s" },
];

export default function Home() {
    const t = useTranslations("hero");
    const titleLines = [t("title.name"), t("title.lastname")];
    const isMobile = useIsMobile();

    // Fade the hero out once less than ~45% of it remains visible — its
    // bottom edge (social buttons) otherwise lingers as ghost outlines
    // under the navbar while the night tide covers the transition.
    const { ref, inView } = useInView({
        threshold: 0.45,
        triggerOnce: false,
    });

    return (
        <div ref={ref} className="h-screen-safe text-manga-text relative px-6 sm:px-10">
            <div
                className="absolute inset-0 z-10 speed-lines-fade pointer-events-none"
                aria-hidden="true"
            >
                <div className="speed-lines absolute inset-0" />
            </div>
            {!isMobile &&
                HERO_SPARKLES.map((sparkle, index) => (
                    <span
                        key={index}
                        className="manga-sparkle z-10"
                        aria-hidden="true"
                        style={{
                            top: sparkle.top,
                            left: sparkle.left,
                            right: sparkle.right,
                            width: sparkle.size,
                            height: sparkle.size,
                            background: sparkle.color,
                            animationDelay: sparkle.delay,
                        }}
                    />
                ))}
            <div className="absolute inset-0 flex justify-center items-center z-20">
                <div
                    className={`w-full ${
                        isMobile ? "max-w-full" : "max-w-[1500px]"
                    } text-center`}
                >
                    <div className="block">
                        <motion.h1
                            className={`${oups.className} uppercase block text-center text-manga
                                     ${
                                         isMobile
                                             ? "text-[clamp(1.75rem,9vw,2.5rem)] leading-[1.15]"
                                             : "text-[1.8rem] leading-[1.1] sm:text-[3rem] md:text-[4rem] lg:text-[5rem]"
                                     }`}
                        >
                            {titleLines.map((line, lineIndex) => (
                                <div key={lineIndex} className="block">
                                    {line.split("").map((char, charIndex) => (
                                        <motion.span
                                            key={`${lineIndex}-${charIndex}`}
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={
                                                inView
                                                    ? { opacity: 1, y: 0 }
                                                    : { opacity: 0, y: 40 }
                                            }
                                            transition={{
                                                delay:
                                                    (lineIndex * line.length +
                                                        charIndex) *
                                                        0.05 +
                                                    0.1,
                                                duration: 0.6,
                                                ease: [0.25, 0.46, 0.45, 0.94],
                                            }}
                                            className="inline-block"
                                            style={{
                                                marginRight:
                                                    char === " "
                                                        ? isMobile
                                                            ? "0.15em"
                                                            : "0.2em"
                                                        : "0",
                                            }}
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </div>
                            ))}
                        </motion.h1>
                    </div>

                    <motion.div
                        className={`mx-auto ${
                            isMobile ? "mt-3 px-2" : "mt-4 sm:mt-6"
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            inView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 20 }
                        }
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <div
                            className={`speech-bubble speech-bubble-tail inline-block max-w-full ${
                                isMobile ? "px-3 py-2" : "px-5 py-3 sm:px-7"
                            }`}
                        >
                            <TextType
                                text={t("subtitle")}
                                className={`tracking-widest uppercase font-light text-center text-manga-text-secondary whitespace-nowrap
                                             ${isMobile
                                             ? "text-[0.65rem]"
                                             : "text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
                                    }`}
                                pauseDuration={3000}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className={`w-full ${
                            isMobile ? "mt-6" : "mt-8 sm:mt-12"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 1.0, duration: 0.8 }}
                    >
                        <div
                            className={`flex justify-center items-center w-full ${
                                isMobile
                                    ? "space-x-4"
                                    : "space-x-6 sm:space-x-8"
                            }`}
                        >
                            {socials.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={
                                        inView
                                            ? { opacity: 1, y: 0 }
                                            : { opacity: 0, y: 30 }
                                    }
                                    transition={{
                                        delay: social.delay + (inView ? 0 : 0),
                                        duration: 0.6,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        className={`flex items-center justify-center rounded-full
                                                 bg-manga-surface manga-chip
                                                 group-hover:bg-linear-to-br
                                                 group-hover:border-manga-accent transition-all duration-300
                                                 ${
                                                     isMobile
                                                         ? "w-10 h-10"
                                                         : "w-12 h-12 sm:w-16 sm:h-16"
                                                 }`}
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <social.icon
                                            className={`text-manga-text group-hover:text-manga-accent transition-colors duration-300 ${
                                                isMobile
                                                    ? "text-lg"
                                                    : "text-xl sm:text-2xl"
                                            }`}
                                        />
                                    </motion.div>

                                    {!isMobile && (
                                        <motion.div
                                            className="absolute -top-14 left-1/2 transform -translate-x-1/2
                                                     speech-bubble speech-bubble-tail text-manga-text text-xs px-3 py-1.5
                                                     opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                                     pointer-events-none whitespace-nowrap"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            whileHover={{
                                                scale: 1,
                                                opacity: 1,
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {social.label}
                                        </motion.div>
                                    )}
                                </motion.a>
                            ))}
                        </div>

                        <div className="flex justify-center w-full mt-4">
                            <motion.div
                                className={`halftone-strip ${
                                    isMobile ? "w-48" : "w-64"
                                }`}
                                initial={{ scaleX: 0 }}
                                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                                transition={{
                                    delay: 1.6,
                                    duration: 1.2,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={
                            inView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: -20 }
                        }
                        transition={{ delay: 2.0, duration: 0.8 }}
                    >
                        <motion.button
                            onClick={() => {
                                const nextSection =
                                    document.getElementById("experience") ||
                                    document.getElementById("about");
                                if (nextSection) {
                                    nextSection.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }
                            }}
                            className="group cursor-pointer"
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatDelay: 1,
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-manga-surface manga-chip">
                                <FaChevronDown className="text-xl text-manga-text-muted group-hover:text-manga-text transition-colors duration-300" />
                            </span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
