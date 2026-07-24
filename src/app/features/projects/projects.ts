import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { MediaPlaceholder } from '../../shared/components/media-placeholder/media-placeholder';
import { SocialIcon } from '../../shared/components/social-icon/social-icon';
import { SeoService } from '../../core/services/seo.service';
import { PROJECTS } from '../../data/projects.data';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MediaPlaceholder, SocialIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html'
})
export class Projects implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly allProjects = PROJECTS;
  protected readonly activeFilter = signal<string>('All');

  protected readonly categories = computed(() => [
    'All',
    ...Array.from(new Set(this.allProjects.map((p) => p.category)))
  ]);

  protected readonly filteredProjects = computed<Project[]>(() => {
    const filter = this.activeFilter();
    return filter === 'All' ? this.allProjects : this.allProjects.filter((p) => p.category === filter);
  });

  ngOnInit(): void {
    this.seo.update({
      title: 'Featured Projects',
      description:
        'Enterprise applications, SCADA monitoring platforms, and open-source work by Gaurav Gunjal, spanning Java, PHP, and Angular.',
      url: 'https://gauravgunjal.dev/projects'
    });
  }

  setFilter(category: string): void {
    this.activeFilter.set(category);
  }
}
