import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { SeoService } from '../../core/services/seo.service';
import { calculateExperience } from '../../core/utils/career.util';
import { EXPERIENCE } from '../../data/experience.data';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [MatExpansionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class Experience implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly experience = EXPERIENCE;
  protected readonly totalExperience = calculateExperience();

  ngOnInit(): void {
    this.seo.update({
      title: 'Professional Experience',
      description: `${this.totalExperience.label} of professional experience across TCS, BECIS, and Invictus (ITWizz), building enterprise Java, Angular, and PHP applications.`,
      url: 'https://gauravgunjal.info/experience'
    });
  }
}
