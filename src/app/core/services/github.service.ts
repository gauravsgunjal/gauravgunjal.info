import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GithubEvent, GithubRepo, GithubUser, LanguageStat } from '../../models/github.model';

const API_BASE = 'https://api.github.com';

/**
 * Thin wrapper over the public, unauthenticated GitHub REST API. No token is
 * required, which keeps this safe to call directly from the browser — the
 * trade-off is a 60 requests/hour rate limit per client IP. If the gallery
 * starts showing "unavailable" often, consider proxying through a small
 * serverless function that attaches a personal access token server-side.
 */
@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly http = inject(HttpClient);
  private readonly username = environment.githubUsername;

  getUser() {
    return this.http.get<GithubUser>(`${API_BASE}/users/${this.username}`).pipe(
      catchError(() => of(null))
    );
  }

  getRepos() {
    return this.http
      .get<GithubRepo[]>(`${API_BASE}/users/${this.username}/repos`, {
        params: { per_page: '100', sort: 'updated' }
      })
      .pipe(
        map((repos) => repos.filter((r) => !r.fork)),
        catchError(() => of([] as GithubRepo[]))
      );
  }

  getRecentEvents() {
    return this.http
      .get<GithubEvent[]>(`${API_BASE}/users/${this.username}/events/public`, {
        params: { per_page: '10' }
      })
      .pipe(catchError(() => of([] as GithubEvent[])));
  }

  computeLanguageStats(repos: GithubRepo[]): LanguageStat[] {
    const counts = new Map<string, number>();
    for (const repo of repos) {
      if (!repo.language) continue;
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
    const total = Array.from(counts.values()).reduce((sum, n) => sum + n, 0) || 1;
    return Array.from(counts.entries())
      .map(([language, count]) => ({ language, count, percentage: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count);
  }

  /** Top repos by star count — GitHub's "pinned repos" require GraphQL + auth, so this is the closest unauthenticated proxy. */
  getTopRepos(repos: GithubRepo[], take = 6): GithubRepo[] {
    return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, take);
  }

  contributionGraphUrl(): string {
    return `https://ghchart.rshah.org/3763f7/${this.username}`;
  }

  streakStatsUrl(theme: 'light' | 'dark'): string {
    const params = new URLSearchParams({
      user: this.username,
      theme: theme === 'dark' ? 'dark' : 'default',
      hide_border: 'true',
      background: 'transparent'
    });
    return `https://streak-stats.demolab.com?${params.toString()}`;
  }
}
