import { ArchitectureDiagram } from '../models/architecture.model';

/**
 * TODO: Replace with your real AWS architecture diagrams. Each entry expects
 * an image under assets/images/architecture/. These placeholders illustrate
 * the categories the gallery supports and can be edited or removed freely.
 */
export const ARCHITECTURE_DIAGRAMS: ArchitectureDiagram[] = [
  {
    id: 'serverless-api',
    title: 'Serverless REST API',
    category: 'Serverless',
    description:
      'API Gateway + Lambda + DynamoDB reference architecture for a horizontally scalable, pay-per-use REST API.',
    image: 'assets/images/architecture/placeholder-serverless.svg',
    services: ['API Gateway', 'Lambda', 'DynamoDB', 'CloudWatch', 'IAM']
  },
  {
    id: 'three-tier-web',
    title: 'Three-Tier Web Application',
    category: 'Networking',
    description:
      'Classic VPC-based three-tier design with an ALB, auto-scaled EC2 web tier, and a private RDS layer.',
    image: 'assets/images/architecture/placeholder-three-tier.svg',
    services: ['VPC', 'ALB', 'EC2 Auto Scaling', 'RDS', 'CloudFront', 'S3']
  },
  {
    id: 'ci-cd-pipeline',
    title: 'Containerized CI/CD Pipeline',
    category: 'CI/CD',
    description:
      'Docker-based build and deploy pipeline from source control through to ECS, with automated testing gates.',
    image: 'assets/images/architecture/placeholder-cicd.svg',
    services: ['CodePipeline', 'CodeBuild', 'ECR', 'ECS Fargate', 'CloudWatch']
  }
];
