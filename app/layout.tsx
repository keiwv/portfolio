import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DynamicIntlProvider from "@/components/providers/DynamicIntlProvider";
import { BackgroundProvider } from "@/components/providers/BackgroundProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
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
        { media: "(prefers-color-scheme: light)", color: "#000000" },
        { media: "(prefers-color-scheme: dark)", color: "#000000" },
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
                className={`${geistSans.variable} ${geistMono.variable} antialiased pb-[env(safe-area-inset-bottom)]`}
            >
                <BackgroundProvider>
                    <DynamicIntlProvider>
                        {children}
                    </DynamicIntlProvider>
                </BackgroundProvider>
            </body>
        </html>
    );
}
