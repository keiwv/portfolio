"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className="px-5 py-2 text-y2k-text hover:text-y2k-accent transition-colors duration-200 rounded-md bg-y2k-surface border border-y2k-border hover:bg-y2k-surface-hover pixel-border"
        >
            {children}
        </button>
    );
}
