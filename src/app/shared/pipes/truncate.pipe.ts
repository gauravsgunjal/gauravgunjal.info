import { Pipe, PipeTransform } from '@angular/core';

/**
 * Truncates text to a maximum length on a word boundary, appending an
 * ellipsis when content was cut. Used for excerpts (blog cards, project
 * descriptions) where source content length isn't guaranteed.
 *
 * Usage: `{{ post.excerpt | truncate:120 }}`
 */
@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, maxLength = 140, ellipsis = '…'): string {
    if (!value) return '';
    if (value.length <= maxLength) return value;

    const truncated = value.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    const safeCut = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;

    return `${safeCut.trimEnd()}${ellipsis}`;
  }
}
