import { FileText, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";

export const EMAIL = "contact@keiwv.dev";
export const CV_URL = "/Brayan Ivan - contact@keiwv.dev.pdf";
export const GITHUB_URL = "https://github.com/keiwv";
export const LINKEDIN_URL = "https://linkedin.com/in/brayanperez56";

export const socials: { icon: LucideIcon; url: string; label: string }[] = [
    { icon: Github, url: GITHUB_URL, label: "GitHub" },
    { icon: Linkedin, url: LINKEDIN_URL, label: "LinkedIn" },
    { icon: Mail, url: `mailto:${EMAIL}`, label: "Email" },
    { icon: FileText, url: CV_URL, label: "CV" },
];

export const stack = [
    "TypeScript",
    "JavaScript",
    "Python",
    "C++",
    "NestJS",
    "FastAPI",
    "GraphQL",
    "PostgreSQL",
    "Prisma",
    "Next.js",
    "React",
    "Tailwind CSS",
    "PyTorch",
    "TensorFlow",
    "Docker",
    "Azure",
    "Google Cloud",
    "Linux",
];
