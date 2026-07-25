import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimatedCounter } from '../../shared/components/animated-counter/animated-counter';
import { SeoService } from '../../core/services/seo.service';
import { PROFILE } from '../../data/profile.data';
import { calculateExperience } from '@app/core/utils/career.util';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, AnimatedCounter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html'
})
export class About implements OnInit {
  private readonly seo = inject(SeoService);
  protected readonly profile = PROFILE;
  protected readonly experience = calculateExperience();

  ngOnInit(): void {
    this.seo.update({
      title: 'About Me',
      description:
        "Gaurav Gunjal's career journey from full-stack PHP development to enterprise Java, Angular, and AWS.",
      url: 'https://gauravgunjal.info/about'
    });
  }

}
