import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaRegFileLines } from "react-icons/fa6";

export const BLUR_AMOUNT = 0.1;
export const DISPLACEMENT_SCALE = 100;

export const socials = [
    {
        icon: FaGithub,
        url: "https://github.com/keiwv",
        label: "GitHub",
        delay: 0.8,
    },
    {
        icon: FaLinkedin,
        url: "https://linkedin.com/in/brayanperez56",
        label: "LinkedIn",
        delay: 1.0,
    },
    {
        icon: FaEnvelope,
        url: `mailto:brayan.ivan@example.com`,
        label: "Email",
        delay: 1.2,
    },
    {
        icon: FaRegFileLines,
        url: `/cv_v1.pdf`,
        label: "CV",
        delay: 1.4,
    }
];