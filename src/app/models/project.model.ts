export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  architectureRef?: string; // links to an AWS Architecture Gallery item id
  featured: boolean;
  category: 'Web App' | 'Enterprise' | 'E-Commerce' | 'SCADA / IoT' | 'API' | 'Open Source';
}
