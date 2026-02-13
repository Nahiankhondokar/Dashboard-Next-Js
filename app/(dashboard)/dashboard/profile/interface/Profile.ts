
export interface Profile {
  id: number;
  name: string;
  email: string;
  username: string;
  bio: string | null;
  location: string | null;
  website: string | null;
  image: string | null;
  phone: string | null;
  socials: string[]; // empty array is valid
}
