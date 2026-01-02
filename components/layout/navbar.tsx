"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { engNavData } from "@/lib/data";
import GooeyNav from "../ui/GooeyNav";
import HamburgerMenu from "../ui/Mobile/HamburgerMenu";
import MobileSidebar from "../ui/Mobile/MobileSidebar";

const GlassSurface = dynamic(() => import("../ui/GlassSurface"), {
    ssr: false,
});

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen, isMobile]);

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
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
                            items={engNavData}
                            particleCount={15}
                            colors={[10, 150, 22,33, 55, 255,222, 100, 200, 250]}
                        />
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <nav className="fixed top-4 right-4 z-50 md:hidden">
                <GlassSurface
                    width={60}
                    height={60}
                    redOffset={15}
                    greenOffset={10}
                    blueOffset={5}
                    distortionScale={10}
                    className="flex justify-center items-center"
                >
                    <div className="absolute inset-0 flex justify-center items-center pointer-events-auto">
                        <HamburgerMenu isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
                    </div>
                </GlassSurface>
            </nav>

            {/* Mobile Sidebar */}
            <MobileSidebar
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
                navItems={engNavData}
            />
        </>
    );
}
