import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MediaPlaceholder } from '../../shared/components/media-placeholder/media-placeholder';
import { SeoService } from '../../core/services/seo.service';
import { CERTIFICATIONS } from '../../data/certifications.data';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [DatePipe, MediaPlaceholder],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './certifications.html'
})
export class Certifications implements OnInit {
  private readonly seo = inject(SeoService);
  protected readonly certifications = CERTIFICATIONS;

  ngOnInit(): void {
    this.seo.update({
      title: 'Certifications',
      description: "Professional certifications earned by Gaurav Gunjal.",
      url: 'https://gauravgunjal.info/certifications'
    });
  }
}
