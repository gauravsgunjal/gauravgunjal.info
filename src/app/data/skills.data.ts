import { SkillGroup } from '../models/skill.model';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Backend',
    icon: 'server',
    description: 'Enterprise services and APIs in Java and PHP.',
    skills: [
      { name: 'Java', level: 80, icon: 'java' },
      { name: 'Spring Boot', level: 75, icon: 'spring' },
      { name: 'PHP', level: 90, icon: 'php' },
      { name: 'CodeIgniter', level: 90, icon: 'codeigniter' },
      { name: 'REST API Design', level: 88, icon: 'api' },
      { name: 'Maven', level: 72, icon: 'maven' }
    ]
  },
  {
    category: 'Frontend',
    icon: 'layout',
    description: 'Modern, responsive interfaces with Angular.',
    skills: [
      { name: 'Angular (7–20)', level: 88, icon: 'angular' },
      { name: 'TypeScript', level: 80, icon: 'typescript' },
      { name: 'JavaScript', level: 90, icon: 'javascript' },
      { name: 'HTML5', level: 92, icon: 'html5' },
      { name: 'CSS3 / SCSS', level: 90, icon: 'css3' },
      { name: 'jQuery', level: 90, icon: 'jquery' }
    ]
  },
  {
    category: 'Cloud',
    icon: 'cloud',
    description: 'AWS deployments and cloud-native architecture.',
    skills: [
      { name: 'AWS (EC2, S3, CloudFront)', level: 75, icon: 'aws' },
      { name: 'Linux Server Administration', level: 85, icon: 'linux' },
      { name: 'Apache / WHM / cPanel', level: 85, icon: 'apache' },
      { name: 'Cloud-Native Application Design', level: 68, icon: 'cloud-design' }
    ]
  },
  {
    category: 'Database',
    icon: 'database',
    description: 'Relational data modeling and reporting.',
    skills: [
      { name: 'MySQL', level: 88, icon: 'mysql' },
      { name: 'PostgreSQL', level: 70, icon: 'postgresql' },
      { name: 'JSON / Data Exchange', level: 85, icon: 'json' }
    ]
  },
  {
    category: 'DevOps',
    icon: 'devops',
    description: 'Build, deploy, and version control workflows.',
    skills: [
      { name: 'Docker', level: 65, icon: 'docker' },
      { name: 'CI/CD Pipelines', level: 65, icon: 'cicd' },
      { name: 'Git / SVN', level: 88, icon: 'git' },
      { name: 'Jira / Trello / Agile', level: 85, icon: 'jira' }
    ]
  },
  {
    category: 'AI',
    icon: 'ai',
    description: 'Applying AI-assisted workflows to enterprise engineering.',
    skills: [
      { name: 'AI-Assisted Development Workflows', level: 65, icon: 'ai-workflow' },
      { name: 'LLM Integration Exploration', level: 55, icon: 'llm' },
      { name: 'Prompt Engineering', level: 60, icon: 'prompt' }
    ]
  }
];
