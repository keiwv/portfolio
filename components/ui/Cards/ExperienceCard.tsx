import type { Experience } from "@/types/experience";
import { useIsMobile } from "@/components/hook/useIsMobile";

interface ExperienceCardProps {
    experience: Experience;
    index: number;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
    const isMobile = useIsMobile();
    
    return (
        <div className="relative">
            <div className="hidden md:block absolute left-[29px] top-6 w-[18px] h-[18px] bg-white rounded-full border-[3px] border-purple-900/50 z-10"></div>

            <div className="md:ml-20">
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg md:text-xl font-semibold text-white">
                                {experience.role}
                            </h3>
                            <p className="text-sm md:text-sm text-purple-300 font-medium">
                                {experience.company}
                            </p>
                            {isMobile && (
                                <div className="flex flex-col gap-1 mt-1">
                                    <div className="text-purple-300 text-xs md:text-sm">
                                        {experience.duration}
                                    </div>
                                    <p className="text-sm md:text-sm text-gray-400">
                                        {experience.location}
                                    </p>
                                </div>
                            )}
                        </div>
                        {!isMobile && (
                            <div className="flex flex-col gap-1 text-right">
                                <div className="text-purple-300 text-xs md:text-sm whitespace-nowrap">
                                    {experience.duration}
                                </div>
                                <p className="text-sm md:text-sm text-gray-400">
                                    {experience.location}
                                </p>
                            </div>
                        )}
                    </div>

                    <div>
                        {experience.contributions.map((contribution, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 shrink-0"></div>
                                <p className={`text-gray-300 leading-relaxed text-sm md:text-base ${isMobile ? 'text-[12px]': ''}`}>
                                    {contribution}
                                </p>
                            </div>
                        ))}
                    </div>

                    {experience.skills && (
                        <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1.5 bg-white/5 border border-white/20 rounded-full text-xs md:text-sm text-gray-300 hover:bg-white/10 transition-colors duration-200"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
