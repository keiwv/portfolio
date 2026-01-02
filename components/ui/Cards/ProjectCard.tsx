interface ProjectCardProps {
    index?: number;
    name: string;
    description: string;
    skills: string[];
}

export default function ProjectCard(props: ProjectCardProps) {
    return (
        <div className="bg-white/2 rounded-4xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{props.name}</h3>
            <p className="text-sm mb-4">{props.description}</p>
            <div className="flex flex-wrap gap-2">
                {props.skills.map((skill, index) => (
                    <span
                        key={index}
                        className="bg-white/3 text-white text-xs font-medium px-2 py-1 rounded"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}