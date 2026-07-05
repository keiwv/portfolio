"use client";
import { useTranslations } from "next-intl";
import { socials } from "@/lib/data";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export default function Contact() {
    const t = useTranslations("contact");

    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false
    });

    return (
        <>
            <div 
                ref={ref}
                className="min-h-[75vh] md:min-h-[85vh] flex flex-col justify-center px-6 py-12 md:py-20"
            >
                <div className="max-w-4xl mx-auto text-center text-manga-text flex-1 flex items-center justify-center">
                    <div className="p-8 md:p-12 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                        >
                            <motion.h1 
                                className="text-2xl md:text-3xl lg:text-4xl font-bold font-comic mb-6 text-manga"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {t("title")}
                            </motion.h1>
                            
                        </motion.div>

                        <motion.div
                            className="mb-10 flex justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <p className="speech-bubble speech-bubble-tail text-lg text-manga-text-secondary max-w-2xl px-6 py-4">
                                {t("description")}
                            </p>
                        </motion.div>

                        <motion.div 
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            {socials.map((link, index) => (
                                <motion.a
                                    key={link.label}
                                    href={link.url}
                                    target={
                                        link.label !== "Email"
                                            ? "_blank"
                                            : undefined
                                    }
                                    rel={
                                        link.label !== "Email"
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="group relative flex flex-col items-center p-6 rounded-none manga-panel screentone-corner overflow-hidden"
                                    initial={{ 
                                        opacity: 0, 
                                        y: 30,
                                        scale: 0.9
                                    }}
                                    animate={inView ? { 
                                        opacity: 1, 
                                        y: 0,
                                        scale: 1
                                    } : { 
                                        opacity: 0, 
                                        y: 30,
                                        scale: 0.9
                                    }}
                                    transition={{ 
                                        duration: 0.5, 
                                        delay: 0.7 + (index * 0.1),
                                        type: "spring",
                                        stiffness: 120
                                    }}
                                    whileHover={{ 
                                        scale: 1.08,
                                        y: -8,
                                        transition: { duration: 0.3 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >

                                   

                                    <motion.div 
                                        className="text-manga-text-muted group-hover:text-manga-text transition-colors duration-300 mb-3 relative z-10"
                                        whileHover={{ 
                                            scale: 1.2,
                                            rotate: [0, -10, 10, 0],
                                            transition: { duration: 0.5 }
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: index * 0.2
                                        }}
                                    >
                                        <link.icon />
                                    </motion.div>

                                    <span className="text-sm font-medium text-manga-text-secondary group-hover:text-manga-text transition-colors duration-300 relative z-10">
                                        {link.label}
                                    </span>
                                </motion.a>
                            ))}
                        </motion.div>

                        <motion.div 
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                        >
                            <motion.p
                                className="text-manga-text-muted text-sm inline-block font-comic text-[10px] tracking-wide"
                                whileHover={{ scale: 1.05 }}
                            >
                                ✦ {t("location")} ✦
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}