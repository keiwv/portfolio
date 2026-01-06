"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { engNavData } from "@/lib/data";
import GooeyNav from "../ui/GooeyNav";
import HamburgerMenu from "../ui/Mobile/HamburgerMenu";
import MobileSidebar from "../ui/Mobile/MobileSidebar";
import useActiveSection from "../hook/useActiveSection";
import { useTranslations } from "next-intl";

const GlassSurface = dynamic(() => import("../ui/GlassSurface"), {
    ssr: false,
});

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionIds = engNavData.map((item) => item.href);
    const { activeSection, isScrolling, startNavbarNavigation } = useActiveSection(sectionIds, {
        threshold: 0.1,
        rootMargin: "-20% 0px -70% 0px",
    });
    const activeIndex = sectionIds.findIndex((id) => id === activeSection);
    const validActiveIndex = activeIndex >= 0 ? activeIndex : 0;

    // Insert the href to the translation
    const t = useTranslations("nav");
    const navItems = engNavData.map((item) => ({
        ...item,
        label: t(item.label.toLowerCase()),
    }));

    const handleNavClick = (index: number) => {
        const sectionId = sectionIds[index];
        startNavbarNavigation(sectionId); // Mark this as navbar navigation to specific section
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
                        <HamburgerMenu
                            isOpen={isMobileMenuOpen}
                            onClick={toggleMobileMenu}
                        />
                    </div>
                </GlassSurface>
            </nav>

            {/* Mobile Sidebar */}
            <MobileSidebar
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
                navItems={engNavData}
                activeSection={activeSection}
            />
        </>
    );
}
