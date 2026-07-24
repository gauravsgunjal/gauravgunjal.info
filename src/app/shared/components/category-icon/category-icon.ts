import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** Renders the outline icon for a skill category (Backend, Frontend, Cloud, Database, DevOps, AI). */
@Component({
  selector: 'app-category-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
      @switch (icon) {
        @case ('server') {
          <rect x="3" y="4" width="18" height="6" rx="1.5" />
          <rect x="3" y="14" width="18" height="6" rx="1.5" />
          <circle cx="7" cy="7" r="0.6" fill="currentColor" />
          <circle cx="7" cy="17" r="0.6" fill="currentColor" />
        }
        @case ('layout') {
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18" stroke-linecap="round" />
          <path d="M9 9v11" />
        }
        @case ('cloud') {
          <path
            d="M7 18a4.5 4.5 0 0 1-.4-8.98A5.5 5.5 0 0 1 17.3 8.1 4 4 0 0 1 17 18H7Z"
            stroke-linejoin="round"
          />
        }
        @case ('database') {
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
          <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
        }
        @case ('devops') {
          <path d="M12 3v4M12 17v4M4.2 7.2l2.8 2.8M17 14l2.8 2.8M3 12h4M17 12h4M4.2 16.8 7 14M17 10l2.8-2.8" stroke-linecap="round" />
          <circle cx="12" cy="12" r="3" />
        }
        @case ('ai') {
          <rect x="6" y="7" width="12" height="10" rx="2.5" />
          <path d="M12 3v4M9 21v-2M15 21v-2M3 10h1M3 14h1M20 10h1M20 14h1" stroke-linecap="round" />
          <circle cx="9.5" cy="12" r="0.9" fill="currentColor" />
          <circle cx="14.5" cy="12" r="0.9" fill="currentColor" />
        }
      }
    </svg>
  `
})
export class CategoryIcon {
  @Input({ required: true }) icon = '';
}
