import { BlogPost } from '../models/blog.model';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'php-to-java-transition',
    title: 'What Moving from PHP/CodeIgniter to Java & Spring Boot Taught Me',
    excerpt:
      'After four years shipping PHP applications, I moved into enterprise Java. Here is what transferred, ' +
      'what did not, and how I ramped up quickly.',
    tags: ['Java', 'Spring Boot', 'PHP', 'Career'],
    publishedDate: '2026-02-10',
    readingTimeMinutes: 6,
    contentPath: 'assets/blogs/php-to-java-transition.md'
  },
  {
    slug: 'scada-dashboards-angular',
    title: 'Building Real-Time SCADA Dashboards with Angular and Chart Libraries',
    excerpt:
      'Lessons from building monitoring dashboards for solar and bio-energy plants — data density, alerting ' +
      'UX, and picking the right charting library.',
    tags: ['Angular', 'Data Visualization', 'SCADA'],
    publishedDate: '2026-04-22',
    readingTimeMinutes: 8,
    contentPath: 'assets/blogs/scada-dashboards-angular.md'
  },
  {
    slug: 'aws-for-full-stack-devs',
    title: 'AWS Fundamentals Every Full-Stack Developer Should Know',
    excerpt:
      'A practical starting point for backend and frontend developers who need to own deployment: EC2, S3, ' +
      'CloudFront, and RDS basics.',
    tags: ['AWS', 'Cloud', 'DevOps'],
    publishedDate: '2026-06-15',
    readingTimeMinutes: 7,
    contentPath: 'assets/blogs/aws-for-full-stack-devs.md'
  }
];
