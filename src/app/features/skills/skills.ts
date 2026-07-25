import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CategoryIcon } from '../../shared/components/category-icon/category-icon';
import { SeoService } from '../../core/services/seo.service';
import { SKILL_GROUPS } from '../../data/skills.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CategoryIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.html'
})
export class Skills implements OnInit {
  private readonly seo = inject(SeoService);
  protected readonly skillGroups = SKILL_GROUPS;

  ngOnInit(): void {
    this.seo.update({
      title: 'Skills',
      description:
        "Gaurav Gunjal's technical skill set across Backend, Frontend, Cloud, Database, DevOps, and AI.",
      url: 'https://gauravgunjal.info/skills'
    });
  }
}
