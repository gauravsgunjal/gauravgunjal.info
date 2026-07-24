import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Typewriter } from '../../shared/components/typewriter/typewriter';
import { AnimatedCounter } from '../../shared/components/animated-counter/animated-counter';
import { SocialIcon } from '../../shared/components/social-icon/social-icon';
import { SeoService } from '../../core/services/seo.service';
import { PROFILE } from '../../data/profile.data';
import { PROJECTS } from '../../data/projects.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, Typewriter, AnimatedCounter, SocialIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly profile = PROFILE;
  protected readonly featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);

  ngOnInit(): void {
    this.seo.update({
      title: 'Gaurav Gunjal | Senior Full Stack Engineer',
      description: PROFILE.summary,
      url: 'https://gauravgunjal.dev/'
    });
  }
}
