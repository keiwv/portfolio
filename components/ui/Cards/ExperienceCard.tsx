import type { Experience } from "@/types/experience";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

interface ExperienceCardProps {
    experience: Experience;
    index: number;
}

export default function ExperienceCard({
    experience,
    index,
}: ExperienceCardProps) {
    const t = useTranslations("experience");
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });
    const isCurrent = /present|presente/i.test(experience.duration);

    return (
        <motion.div
            ref={ref}
            className="relative"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Dashed ink stitch connecting the chapters (stacked layout only) */}
            {index > 0 && (
                <div className="flex justify-center py-3 md:hidden" aria-hidden>
                    <div className="h-8 border-l-[3px] border-dashed border-manga-border-strong" />
                </div>
            )}

            <motion.div
                className={`relative manga-panel screentone-corner p-6 pt-9 md:p-8 md:pt-10 ${
                    index % 2 === 0
                        ? "md:-rotate-[0.4deg]"
                        : "md:rotate-[0.4deg]"
                } ${
                    isCurrent
                        ? "outline outline-2 outline-offset-4 outline-manga-border-strong"
                        : ""
                }`}
                initial={{ opacity: 0, y: 24 }}
                animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
                }
                transition={{ duration: 0.55, delay: 0.1 }}
                whileHover={{ scale: 1.01 }}
            >
                {/* Bouncing "CURRENT" arrow over the present-day job */}
                {isCurrent && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                        <div className="animate-bounce flex flex-col items-center">
                            <span className="sticker-gold px-3 py-1 font-comic text-xs md:text-sm tracking-wider">
                                {t("current")}
                            </span>
                            <span
                                className="w-0 h-0 border-l-8 border-r-8 border-t-[10px] border-transparent border-t-manga-border-strong"
                                aria-hidden
                            />
                        </div>
                    </div>
                )}

                {/* Chapter tag riding the panel's top border */}
                <div className="absolute -top-4 left-4 sticker-gold px-3 py-1 font-comic text-sm tracking-wider -rotate-2 select-none">
                    CH.{String(index + 1).padStart(2, "0")}
                </div>

                {/* Date sticker on the opposite corner */}
                <div className="absolute -top-4 right-4 sticker-pill bg-manga-surface px-3 py-1 text-xs md:text-sm font-semibold rotate-1 whitespace-nowrap">
                    {experience.duration}
                </div>

                <div className="mb-5">
                    <h3 className="font-comic text-xl md:text-2xl text-manga-text tracking-wide">
                        {experience.role}
                    </h3>
                    <p className="mt-1 text-sm md:text-base font-semibold text-manga-text-secondary">
                        {experience.company}
                        <span className="font-normal text-manga-text-muted">
                            {" "}
                            · {experience.location}
                        </span>
                    </p>
                </div>

                <div className="space-y-2.5">
                    {experience.contributions.map((contribution, idx) => (
                        <motion.div
                            key={idx}
                            className="flex items-start gap-2.5"
                            initial={{ opacity: 0, x: -16 }}
                            animate={
                                inView
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: -16 }
                            }
                            transition={{
                                delay: 0.2 + idx * 0.08,
                                duration: 0.4,
                            }}
                        >
                            <span
                                className="text-manga-accent font-bold select-none"
                                aria-hidden
                            >
                                ✦
                            </span>
                            <p className="text-manga-text-secondary leading-relaxed text-sm md:text-base">
                                {contribution}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {experience.skills && (
                    <div className="mt-5 flex flex-wrap gap-2">
                        {experience.skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="sticker-pill px-3 py-1.5 rounded-full text-xs md:text-sm text-manga-text-secondary"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
