import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('defaults to light mode when nothing is stored and the system has no preference', () => {
    expect(service.mode()).toBe('light');
  });

  it('toggle() flips the mode signal', () => {
    const initial = service.mode();
    service.toggle();
    expect(service.mode()).not.toBe(initial);
    service.toggle();
    expect(service.mode()).toBe(initial);
  });

  it('set() applies the requested mode and updates the <html> class', () => {
    service.set('dark');
    TestBed.flushEffects();
    expect(service.mode()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    service.set('light');
    TestBed.flushEffects();
    expect(service.mode()).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists the chosen mode to localStorage', () => {
    service.set('dark');
    TestBed.flushEffects();
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
  });
});
