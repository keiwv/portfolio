export type Experience = {
    id: number;
    role: string;
    company: string;
    duration: string;
    location: string;
    /** "YYYY-MM" */
    start: string;
    /** "YYYY-MM"; omitted while the role is ongoing */
    end?: string;
    contributions: string[];
    skills?: string[];
}
