"use client";

import ProjectCard from "@/components/ui/Cards/ProjectCard";
import { useTranslations } from "next-intl";
import { Project } from "@/types/project";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "../hook/useIsMobile";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export default function Projects() {
    const t = useTranslations("projects");
    const projects = t.raw("items") as Project[];

    const isMobile = useIsMobile();

    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false
    });

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: false,
        loop: true,
        skipSnaps: false,
        containScroll: false,
        slidesToScroll: 1,
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
        <div ref={ref} className={` pt-20 pb-32 md:py-12 md:pb-40 px-4 md:px-10 ${isMobile ? '' : 'min-h-screen flex items-center justify-center'}`}>
            <div className={`max-w-7xl mx-auto ${isMobile ? 'pt-5' : 'pt-20'}`}>

                <motion.div 
                    className="mb-8 md:mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                >
                    <motion.h2 
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {t("title")}
                    </motion.h2>

                </motion.div>

                <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {!isMobile && (
                        <>
                            <motion.button
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full p-3 border border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                onClick={scrollPrev}
                                disabled={!canScrollPrev}
                                initial={{ opacity: 0, x: 20 }}
                                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </motion.button>
                            
                            <motion.button
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full p-3 border border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                onClick={scrollNext}
                                disabled={!canScrollNext}
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </motion.button>
                        </>
                    )}

                    <div ref={emblaRef} className="overflow-hidden max-w-[1250px] mx-auto pt-6 pb-0.5">
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
                                        index={index}
                                        inView={inView}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <motion.div 
                        className="flex justify-center gap-2 mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                    >
                        {projects.map((_, index) => (
                            <motion.button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                                    index === selectedIndex
                                        ? 'bg-white'
                                        : 'bg-white/40 hover:bg-white/60'
                                }`}
                                onClick={() => emblaApi?.scrollTo(index)}
                                initial={{ scale: 0 }}
                                animate={inView ? { scale: 1 } : { scale: 0 }}
                                transition={{ 
                                    duration: 0.3, 
                                    delay: 0.9 + (index * 0.05),
                                    type: "spring"
                                }}
                                whileHover={{ scale: 1.5 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}