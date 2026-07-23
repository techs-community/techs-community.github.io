/**
 * Utilitários de texto: normalização de slugs/tags e tempo de leitura.
 *
 * A normalização evita duplicatas de tag por caixa, acento ou variação de slug
 * (RF-03). O tempo de leitura é determinístico para render estático.
 */

/**
 * Converte um texto em slug: minúsculo, sem acentos, com hífens.
 * Ex.: "Dados & IA" -> "dados-ia".
 */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // remove diacríticos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // não-alfanumérico -> hífen
    .replace(/^-+|-+$/g, ""); // apara hífens das pontas
}

/**
 * Normaliza um conjunto de tags: aplica slug como chave canônica, remove
 * duplicatas e ordena. Preserva a primeira grafia legível vista para exibição.
 */
export function normalizeTags(tags: readonly string[]): string[] {
  const seen = new Map<string, string>();
  for (const tag of tags) {
    const key = slugify(tag);
    if (key && !seen.has(key)) {
      seen.set(key, tag.trim());
    }
  }
  return [...seen.values()].sort((a, b) =>
    a.localeCompare(b, "pt-BR", { sensitivity: "base" }),
  );
}

const WORDS_PER_MINUTE = 200;

/**
 * Estima o tempo de leitura em minutos (mínimo 1) a partir do corpo bruto.
 */
export function readingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
