"use client";

import ProjectCard from "@/components/ui/Cards/ProjectCard";
import { useTranslations } from "next-intl";
import { Project } from "@/types/project";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "../hook/useIsMobile";

export default function Projects() {
    const t = useTranslations("projects");
    const projects = t.raw("items") as Project[];

    const isMobile = useIsMobile();

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: false,
        loop: true,
        skipSnaps: false,
        containScroll: false,
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="pt-20 pb-5 md:py-12 px-4 md:px-10">
            <div className={`max-w-7xl mx-auto ${isMobile ? 'pt-5' : 'pt-20'}`}>
                <div className="mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight text-center">
                        {t("title")}
                    </h2>
                </div>

                <div className="relative">
                    {!isMobile && (
                        <>
                            <button
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full p-3 border border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                onClick={scrollPrev}
                                disabled={!canScrollPrev}
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>
                            
                            <button
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full p-3 border border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                onClick={scrollNext}
                                disabled={!canScrollNext}
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </>
                    )}

                    <div ref={emblaRef} className="overflow-hidden max-w-[1250px] mx-auto pt-2">
                        <div className="flex">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className={`
                                        ${isMobile ? 'flex-[0_0_350px]' : 'flex-[0_0_401px]'}
                                        h-[600px]
                                        mr-6
                                    `}
                                >
                                    <ProjectCard
                                        name={project.name}
                                        description={project.description}
                                        skills={project.skills}
                                        contributions={project.contributions}
                                        awards={project.awards}
                                        imgs={project.imgs}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 mt-6">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                                    index === selectedIndex
                                        ? 'bg-white'
                                        : 'bg-white/40 hover:bg-white/60'
                                }`}
                                onClick={() => emblaApi?.scrollTo(index)}
                            />
                        ))}
                    </div>
                </div>

                
            </div>
        </div>
    );
}
