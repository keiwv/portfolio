"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className="px-5 py-2 text-white hover:text-gray-100 transition-colors duration-200 rounded-md bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10"
        >
            {children}
        </button>
    );
}
