import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { SeoService } from '../../core/services/seo.service';
import { PROFILE } from '../../data/profile.data';

@Component({
  selector: 'app-resume',
  standalone: true,
  templateUrl: './resume.html'
})
export class Resume implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly seo = inject(SeoService);

  protected readonly profile = PROFILE;
  protected readonly checking = signal(true);
  protected readonly available = signal(false);

  ngOnInit(): void {
    this.seo.update({
      title: 'Resume',
      description: "Download Gaurav Gunjal's resume — Senior Full Stack Engineer.",
      url: 'https://gauravgunjal.info/resume'
    });

    // HEAD request just checks whether the PDF exists at build time, so we can
    // show a clean placeholder instead of an embedded 404 page.
    this.http
      .head(this.profile.resumeUrl, { observe: 'response' })
      .pipe(
        map((res) => res.ok),
        catchError(() => of(false))
      )
      .subscribe((ok) => {
        this.available.set(ok);
        this.checking.set(false);
      });
  }
}
