import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Gaurav Gunjal | Senior Full Stack Engineer'
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
    title: 'About Me'
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills').then((m) => m.Skills),
    title: 'Skills'
  },
  {
    path: 'experience',
    loadComponent: () => import('./features/experience/experience').then((m) => m.Experience),
    title: 'Professional Experience'
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects').then((m) => m.Projects),
    title: 'Featured Projects'
  },
  {
    path: 'aws-architecture',
    loadComponent: () =>
      import('./features/aws-architecture/aws-architecture').then((m) => m.AwsArchitecture),
    title: 'AWS Architecture Gallery'
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blogs/blog-list/blog-list').then((m) => m.BlogList),
    title: 'Technical Blog'
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./features/blogs/blog-detail/blog-detail').then((m) => m.BlogDetail),
    title: 'Blog Post'
  },
  {
    path: 'certifications',
    loadComponent: () =>
      import('./features/certifications/certifications').then((m) => m.Certifications),
    title: 'Certifications'
  },
  {
    path: 'github-activity',
    loadComponent: () =>
      import('./features/github-activity/github-activity').then((m) => m.GithubActivity),
    title: 'GitHub Activity'
  },
  {
    path: 'resume',
    loadComponent: () => import('./features/resume/resume').then((m) => m.Resume),
    title: 'Resume'
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
    title: 'Contact'
  },
  { path: '**', redirectTo: '' }
];
