export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  publishedDate: string; // ISO date
  readingTimeMinutes: number;
  contentPath: string; // path under assets/blogs/*.md
}
