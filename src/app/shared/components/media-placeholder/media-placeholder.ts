import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

/**
 * Renders a real image when one exists at `src`; otherwise falls back to a
 * tasteful gradient placeholder with a monogram, so the site never shows a
 * broken-image icon before real assets (screenshots, diagrams, certificates)
 * are added. Swap in a real file at the same path and the placeholder
 * disappears automatically — no code changes required.
 */
@Component({
  selector: 'app-media-placeholder',
  standalone: true,
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!failed()) {
      <img
        [ngSrc]="src"
        [alt]="alt"
        [width]="width"
        [height]="height"
        [priority]="priority"
        class="h-full w-full object-cover"
        (error)="failed.set(true)"
      />
    } @else {
      <div class="placeholder" [style.background]="gradient">
        <span class="monogram">{{ monogram }}</span>
        <span class="placeholder-label">{{ label }}</span>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      .placeholder {
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.35rem;
        color: rgba(255, 255, 255, 0.92);
      }
      .monogram {
        font-size: 2rem;
        font-weight: 800;
        letter-spacing: 0.05em;
      }
      .placeholder-label {
        font-size: 0.7rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        opacity: 0.85;
        text-align: center;
        padding: 0 0.75rem;
      }
    `
  ]
})
export class MediaPlaceholder {
  @Input({ required: true }) src = '';
  @Input({ required: true }) alt = '';
  @Input() label = 'Add your image';
  @Input() width = 640;
  @Input() height = 400;
  @Input() priority = false;

  protected readonly failed = signal(false);

  private readonly gradients = [
    'linear-gradient(135deg, #3763f7, #06b6d4)',
    'linear-gradient(135deg, #7c3aed, #3763f7)',
    'linear-gradient(135deg, #06b6d4, #10b981)',
    'linear-gradient(135deg, #f97316, #ec4899)',
    'linear-gradient(135deg, #3763f7, #a855f7)'
  ];

  get monogram(): string {
    return this.alt
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  }

  get gradient(): string {
    const index = Math.abs(this.hashCode(this.alt)) % this.gradients.length;
    return this.gradients[index];
  }

  private hashCode(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
}
