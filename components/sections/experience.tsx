"use client";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import type { Experience } from "@/types/experience";
import ExperienceCard from "@/components/ui/Cards/ExperienceCard";

export default function Experience() {
    const t = useTranslations();
    const experiences = t.raw("experience.items") as Experience[];

    return (
        <div className="min-h-screen-safe py-8 md:py-12 px-4 md:px-6 flex items-center justify-center">
            <div className="max-w-5xl mx-auto w-full">
                <motion.div
                    className="mb-8 md:mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100,
                    }}
                >
                    <motion.h2
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {t("experience.title")}
                    </motion.h2>
                </motion.div>

                <motion.div
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <motion.div
                        className="absolute left-[15px] md:left-[37px] top-0 bottom-0 w-0.5 bg-linear-to-b from-purple-500 via-purple-400 to-purple-500/30"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{
                            duration: 1.5,
                            delay: 0.2,
                            ease: "easeInOut",
                        }}
                        style={{ originY: 0 }}
                    >
                        <motion.div
                            className="absolute inset-0 w-1 -translate-x-1/4 bg-purple-500 blur-sm"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>

                    <div className="space-y-6">
                        {experiences.map((experience, index) => (
                            <ExperienceCard
                                key={index}
                                experience={experience}
                                index={index}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
