"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Minus, Plus, Trophy } from "lucide-react";
import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import { GITHUB_URL } from "@/lib/data";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

const pad = (value: number) => String(value).padStart(2, "0");

const controlClass =
    "grid size-8 cursor-pointer place-items-center rounded-[8px] border border-line-ink transition-colors hover:border-ink";

interface ProjectRowProps {
    project: Project;
    index: number;
    total: number;
}

// Rows alternate text/image sides, echoing the split header.
function ProjectRow({ project, index, total }: ProjectRowProps) {
    const t = useTranslations();
    const [imageIndex, setImageIndex] = useState(0);
    const imgs = project.imgs ?? [];
    const isFlipped = index % 2 === 1;

    const step = (delta: number) =>
        setImageIndex((current) => (current + delta + imgs.length) % imgs.length);

    return (
        <Reveal>
            <article
                className={cn(
                    "grid gap-8 py-10 md:py-14 lg:grid-cols-12 lg:gap-12",
                    index === 0 ? "border-t-2 border-ink" : "border-t border-line-ink"
                )}
            >
                <div className={cn("flex flex-col lg:col-span-5", isFlipped && "lg:order-2")}>
                    <p className="font-mono text-[13px] text-ink-muted">
                        {pad(index + 1)} / {pad(total)}
                    </p>
                    {project.awards && (
                        <p className="mt-5 flex items-center gap-2 font-mono text-[13px] font-medium">
                            <Trophy className="size-4 text-accent" strokeWidth={1.75} aria-hidden />
                            {project.awards}
                        </p>
                    )}
                    <h3 className="type-display mt-4 text-[clamp(2.25rem,4vw,3.75rem)]">
                        {project.name}
                    </h3>
                    <p className="mt-5 text-[16px] leading-relaxed text-ink-muted">
                        {project.description}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2" aria-label={t("common.skills")}>
                        {project.skills.map((skill) => (
                            <li
                                key={skill}
                                className="rounded-[8px] border border-line-ink px-2.5 py-1 font-mono text-[12px]"
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>

                    {project.contributions?.length ? (
                        <details className="group mt-8 border-t border-line-ink pt-5 lg:mt-auto">
                            <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[13px] font-semibold [&::-webkit-details-marker]:hidden">
                                {t("common.contributions")} ({project.contributions.length})
                                <Plus className="size-4 group-open:hidden" strokeWidth={1.5} aria-hidden />
                                <Minus className="hidden size-4 group-open:block" strokeWidth={1.5} aria-hidden />
                            </summary>
                            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-ink-muted">
                                {project.contributions.map((contribution) => (
                                    <li key={contribution} className="flex gap-3">
                                        <span aria-hidden className="font-mono">
                                            —
                                        </span>
                                        <span>{contribution}</span>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    ) : null}
                </div>

                {imgs.length > 0 && (
                    <figure className={cn("lg:col-span-7", isFlipped && "lg:order-1")}>
                        <div className="relative aspect-video overflow-hidden rounded-[12px] border border-line-ink bg-ink">
                            <Image
                                src={imgs[imageIndex]}
                                alt={`${project.name} — ${t("projects.image")} ${imageIndex + 1}`}
                                fill
                                sizes="(min-width: 1024px) 58vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        {imgs.length > 1 && (
                            <figcaption className="mt-3 flex items-center justify-between font-mono text-[12px] text-ink-muted">
                                <span>
                                    {pad(imageIndex + 1)} / {pad(imgs.length)}
                                </span>
                                <span className="flex gap-2 text-ink">
                                    <button
                                        type="button"
                                        onClick={() => step(-1)}
                                        aria-label={`${t("projects.prevImage")} — ${project.name}`}
                                        className={controlClass}
                                    >
                                        <ArrowLeft className="size-4" strokeWidth={1.5} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => step(1)}
                                        aria-label={`${t("projects.nextImage")} — ${project.name}`}
                                        className={controlClass}
                                    >
                                        <ArrowRight className="size-4" strokeWidth={1.5} />
                                    </button>
                                </span>
                            </figcaption>
                        )}
                    </figure>
                )}
            </article>
        </Reveal>
    );
}

export default function Projects() {
    const t = useTranslations("projects");
    const projects = t.raw("items") as Project[];
    const heading = t.raw("heading") as string[];

    return (
        <section id="projects" className="bg-paper py-[72px] text-ink md:py-[120px]">
            <div className="wrap">
                <Reveal className="flex flex-col gap-8 pb-12 md:pb-16 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <SectionLabel id="projects" tone="light" />
                        <h2 className="type-display type-section mt-5">
                            {heading.map((line) => (
                                <span key={line} className="block">
                                    {line}
                                </span>
                            ))}
                        </h2>
                    </div>
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-ink self-start lg:self-auto"
                    >
                        {t("more")}
                        <span className="arr" aria-hidden>
                            ↗
                        </span>
                    </a>
                </Reveal>

                <div className="border-b border-line-ink">
                    {projects.map((project, index) => (
                        <ProjectRow
                            key={project.name}
                            project={project}
                            index={index}
                            total={projects.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
