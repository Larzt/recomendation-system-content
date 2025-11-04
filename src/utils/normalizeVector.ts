export function normalizeVector(vector: Record<string, number>): Record<string, number> {
  const norm = Math.sqrt(Object.values(vector).reduce((sum, v) => sum + v * v, 0));
  const normalized: Record<string, number> = {};
  for (const term in vector) {
    normalized[term] = norm ? vector[term] / norm : 0;
  }
  return normalized;
}
