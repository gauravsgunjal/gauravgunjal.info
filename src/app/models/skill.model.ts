export type SkillCategory = 'Backend' | 'Frontend' | 'Cloud' | 'Database' | 'DevOps' | 'AI';

export interface Skill {
  name: string;
  level: number; // 0-100, used for the progress indicator
  icon: string;
}

export interface SkillGroup {
  category: SkillCategory;
  icon: string;
  description: string;
  skills: Skill[];
}
