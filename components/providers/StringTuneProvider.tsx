"use client";

import { useEffect, type ReactNode } from "react";

let started = false;

// StringTune drives scroll-linked effects through per-element progress
// (`data-string="progress"`). Scrolling itself stays native: smoothing felt laggy.
export default function StringTuneProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Page-wide singleton; StrictMode mounts effects twice in dev.
        if (started) return;
        started = true;

        import("@/lib/string-tune").then(({ StringTune, StringProgress }) => {
            const tune = StringTune.getInstance();
            tune.scrollDesktopMode = "default";
            tune.scrollMobileMode = "default";
            tune.use(StringProgress);
            tune.start(60);
        });
    }, []);

    return <>{children}</>;
}
