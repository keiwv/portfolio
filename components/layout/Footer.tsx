"use client";

import { useTranslations } from "next-intl";
import { socials } from "@/lib/data";

export default function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className="overflow-hidden pt-12 md:pt-16">
            <div className="wrap flex flex-col gap-6 font-mono text-[13px] text-fg-muted md:flex-row md:items-center md:justify-between">
                <p>© {new Date().getFullYear()} Brayan Iván</p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                    {socials.map((social) => (
                        <li key={social.label}>
                            <a
                                href={social.url}
                                target={social.label === "Email" ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-fg"
                            >
                                {social.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <a href="#top" className="transition-colors hover:text-fg">
                    {t("backToTop")} ↑
                </a>
            </div>

            <p aria-hidden className="wordmark">
                keiwv
            </p>
        </footer>
    );
}
