import LogoLoop from "../ui/LogoLoop";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiNestjs,
    SiCplusplus,
    SiJavascript,
    SiPython,
    SiTensorflow,
    SiPytorch,
    SiGooglecloud,
    SiLinux,
    SiDocker,
    SiGithub,
    SiGit,
    SiFastapi,
    SiPostgresql,
    SiGraphql,
    SiArchlinux,
    SiUbuntu,
    SiPrisma,
    SiVercel
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

const techLogos = [
    {
        node: <SiTypescript />,
        title: "TypeScript",
        href: "https://www.typescriptlang.org",
    },
    {
        node: <SiCplusplus />,
        title: "C++",
    },
    {
        node: <SiJavascript />,
        title: "JavaScript",
    },
    {
        node: <SiPython />,
        title: "Python",
    },
    {
        node: <SiGooglecloud />,
        title: "Google Cloud",
        href: "https://cloud.google.com",
    },
    {
        node: <VscAzure />,
        title: "Microsoft Azure",
        href: "https://azure.microsoft.com",
    },
    {
        node: <SiLinux />,
        title: "Linux",
        href: "https://www.linux.org",
    },
    {
        node: <SiDocker />,
        title: "Docker",
        href: "https://www.docker.com",
    },
    {
        node: <SiGithub />,
        title: "GitHub",
    },
    {
        node: <SiGit />,
        title: "Git",
        href: "https://git-scm.com",
    },
    {
        node: <SiPostgresql />,
        title: "PostgreSQL",
    },
    {
        node: <SiGraphql />,
        title: "GraphQL",
        href: "https://graphql.org",
    },
    {
        node: <SiPrisma />,
        title: "Prisma",
        href: "https://www.prisma.io",
    },
    {
        node: <SiArchlinux />,
        title: "Arch Linux",
        href: "https://archlinux.org",
    },
    {
        node: <SiUbuntu />,
        title: "Ubuntu",
        href: "https://ubuntu.com",
    },
    {
        node: <SiVercel />,
        title: "Vercel",
        href: "https://vercel.com",
    }
];

const libraryLogos = [
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    {
        node: <SiTailwindcss />,
        title: "Tailwind CSS",
        href: "https://tailwindcss.com",
    },
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    {
        node: <SiTensorflow />,
        title: "TensorFlow",
        href: "https://www.tensorflow.org",
    },
    {
        node: <SiPytorch />,
        title: "PyTorch",
        href: "https://pytorch.org",
    },
    {
        node: <SiFastapi />,
        title: "FastAPI",
        href: "https://fastapi.tiangolo.com",
    },
    {
        node: <SiNestjs />,
        title: "NestJS",
    },
];

export default function Skills() {
    return (
        <div>
            <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight text-center">
                    Technologies & Tools
                </h2>
            </div>
            <LogoLoop
                logos={techLogos}
                speed={70}
                direction="left"
                logoHeight={48}
                gap={40}
                hoverSpeed={0}
                scaleOnHover
            />

            <div>
                <div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight text-center mt-12">
                        Library & Frameworks
                    </h2>
                </div>
                <LogoLoop
                    logos={libraryLogos}
                    speed={70}
                    direction="right"
                    logoHeight={48}
                    gap={40}
                    hoverSpeed={0}
                    scaleOnHover
                />
            </div>
        </div>
    );
}
