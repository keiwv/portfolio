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
            className="min-h-screen flex items-center justify-end px-6 sm:px-80"
        >
            <div className="max-w-xl text-white text-left">
                <div className="w-full sm:w-48 flex-shrink-0">
                        <Image 
                            src="/user.png" 
                            alt="About Me Image" 
                            width={400} 
                            height={300}
                            className="w-full h-auto rounded-lg object-cover"
                        />
                    </div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-8">
                    About Me
                </h1>

                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                    

                    <div className="space-y-6 text-base sm:text-lg font-light leading-relaxed">
                        {Array.isArray(user["about-me"]) ? (
                            user["about-me"].map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))
                        ) : (
                            <p>{user["about-me"]}</p>
                        )}
                    </div>
                </div>

                <GlassCard
                    className="mt-6 w-fit"
                    blurAmount={BLUR_AMOUNT}
                    displacementScale={DISPLACEMENT_SCALE}
                >
                    <div className="flex items-center gap-2 p-3">
                        <MapPin className="w-5 h-5" />
                        <p className="text-sm sm:text-base">{user.location}</p>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}