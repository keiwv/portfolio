"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
    /** Section id, matching an `href` in the `nav` messages */
    id: string;
    /** `dark` sections get an accent index; paper and accent sections stay ink */
    tone?: "dark" | "light";
    className?: string;
}

// "01 — Projects": numbered after the section's position in the nav.
export default function SectionLabel({ id, tone = "dark", className }: SectionLabelProps) {
    const t = useTranslations();
    const navItems = t.raw("nav") as Array<{ label: string; href: string }>;
    const index = navItems.findIndex((item) => item.href === id);

    return (
        <p className={cn("font-mono text-[13px]", className)}>
            <span className={tone === "dark" ? "text-accent" : "font-semibold"}>
                {String(index + 1).padStart(2, "0")}
            </span>
            <span className={tone === "dark" ? "text-fg-muted" : undefined}>
                {" "}
                — {navItems[index]?.label}
            </span>
        </p>
    );
}
