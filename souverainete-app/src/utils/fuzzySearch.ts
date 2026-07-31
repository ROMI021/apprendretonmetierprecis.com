// Utility for fuzzy matching strings and searching with fault tolerance

/**
 * Normalise une chaîne en supprimant les accents, la casse et la ponctuation
 */
export function normalizeStr(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[^a-z0-9\s]/g, ""); // Supprime la ponctuation
}

/**
 * Calcule la distance de Levenshtein entre deux mots
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Détermine si un terme recherché correspond à une chaîne cible avec tolérance aux fautes
 */
export function isFuzzyMatch(query: string, target: string): boolean {
  const normQuery = normalizeStr(query).trim();
  const normTarget = normalizeStr(target).trim();

  if (!normQuery) return true;
  if (!normTarget) return false;

  // 1. Inclusions directes ou sous-mots (ex: "dron" dans "drones")
  if (normTarget.includes(normQuery)) return true;

  // 2. Vérification mot par mot avec tolérance aux fautes (Levenshtein <= 2)
  const queryWords = normQuery.split(/\s+/);
  const targetWords = normTarget.split(/\s+/);

  return queryWords.every((qWord) => {
    if (qWord.length <= 2) {
      return targetWords.some((tWord) => tWord.startsWith(qWord));
    }

    return targetWords.some((tWord) => {
      // Sous-chaîne
      if (tWord.includes(qWord) || qWord.includes(tWord)) return true;

      // Distance de Levenshtein autorisée (1 faute pour mots courts, 2 pour mots longs)
      const maxDist = qWord.length > 5 ? 2 : 1;
      return levenshteinDistance(qWord, tWord) <= maxDist;
    });
  });
}
