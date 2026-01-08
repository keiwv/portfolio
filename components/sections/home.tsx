"use client";

import user from "@/data/data-eng.json";
import SplitText from "@/components/ui/SplitText";
import TextType from "@/components/ui/TextType";
import { useTranslations } from "next-intl";

export default function Home() {

    const t = useTranslations("hero");

    return (
        <div className="h-screen text-white relative px-6 sm:px-10">
            <div className="absolute inset-0 flex items-center">
                <div className="max-w-[1500px] sm:pl-6 md:pl-12 lg:pl-18">
                    <div className="block">
                        <SplitText
                            text={t("title")}
                            className="text-[3.2rem] leading-[0.95] font-extrabold uppercase block
                             sm:text-[6rem]
                             md:text-[8rem]
                             lg:text-[10rem]"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            textAlign="left"
                        />
                    </div>

                    {/* <div className="block">
                        <SplitText
                            text={t("subtitle")}
                            className="text-[3.2rem] leading-[0.95] font-extrabold uppercase block
                             sm:text-[6rem]
                             md:text-[8rem]
                             lg:text-[10rem]"
                            delay={200}
                            duration={0.8}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            textAlign="left"
                        />
                    </div> */}

                    <div className="mt-4 sm:mt-6 max-w sm:pl-1 md:pl-1 lg:pl-2">
                        <TextType 
                        text={t("subtitle")} 
                        className="text-sm sm:text-3xl tracking-widest uppercase font-light"
                        pauseDuration={3000} />
                    </div>
                </div>
            </div>
        </div>
    );
}
