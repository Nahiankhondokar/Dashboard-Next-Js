export interface Profile {
  id: number;
  name: string;
  email: string;
  username: string;
  bio?: string;      // Change from 'string | null' to optional
  location?: string; // This allows 'undefined' which reset() accepts
  website?: string;
  image?: string;
  phone?: string;
  socials?: string[];
}