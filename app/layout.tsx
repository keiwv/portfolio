import type { Metadata } from "next";
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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
