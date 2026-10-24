"use client";

import { useTranslations } from "next-intl";
import Marquee from "../ui/Marquee";
import { stack } from "@/lib/data";

export default function Stack() {
    const t = useTranslations("stack");

    return (
        <section aria-label={t("label")} className="border-y border-line py-4">
            <Marquee
                duration={60}
                repeat={1}
                className="type-display text-[clamp(1.75rem,3.5vw,3rem)] text-fg-muted"
                items={stack}
            />
            <ul className="sr-only">
                {stack.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
        </section>
    );
}
