/**
 * Regras puras de domínio sobre artigos (ordenação, destaque, relacionados,
 * filtro de publicação). Sem dependência de runtime do Astro — apenas o tipo
 * `CollectionEntry` (import type, apagado na compilação) — para permitir testes
 * unitários isolados (design.md §11).
 */

import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

/**
 * Verdadeiro quando o artigo pode ser publicado no build atual.
 * Em produção: não é rascunho e a data de publicação já passou.
 * Em desenvolvimento: tudo aparece, para facilitar o preview.
 */
export function isPublishable(post: Post, now: Date, isProd: boolean): boolean {
  if (!isProd) return true;
  if (post.data.draft) return false;
  return post.data.publishedAt.getTime() <= now.getTime();
}

/** Ordena do mais recente para o mais antigo (desc por publishedAt). */
export function sortByDateDesc(posts: readonly Post[]): Post[] {
  return [...posts].sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
}

/**
 * Seleciona o destaque efetivo: o artigo `featured` mais recente. No máximo um
 * destaque é efetivo mesmo que vários estejam marcados (design.md §4.1).
 */
export function selectFeatured(posts: readonly Post[]): Post | undefined {
  return sortByDateDesc(posts.filter((p) => p.data.featured))[0];
}

/**
 * Artigos relacionados de forma determinística: maior sobreposição de
 * categorias e tags, desempate por data desc. Exclui o próprio artigo.
 */
export function selectRelated(
  post: Post,
  candidates: readonly Post[],
  limit = 3,
): Post[] {
  const cats = new Set(post.data.categories);
  const tags = new Set(post.data.tags);

  return sortByDateDesc(candidates.filter((p) => p.id !== post.id))
    .map((p) => {
      const score =
        p.data.categories.filter((c) => cats.has(c)).length * 2 +
        p.data.tags.filter((t) => tags.has(t)).length;
      return { post: p, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post);
}
