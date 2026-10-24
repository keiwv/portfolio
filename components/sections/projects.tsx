"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Minus, Plus, Trophy } from "lucide-react";
import SectionLabel from "../ui/SectionLabel";
import { GITHUB_URL } from "@/lib/data";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

const pad = (value: number) => String(value).padStart(2, "0");

const controlClass =
    "grid size-8 cursor-pointer place-items-center rounded-[8px] border border-line-ink transition-colors hover:border-ink";

// The pinned showcase only runs where a whole card fits on one screen; elsewhere rows stack.
const PIN_QUERY = "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";
// Scroll budget per phase, in viewport heights.
const WARP_VH = 0.8;
const SETTLE_VH = 0.35;
const CARD_VH = 0.5;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (t: number) => t * t * (3 - 2 * t);

interface ProjectRowProps {
    project: Project;
    index: number;
    total: number;
    slideRef: (element: HTMLDivElement | null) => void;
}

// Rows alternate text/image sides, echoing the split header. Stacked layout: each row
// slides in from the left as it rises into view and out to the right as it leaves (CSS
// on its StringTune `--progress`). Pinned layout: the showcase swaps rows in place.
function ProjectRow({ project, index, total, slideRef }: ProjectRowProps) {
    const t = useTranslations();
    const [imageIndex, setImageIndex] = useState(0);
    const imgs = project.imgs ?? [];
    const isFlipped = index % 2 === 1;

    const step = (delta: number) =>
        setImageIndex((current) => (current + delta + imgs.length) % imgs.length);

    return (
        <div
            ref={slideRef}
            className="project-slide"
            data-string="progress"
            data-string-key="--progress"
            data-string-enter-el="top"
            data-string-enter-vp="bottom"
            data-string-exit-el="bottom"
            data-string-exit-vp="top"
        >
            <article
                className={cn(
                    "grid gap-8 py-10 md:py-14 lg:grid-cols-12 lg:gap-12",
                    index === 0 ? "border-t-2 border-ink" : "border-t border-line-ink"
                )}
            >
                <div className={cn("project-text flex flex-col lg:col-span-5", isFlipped && "lg:order-2")}>
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
                            <ul className="project-contrib mt-4 space-y-2.5 text-[15px] leading-relaxed text-ink-muted">
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
                    <figure className={cn("project-figure lg:col-span-7", isFlipped && "lg:order-1")}>
                        <div className="project-media relative aspect-video overflow-hidden rounded-[12px] border border-line-ink bg-ink">
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
        </div>
    );
}

