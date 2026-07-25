import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SeoService } from '../../../core/services/seo.service';
import { BLOG_POSTS } from '../../../data/blogs.data';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterLink, FormsModule, DatePipe, TruncatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-list.html'
})
export class BlogList implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly posts = BLOG_POSTS;
  protected readonly searchTerm = signal('');
  protected readonly activeTag = signal<string>('All');

  protected readonly tags = computed(() => [
    'All',
    ...Array.from(new Set(this.posts.flatMap((p) => p.tags)))
  ]);

  protected readonly filteredPosts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const tag = this.activeTag();

    return this.posts
      .filter((p) => tag === 'All' || p.tags.includes(tag))
      .filter(
        (p) =>
          !term ||
          p.title.toLowerCase().includes(term) ||
          p.excerpt.toLowerCase().includes(term) ||
          p.tags.some((t) => t.toLowerCase().includes(term))
      )
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  });

  ngOnInit(): void {
    this.seo.update({
      title: 'Technical Blog',
      description: 'Articles on Java, Spring Boot, Angular, AWS, and enterprise engineering by Gaurav Gunjal.',
      url: 'https://gauravgunjal.info/blog'
    });
  }

  setTag(tag: string): void {
    this.activeTag.set(tag);
  }
}
