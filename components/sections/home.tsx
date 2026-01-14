"use client";

import TextType from "@/components/ui/TextType";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaChevronDown,
} from "react-icons/fa";
import { useIsMobile } from "@/components/hook/useIsMobile";
import { useInView } from "react-intersection-observer";
import { socials } from "@/lib/data";

export default function Home() {
    const t = useTranslations("hero");
    const titleLines = [t("title.name"), t("title.lastname")];
    const isMobile = useIsMobile();

    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    return (
        <div ref={ref} className="h-screen-safe text-white relative px-6 sm:px-10">
            <div className="absolute inset-0 flex justify-center items-center z-20">
                <div
                    className={`w-full ${
                        isMobile ? "max-w-full" : "max-w-[1500px]"
                    } text-center`}
                >
                    <div className="block">
                        <motion.h1
                            className={`font-extrabold uppercase block text-center
                                     ${
                                         isMobile
                                             ? "text-[2.5rem] leading-[0.9]"
                                             : "text-[3.2rem] leading-[0.95] sm:text-[6rem] md:text-[8rem] lg:text-[10rem]"
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
                        <div className="overflow-hidden">
                            <TextType
                                text={t("subtitle")}
                                className={`tracking-widest uppercase font-light text-center text-gray-200 whitespace-nowrap
                                    ${
                                        isMobile
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
                            {socials.map((social, index) => (
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
                                                 bg-white/10 border border-white/20
                                                 group-hover:bg-linear-to-br 
                                                 group-hover:border-white/40 transition-all duration-300 shadow-lg
                                                 ${
                                                     isMobile
                                                         ? "w-10 h-10"
                                                         : "w-12 h-12 sm:w-16 sm:h-16"
                                                 }`}
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <social.icon
                                            className={`text-white group-hover:text-white/90 transition-colors duration-300 ${
                                                isMobile
                                                    ? "text-lg"
                                                    : "text-xl sm:text-2xl"
                                            }`}
                                        />
                                    </motion.div>

                                    {!isMobile && (
                                        <motion.div
                                            className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                                                     bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded
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
                                            <div
                                                className="absolute top-full left-1/2 transform -translate-x-1/2 
                                                          border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"
                                            />
                                        </motion.div>
                                    )}
                                </motion.a>
                            ))}
                        </div>

                        <div className="flex justify-center w-full mt-4">
                            <motion.div
                                className={`h-px bg-linear-to-r from-transparent via-purple-400/60 to-transparent ${
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
                            <FaChevronDown className="text-2xl text-white/70 group-hover:text-white transition-colors duration-300" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
