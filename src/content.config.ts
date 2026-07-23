import { defineCollection, reference } from "astro:content";
import { z } from "astro:schema";
import { glob } from "astro/loaders";
import { CATEGORY_IDS } from "./consts";

/**
 * Coleções de conteúdo (design.md §4).
 *
 * O identificador de cada entrada é o nome do arquivo (slug). O validador
 * rejeita: descrição fora de 80–180 caracteres, categoria fora do vocabulário
 * controlado, autor inexistente (via reference), texto alternativo vazio e
 * datas inválidas. Filtro de rascunho/futuro em produção é responsabilidade de
 * `src/lib/content.ts`.
 */

const authors = defineCollection({
  loader: glob({ base: "./src/content/authors", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      bio: z.string().min(1),
      /** Handle do GitHub (identidade "de git" do membro da comunidade). */
      githubUser: z.string().min(1),
      avatar: image().optional(),
      linkedin: z.url().optional(),
      website: z.url().optional(),
    }),
});

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z
        .string()
        .min(80, { message: "A descrição deve ter ao menos 80 caracteres." })
        .max(180, {
          message: "A descrição deve ter no máximo 180 caracteres.",
        }),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      author: reference("authors"),
      categories: z
        .array(z.enum(CATEGORY_IDS as [string, ...string[]]))
        .nonempty({ message: "Informe ao menos uma categoria controlada." }),
      tags: z.array(z.string().min(1)).default([]),
      cover: image(),
      coverAlt: z.string().min(1, { message: "coverAlt não pode ser vazio." }),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      canonicalUrl: z.url().optional(),
    }),
});

export const collections = { authors, blog };
