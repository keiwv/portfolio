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
                        className="text-2xl md:text-3xl lg:text-4xl font-bold font-comic text-manga-text mb-4 tracking-tight text-center text-manga"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {t("experience.title")}
                    </motion.h2>
                    <div className="halftone-strip w-44 mx-auto mb-6" />
                </motion.div>

                <motion.div
                    className="relative pt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {/* Mobile: single stack with the dashed ink stitches */}
                    <div className="md:hidden">
                        {experiences.map((experience, index) => (
                            <ExperienceCard
                                key={index}
                                experience={experience}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Desktop: manga-page masonry — two real flex columns
                        (CSS `columns` fragments boxes and sliced the chapter
                        stickers at column boundaries) */}
                    <div className="hidden md:flex md:items-start md:gap-8">
                        {[0, 1].map((column) => (
                            <div
                                key={column}
                                className="flex-1 flex flex-col gap-10"
                            >
                                {experiences.map((experience, index) =>
                                    index % 2 === column ? (
                                        <ExperienceCard
                                            key={index}
                                            experience={experience}
                                            index={index}
                                        />
                                    ) : null
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
