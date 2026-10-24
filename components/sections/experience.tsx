"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Minus, Plus } from "lucide-react";
import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import type { Experience } from "@/types/experience";
import { cn } from "@/lib/utils";

/** "YYYY-MM" → months since year 0 */
const toMonth = (value: string) => {
    const [year, month] = value.split("-").map(Number);
    return year * 12 + month - 1;
};

function Timeline({ experiences }: { experiences: Experience[] }) {
    const t = useTranslations("experience");
    const today = new Date();
    const first = Math.min(...experiences.map((item) => toMonth(item.start)));
    const last = Math.max(
        today.getFullYear() * 12 + today.getMonth(),
        ...experiences.map((item) => (item.end ? toMonth(item.end) : 0))
    );
    const months = last - first + 1;
    const columns = { gridTemplateColumns: `repeat(${months}, minmax(0, 1fr))` };
    const companies = [...new Set(experiences.map((item) => item.company))];

    return (
        <div
            role="img"
            aria-label={`${t("timeline")}: ${experiences
                .map((item) => `${item.company}, ${item.duration}`)
                .join("; ")}`}
            className="mt-12"
        >
            <p className="mb-5 font-mono text-[12px] text-fg-muted">{t("timeline")}</p>

            <div className="space-y-4">
                {companies.map((company) => {
                    const roles = experiences.filter((item) => item.company === company);
                    return (
                        <div key={company}>
                            <p className="mb-2 font-mono text-[11px] text-fg-muted">{company}</p>
                            <div className="grid gap-[3px]" style={columns}>
                                {Array.from({ length: months }, (_, offset) => {
                                    const month = first + offset;
                                    const role = roles.find(
                                        (item) =>
                                            month >= toMonth(item.start) &&
                                            month <= (item.end ? toMonth(item.end) : last)
                                    );
                                    return (
                                        <span
                                            key={offset}
                                            className={cn(
                                                "h-2.5 rounded-[1px]",
                                                !role ? "bg-line" : role.end ? "bg-fg" : "bg-accent"
                                            )}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="relative mt-3 h-4 font-mono text-[11px] text-fg-muted">
                {Array.from({ length: months }, (_, offset) => first + offset)
                    .filter((month) => month % 12 === 0 && last - month > 3)
                    .map((month) => (
                        <span
                            key={month}
                            className="absolute top-0"
                            style={{ left: `${((month - first) / months) * 100}%` }}
                        >
                            {month / 12}
                        </span>
                    ))}
                <span className="absolute right-0 top-0">{t("now")}</span>
            </div>
        </div>
    );
}

export default function Experience() {
    const t = useTranslations("experience");
    const experiences = t.raw("items") as Experience[];
    const heading = t.raw("heading") as string[];
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="experience" className="py-[72px] md:py-[120px]">
            <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-12">
                <Reveal className="lg:sticky lg:top-[calc(var(--nav-h)+48px)] lg:col-span-4 lg:self-start">
                    <SectionLabel id="experience" />
                    <h2 className="type-display mt-5 text-[clamp(2.75rem,4.5vw,4.75rem)]">
                        {heading.map((line) => (
                            <span key={line} className="block">
                                {line}
                            </span>
                        ))}
                    </h2>
                    <p className="mt-6 max-w-sm text-lg leading-relaxed text-fg-muted">
                        {t("intro")}
                    </p>
                </Reveal>

                <Reveal delay={100} className="lg:col-span-8">
                    <ul className="border-t border-line">
                        {experiences.map((item, index) => {
                            const isOpen = openIndex === index;
                            const panelId = `experience-panel-${item.id}`;

                            return (
                                <li key={item.id} className="border-b border-line">
                                    <h3>
                                        <button
                                            type="button"
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            onClick={() => setOpenIndex(isOpen ? null : index)}
                                            className="grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-2 py-7 text-left md:grid-cols-[200px_minmax(0,1fr)_auto]"
                                        >
                                            <span className="col-span-2 font-mono text-[12px] text-fg-muted md:col-span-1 md:pt-1.5">
                                                {!item.end && (
                                                    <span className="text-accent">
                                                        ● {t("current")} ·{" "}
                                                    </span>
                                                )}
                                                {item.duration}
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block text-xl font-medium leading-snug text-fg">
                                                    {item.role}
                                                </span>
                                                <span className="mt-1.5 block font-mono text-[13px] text-fg-muted">
                                                    {item.company} · {item.location}
                                                </span>
                                            </span>
                                            <span
                                                aria-hidden
                                                className="grid size-8 place-items-center rounded-[8px] border border-line text-fg"
                                            >
                                                {isOpen ? (
                                                    <Minus className="size-4" strokeWidth={1.5} />
                                                ) : (
                                                    <Plus className="size-4" strokeWidth={1.5} />
                                                )}
                                            </span>
                                        </button>
                                    </h3>
                                    <div id={panelId} hidden={!isOpen}>
                                        <ul className="space-y-3 pb-8 text-[15px] leading-relaxed text-fg-muted md:pl-[224px] md:pr-14">
                                            {item.contributions.map((contribution) => (
                                                <li key={contribution} className="flex gap-3">
                                                    <span aria-hidden className="font-mono">
                                                        —
                                                    </span>
                                                    <span>{contribution}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <Timeline experiences={experiences} />
                </Reveal>
            </div>
        </section>
    );
}
