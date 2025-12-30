"use client";
import { GlassCard } from "@developer-hub/liquid-glass";
import { BLUR_AMOUNT, DISPLACEMENT_SCALE } from "@/lib/data";
import user from "@/data/data-eng.json";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default function About() {
    return (
        <section
            id="about"
            className="min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-24"
        >
            <div className="text-white text-left max-w-6xl w-full">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 sm:items-center">
                    <div className="w-48 sm:w-56 lg:w-64 shrink-0">
                        <Image
                            src="/user.png"
                            alt="About Me Image"
                            width={400}
                            height={300}
                            className="w-full h-auto rounded-lg object-cover"
                        />
                    </div>

                    <div className="flex-1 space-y-6">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                            About Me
                        </h1>

                        <div className="space-y-4 text-base sm:text-lg font-light leading-relaxed">
                            {Array.isArray(user["about-me"]) ? (
                                user["about-me"].map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))
                            ) : (
                                <p>{user["about-me"]}</p>
                            )}
                        </div>

                        <GlassCard
                            className="w-fit"
                            blurAmount={BLUR_AMOUNT}
                            displacementScale={DISPLACEMENT_SCALE}
                        >
                            <div className="flex items-center gap-2 p-3">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                                <p className="text-sm sm:text-base">
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