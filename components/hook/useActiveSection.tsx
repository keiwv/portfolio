"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section crosses a thin band in the middle of the viewport.
 */
export function useActiveSection(sectionIds: string[]) {
    const [activeSection, setActiveSection] = useState("");
    const idsKey = sectionIds.join(",");

    useEffect(() => {
        const ids = idsKey.split(",");
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                }
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );

        ids.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [idsKey]);

    return activeSection;
}

export default useActiveSection;
