// types/user.ts
export type SocialLinks = {
  facebook?: string;
  github?: string;
  linkedin?: string;
  website?: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  role: string;
  image?: string;
  status: boolean;
  social?: SocialLinks;
};