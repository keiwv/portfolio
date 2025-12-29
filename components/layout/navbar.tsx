"use client";

import dynamic from "next/dynamic";
import Button from "../ui/button";
import { navData } from "@/lib/data";
import GooeyNav from "../ui/GooeyNav";

const GlassSurface = dynamic(() => import("../ui/GlassSurface"), {
    ssr: false,
});

export default function Navbar() {
    return (
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="relative">
                <GlassSurface
                    width={800}
                    height={70}
                    redOffset={25}
                    greenOffset={15}
                    blueOffset={5}
                    distortionScale={15}
                    className="flex justify-center items-center"
                >
                </GlassSurface>
                <div className="absolute inset-0 flex justify-center items-center pointer-events-auto z-100">
                    <GooeyNav
                        items={navData}
                        particleCount={15}
                        colors={[10, 150, 22,33, 55, 255,222, 100, 200, 250]}
                    />
                </div>
            </div>
        </nav>
    );
}
