import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import java from 'highlight.js/lib/languages/java';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import scss from 'highlight.js/lib/languages/scss';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('css', scss);

/**
 * Fetches raw Markdown blog content and renders it to sanitized HTML with
 * syntax-highlighted code blocks. All markdown files ship as static assets
 * under src/assets/blogs/ — no CMS or backend required.
 */
@Injectable({ providedIn: 'root' })
export class MarkdownService {
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code: string, lang: string) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

  async fetchAndRender(path: string): Promise<{ html: SafeHtml; raw: string }> {
    const raw = await firstValueFrom(this.http.get(path, { responseType: 'text' }));
    const html = await this.marked.parse(raw ?? '');
    return { html: this.sanitizer.bypassSecurityTrustHtml(html), raw: raw ?? '' };
  }

  /** Rough reading-time estimate (~200 words/min), used when a post doesn't hardcode one. */
  estimateReadingTime(text: string): number {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  }
}
