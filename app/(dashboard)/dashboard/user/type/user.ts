// types/user.ts
export type SocialLinks = {
  facebook?: string | null;
  github?: string | null;
  linkedin?: string | null;
  website?: string | null;
};

export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  role?: number;
  bio?: string;
  location?: string;
  website?: string;
  status?: boolean;
  image?: string;
  socials?: string[];
};
