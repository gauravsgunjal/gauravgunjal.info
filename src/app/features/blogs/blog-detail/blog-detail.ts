import { ChangeDetectionStrategy, Component, Input, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';
import { MarkdownService } from '../../../core/services/markdown.service';
import { SeoService } from '../../../core/services/seo.service';
import { BLOG_POSTS } from '../../../data/blogs.data';
import { BlogPost } from '../../../models/blog.model';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-detail.html'
})
export class BlogDetail implements OnInit {
  /** Bound automatically from the `:slug` route param via withComponentInputBinding(). */
  @Input() slug = '';

  private readonly markdown = inject(MarkdownService);
  private readonly seo = inject(SeoService);

  protected readonly post = signal<BlogPost | undefined>(undefined);
  protected readonly html = signal<SafeHtml | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  ngOnInit(): void {
    const post = BLOG_POSTS.find((p) => p.slug === this.slug);
    this.post.set(post);

    if (!post) {
      this.loading.set(false);
      this.error.set(true);
      return;
    }

    this.seo.update({
      title: post.title,
      description: post.excerpt,
      url: `https://gauravgunjal.info/blog/${post.slug}`
    });

    this.markdown
      .fetchAndRender(post.contentPath)
      .then(({ html }) => this.html.set(html))
      .catch(() => this.error.set(true))
      .finally(() => this.loading.set(false));
  }
}
