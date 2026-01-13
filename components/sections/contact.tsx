"use client";
import { useTranslations } from "next-intl";
import { socials } from "@/lib/data";

export default function Contact() {
    const t = useTranslations("contact");

    return (
        <>
            <div className="min-h-[75vh] md:min-h-[85vh] flex flex-col justify-center px-6 py-12 md:py-20">
                <div className="max-w-4xl mx-auto text-center text-white flex-1 flex items-center justify-center">
                    <div className="p-8 md:p-12">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                            {t("title")}
                        </h1>
                        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                            {t("description")}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            {socials.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.url}
                                    target={
                                        link.label !== "Email"
                                            ? "_blank"
                                            : undefined
                                    }
                                    rel={
                                        link.label !== "Email"
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="group flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                                >
                                    <div className="text-white/70 group-hover:text-white transition-colors duration-300 mb-3">
                                        <link.icon />
                                    </div>
                                    <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                                        {link.label}
                                    </span>
                                </a>
                            ))}
                        </div>

                        <div className="text-center">
                            <p className="text-white/60 text-sm">
                                {t("location")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
