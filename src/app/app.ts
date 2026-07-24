import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { ScrollToTop } from './shared/components/scroll-to-top/scroll-to-top';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, ScrollToTop],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <app-navbar />
    <main id="main-content" class="pt-24" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
    <app-scroll-to-top />
  `
})
export class App {}
