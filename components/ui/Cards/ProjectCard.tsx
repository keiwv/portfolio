import Image from "next/image";

interface ProjectCardProps {
    name: string;
    description: string;
    contributions?: string[];
    awards?: string;
    imgs?: string[];
    skills: string[];
}

export default function ProjectCard({
    name,
    description,
    contributions,
    awards,
    imgs,
    skills,
}: ProjectCardProps) {
    return (
        <div
            className="
                group relative
                bg-white/5 backdrop-blur-xl
                rounded-2xl
                border border-white/10
                overflow-hidden
                transition-all duration-300
                hover:border-white/20
                hover:-translate-y-1
                shadow-[0_10px_40px_rgba(0,0,0,0.25)]
            "
        >
            {imgs?.length && (
                <div className="relative w-full aspect-video bg-black/20">
                    <Image
                        src={imgs[0]}
                        alt={name}
                        fill
                        className="object-contain p-3"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
            )}

            <div className="p-6 flex flex-col">
                <div className="mb-4">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-xl font-bold text-white">
                            {name}
                        </h2>

                        {awards && (
                            <span className="
                                text-xs px-2 py-0.5 rounded-full
                                bg-linear-to-r from-purple-500/30 to-pink-500/30
                                text-purple-200 border border-purple-400/30
                            ">
                                {awards}
                            </span>
                        )}
                    </div>

                    <p className="mt-2 text-sm text-gray-300 ">
                        {description}
                    </p>
                </div>

                {contributions?.length && (
                    <ul className="mb-4 space-y-1 text-sm text-gray-300">
                        {contributions.slice(0, 2).map((item, idx) => (
                            <li key={idx} className="flex gap-2">
                                <span className="text-purple-400">→</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="
                                    px-2 py-1 rounded-full
                                    text-xs
                                    bg-white/10 text-white
                                    border border-white/20
                                "
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
