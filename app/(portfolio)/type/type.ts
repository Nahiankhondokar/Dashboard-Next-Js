// --- Types ---
export type Section = "home" | "about" | "portfolio" | "contact";
export type Home = Pick<UserInfo, "name" | "subtitle" | "image" | "bio">
export type About = Pick<UserInfo,
    "name" | "location" | "nationality" | "bio" |
    "phone" | "job_type" | "metrics" |
    "expertise" | "experiences" | "certificates" | "email"
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
    metrics: Metrics[];
    expertise: Expertise[];
    experiences: Experience[];
    certificates: Certificate[];
}

export interface Metrics {
    label: string | null;
    value: string | null;
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
    year: string | null
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

