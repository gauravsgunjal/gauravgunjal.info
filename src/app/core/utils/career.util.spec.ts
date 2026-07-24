import { describe, it, expect } from 'vitest';
import { CAREER_START_DATE, calculateExperience } from './career.util';

describe('calculateExperience', () => {
  it('returns 0 years on the exact start date', () => {
    const result = calculateExperience(CAREER_START_DATE);
    expect(result.years).toBe(0);
    expect(result.label).toBe('0+ years');
  });

  it('returns 9 whole years shortly after the 9-year anniversary', () => {
    const nineYearsLater = new Date(2026, 3, 15); // 15 Apr 2026
    const result = calculateExperience(nineYearsLater);
    expect(result.years).toBe(9);
    expect(result.label).toBe('9+ years');
  });

  it('does not round up before the anniversary date has passed', () => {
    const justBeforeAnniversary = new Date(2026, 1, 20); // 20 Feb 2026, before 01 Mar
    const result = calculateExperience(justBeforeAnniversary);
    expect(result.years).toBe(8);
  });
});
