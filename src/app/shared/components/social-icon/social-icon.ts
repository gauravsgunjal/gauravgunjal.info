import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (icon) {
      @case ('github') {
        <svg viewBox="0 0 24 24" fill="currentColor" class="h-full w-full">
          <path
            d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.67-3.71-1.3-3.71-1.3-.5-1.28-1.22-1.62-1.22-1.62-.99-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.91.1-.71.38-1.2.7-1.47-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.12a10.5 10.5 0 0 1 5.5 0c2.1-1.42 3.02-1.12 3.02-1.12.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.95 0 4.22-2.58 5.14-5.03 5.42.39.34.74 1 .74 2.03 0 1.47-.01 2.65-.01 3.01 0 .29.2.64.76.53A11.02 11.02 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z"
          />
        </svg>
      }
      @case ('linkedin') {
        <svg viewBox="0 0 24 24" fill="currentColor" class="h-full w-full">
          <path
            d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z"
          />
        </svg>
      }
      @case ('mail') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-full w-full">
          <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
          <path stroke-linecap="round" stroke-linejoin="round" d="m3.5 6 8.5 6.5L20.5 6" />
        </svg>
      }
      @case ('download') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-full w-full">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0 4.5-4.5M12 15 7.5 10.5" />
          <path stroke-linecap="round" d="M4 18.5V20a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 20v-1.5" />
        </svg>
      }
      @case ('arrow-right') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-full w-full">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6" />
        </svg>
      }
    }
  `
})
export class SocialIcon {
  @Input({ required: true }) icon = '';
}
