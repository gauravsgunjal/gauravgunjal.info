import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
  signal
} from '@angular/core';

/** Cycles through a list of phrases with a typing/deleting animation. */
@Component({
  selector: 'app-typewriter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span aria-hidden="true">{{ displayText() }}</span><span class="cursor animate-blink">|</span
    ><span class="sr-only">{{ phrases.join(', ') }}</span>`,
  styles: [
    `
      .cursor {
        display: inline-block;
        margin-left: 2px;
        color: #3763f7;
        font-weight: 300;
      }
    `
  ]
})
export class Typewriter implements OnInit {
  @Input({ required: true }) phrases: string[] = [];
  @Input() typingSpeedMs = 65;
  @Input() deletingSpeedMs = 35;
  @Input() pauseMs = 1600;

  protected readonly displayText = signal('');
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (!this.phrases.length) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = (): void => {
      const current = this.phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        this.displayText.set(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timeoutId = setTimeout(tick, this.pauseMs);
          return;
        }
        timeoutId = setTimeout(tick, this.typingSpeedMs);
      } else {
        charIndex--;
        this.displayText.set(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % this.phrases.length;
        }
        timeoutId = setTimeout(tick, this.deletingSpeedMs);
      }
    };

    timeoutId = setTimeout(tick, this.typingSpeedMs);
    this.destroyRef.onDestroy(() => clearTimeout(timeoutId));
  }
}
