/**
 * Single source of truth for career length calculations. Gaurav's professional
 * career began 01 March 2017 — every "years of experience" figure on the site
 * should derive from this constant rather than being hand-typed in multiple
 * places, so the numbers never drift out of sync as time passes.
 */
export const CAREER_START_DATE = new Date(2017, 2, 1); // Month is 0-indexed: 2 = March

export interface ExperienceDuration {
  years: number;
  months: number;
  /** Whole years, rounded down — the number to show as "X+ years". */
  wholeYears: number;
  /** Human-readable label, e.g. "9+ years". */
  label: string;
}

export function calculateExperience(asOf: Date = new Date()): ExperienceDuration {
  let years = asOf.getFullYear() - CAREER_START_DATE.getFullYear();
  let months = asOf.getMonth() - CAREER_START_DATE.getMonth();

  if (asOf.getDate() < CAREER_START_DATE.getDate()) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years,
    months,
    wholeYears: years,
    label: `${years}+ years`
  };
}

/** Formats a "Mon YYYY" style date range, e.g. "Mar 2017 – Present". */
export function formatDateRange(start: string, end: string): string {
  return `${start} – ${end}`;
}
