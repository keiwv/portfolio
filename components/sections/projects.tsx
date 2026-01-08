"use client";

import ProjectCard from "@/components/ui/Cards/ProjectCard";
import { useTranslations } from "next-intl";
import { Project } from "@/types/project";

export default function Projects() {

    const t = useTranslations("projects");
    const projects = t.raw("items") as Project[];

    return (
        <div className="pt-20 pb-5 md:py-12 px-4 md:px-10">
            <div className="max-w-7xl mx-auto pt-20">
                <div className="mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight text-center">
                        {t("title")}
                    </h2>
                </div>

                <div
                    className="
                        grid gap-6 md:gap-8
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            name={project.name}
                            description={project.description}
                            skills={project.skills}
                            contributions={project.contributions}
                            awards={project.awards}
                            imgs={project.imgs}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
