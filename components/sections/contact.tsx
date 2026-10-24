"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import { EMAIL, socials } from "@/lib/data";

export default function Contact() {
    const t = useTranslations("contact");
    const links = socials.filter((social) => social.label !== "Email");

    return (
        <section id="contact" className="on-accent bg-accent py-[72px] text-ink md:py-[120px]">
            <div className="wrap">
                <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-7">
                        <SectionLabel id="contact" tone="light" />
                        <h2 className="type-display type-section mt-5">{t("title")}</h2>
                    </div>
                    <p className="text-xl leading-relaxed lg:col-span-4 lg:col-start-9">
                        {t("description")}
                    </p>
                </Reveal>

                <Reveal delay={100} className="mt-14 md:mt-20">
                    {/* The address is the headline: one big, obvious target. */}
                    <a
                        href={`mailto:${EMAIL}`}
                        className="group flex items-center justify-between gap-6 border-y-2 border-ink py-6 md:py-9"
                    >
                        <span className="font-display text-[clamp(2rem,7.5vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.045em]">
                            {EMAIL}
                        </span>
                        <ArrowUpRight
                            aria-hidden
                            strokeWidth={2.25}
                            className="size-10 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:size-20"
                        />
                    </a>
                </Reveal>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 font-mono text-[13px]">
                    <ul className="flex flex-wrap gap-x-6 gap-y-2">
                        {links.map((social) => (
                            <li key={social.label}>
                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline decoration-1 underline-offset-4 hover:decoration-2"
                                >
                                    {social.label} ↗
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p>{t("location")}</p>
                </div>
            </div>
        </section>
    );
}
