"use client";

import { useState } from "react";
import { useLanguage } from "@/components/hook/useLanguage";

const languages = [
    { code: "en" as const, label: "EN", flag: "🇺🇸" },
    { code: "es" as const, label: "ES", flag: "🇪🇸" },
];

export default function LanguageSwitcher() {
    const { locale, changeLanguage, isLoading } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (newLocale: "en" | "es") => {
        changeLanguage(newLocale);
        setIsOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isLoading}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-y2k-surface border border-y2k-border-strong hover:bg-y2k-surface-hover transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
                <span className="text-sm font-medium text-y2k-text">
                    {currentLanguage.label}
                </span>
                <svg
                    className={`w-4 h-4 text-y2k-text transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 md:right-0 left-0 md:left-auto bg-y2k-surface border border-y2k-border-strong rounded-lg py-2 min-w-[100px] z-[60]">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            disabled={isLoading}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-y2k-surface-hover disabled:opacity-50 cursor-pointer ${
                                language.code === locale
                                    ? "bg-y2k-surface-hover text-y2k-text"
                                    : "text-y2k-text-secondary"
                            }`}
                        >
                            <span>{language.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}