"use client";

import { useTranslations } from "next-intl";
import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import { CV_URL, LINKEDIN_URL } from "@/lib/data";

export default function About() {
    const t = useTranslations("about");
    const [lead, ...paragraphs] = t.raw("paragraphs") as string[];
    const heading = t.raw("heading") as string[];

    return (
        <section id="about" className="bg-paper py-[72px] text-ink md:py-[120px]">
            <div className="wrap grid gap-12 lg:grid-cols-12">
                <Reveal className="lg:col-span-4">
                    <SectionLabel id="about" tone="light" />
                    <h2 className="type-display mt-5 text-[clamp(2.75rem,4.5vw,4.75rem)]">
                        {heading.map((line) => (
                            <span key={line} className="block">
                                {line}
                            </span>
                        ))}
                    </h2>
                </Reveal>

                <Reveal delay={100} className="lg:col-span-7 lg:col-start-6">
                    <p className="text-[clamp(1.375rem,2.2vw,1.875rem)] leading-snug tracking-[-0.01em]">
                        {lead}
                    </p>
                    <div className="mt-10 grid gap-6 border-t border-line-ink pt-8 text-[16px] leading-relaxed text-ink-muted md:grid-cols-2 md:gap-10">
                        {paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                    <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                        <a
                            href={CV_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            {t("downloadCv")}
                            <span className="arr" aria-hidden>
                                ↓
                            </span>
                        </a>
                        <a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-ink"
                        >
                            LinkedIn
                            <span aria-hidden>↗</span>
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
