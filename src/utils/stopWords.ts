
export type TStopWords = string;
export function applyStopwords(text: string) : string {
  const stopWords: TStopWords[] = [
    "a", "an", "the", "and", "but", "or", "for", "to", "in", "on", "at", "of", "by", "with"
  ];
  const words = text.split(" ");
  const filtered = words.filter(word => stopWords.indexOf(word.toLowerCase()) === -1);
  return filtered.join(" ");
}
