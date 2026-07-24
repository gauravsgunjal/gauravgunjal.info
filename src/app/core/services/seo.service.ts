import { Injectable, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

/** Centralizes per-route <title> and meta tag updates for SEO + social sharing. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);

  update(data: SeoData): void {
    const suffix = 'Gaurav Gunjal | Senior Full Stack Engineer';
    const fullTitle = data.title === suffix ? data.title : `${data.title} — ${suffix}`;
    this.titleService.setTitle(fullTitle);

    this.setTag('description', data.description);
    this.setTag('og:title', fullTitle, true);
    this.setTag('og:description', data.description, true);
    this.setTag('twitter:title', fullTitle, true);
    this.setTag('twitter:description', data.description, true);

    if (data.image) {
      this.setTag('og:image', data.image, true);
      this.setTag('twitter:image', data.image, true);
    }
    if (data.url) {
      this.setTag('og:url', data.url, true);
    }
  }

  private setTag(name: string, content: string, isProperty = false): void {
    const attr: MetaDefinition = isProperty ? { property: name, content } : { name, content };
    if (this.meta.getTag(`${isProperty ? 'property' : 'name'}="${name}"`)) {
      this.meta.updateTag(attr);
    } else {
      this.meta.addTag(attr);
    }
  }
}
