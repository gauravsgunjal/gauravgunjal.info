import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject
} from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

const SCRIPT_ID = 'cf-turnstile-script';

/**
 * Cloudflare Turnstile spam-protection widget. Loads the Turnstile script once
 * per page, renders the widget for the configured site key, and emits the
 * verification token on success.
 *
 * IMPORTANT: this only proves the widget was solved client-side. A static
 * site has no backend to call Cloudflare's `/siteverify` endpoint, so for
 * real protection you must verify the emitted token server-side (e.g. in a
 * small Cloudflare Worker / AWS Lambda placed in front of your EmailJS call)
 * before treating the submission as trusted. See README "Spam Protection".
 */
@Component({
  selector: 'app-turnstile-widget',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #container></div>`
})
export class TurnstileWidget implements OnInit, OnDestroy {
  @Input({ required: true }) siteKey = '';
  @Output() verified = new EventEmitter<string>();
  @Output() expired = new EventEmitter<void>();

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  private readonly theme = inject(ThemeService);
  private widgetId?: string;

  ngOnInit(): void {
    this.loadScript().then(() => this.render());
  }

  ngOnDestroy(): void {
    if (this.widgetId) {
      window.turnstile?.remove(this.widgetId);
    }
  }

  reset(): void {
    if (this.widgetId) {
      window.turnstile?.reset(this.widgetId);
    }
  }

  private render(): void {
    if (!window.turnstile || !this.container?.nativeElement) return;
    this.widgetId = window.turnstile.render(this.container.nativeElement, {
      sitekey: this.siteKey,
      theme: this.theme.mode(),
      callback: (token: string) => this.verified.emit(token),
      'expired-callback': () => this.expired.emit()
    });
  }

  private loadScript(): Promise<void> {
    return new Promise((resolve) => {
      if (window.turnstile) {
        resolve();
        return;
      }
      if (document.getElementById(SCRIPT_ID)) {
        window.onTurnstileLoad = () => resolve();
        return;
      }
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit';
      script.async = true;
      script.defer = true;
      window.onTurnstileLoad = () => resolve();
      document.head.appendChild(script);
    });
  }
}
