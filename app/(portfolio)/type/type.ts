// --- Types ---
export type Section = "home" | "about" | "portfolio" | "contact";
export type Home = Pick<UserInfo, "name" | "subtitle" | "image" | "bio">
export type About = Pick<UserInfo,
    "name" | "location" | "nationality" | "bio" |
    "phone" | "job_type" | "exp_year" | "clients" |
    "expertise" | "experience" | "certificate" | "email" |
    "awards"
>


export interface UserInfo {
    id: number;
    name: string;
    email: string;
    username: string;
    bio: string | null;
    location: string | null;
    website: string | null;
    image: string | null;
    phone: string | null;
    socials: Social[];
    nationality: string | null;
    subtitle: string | null;
    address: string | null;
    job_type: string | null;
    exp_year: string | null;
    clients: string | null;
    projects: string | null;
    awards: string | null;
    expertise: Expertise[];
    experience: Experience[];
    certificate: Certificate[];
}



export interface Expertise {
    id: number;
    name: string;
    description: string;
    status: boolean;
    progress: string; // "10%"
}

export interface Experience {
    id: number;
    title: string;
    description: string;
    position: string;
    duration: string;
    company: string;
    start_date: string; // ISO date
    end_date: string;   // ISO date
    media: string | null;
}

export interface Social {
    id: number;
    platform: string;
    url: string;
}

export interface Certificate {
    id: number;
    title: string;
    issuer: string;
    issue_date: string;
    credential_url: string | null;
}

