"use client";

import ProjectCard from "@/components/ui/Cards/ProjectCard";
import user from "@/data/data-eng.json";

export default function Projects() {
    return (
        <section
            id="projects"
            className="min-h-screen py-20 px-6"
        >
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold mb-12 text-center text-white">
                    Projects
                </h1>

                <div
                    className="
                        grid gap-8
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    {user.projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            name={project.name}
                            description={project.description}
                            skills={project.skills}
                            contributions={project.contibutions}
                            awards={project.awards}
                            imgs={project.imgs}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
