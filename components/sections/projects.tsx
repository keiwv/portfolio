"use client";

import ProjectCard from "@/components/ui/Cards/ProjectCard";
import user from "@/data/data-eng.json";
import { useTranslations } from "next-intl";
import { Project } from "@/types/project";

export default function Projects() {

    const t = useTranslations("projects");
    const projects = t.raw("items") as Project[];

    return (
        <div className="min-h-screen py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center text-white">
                    {t("title")}
                </h1>

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
