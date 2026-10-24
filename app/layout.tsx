import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import DynamicIntlProvider from "@/components/providers/DynamicIntlProvider";

const interTight = Inter_Tight({
    variable: "--font-inter-tight",
    subsets: ["latin"],
    weight: ["700", "800", "900"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
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
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#0a0a0b" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable}`}
        >
            <body className="antialiased pb-[env(safe-area-inset-bottom)]">
                <DynamicIntlProvider>{children}</DynamicIntlProvider>
            </body>
        </html>
    );
}
