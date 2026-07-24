import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject,
  signal
} from '@angular/core';

/** Counts up from 0 to a target value once it scrolls into view. */
@Component({
  selector: 'app-animated-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span>{{ current() }}{{ suffix }}</span>`
})
export class AnimatedCounter implements OnInit, OnDestroy {
  @Input({ required: true }) target = 0;
  @Input() suffix = '';
  @Input() durationMs = 1400;

  protected readonly current = signal(0);
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.animate();
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.animate();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animate(): void {
    const start = performance.now();
    const step = (now: number): void => {
      const progress = Math.min((now - start) / this.durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.current.set(Math.round(eased * this.target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
