import { describe, it, expect } from 'vitest';
import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('returns the original string when shorter than the max length', () => {
    expect(pipe.transform('short text', 20)).toBe('short text');
  });

  it('truncates on a word boundary and appends an ellipsis', () => {
    const input = 'The quick brown fox jumps over the lazy dog';
    const result = pipe.transform(input, 15);

    expect(result.endsWith('…')).toBe(true);
    expect(result.length).toBeLessThanOrEqual(16);
    expect(result).not.toContain('jumps');
  });

  it('returns an empty string for null or undefined input', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('supports a custom ellipsis character', () => {
    const result = pipe.transform('abcdefghij klmno', 10, '...');
    expect(result.endsWith('...')).toBe(true);
  });
});
