"use client";

export default function Background() {
    return (
        <div
            aria-hidden
            className="fixed inset-0 z-0 transition-all duration-700"
            style={{
                background: `linear-gradient(135deg, var(--y2k-bg-from), var(--y2k-bg), var(--y2k-bg-to))`,
            }}
        />
    );
}
