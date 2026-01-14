import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useIsMobile } from "@/components/hook/useIsMobile";

interface ProjectCardProps {
    name: string;
    description: string;
    contributions?: string[];
    awards?: string;
    imgs?: string[];
    skills: string[];
    index: number;
    inView: boolean;
}

export default function ProjectCard({
    name,
    description,
    contributions,
    awards,
    imgs,
    skills,
    index,
    inView,
}: ProjectCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const isMobile = useIsMobile();

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const goToPrevImage = () => {
        if (!imgs || imgs.length <= 1) return;
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? imgs.length - 1 : prevIndex - 1
        );
    };

    const goToNextImage = () => {
        if (!imgs || imgs.length <= 1) return;
        setCurrentImageIndex((prevIndex) => 
            (prevIndex + 1) % imgs.length
        );
    };

    return (
        <motion.div
            className="
                group relative
                bg-linear-to-br from-white/5 to-white/2
                backdrop-blur-xl
                rounded-2xl
                border border-white/10
                overflow-hidden
                h-full flex flex-col
                w-full max-w-full
            "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: 10 }}
            animate={inView ? { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                rotateX: 0
            } : { 
                opacity: 0, 
                y: 50, 
                scale: 0.95,
                rotateX: 10
            }}
            transition={{ 
                duration: 0.1, 
                delay: 0.2,
                type: "spring",
                stiffness: 80
            }}
            whileHover={{ 
                y: -12,
                borderColor: "rgba(255, 255, 255, 0.3)",
                transition: { duration: 0.2 }
            }}
            
        >

            {imgs?.length && (
                <motion.div 
                    className="relative w-full h-48 bg-black/20 overflow-hidden group/image p-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, delay: 0.7 + (index * 0.15) }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.95, rotate: -2 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="relative w-full h-full rounded-lg overflow-hidden"
                        >
                            <Image
                                src={imgs[currentImageIndex]}
                                alt={name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </motion.div>
                    </AnimatePresence>
                    
                    {imgs.length > 1 && (
                        <>
                            <motion.button
                                className={`absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer ${
                                    isMobile ? 'opacity-100' : 'opacity-0 group-hover/image:opacity-100'
                                }`}
                                onClick={goToPrevImage}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </motion.button>
                            
                            <motion.button
                                className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer ${
                                    isMobile ? 'opacity-100' : 'opacity-0 group-hover/image:opacity-100'
                                }`}
                                onClick={goToNextImage}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.button>
                        </>
                    )}
                    
                    {imgs.length > 1 && (
                        <motion.div 
                            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1.5 rounded-full"
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ duration: 0.4, delay: 0.9 + (index * 0.15) }}
                        >
                            {imgs.map((_, idx) => (
                                <motion.div
                                    key={idx}
                                    className="rounded-full overflow-hidden"
                                    animate={{
                                        width: idx === currentImageIndex ? 20 : 6,
                                        height: 6,
                                        backgroundColor: idx === currentImageIndex 
                                            ? "rgba(168, 85, 247, 1)" 
                                            : "rgba(255, 255, 255, 0.4)"
                                    }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    {idx === currentImageIndex && (
                                        <motion.div
                                            className="h-full bg-linear-to-r from-purple-400 to-pink-400"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 3, ease: "linear" }}
                                            style={{ originX: 0 }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            )}

            <motion.div 
                className="p-6 flex flex-col flex-1 relative z-10"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.15) }}
            >
                <motion.div 
                    className="mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.9 + (index * 0.15) }}
                >
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <motion.h2 
                            className="text-xl font-bold text-white"
                            whileHover={{ x: 3, color: "#e9d5ff" }}
                            transition={{ duration: 0.2 }}
                        >
                            {name}
                        </motion.h2>

                        {awards && (
                            <motion.span 
                                className="
                                    text-xs px-2.5 py-1 rounded-full
                                    bg-white/10 border border-white/20
                                    text-white
                                    font-medium
                                "
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={inView ? { 
                                    opacity: 1, 
                                    scale: 1,
                                    rotate: 0
                                } : { 
                                    opacity: 0, 
                                    scale: 0.8,
                                    rotate: -5
                                }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: 1 + (index * 0.15),
                                    type: "spring",
                                    stiffness: 200
                                }}
                                whileHover={{ 
                                    scale: 1.15,
                                    rotate: 3,
                                    backgroundColor: "rgba(255, 255, 255, 0.15)"
                                }}
                            >
                                {awards}
                            </motion.span>
                        )}
                    </div>

                    <motion.p 
                        className="text-sm text-gray-300 leading-relaxed"
                        initial={{ opacity: 0, y: 5 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                        transition={{ duration: 0.4, delay: 1 + (index * 0.15) }}
                    >
                        {description}
                    </motion.p>
                </motion.div>

                <div className="flex-1">
                    {contributions?.length && (
                        <motion.ul 
                            className="mb-4 space-y-2 text-sm text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.4, delay: 1.1 + (index * 0.15) }}
                        >
                            {contributions.slice(0, 2).map((item, idx) => (
                                <motion.li 
                                    key={idx} 
                                    className="flex gap-2.5 items-start"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ 
                                        duration: 0.5, 
                                        delay: 1.2 + (index * 0.15) + (idx * 0.1),
                                        type: "spring",
                                        stiffness: 120
                                    }}
                                    whileHover={{ x: 4 }}
                                >
                                    <motion.span 
                                        className="text-purple-400 font-bold mt-0.5"
                                        animate={isHovering ? {
                                            x: [0, 4, 0],
                                            scale: [1, 1.2, 1]
                                        } : {}}
                                        transition={{
                                            duration: 1.5,
                                            repeat: isHovering ? Infinity : 0,
                                            delay: idx * 0.3
                                        }}
                                    >
                                        →
                                    </motion.span>
                                    <span className="flex-1">{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </div>

                <motion.div 
                    className="mt-auto pt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 1.3 + (index * 0.15) }}
                >
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, idx) => (
                            <motion.span
                                key={idx}
                                className="
                                    px-2.5 py-1 rounded-full
                                    text-xs
                                    bg-white/10 text-white
                                    border border-white/20
                                    font-medium
                                "
                                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                                animate={inView ? { 
                                    opacity: 1, 
                                    scale: 1, 
                                    y: 0 
                                } : { 
                                    opacity: 0, 
                                    scale: 0.7, 
                                    y: 10 
                                }}
                                transition={{ 
                                    duration: 0.4, 
                                    delay: 1.4 + (index * 0.15) + (idx * 0.04),
                                    type: "spring",
                                    stiffness: 200
                                }}
                                whileHover={{ 
                                    scale: 1.15,
                                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                                    borderColor: "rgba(255, 255, 255, 0.4)",
                                    y: -3,
                                    transition: { duration: 0.1 }
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}