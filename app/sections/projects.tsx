"use client";
import { GlassCard } from "@developer-hub/liquid-glass";
import { BLUR_AMOUNT, DISPLACEMENT_SCALE } from "@/lib/data";

export default function Projects() {
    return (
        <section
            id="projects"
            className="min-h-screen flex items-center justify-center px-6"
        >
            <div className="max-w-6xl mx-auto text-center text-white">
                <GlassCard blurAmount={BLUR_AMOUNT} displacementScale={DISPLACEMENT_SCALE}>
                    <div className="p-12">
                        <h1 className="text-5xl font-bold mb-8">Projects</h1>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}
