/**
 * Constantes globais do site.
 *
 * Fonte única de verdade para identidade, URL e configuração editorial.
 * Vocabulário de categorias e defaults de SEO são adicionados nas fases
 * seguintes (conteúdo e descoberta).
 */

export const SITE_URL = "https://techs-community.github.io";

export const SITE = {
  title: "Techs Community",
  /** Descrição curta usada como default de metadados e no cabeçalho. */
  description:
    "Uma comunidade divertida e nerd para quem vive e respira tecnologia: arquitetura, sistemas, carreira, segurança e desenvolvimento.",
  /** Idioma do conteúdo e da interface no MVP. */
  locale: "pt-BR",
  /** Fuso editorial padrão para exibição e formatação de datas. */
  timeZone: "America/Sao_Paulo",
  /** Organização oficial no GitHub. */
  org: "https://github.com/techs-community",
} as const;

/** Quantidade de artigos por página nas listagens paginadas. */
export const POSTS_PER_PAGE = 12;

/**
 * Vocabulário editorial controlado de categorias (design.md §4.3).
 *
 * A categoria é armazenada pelo identificador normalizado (a chave) e recebe o
 * nome de exibição por este mapa central. Alterações passam por revisão
 * editorial. O schema de conteúdo valida contra estas chaves.
 */
export const CATEGORIES = {
  "desenvolvimento-web": "Desenvolvimento Web",
  mobile: "Mobile",
  "dados-e-ia": "Dados e IA",
  "devops-e-cloud": "DevOps e Cloud",
  "carreira-e-comunidade": "Carreira e Comunidade",
} as const;

export type CategoryId = keyof typeof CATEGORIES;

export const CATEGORY_IDS = Object.keys(CATEGORIES) as CategoryId[];

/** Nome de exibição de uma categoria a partir do identificador normalizado. */
export function categoryName(id: CategoryId): string {
  return CATEGORIES[id];
}
