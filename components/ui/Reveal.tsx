"use client";

import type { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

// 400ms fade-up the first time a block scrolls into view.
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

    return (
        <div
            ref={ref}
            className={cn("reveal", inView && "is-in", className)}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </div>
    );
}
