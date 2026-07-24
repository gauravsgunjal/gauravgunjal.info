import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MediaPlaceholder } from '../../../shared/components/media-placeholder/media-placeholder';
import { ArchitectureDiagram } from '../../../models/architecture.model';

@Component({
  selector: 'app-architecture-zoom-dialog',
  standalone: true,
  imports: [MatDialogModule, MediaPlaceholder],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-3xl">
      <div class="flex items-start justify-between gap-4 p-5 pb-0">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wide text-brand-500">{{ data.category }}</p>
          <h2 class="mt-1 text-xl font-bold text-slate-900 dark:text-white">{{ data.title }}</h2>
        </div>
        <button
          type="button"
          mat-dialog-close
          class="flex h-9 w-9 flex-none items-center justify-center rounded-full text-slate-500 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10"
          aria-label="Close diagram preview"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div class="mt-4 aspect-video w-full overflow-hidden bg-black/5 dark:bg-white/5">
        <app-media-placeholder
          [src]="data.image"
          [alt]="data.title"
          label="Add architecture diagram"
          [width]="1200"
          [height]="675"
          [priority]="true"
        />
      </div>

      <div class="p-5">
        <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ data.description }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          @for (service of data.services; track service) {
            <span class="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-600 dark:text-brand-300">
              {{ service }}
            </span>
          }
        </div>
      </div>
    </div>
  `
})
export class ArchitectureZoomDialog {
  constructor(@Inject(MAT_DIALOG_DATA) protected readonly data: ArchitectureDiagram) {}
}
