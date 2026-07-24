import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { CategoryIcon } from './category-icon';

describe('CategoryIcon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CategoryIcon] });
  });

  it('renders an <svg> root element', () => {
    const fixture = TestBed.createComponent(CategoryIcon);
    fixture.componentRef.setInput('icon', 'cloud');
    fixture.detectChanges();

    const svg = (fixture.nativeElement as HTMLElement).querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('renders distinct markup for each supported category', () => {
    const icons = ['server', 'layout', 'cloud', 'database', 'devops', 'ai'];
    const renderedMarkup = new Set<string>();

    for (const icon of icons) {
      const fixture = TestBed.createComponent(CategoryIcon);
      fixture.componentRef.setInput('icon', icon);
      fixture.detectChanges();
      renderedMarkup.add((fixture.nativeElement as HTMLElement).innerHTML);
    }

    // Every category should produce visibly different icon markup.
    expect(renderedMarkup.size).toBe(icons.length);
  });

  it('renders nothing extra for an unrecognized icon key', () => {
    const fixture = TestBed.createComponent(CategoryIcon);
    fixture.componentRef.setInput('icon', 'not-a-real-icon');
    fixture.detectChanges();

    const svg = (fixture.nativeElement as HTMLElement).querySelector('svg');
    expect(svg?.children.length).toBe(0);
  });
});
