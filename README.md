# Gaurav Gunjal — Portfolio

A production-grade personal portfolio built with **Angular 22** (standalone components, Signals, lazy-loaded
routes), **Tailwind CSS 3**, and **Angular Material**. It showcases Gaurav Gunjal's work as a Senior Full
Stack Engineer (Java, Spring Boot, Angular, PHP, AWS) across eleven sections: Home, About, Skills,
Experience, Projects, AWS Architecture Gallery, Blog, Certifications, GitHub Activity, Resume, and Contact.

> **Version note:** this project targets the Angular versions that were actually resolvable on the npm
> registry at setup time — `@angular/core@22.0.8` with `@angular/cdk`/`@angular/material@22.0.6` — not an
> arbitrarily chosen "20". `package.json` pins every `@angular/*` package to an identical exact version
> (Angular's own packages require exact peer matches with each other) and adds an `overrides` block so npm
> can't silently resolve a mismatched patch anywhere in the tree. If you deliberately want an older major,
> see [Pinned Versions & Why](#pinned-versions--why) before changing anything.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Folder Structure](#folder-structure)
3. [Prerequisites](#prerequisites)
4. [Installation & Local Development](#installation--local-development)
5. [Configuration](#configuration)
6. [Replacing Placeholder Content](#replacing-placeholder-content)
7. [Editing Site Content](#editing-site-content)
8. [Contact Form Setup (EmailJS + Turnstile)](#contact-form-setup-emailjs--turnstile)
9. [GitHub Activity Integration](#github-activity-integration)
10. [Testing (Vitest)](#testing-vitest)
11. [Pinned Versions & Why](#pinned-versions--why)
12. [Deployment](#deployment)
13. [Performance, SEO & Accessibility](#performance-seo--accessibility)
14. [Security Notes](#security-notes)
15. [Maintenance](#maintenance)
16. [License](#license)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Angular 22.0.8 (standalone components, no NgModules) |
| Styling | Tailwind CSS 3.4 + Angular Material 22.0.6 (M3 theming) |
| State | Angular Signals |
| Routing | Lazy-loaded routes via `loadComponent`, view transitions enabled |
| Markdown | `marked` + `marked-highlight` + `highlight.js` for the blog engine |
| Forms | Angular Reactive Forms |
| Email | EmailJS (`@emailjs/browser`) — no backend required |
| Spam protection | Cloudflare Turnstile |
| Testing | Vitest + `@analogjs/vite-plugin-angular` + `@analogjs/vitest-angular` (Angular `TestBed` on Vitest, no Karma/Jasmine) |
| Live data | GitHub REST API (unauthenticated, client-side) |

## Folder Structure

```
src/
├── app/
│   ├── core/               # Singleton services, utilities (theme, SEO, GitHub API, markdown, career math)
│   │   ├── services/
│   │   └── utils/
│   ├── shared/              # Reusable, presentation-only components (navbar, footer, icons, cards, widgets)
│   │   └── components/
│   ├── models/               # TypeScript interfaces for every content type
│   ├── data/                  # Hand-editable content — THIS IS WHERE YOU CUSTOMIZE THE SITE
│   ├── features/               # One folder per route/section (lazy-loaded standalone components)
│   │   ├── home/ about/ skills/ experience/ projects/ aws-architecture/
│   │   ├── blogs/blog-list/ blogs/blog-detail/
│   │   └── certifications/ github-activity/ resume/ contact/
│   ├── app.ts / app.config.ts / app.routes.ts
├── assets/
│   ├── images/{profile,projects,architecture,certifications}/
│   ├── resume/
│   └── blogs/                 # Markdown source files for blog posts
├── environments/              # EmailJS / Turnstile / GitHub username config
└── styles.scss, styles/material-theme.scss
```

Every content section — profile info, skills, experience, projects, AWS diagrams, blog posts,
certifications — is driven by a single typed data file in `src/app/data/`. **You should rarely need to
touch component code to update content.**

## Prerequisites

- Node.js `^22.22.3 || ^24.15.0 || >=26.0.0` (matches `@angular/core@22.0.8`'s `engines` field — see
  `package.json`)
- npm 10+
- A global Angular CLI is **not required** — `npm run` scripts and `npx ng` both use the pinned local
  `@angular/cli@22.0.8` in `node_modules/.bin`, which is what actually matters. A different global `ng`
  version (e.g. from an earlier project) won't cause problems.

## Installation & Local Development

```bash
npm install
npm start             # ng serve, http://localhost:4200
npm run build          # production build -> dist/portfolio/browser
npm run build:dev       # development build, unminified
npm test                  # Vitest — single run (see "Testing" section)
npm run test:watch         # Vitest — watch mode
npm run test:coverage       # Vitest — single run with coverage report
npm run format                # Prettier
```

> Linting isn't wired up out of the box. Add it with `ng add @angular-eslint/schematics` if you want
> `ng lint` — the codebase already follows its default rules (standalone components, `OnPush`, no `any`).

> This project was scaffolded by hand (not `ng new`) and its dependency versions were verified directly
> against the npm registry rather than assumed — see [Pinned Versions & Why](#pinned-versions--why) for
> the reasoning behind each pin if `npm install` ever produces a conflict after you change a version.

## Configuration

All runtime configuration lives in `src/environments/environment.ts` (dev) and
`src/environments/environment.prod.ts` (production build). Never commit real secrets — EmailJS's public
key and Turnstile's site key are both meant to be public (they're enforced server-side by EmailJS/
Cloudflare), but keep them out of source control anyway if you fork this for a different identity.

```ts
export const environment = {
  production: false,
  siteUrl: 'http://localhost:4200',
  githubUsername: 'gauravsgunjal',
  emailjs: {
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'
  },
  turnstile: {
    siteKey: 'YOUR_CLOUDFLARE_TURNSTILE_SITE_KEY'
  }
};
```

For CI/CD, prefer injecting these via a build-time template step or a secrets-aware CI variable rather
than hardcoding — see `.github/workflows/deploy.yml` for where that would slot in.

## Replacing Placeholder Content

Every placeholder in this project is **self-describing** — either a `TODO` comment in the data file, or a
`MediaPlaceholder` component that renders a branded gradient card until a real image exists at the
expected path (no broken-image icons, ever).

| What | Replace at | Notes |
|---|---|---|
| Profile photo | `src/assets/images/profile/` — add `profile.jpg`, then update `profileImage` in `profile.data.ts` | SVG placeholder ships by default |
| Resume PDF | `src/assets/resume/gaurav-gunjal-resume.pdf` | Resume page auto-detects the file and embeds it; shows a clean "not uploaded" state until then |
| Project screenshots | `src/assets/images/projects/<name>.jpg`, path set per project in `projects.data.ts` | |
| AWS architecture diagrams | `src/assets/images/architecture/`, referenced in `architecture.data.ts` | |
| Certification badges | `src/assets/images/certifications/`, add entries to `certifications.data.ts` (currently empty) | |
| Blog cover images / new posts | `src/assets/blogs/*.md` + entry in `blogs.data.ts` | |

## Editing Site Content

| Section | Data file |
|---|---|
| Profile, hero, About, stats | `src/app/data/profile.data.ts` |
| Skills | `src/app/data/skills.data.ts` |
| Experience | `src/app/data/experience.data.ts` |
| Projects | `src/app/data/projects.data.ts` |
| AWS Architecture Gallery | `src/app/data/architecture.data.ts` |
| Blog posts | `src/app/data/blogs.data.ts` + markdown files in `src/assets/blogs/` |
| Certifications | `src/app/data/certifications.data.ts` |

### Career length

Total years of experience is **computed**, not hardcoded — `src/app/core/utils/career.util.ts` defines
`CAREER_START_DATE` (01 March 2017) and derives "X+ years" everywhere it's shown (Home stats, About,
Experience, SEO descriptions). If the career start date is ever wrong, fix it in exactly one place.

### Adding a new blog post

1. Add a markdown file to `src/assets/blogs/your-post.md`.
2. Add a matching entry to `BLOG_POSTS` in `blogs.data.ts` (slug, title, excerpt, tags, date, reading time,
   `contentPath`).
3. The list, search, tag filter, and detail page all pick it up automatically — no component changes.

### Theme colors

Brand colors live in `tailwind.config.js` (`theme.extend.colors.brand` / `.accent`) and are mirrored in
`src/styles/_material-theme.scss` for Angular Material components (buttons, form fields, dialogs, chips).
Update both if you change the palette.

## Contact Form Setup (EmailJS + Turnstile)

**EmailJS** (sends the contact form directly to your inbox, no backend):
1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Add an email service (e.g. Gmail) and create a template with variables: `from_name`, `from_email`,
   `phone`, `subject`, `message`.
3. Copy your Service ID, Template ID, and Public Key into `environment.ts` / `environment.prod.ts`.

**Cloudflare Turnstile** (spam protection):
1. Create a Turnstile widget at the [Cloudflare dashboard](https://dash.cloudflare.com/) → Turnstile.
2. Copy the site key into `environment.turnstile.siteKey`.
3. **Important:** Turnstile's client-side widget only proves a human solved a challenge in the browser. A
   static site has no backend to verify the resulting token against Cloudflare's `/siteverify` API. For
   real protection (not just a UX deterrent), add a small serverless function — a Cloudflare Worker, AWS
   Lambda behind API Gateway, or a Netlify/Vercel function — that verifies the token server-side *before*
   your EmailJS call is allowed to fire, or before you decide to trust/store the submission. Until that
   piece exists, treat Turnstile here as a bot-friction layer, not a hard guarantee.

If you don't configure Turnstile, the form still works — it just skips the spam-protection widget and
shows a `TODO` notice.

## GitHub Activity Integration

The GitHub Activity page calls the public, unauthenticated GitHub REST API
(`api.github.com/users/<username>`, `/repos`, `/events/public`) directly from the browser. No token is
needed, but unauthenticated requests are rate-limited to **60 requests/hour per IP**. If you expect heavy
traffic, put a small caching proxy (Cloudflare Worker, Lambda + API Gateway) in front of these calls and
point `GithubService` at it instead.

The contribution calendar and streak stats use public image-embed services (`ghchart.rshah.org`,
`streak-stats.demolab.com`) since GitHub's contribution graph isn't exposed via the public REST API —
only GraphQL with authentication. Swap these for a server-rendered GraphQL version if you add a backend
later.

## Testing (Vitest)

Unit tests run on **Vitest**, not Karma/Jasmine. Angular's `TestBed` works exactly as it always has —
`@analogjs/vite-plugin-angular` compiles components/templates through the real Angular compiler inside
Vite, and `@analogjs/vitest-angular` wires up zone.js + the Angular testing environment for Vitest. There
is no browser launcher, no `karma.conf.js`, and no Jasmine runner anywhere in this project.

### Running tests

```bash
npm test               # single run — what CI uses
npm run test:watch      # watch mode for local development
npm run test:coverage    # single run + coverage report (text summary + HTML in coverage/portfolio)
npm run test:ui            # optional Vitest UI in the browser
```

`ng test` also works and proxies to the same Vitest config via the `@analogjs/vitest-angular:test`
builder configured in `angular.json`.

### How it's wired up

| File | Purpose |
|---|---|
| `vitest.config.ts` | Vitest + Vite config: the Angular plugin, `jsdom` test environment, spec file glob (`src/**/*.spec.ts`), coverage provider (`v8`) and thresholds |
| `src/test-setup.ts` | Runs once before the suite — patches zone.js for jsdom and calls `TestBed.initTestEnvironment(...)`, replacing the old `polyfills`/`test.ts` bootstrap Karma used |
| `tsconfig.spec.json` | Type-checks spec files, includes `vitest/globals` so `describe`/`it`/`expect` are available without per-file imports (the example specs still import them explicitly for clarity) |

### Writing tests

Three example specs ship with the project, one per testing concern:

- **Service** — `src/app/core/services/theme.service.spec.ts`: injects `ThemeService` via `TestBed`,
  exercises `toggle()`/`set()`, and asserts both the Signal state and the `localStorage` side effect.
  Note the use of `TestBed.flushEffects()` after mutating state — Angular Signal `effect()`s run
  asynchronously, so tests that assert on an effect's side effects must flush them first.
- **Component** — `src/app/shared/components/category-icon/category-icon.spec.ts`: creates a standalone
  component with `TestBed.createComponent`, sets an `@Input` via `fixture.componentRef.setInput(...)`
  (required for signal-based/modern inputs — assigning `.icon = 'x'` directly won't trigger change
  detection the same way), and asserts on rendered DOM.
- **Pipe** — `src/app/shared/pipes/truncate.pipe.spec.ts`: pure unit test, no `TestBed` needed at all —
  pipes with no injected dependencies can just be `new`'d directly, which is the fastest kind of test to
  write and run.
- **Pure utility** — `src/app/core/utils/career.util.spec.ts`: same idea as the pipe test, verifying the
  career-length math without any Angular machinery.
- **Root component (integration-ish)** — `src/app/app.spec.ts`: bootstraps `App` with `provideRouter([])`
  and asserts the shell renders its children.

General conventions used throughout:
- Co-locate `*.spec.ts` next to the file under test.
- Explicitly `import { describe, it, expect, beforeEach, vi } from 'vitest'` in new specs even though
  globals are enabled — it keeps specs portable if `globals: true` is ever turned off, and makes IDE
  auto-import unambiguous.
- Prefer `TestBed` only when a spec actually needs Angular's DI/change-detection; plain `new ClassName()`
  is faster and simpler for pipes and framework-agnostic services/utilities.
- Use `vi.fn()` / `vi.spyOn()` (Vitest's Jest-compatible mocking API) instead of Jasmine spies for any new
  service mocks.

### Coverage

`npm run test:coverage` uses the V8 coverage provider and writes `text`, `text-summary`, `html`, and
`lcov` reports to `coverage/portfolio/`. Thresholds in `vitest.config.ts` start deliberately low (15%
lines/statements/branches/functions) since the project ships with a handful of example specs, not full
coverage — raise them as you add tests. CI should fail if coverage drops below the configured thresholds,
since `vitest run --coverage` exits non-zero on a threshold miss.

### CI

Both `npm test` and `npm run test:coverage` run headlessly (jsdom, no real browser) and exit with a
non-zero status on failure, so either drops directly into a CI job:

```yaml
- run: npm ci
- run: npm run test:coverage
```

See `.github/workflows/deploy.yml` for the existing build job this can sit alongside.

## Pinned Versions & Why

`npm install` failed twice while this project was being set up — first with an `ERESOLVE` peer conflict,
then with an `ETARGET` (version doesn't exist) error — both because Angular's own packages require **exact**
version matches with each other, and guessed/approximate version numbers don't reliably satisfy that. The
fix was to stop guessing and pin every interdependent package to a version confirmed live against the npm
registry at setup time. If you ever touch these versions, know the rules that make them work together:

- **All `@angular/*` framework packages** (`core`, `common`, `compiler`, `compiler-cli`, `forms`,
  `platform-browser`, `platform-browser-dynamic`, `router`, `animations`) ship from the same monorepo and
  are released **atomically at an identical version number** — `22.0.8` here. They must always match
  exactly; a caret range on each independently is what caused the original `ERESOLVE` (npm resolved
  different packages to different patches). The `overrides` block in `package.json` is a safety net that
  forces this even if some transitive dependency asks for a different range.
- **`@angular/cdk` and `@angular/material`** are a separate monorepo (`angular/components`) with their own
  synchronized version number — `22.0.6` here — which does **not** always equal the core framework's
  version number. Material's `peerDependencies` pin `@angular/cdk` to its own exact version too, so these
  two must always match each other, and both must satisfy core's version via their `^22.0.0 || ^23.0.0`
  peer range.
- **`@angular/cli` and `@angular-devkit/build-angular`** come from yet another repo (`angular/angular-cli`)
  with its own version counter that happens to also read `22.0.8` right now, but isn't guaranteed to track
  core's number in future releases — check `@angular/cli`'s own `ng-update.packageGroup` field (in its
  npm metadata) to find its actual matching `build-angular` version if you upgrade.
- **TypeScript is pinned to `~6.0.3`, not "latest".** `@angular/compiler-cli@22.0.8` declares a peer of
  `typescript: ">=6.0 <6.1"` — TypeScript's own `latest` npm tag was already ahead of that range (7.x) at
  setup time. Installing "whatever's newest" for TypeScript will break the Angular compiler; always match
  the range `@angular/compiler-cli` declares.
- **Tailwind CSS is deliberately held at `^3.4.17`, not the `latest` tag (which is v4).** Tailwind v4 uses
  a CSS-first config (`@import "tailwindcss"` + `@theme` blocks) instead of `tailwind.config.js` +
  `postcss.config.js` with the `autoprefixer` plugin — a breaking rewrite of every file that currently
  assumes v3's model. This project's `tailwind.config.js`, `postcss.config.js`, and `@apply` usage in
  `styles.scss` are all v3-style on purpose. Migrating to v4 is a valid future improvement, but it's a
  deliberate decision to make with a working build in hand, not something to pull in accidentally via a
  caret range.
- **`vitest`, `@vitest/coverage-v8`, and `@vitest/ui` must all be the exact same version** (`4.1.10`) —
  Vitest's own `peerDependencies` pin its companion packages to an exact match, the same pattern as Angular.

When upgrading any of these later, check the target package's `peerDependencies` (via
`npm view <package>@<version> peerDependencies`) before bumping — don't rely on caret ranges alone for
anything in this list.

## Deployment

Production build output goes to `dist/portfolio/browser`. Config files are included for four targets:

### Vercel
```bash
npm i -g vercel
vercel --prod
```
Uses `vercel.json` (build command, SPA rewrites, cache headers) — no extra setup needed.

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```
Uses `netlify.toml` (build command, publish dir, SPA redirect, cache headers).

### Firebase Hosting
```bash
npm i -g firebase-tools
firebase login
# Replace the project ID in .firebaserc first
firebase deploy --only hosting
```

### AWS S3 + CloudFront
1. Create an S3 bucket and a CloudFront distribution pointed at it (with an Origin Access
   Control/Identity, not public bucket access).
2. Run:
   ```bash
   S3_BUCKET=your-bucket CLOUDFRONT_DISTRIBUTION_ID=your-dist-id ./scripts/deploy-aws.sh
   ```
   This builds the app, syncs hashed assets with a 1-year cache, uploads `index.html` with no-cache, and
   invalidates the CloudFront cache.
3. Configure CloudFront's error pages to return `index.html` with a `200` for `403`/`404` so client-side
   routing works on refresh/deep links.

### CI/CD
`.github/workflows/deploy.yml` builds on every push to `main` and uploads a build artifact. The four
deploy jobs are commented out — uncomment the one matching your host and add the corresponding secrets in
your GitHub repository settings.

## Performance, SEO & Accessibility

- **SEO**: per-route `<title>`/meta description via `SeoService`, Open Graph + Twitter Card tags,
  JSON-LD `Person` structured data, `robots.txt`, `sitemap.xml`.
- **Performance**: lazy-loaded routes per section, `NgOptimizedImage` for below-the-fold images via
  `MediaPlaceholder`, explicit `width`/`height` everywhere to avoid layout shift, `fetchpriority="high"`
  on the hero image (LCP), Angular's build budgets enforced in `angular.json`.
- **Accessibility (WCAG)**: skip-to-content link, visible focus rings, `aria-current="page"` on active
  nav links, `aria-label`s on icon-only controls, `prefers-reduced-motion` respected globally, semantic
  heading hierarchy (one `<h1>` per route), form errors announced via `mat-error`.
- Run `npx lighthouse http://localhost:4200 --view` after `ng build` + a static file server (e.g.
  `npx http-server dist/portfolio/browser`) to verify scores locally before deploying.

## Security Notes

- A `Content-Security-Policy` meta tag ships in `index.html`, scoped to the exact third-party domains this
  app calls (GitHub API/avatars, EmailJS, Cloudflare Turnstile, Google Fonts, contribution-graph image
  services). If you add a new integration, extend the CSP rather than loosening it broadly.
- No secrets belong in this repo. EmailJS's public key and Turnstile's site key are designed to be public;
  anything else (AWS credentials, GitHub tokens for a future proxy) must go in CI secrets or a server-side
  environment, never in `environment.ts`.
- The Turnstile client widget alone does not stop determined spam — see
  [Contact Form Setup](#contact-form-setup-emailjs--turnstile) for what server-side verification would add.

## Maintenance

- Add new sections by creating a folder under `src/app/features/`, a route in `app.routes.ts`
  (`loadComponent`), and a nav entry in `navbar.ts`.
- Keep content changes in `src/app/data/*.ts` — components read from these files and shouldn't need edits
  for routine updates (new project, new blog post, new certification, updated bio).
- Run `npm run build` before every deploy — Angular's strict template checking (`strictTemplates: true`)
  catches most content/type errors at compile time.

## License

MIT — this is Gaurav Gunjal's personal portfolio; feel free to use the architecture as a reference for
your own, but please swap out all personal content before publishing a fork.