// Pinned showcase, all on one screen: a seam travels down through the big centred
// title, smearing the letters at it (--seam, --warp), the title glides into its
// resting top-left spot (--settle), then the cards swap in place, entering left and
// leaving right.
export default function Projects() {
    const t = useTranslations("projects");
    const projects = t.raw("items") as Project[];
    const heading = t.raw("heading") as string[];
    const count = projects.length;

    const sectionRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        const stage = stageRef.current;
        const title = titleRef.current;
        if (!section || !stage || !title) return;

        const query = window.matchMedia(PIN_QUERY);
        let travel = 0;
        let navHeight = 0;
        let raf = 0;

        const clear = () => {
            section.classList.remove("is-pinned");
            for (const name of ["height", "--dx", "--dy", "--s", "--seam", "--warp", "--settle"]) {
                section.style.removeProperty(name);
            }
            for (const card of cardRefs.current) {
                if (!card) continue;
                card.style.removeProperty("transform");
                card.style.removeProperty("opacity");
                card.style.removeProperty("visibility");
                card.inert = false;
            }
        };

        const update = () => {
            raf = 0;
            if (!query.matches) return;
            const total = WARP_VH + SETTLE_VH + CARD_VH * count;
            const at = clamp01((navHeight - section.getBoundingClientRect().top) / travel) * total;
            const seam = clamp01(at / WARP_VH);
            const settle = clamp01((at - WARP_VH) / SETTLE_VH);
            const cards = clamp01((at - WARP_VH - SETTLE_VH) / (CARD_VH * count));

            // The seam sweeps from 10% above the title to 10% below it and eases in/out only
            // out there, so every line, edge to edge, gets the full effect and the title is
            // clean at both ends. (Glyphs fill ~4%-98% of the box: line-height < 1.)
            const seamAt = -0.1 + 1.2 * seam;
            section.style.setProperty("--seam", String(seamAt));
            section.style.setProperty("--warp", String(smooth(clamp01((seamAt + 0.1) / 0.1)) * smooth(clamp01((1.1 - seamAt) / 0.1))));
            section.style.setProperty("--settle", String(settle));

            // Track runs -1 (first card waiting off-left) -> count - 1 (last card centred),
            // holding on each card for the middle of its stretch.
            const track = cards * count - 1;
            const base = Math.floor(track);
            const position = base + smooth(clamp01((track - base - 0.2) / 0.6));
            cardRefs.current.forEach((card, index) => {
                if (!card) return;
                const offset = index - position;
                card.style.transform = `translate3d(${-offset * 110}%, 0, 0)`;
                card.style.opacity = String(clamp01(1 - Math.abs(offset)));
                card.style.visibility = Math.abs(offset) < 1 ? "visible" : "hidden";
                card.inert = Math.abs(offset) > 0.5;
            });
        };

        const measure = () => {
            if (!query.matches) {
                clear();
                return;
            }
            section.classList.add("is-pinned");
            navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;
            const viewport = window.innerHeight;
            travel = viewport * (WARP_VH + SETTLE_VH + CARD_VH * count);
            section.style.height = `${viewport - navHeight + travel}px`;

            // Resting spot (layout box while pinned) vs. big and centred on the stage.
            // Measured on screen with the transform off, so wrap margins and padding count.
            const stageBox = stage.getBoundingClientRect();
            title.style.transform = "none";
            const box = title.getBoundingClientRect();
            title.style.removeProperty("transform");
            const width = box.width;
            const titleHeight = box.height;
            const scale = Math.min((window.innerWidth * 0.86) / width, ((viewport - navHeight) * 0.5) / titleHeight, 3);
            const left = box.left;
            const top = navHeight + (box.top - stageBox.top);
            section.style.setProperty("--dx", `${window.innerWidth / 2 - left - (width * scale) / 2}px`);
            section.style.setProperty("--dy", `${navHeight + (viewport - navHeight) / 2 - top - (titleHeight * scale) / 2}px`);
            section.style.setProperty("--s", String(scale));
            update();
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };

        const resize = new ResizeObserver(measure);
        resize.observe(title);
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", onScroll, { passive: true });
        query.addEventListener("change", measure);
        measure();

        return () => {
            cancelAnimationFrame(raf);
            resize.disconnect();
            window.removeEventListener("resize", measure);
            window.removeEventListener("scroll", onScroll);
            query.removeEventListener("change", measure);
            clear();
        };
    }, [count]);

    return (
        <section ref={sectionRef} id="projects" className="projects bg-paper py-[72px] text-ink md:py-[120px]">
            <div ref={stageRef} className="projects-stage">
                <div className="projects-stage-inner wrap">
                    <div className="projects-header flex flex-col gap-8 pb-12 md:pb-16 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="projects-fade">
                                <SectionLabel id="projects" tone="light" />
                            </div>
                            <div ref={titleRef} className="warp-title mt-5 w-fit">
                                <h2 className="type-display type-section">
                                    <span className="sr-only">{heading.join(" ")}</span>
                                    {/* Same lines three times: above the seam, the smeared slice at it, the rest below. */}
                                    {["warp-top", "warp-band", "warp-bottom"].map((layer) => (
                                        <span key={layer} className={layer} aria-hidden>
                                            {heading.map((line) => (
                                                <span key={line} className="block">
                                                    {line}
                                                </span>
                                            ))}
                                        </span>
                                    ))}
                                </h2>
                            </div>
                        </div>
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="projects-fade btn btn-outline-ink self-start lg:self-auto"
                        >
                            {t("more")}
                            <span className="arr" aria-hidden>
                                ↗
                            </span>
                        </a>
                    </div>

                    <div className="projects-cards border-b border-line-ink">
                        {projects.map((project, index) => (
                            <ProjectRow
                                key={project.name}
                                project={project}
                                index={index}
                                total={count}
                                slideRef={(element) => {
                                    cardRefs.current[index] = element;
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
