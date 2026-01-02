"use client";
import { GlassCard } from "@developer-hub/liquid-glass";
import { BLUR_AMOUNT, DISPLACEMENT_SCALE } from "@/lib/data";
import user from "@/data/data-eng.json";
import { MapPin } from "lucide-react";
import ScrollFloat from "@/components/ui/ScrollFloat";
import TiltedCard from "@/components/ui/TiltedCard";

export default function About() {
    return (
        <section
            id="about"
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16"
        >
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

                    <div className="flex-1 space-y-4 sm:space-y-6">
                        <ScrollFloat
                            animationDuration={5}
                            ease="back.inOut(2)"
                            scrollStart="center bottom+=50%"
                            scrollEnd="bottom bottom-=40%"
                            stagger={0.03}
                            containerClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
                        >
                            About Me
                        </ScrollFloat>

                        <div className="space-y-3 sm:space-y-4">
                            {Array.isArray(user["about-me"]) ? (
                                user["about-me"].map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))
                            ) : (   
                                <ScrollFloat
                                    animationDuration={3}
                                    ease="back.inOut(2)"
                                    stagger={0.01}
                                    textClassName="text-sm sm:text-base md:text-lg font-light leading-relaxed"
                                >
                                    {user["about-me"]}
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
                                <p className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                                    {user.location}
                                </p>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </section>
    );
}