// ─── Fixed Suggestion List ───────────────────────────────────────────────────
// Stable, curated questions for demo reliability.
// No randomization. No dynamic generation.

export type SuggestionCategory = 'about' | 'project' | 'career' | 'general';

const FIXED_SUGGESTIONS = [
  "Introduce yourself",
  "Give your background",
  "Describe your college activities",
  "Describe the skills you have used",
  "Describe your projects",
  "Do you have work experience",
];

/**
 * Always returns the same fixed suggestions.
 * Category and exclude parameters are kept for interface compatibility but unused.
 */
export function getSuggestions(
  _category?: SuggestionCategory,
  _exclude?: string[],
): string[] {
  return FIXED_SUGGESTIONS.slice(0, 3);
}

/**
 * Kept for interface compatibility with route.ts.
 */
export function inferCategory(
  _userMessage: string,
  _assistantAnswer: string,
): SuggestionCategory {
  return 'general';
}