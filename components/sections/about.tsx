"use client";
import { GlassCard } from "@developer-hub/liquid-glass";
import { BLUR_AMOUNT, DISPLACEMENT_SCALE } from "@/lib/data";
import { MapPin } from "lucide-react";
import ScrollFloat from "@/components/ui/ScrollFloat";
import TiltedCard from "@/components/ui/TiltedCard";
import { useTranslations } from "next-intl";
import Skills from "../layout/HorizontalLoop";
import { useIsMobile } from "../hook/useIsMobile";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export default function About() {
    const t = useTranslations("about");
    const aboutMe = t.raw("paragraphs") as string[];
    const isMobile = useIsMobile();

    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    });

    return (
        <div
            ref={ref}
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16"
        >
            <div
                className={`text-white text-left max-w-6xl w-full ${
                    isMobile ? "pt-20" : ""
                }`}
            >
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 sm:items-center">
                    {/* Profile Image with enhanced animation */}
                    <motion.div
                        className="w-40 mx-auto sm:mx-0 sm:w-48 md:w-56 lg:w-64 shrink-0 relative"
                        initial={{ opacity: 0, scale: 0.8, rotateY: -25 }}
                        animate={
                            inView
                                ? {
                                      opacity: 1,
                                      scale: 1,
                                      rotateY: 0,
                                  }
                                : {
                                      opacity: 0,
                                      scale: 0.8,
                                      rotateY: -25,
                                  }
                        }
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            type: "spring",
                            stiffness: 100,
                        }}
                    >
                        <TiltedCard
                            imageSrc="/user.png"
                            altText="Me"
                            rotateAmplitude={12}
                            scaleOnHover={1.1}
                            showMobileWarning={false}
                            showTooltip={false}
                        />
                    </motion.div>

                    <div className="flex-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={
                                inView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 30 }
                            }
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <ScrollFloat
                                animationDuration={5}
                                ease="back.inOut(2)"
                                scrollStart="center bottom+=50%"
                                scrollEnd="bottom bottom-=40%"
                                stagger={0.03}
                                containerClassName="text-2xl md:text-3xl lg:text-4xl font-bold"
                            >
                                {t("title")}
                            </ScrollFloat>
                        </motion.div>

                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            {Array.isArray(aboutMe) ? (
                                aboutMe.map((paragraph, index) => (
                                    <motion.p
                                        key={index}
                                        className="text-sm md:text-base font-light leading-relaxed text-gray-300"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={
                                            inView
                                                ? {
                                                      opacity: 1,
                                                      x: 0,
                                                  }
                                                : {
                                                      opacity: 0,
                                                      x: -20,
                                                  }
                                        }
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.7 + index * 0.1,
                                            type: "spring",
                                            stiffness: 100,
                                        }}
                                    >
                                        {paragraph}
                                    </motion.p>
                                ))
                            ) : (
                                <ScrollFloat
                                    animationDuration={3}
                                    ease="back.inOut(2)"
                                    stagger={0.01}
                                    textClassName="text-sm md:text-base font-light leading-relaxed"
                                >
                                    {aboutMe}
                                </ScrollFloat>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={
                                inView
                                    ? {
                                          opacity: 1,
                                          y: 0,
                                          scale: 1,
                                      }
                                    : {
                                          opacity: 0,
                                          y: 20,
                                          scale: 0.95,
                                      }
                            }
                            transition={{
                                duration: 0.6,
                                delay: 0.9,
                                type: "spring",
                                stiffness: 150,
                            }}
                        >
                            <div className="flex items-center gap-2 pl-4 py-2.5 pr-12 sm:pl-5 sm:py-3 sm:pr-16">
                                <motion.div
                                    animate={
                                        inView
                                            ? {
                                                  y: [0, -3, 0],
                                                  rotate: [0, 10, -10, 0],
                                              }
                                            : {}
                                    }
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                </motion.div>
                                <p className="text-xs md:text-sm whitespace-nowrap">
                                    Ensenada, Baja California, México.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    className="mt-10"
                    initial={{ opacity: 0, y: 40 }}
                    animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                    }
                    transition={{
                        duration: 0.8,
                        delay: 1.1,
                        type: "spring",
                        stiffness: 80,
                    }}
                >
                    <Skills
                        technologies={t("technology")}
                        libraries={t("libraries")}
                    />
                </motion.div>
            </div>
        </div>
    );
}
