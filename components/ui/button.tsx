"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className="px-5 py-2 text-manga-text hover:text-manga-accent transition-colors duration-200 rounded-md bg-manga-surface border border-manga-border hover:bg-manga-surface-hover ink-border"
        >
            {children}
        </button>
    );
}
