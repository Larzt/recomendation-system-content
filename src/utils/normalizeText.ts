import { CLEAN_WORD_REGEX } from '@/constants';

export function normalizeText(word: string): string {
if (!word) return word;
let w = word.trim().toLowerCase();
w = w.replace(CLEAN_WORD_REGEX, "");
return w;
}
