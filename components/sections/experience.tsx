"use client";
import { useTranslations } from "next-intl";
import { GlassCard } from "@developer-hub/liquid-glass";
import { BLUR_AMOUNT, DISPLACEMENT_SCALE } from "@/lib/data";
import type { Experience } from "@/types/experience";
import ExperienceCard from "@/components/ui/Cards/ExperienceCard";

export default function Experience() {
    const t = useTranslations();
    const experiences = t.raw("experience.items") as Experience[]; 

    return (
        <section className="py-8 md:py-12 px-4 md:px-6 flex items-center justify-center" id="experience">
            {/* <GlassCard
                blurAmount={0.01}
                displacementScale={DISPLACEMENT_SCALE}
            > */}
                <div className="max-w-5xl mx-auto pt-10">
                    <div className="p-4 md:p-8 lg:p-12">
                        <div className="mb-8 md:mb-12">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight text-center">
                                {t("experience.title")}
                            </h2>
                        </div>

                        <div className="relative">
                            <div className="hidden md:block absolute left-[37px] top-0 bottom-0 w-0.5 bg-white/20"></div>
                            <div className="space-y-6">
                                {experiences.map((experience, index) => (
                                    <ExperienceCard
                                        key={index}
                                        experience={experience}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            {/* </GlassCard> */}
        </section>
    );
}