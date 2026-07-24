import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="theme-toggle"
      (click)="theme.toggle()"
      [attr.aria-pressed]="theme.mode() === 'dark'"
      aria-label="Toggle dark and light theme"
    >
      @if (theme.mode() === 'dark') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon">
          <circle cx="12" cy="12" r="4" />
          <path
            stroke-linecap="round"
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          />
        </svg>
      } @else {
        <svg viewBox="0 0 24 24" fill="currentColor" class="icon">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"
          />
        </svg>
      }
    </button>
  `,
  styles: [
    `
      .theme-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 9999px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: inherit;
        cursor: pointer;
        transition: transform 0.2s ease, background 0.2s ease;
      }
      .theme-toggle:hover {
        transform: translateY(-1px) scale(1.05);
        background: rgba(255, 255, 255, 0.16);
      }
      .icon {
        width: 1.15rem;
        height: 1.15rem;
      }
    `
  ]
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
}
