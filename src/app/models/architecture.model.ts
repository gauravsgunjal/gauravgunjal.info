export interface ArchitectureDiagram {
  id: string;
  title: string;
  category: 'Serverless' | 'Microservices' | 'Data & Analytics' | 'Networking' | 'CI/CD' | 'Monitoring';
  description: string;
  image: string;
  services: string[];
}
