/**
 * Utilitário central de links internos (design.md §5).
 *
 * Todas as rotas públicas usam barra final (política única de canonical). Criar
 * URLs por aqui — e não com strings soltas — mantém consistência e não bloqueia
 * uma futura migração para domínio próprio.
 */

import { slugify } from "./text";

export const routes = {
  home: () => "/",
  blog: () => "/blog/",
  blogPage: (page: number) => (page <= 1 ? "/blog/" : `/blog/pagina/${page}/`),
  article: (slug: string) => `/blog/${slug}/`,
  category: (id: string) => `/categorias/${id}/`,
  tag: (tag: string) => `/tags/${slugify(tag)}/`,
  author: (slug: string) => `/autores/${slug}/`,
  search: () => "/busca/",
  about: () => "/sobre/",
  contribute: () => "/contribua/",
  codeOfConduct: () => "/codigo-de-conduta/",
} as const;

/** URL pública do perfil de GitHub a partir do handle (identidade de git). */
export function githubUrl(handle: string): string {
  return `https://github.com/${handle}`;
}
