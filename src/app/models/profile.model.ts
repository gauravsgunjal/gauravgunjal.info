export interface SocialLink {
  label: string;
  url: string;
  icon: string; // key into the icon map used by <app-icon>
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface Profile {
  fullName: string;
  displayName: string;
  title: string;
  taglines: string[];
  location: string;
  email: string;
  phone?: string;
  summary: string;
  aboutParagraphs: string[];
  strengths: string[];
  achievements: string[];
  stats: Stat[];
  social: SocialLink[];
  resumeUrl: string;
  profileImage: string;
}
