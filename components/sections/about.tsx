"use client";
import { GlassCard } from "@developer-hub/liquid-glass";
import { BLUR_AMOUNT, DISPLACEMENT_SCALE } from "@/lib/data";
import { MapPin } from "lucide-react";
import ScrollFloat from "@/components/ui/ScrollFloat";
import TiltedCard from "@/components/ui/TiltedCard";
import { useTranslations } from "next-intl";
import Skills from "../layout/HorizontalLoop";

export default function About() {
    const t = useTranslations("about");
    const aboutMe = t.raw("paragraphs") as string[];

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16">
            <div className="text-white text-left max-w-6xl w-full">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 sm:items-center">
                    <div className="w-40 mx-auto sm:mx-0 sm:w-48 md:w-56 lg:w-64 shrink-0">
                        <TiltedCard
                            imageSrc="/user.png"
                            altText="Me"
                            rotateAmplitude={12}
                            scaleOnHover={1.1}
                            showMobileWarning={false}
                            showTooltip={false}
                        />
                    </div>

                    <div className="flex-1 space-y-6">
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

                        <div className="space-y-4">
                            {Array.isArray(aboutMe) ? (
                                aboutMe.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
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
                        </div>

                        <GlassCard
                            className="w-fit"
                            blurAmount={BLUR_AMOUNT}
                            displacementScale={DISPLACEMENT_SCALE}
                        >
                            <div className="flex items-center gap-2 px-3 py-2.5 sm:p-3">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                <p className="text-xs md:text-sm whitespace-nowrap">
                                    Ensenada, Baja California, México.
                                </p>
                            </div>
                        </GlassCard>
                    </div>

                </div>
                <div className="mt-10">
                    <Skills technologies={t("technology")} libraries={t("libraries")} />
                </div>
                    
            </div>
        </div>
    );
}
