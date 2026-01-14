"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import GooeyNav from "../ui/GooeyNav";
import HamburgerMenu from "../ui/Mobile/HamburgerMenu";
import MobileSidebar from "../ui/Mobile/MobileSidebar";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import useActiveSection from "../hook/useActiveSection";
import { useTranslations } from "next-intl";

const GlassSurface = dynamic(() => import("../ui/GlassSurface"), {
    ssr: false,
});

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    // Get navigation data from translations
    const t = useTranslations();
    const navItems = t.raw("nav") as Array<{ label: string; href: string }>;
    const sectionIds = navItems.map((item) => item.href);
    
    const { activeSection, isScrolling, startNavbarNavigation } = useActiveSection(sectionIds, {
        threshold: isMobile ? 0.05 : 0.1, 
        rootMargin: isMobile ? "-15% 0px -50% 0px" : "-20% 0px -70% 0px", 
    });
    const activeIndex = sectionIds.findIndex((id) => id === activeSection);
    const validActiveIndex = activeIndex >= 0 ? activeIndex : 0;

    const handleNavClick = (index: number) => {
        const sectionId = sectionIds[index];
        startNavbarNavigation(sectionId); 
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    /**
     * Handle responsiveness for mobile view
     */

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen && isMobile) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
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
                        distortionScale={-100}
                        blur={20}
                        className="flex justify-center items-center"
                    ></GlassSurface>
                    <div className="absolute inset-0 flex justify-center items-center pointer-events-auto z-100">
                        <GooeyNav
                            items={navItems}
                            particleCount={15}
                            colors={[
                                10, 150, 22, 33, 55, 255, 222, 100, 200, 250,
                            ]}
                            activeIndex={validActiveIndex}
                            onActiveIndexChange={handleNavClick}
                        />
                    </div>
                </div>
            </nav>

            <div className="fixed top-6 right-6 z-50 hidden md:block cursor-pointer">
                <LanguageSwitcher />
            </div>

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
                        <HamburgerMenu
                            isOpen={isMobileMenuOpen}
                            onClick={toggleMobileMenu}
                        />
                    </div>
                </GlassSurface>
            </nav>

            <MobileSidebar
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
                navItems={navItems}
                activeSection={activeSection}
            />
        </>
    );
}
