"use client";
import { GlassCard } from "@developer-hub/liquid-glass";
import { BLUR_AMOUNT, DISPLACEMENT_SCALE } from "@/lib/data";

export default function Home() {
    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center px-6"
        >
            <div className="text-center text-white">
                <GlassCard blurAmount={BLUR_AMOUNT} displacementScale={DISPLACEMENT_SCALE}>
                    <div className="p-12">
                        <h1 className="text-6xl font-bold mb-6">Welcome</h1>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}
