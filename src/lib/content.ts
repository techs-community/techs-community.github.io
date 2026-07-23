/**
 * Acesso à coleção de artigos. Encapsula a leitura via `getCollection` e o
 * filtro de rascunhos/futuros (só em produção). As regras puras vivem em
 * `./posts` para serem testadas isoladamente.
 */

import { getCollection } from "astro:content";
import { isPublishable, sortByDateDesc, type Post } from "./posts";

export type { Post };
export { selectFeatured, selectRelated } from "./posts";

/**
 * Carrega os artigos publicáveis já ordenados por data desc.
 * Fonte única para todas as listagens do site.
 */
export async function getPublishedPosts(
  now: Date = new Date(),
): Promise<Post[]> {
  const isProd = import.meta.env.PROD;
  const posts = await getCollection("blog", (post) =>
    isPublishable(post, now, isProd),
  );
  return sortByDateDesc(posts);
}
