"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "../ui/Reveal";
import { CV_URL } from "@/lib/data";
import type { Experience } from "@/types/experience";

const linkClass =
    "underline decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-2";

// Architectural split: role title + focus on top, then photo on the left and
// intro + full name anchored to the right.
export default function Home() {
    const t = useTranslations();
    const focus = t.raw("hero.focus") as string[];
    const experiences = t.raw("experience.items") as Experience[];
    const current = experiences.find((item) => !item.end) ?? experiences[0];

    return (
        <section id="home" className="wrap pb-14 pt-10 md:pb-20 md:pt-16">
            <Reveal>
                <p className="type-display type-split">{t("hero.role")}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                    {focus.map((item) => (
                        <li
                            key={item}
                            className="rounded-[8px] border border-line px-3 py-1.5 font-mono text-[12px] text-fg-muted"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </Reveal>

            <div className="mt-12 grid gap-12 border-t border-line pt-10 md:mt-16 md:pt-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
                <Reveal delay={100}>
                    <figure>
                        <div className="relative aspect-[3/2] overflow-hidden rounded-[12px] border border-line bg-ink-2">
                            <Image
                                src="/me.webp"
                                alt={t("hero.photoAlt")}
                                fill
                                priority
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="object-cover object-[50%_30%] grayscale"
                            />
                        </div>
                        <figcaption className="mt-3 font-mono text-[12px] text-fg-muted">
                            <span className="text-accent" aria-hidden>
                                ●
                            </span>{" "}
                            {t("header.now")} — {current.role} @ {current.company}
                        </figcaption>
                    </figure>
                </Reveal>

                <Reveal delay={200} className="flex flex-col justify-between gap-12">
                    <div className="max-w-[36ch] lg:ml-auto">
                        <p className="text-lg leading-relaxed md:text-xl">
                            <span className="text-fg">{t("hero.subtitle")}.</span>{" "}
                            <span className="text-fg-muted">{t("hero.description")}</span>
                        </p>
                        <p className="mt-6 flex gap-6 font-mono text-[13px] text-fg-muted">
                            <a href="#projects" className={linkClass}>
                                {t("hero.viewProjects")} ↓
                            </a>
                            <a
                                href={CV_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClass}
                            >
                                CV ↗
                            </a>
                        </p>
                    </div>

                    <div className="text-right">
                        <h1 className="type-display text-[clamp(2.5rem,5.25vw,6.75rem)]">
                            <span className="block lg:whitespace-nowrap">
                                {t("hero.title.name")}
                            </span>
                            <span className="block lg:whitespace-nowrap">
                                {t("hero.title.lastname")}
                            </span>
                        </h1>
                        <p className="mt-4 font-mono text-[12px] text-fg-muted">
                            {t("about.location")}
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
