import LogoLoop from "../ui/LogoLoop";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
} from "react-icons/si";

const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    {
        node: <SiTypescript />,
        title: "TypeScript",
        href: "https://www.typescriptlang.org",
    },
    {
        node: <SiTailwindcss />,
        title: "Tailwind CSS",
        href: "https://tailwindcss.com",
    },
];

export default function Skills() {
    return (
        <div>
            <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight text-center">
                    Skills & Technologies
                </h2>
            </div>
            <LogoLoop
                logos={techLogos}
                speed={120}
                direction="left"
                logoHeight={48}
                gap={40}
                hoverSpeed={0}
                scaleOnHover

            />
        </div>
    );
}
