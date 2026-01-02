"use client";
import { GlassCard } from "@developer-hub/liquid-glass";
import { BLUR_AMOUNT, DISPLACEMENT_SCALE } from "@/lib/data";
import ProjectCard from "@/components/ui/Cards/ProjectCard";
import user from "@/data/data-eng.json";

export default function Projects() {
    return (
        <section
            id="projects"
            className="min-h-screen flex items-center justify-center px-6"
        >
            <div className="max-w-6xl mx-auto text-center text-white">
                    <div className="p-12">
                        <h1 className="text-5xl font-bold mb-8">Projects</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                            {user.projects.map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    name={project.name}
                                    description={project.description}
                                    skills={project.skills}
                                />
                            ))}
                        </div>
                    </div>
            </div>
        </section>
    );
}
