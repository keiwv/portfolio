"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { useLanguage, type Locale } from "@/components/hook/useLanguage";
import { cn } from "@/lib/utils";

const languageNames: Record<Locale, string> = {
    en: "English",
    es: "Español",
};

// Inline "EN / ES" toggle.
export default function LanguageSwitcher({ className }: { className?: string }) {
    const t = useTranslations("header");
    const { locale, changeLanguage, isLoading, availableLocales } = useLanguage();

    return (
        <div
            role="group"
            aria-label={t("language")}
            className={cn("flex items-center gap-1.5 font-mono text-[13px]", className)}
        >
            {availableLocales.map((code, index) => (
                <Fragment key={code}>
                    {index > 0 && (
                        <span aria-hidden className="text-fg-muted">
                            /
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={() => changeLanguage(code)}
                        disabled={isLoading}
                        aria-pressed={code === locale}
                        aria-label={`${code.toUpperCase()} — ${languageNames[code]}`}
                        className={cn(
                            "cursor-pointer uppercase transition-colors hover:text-fg disabled:opacity-50",
                            code === locale ? "text-fg" : "text-fg-muted"
                        )}
                    >
                        {code}
                    </button>
                </Fragment>
            ))}
        </div>
    );
}
