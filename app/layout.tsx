import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bangers } from "next/font/google";
import { oups } from "./fonts";
import "./globals.css";
import DynamicIntlProvider from "@/components/providers/DynamicIntlProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const bangers = Bangers({
    variable: "--font-bangers",
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Brayan Iván",
    description: "Personal portfolio of Brayan Iván",
    appleWebApp: {
        statusBarStyle: "black-translucent",
        capable: true,
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    // Ink black — matches the ocean at the bottom edge where iOS places
    // its toolbar, in both day and night states.
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#0a0a0a" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${bangers.variable} ${oups.variable} antialiased pb-[env(safe-area-inset-bottom)]`}
                suppressHydrationWarning
            >
                <DynamicIntlProvider>
                    {children}
                </DynamicIntlProvider>
            </body>
        </html>
    );
}
