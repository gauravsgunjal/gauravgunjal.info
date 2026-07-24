export interface ExperienceEntry {
  company: string;
  companyUrl?: string;
  role: string;
  startDate: string; // e.g. "Sep 2021"
  endDate: string; // e.g. "Present"
  location: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}
