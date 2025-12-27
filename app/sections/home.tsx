"use client";

import useMousePosition from "@/components/hook/useMousePosition";
import user from "@/data/data-eng.json";

export default function Home() {
    const mousePosition = useMousePosition();

    return (
        <section
            id="home"
            className="min-h-screen text-white relative px-6 sm:px-10"
        >

            <div className="absolute inset-0 flex items-center">
                <div className="max-w-10xl sm:pl-6 md:pl-12 lg:pl-18">
                    <h1
                        className="text-[3.2rem] leading-[0.95] font-extrabold uppercase
                         sm:text-[6rem]
                         md:text-[8rem]
                         lg:text-[12rem]"
                    >
                        {user.name}
                    </h1>

                    <h1
                        className="text-[3.2rem] leading-[0.95] font-extrabold uppercase
                         sm:text-[6rem]
                         md:text-[8rem]
                         lg:text-[12rem]"
                    >
                        {user.last_name}
                    </h1>

                    <div className="mt-4 sm:mt-6 max-w">
                        <p className="text-sm sm:text-4xl tracking-widest uppercase font-light">
                            {user.role}
                        </p>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-[10px] sm:text-xs tracking-widest">
                Made w ❤️ by Brayan Ivan
            </div>
        </section>
    );
}
