import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
    items: ReactNode[];
    reverse?: boolean;
    /** Seconds per loop */
    duration?: number;
    /** How many times `items` repeat inside each half of the track */
    repeat?: number;
    className?: string;
}

// Decorative: always pair it with readable text (sr-only or visible) elsewhere.
export default function Marquee({
    items,
    reverse = false,
    duration = 45,
    repeat = 2,
    className,
}: MarqueeProps) {
    const half = Array.from({ length: repeat }, () => items).flat();
    const loop = [...half, ...half];

    return (
        <div className={cn("marquee", reverse && "rev", className)} aria-hidden>
            <div
                className="marquee-track"
                style={{ animationDuration: `${duration}s` }}
            >
                {loop.map((item, index) => (
                    <Fragment key={index}>
                        <span>{item}</span>
                        <i>•</i>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
