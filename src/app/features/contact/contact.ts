import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TurnstileWidget } from '../../shared/components/turnstile-widget/turnstile-widget';
import { SocialIcon } from '../../shared/components/social-icon/social-icon';
import { ContactService } from '../../core/services/contact.service';
import { SeoService } from '../../core/services/seo.service';
import { PROFILE } from '../../data/profile.data';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    TurnstileWidget,
    SocialIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html'
})
export class Contact implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly seo = inject(SeoService);

  protected readonly profile = PROFILE;
  protected readonly turnstileSiteKey = environment.turnstile.siteKey;
  protected readonly turnstileConfigured = !this.turnstileSiteKey.startsWith('YOUR_');

  protected readonly submitting = signal(false);
  protected readonly turnstileToken = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(20)]]
  });

  ngOnInit(): void {
    this.seo.update({
      title: 'Contact',
      description: 'Get in touch with Gaurav Gunjal for full-stack engineering opportunities and collaborations.',
      url: 'https://gauravgunjal.dev/contact'
    });
  }

  onTurnstileVerified(token: string): void {
    this.turnstileToken.set(token);
  }

  onTurnstileExpired(): void {
    this.turnstileToken.set(null);
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.turnstileConfigured && !this.turnstileToken()) {
      this.snackBar.open('Please complete the spam-protection check before sending.', 'Dismiss', {
        duration: 5000
      });
      return;
    }

    this.submitting.set(true);
    const value = this.form.getRawValue();

    try {
      await this.contactService.send({
        ...value,
        turnstileToken: this.turnstileToken() ?? 'not-configured'
      });
      this.snackBar.open("Message sent — I'll get back to you soon!", 'Close', { duration: 6000 });
      this.form.reset();
      this.turnstileToken.set(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong sending your message.';
      this.snackBar.open(message, 'Close', { duration: 8000 });
    } finally {
      this.submitting.set(false);
    }
  }
}
