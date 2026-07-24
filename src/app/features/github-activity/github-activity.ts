import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ThemeService } from '../../core/services/theme.service';
import { GithubService } from '../../core/services/github.service';
import { SeoService } from '../../core/services/seo.service';
import { GithubEvent, GithubRepo, GithubUser, LanguageStat } from '../../models/github.model';

const EVENT_LABELS: Record<string, string> = {
  PushEvent: 'Pushed commits to',
  CreateEvent: 'Created',
  PullRequestEvent: 'Opened a pull request in',
  IssuesEvent: 'Opened an issue in',
  WatchEvent: 'Starred',
  ForkEvent: 'Forked',
  PublicEvent: 'Made public'
};

@Component({
  selector: 'app-github-activity',
  standalone: true,
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './github-activity.html'
})
export class GithubActivity implements OnInit {
  private readonly github = inject(GithubService);
  private readonly seo = inject(SeoService);
  protected readonly theme = inject(ThemeService);

  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  protected readonly user = signal<GithubUser | null>(null);
  protected readonly repos = signal<GithubRepo[]>([]);
  protected readonly events = signal<GithubEvent[]>([]);

  protected readonly topRepos = computed(() => this.github.getTopRepos(this.repos()));
  protected readonly languageStats = computed<LanguageStat[]>(() =>
    this.github.computeLanguageStats(this.repos())
  );
  protected readonly contributionGraphUrl = this.github.contributionGraphUrl();

  ngOnInit(): void {
    this.seo.update({
      title: 'GitHub Activity',
      description: "Live GitHub profile, repositories, and contribution activity for Gaurav Gunjal.",
      url: 'https://gauravgunjal.dev/github-activity'
    });

    forkJoin({
      user: this.github.getUser(),
      repos: this.github.getRepos(),
      events: this.github.getRecentEvents()
    }).subscribe(({ user, repos, events }) => {
      this.loading.set(false);
      if (!user) {
        this.error.set(true);
        return;
      }
      this.user.set(user);
      this.repos.set(repos);
      this.events.set(events);
    });
  }

  eventLabel(event: GithubEvent): string {
    return EVENT_LABELS[event.type] ?? event.type;
  }
}
