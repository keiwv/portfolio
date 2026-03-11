import type { Experience } from "@/types/experience";
import { useIsMobile } from "@/components/hook/useIsMobile";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

interface ExperienceCardProps {
    experience: Experience;
    index: number;
}

export default function ExperienceCard({
    experience,
    index,
}: ExperienceCardProps) {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });

    return (
        <motion.div
            ref={ref}
            className="relative"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
        >
            <motion.div
                className="absolute left-[7px] md:left-[29px] top-6 w-4 h-4 md:w-[18px] md:h-[18px] bg-y2k-bg rounded-full border-[3px] border-y2k-accent z-10"
                initial={{ scale: 0, rotate: -180 }}
                animate={
                    inView
                        ? {
                              scale: 1,
                              rotate: 0,
                          }
                        : {
                              scale: 0,
                              rotate: -180,
                          }
                }
                transition={{
                    duration: 0.6,
                    delay: index * 0.15 + 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                }}
            >
                <motion.div
                    className="absolute inset-0 rounded-full bg-y2k-accent"
                    animate={
                        inView
                            ? {
                                  scale: [1, 1.5, 1],
                                  opacity: [0.5, 0, 0.5],
                              }
                            : {}
                    }
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.15 + 0.8,
                    }}
                />
            </motion.div>

            <motion.div
                className="ml-8 md:ml-20"
                initial={{ opacity: 0, x: -30, rotateY: -15 }}
                animate={
                    inView
                        ? {
                              opacity: 1,
                              x: 0,
                              rotateY: 0,
                          }
                        : {
                              opacity: 0,
                              x: -30,
                              rotateY: -15,
                          }
                }
                transition={{
                    duration: 0.7,
                    delay: index * 0.15 + 0.1,
                    type: "spring",
                    stiffness: 100,
                }}
            >
                <motion.div
                    className="relative y2k-card rounded-none p-6 md:p-8 overflow-hidden group cursor-pointer"
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="relative z-10">
                        <motion.div
                            className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={
                                inView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 10 }
                            }
                            transition={{ delay: index * 0.15 + 0.3 }}
                        >
                            <div className="flex flex-col gap-1">
                                <motion.h3
                                    className="text-lg md:text-xl font-semibold text-y2k-text"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={
                                        inView
                                            ? { opacity: 1, x: 0 }
                                            : { opacity: 0, x: -20 }
                                    }
                                    transition={{ delay: index * 0.15 + 0.35 }}
                                >
                                    {experience.role}
                                </motion.h3>
                                <motion.p
                                    className="text-sm md:text-sm text-y2k-accent font-medium"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={
                                        inView
                                            ? { opacity: 1, x: 0 }
                                            : { opacity: 0, x: -20 }
                                    }
                                    transition={{ delay: index * 0.15 + 0.4 }}
                                >
                                    {experience.company}
                                </motion.p>
                            </div>
                            <motion.div
                                className="flex flex-col gap-1 text-left sm:text-right"
                                initial={{ opacity: 0, x: 20 }}
                                animate={
                                    inView
                                        ? { opacity: 1, x: 0 }
                                        : { opacity: 0, x: 20 }
                                }
                                transition={{ delay: index * 0.15 + 0.4 }}
                            >
                                <div className="text-y2k-accent text-xs md:text-sm whitespace-nowrap">
                                    {experience.duration}
                                </div>
                                <p className="text-sm md:text-sm text-y2k-text-muted">
                                    {experience.location}
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="space-y-3 mb-4"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: index * 0.15 + 0.5 }}
                        >
                            {experience.contributions.map(
                                (contribution, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="flex items-start gap-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={
                                            inView
                                                ? { opacity: 1, x: 0 }
                                                : { opacity: 0, x: -20 }
                                        }
                                        transition={{
                                            delay:
                                                index * 0.15 + 0.6 + idx * 0.1,
                                            type: "spring",
                                            stiffness: 100,
                                        }}
                                    >
                                        <motion.div
                                            className="w-1.5 h-1.5 bg-y2k-accent rounded-full mt-2 shrink-0"
                                            initial={{ scale: 0 }}
                                            animate={
                                                inView
                                                    ? { scale: 1 }
                                                    : { scale: 0 }
                                            }
                                            transition={{
                                                delay:
                                                    index * 0.15 +
                                                    0.6 +
                                                    idx * 0.1,
                                                type: "spring",
                                            }}
                                        />
                                        <p className="text-y2k-text-secondary leading-relaxed text-sm md:text-base">
                                            {contribution}
                                        </p>
                                    </motion.div>
                                )
                            )}
                        </motion.div>

                        {experience.skills && (
                            <motion.div
                                className="flex flex-wrap gap-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={
                                    inView
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 10 }
                                }
                                transition={{ delay: index * 0.15 + 0.9 }}
                            >
                                {experience.skills.map((skill, idx) => (
                                    <motion.span
                                        key={idx}
                                        className="px-3 py-1.5 bg-y2k-pill-bg border border-y2k-pill-border rounded-full text-xs md:text-sm text-y2k-text-secondary"
                                        initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                            y: 10,
                                        }}
                                        animate={
                                            inView
                                                ? {
                                                      opacity: 1,
                                                      scale: 1,
                                                      y: 0,
                                                  }
                                                : {
                                                      opacity: 0,
                                                      scale: 0.8,
                                                      y: 10,
                                                  }
                                        }
                                        transition={{
                                            delay:
                                                index * 0.15 + 1 + idx * 0.05,
                                            type: "spring",
                                            stiffness: 200,
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            backgroundColor:
                                                "rgba(255, 255, 255, 0.15)",
                                            borderColor:
                                                "rgba(168, 85, 247, 0.5)",
                                            transition: { duration: 0.2 },
                                        }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
