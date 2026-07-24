import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MediaPlaceholder } from '../../shared/components/media-placeholder/media-placeholder';
import { SeoService } from '../../core/services/seo.service';
import { ARCHITECTURE_DIAGRAMS } from '../../data/architecture.data';
import { ArchitectureDiagram } from '../../models/architecture.model';
import { ArchitectureZoomDialog } from './architecture-zoom-dialog/architecture-zoom-dialog';

@Component({
  selector: 'app-aws-architecture',
  standalone: true,
  imports: [MatDialogModule, MediaPlaceholder],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './aws-architecture.html'
})
export class AwsArchitecture implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly dialog = inject(MatDialog);

  protected readonly allDiagrams = ARCHITECTURE_DIAGRAMS;
  protected readonly activeCategory = signal<string>('All');

  protected readonly categories = computed(() => [
    'All',
    ...Array.from(new Set(this.allDiagrams.map((d) => d.category)))
  ]);

  protected readonly filteredDiagrams = computed<ArchitectureDiagram[]>(() => {
    const category = this.activeCategory();
    return category === 'All' ? this.allDiagrams : this.allDiagrams.filter((d) => d.category === category);
  });

  ngOnInit(): void {
    this.seo.update({
      title: 'AWS Architecture Gallery',
      description: "A gallery of AWS solution architecture diagrams from Gaurav Gunjal's cloud projects.",
      url: 'https://gauravgunjal.dev/aws-architecture'
    });
  }

  setCategory(category: string): void {
    this.activeCategory.set(category);
  }

  open(diagram: ArchitectureDiagram): void {
    this.dialog.open(ArchitectureZoomDialog, {
      data: diagram,
      maxWidth: '95vw',
      panelClass: 'rounded-2xl'
    });
  }
}
