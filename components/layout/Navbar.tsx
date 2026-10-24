"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import useActiveSection from "../hook/useActiveSection";
import { socials } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const t = useTranslations();
    const navItems = t.raw("nav") as Array<{ label: string; href: string }>;
    const contact = navItems[navItems.length - 1];
    const activeSection = useActiveSection(navItems.map((item) => item.href));
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuTop, setMenuTop] = useState(0);
    const headerRef = useRef<HTMLElement>(null);

    const closeMenu = () => setIsMenuOpen(false);

    const toggleMenu = () => {
        setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
        setIsMenuOpen((open) => !open);
    };

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!isMenuOpen) return;

        document.body.style.overflow = "hidden";
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsMenuOpen(false);
        };
        const onResize = () => {
            if (window.innerWidth >= 768) setIsMenuOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);
        window.addEventListener("resize", onResize);

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("resize", onResize);
        };
    }, [isMenuOpen]);

    return (
        <header
            ref={headerRef}
            className={cn(
                "sticky top-0 z-50 border-b bg-ink transition-colors",
                isScrolled || isMenuOpen ? "border-line" : "border-transparent"
            )}
        >
            <nav
                aria-label="Primary"
                className="wrap flex h-[72px] items-center justify-between gap-6"
            >
                <LanguageSwitcher />

                <ul className="hidden items-center gap-1 font-mono text-[13px] md:flex">
                    {navItems.map((item) => {
                        const isContact = item.href === contact.href;
                        const isActive = activeSection === item.href;
                        return (
                            <li key={item.href}>
                                <a
                                    href={`#${item.href}`}
                                    aria-current={isActive ? "location" : undefined}
                                    className={cn(
                                        "block rounded-[8px] px-3.5 py-2 transition-colors",
                                        isContact
                                            ? "ml-2 bg-accent font-semibold text-on-accent"
                                            : isActive
                                              ? "text-fg"
                                              : "text-fg-muted hover:text-fg"
                                    )}
                                >
                                    {item.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                <div className="flex items-center gap-2 md:hidden">
                    <a
                        href={`#${contact.href}`}
                        onClick={closeMenu}
                        className="btn btn-primary btn-sm"
                    >
                        {contact.label}
                    </a>
                    <button
                        type="button"
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMenuOpen ? t("header.closeMenu") : t("header.openMenu")}
                        className="grid size-10 cursor-pointer place-items-center rounded-[10px] border border-line text-fg"
                    >
                        {isMenuOpen ? (
                            <X className="size-5" strokeWidth={1.5} />
                        ) : (
                            <Menu className="size-5" strokeWidth={1.5} />
                        )}
                    </button>
                </div>
            </nav>

            {isMenuOpen && (
                // Pinned to the header's real bottom edge so it always fits the viewport.
                <div
                    id="mobile-menu"
                    style={{ top: menuTop }}
                    className="fixed inset-x-0 bottom-0 flex flex-col overflow-y-auto bg-ink md:hidden"
                >
                    <ul className="wrap w-full">
                        {navItems.map((item, index) => (
                            <li key={item.href} className="border-b border-line">
                                <a
                                    href={`#${item.href}`}
                                    onClick={closeMenu}
                                    className="type-display flex items-baseline justify-between py-5 text-[clamp(2.75rem,12vw,4.5rem)]"
                                >
                                    {item.label}
                                    <span className="font-mono text-[13px] font-medium tracking-normal text-fg-muted">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <ul className="wrap mt-auto flex w-full gap-5 pb-10 pt-12">
                        {socials.map((social) => (
                            <li key={social.label}>
                                <a
                                    href={social.url}
                                    target={social.label === "Email" ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="text-fg-muted transition-colors hover:text-fg"
                                >
                                    <social.icon className="size-6" strokeWidth={1.5} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
