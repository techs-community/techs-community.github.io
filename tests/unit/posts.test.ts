import { describe, expect, it } from "vitest";
import {
  isPublishable,
  selectFeatured,
  selectRelated,
  sortByDateDesc,
  type Post,
} from "../../src/lib/posts";

/** Fábrica mínima de Post para os testes das regras puras. */
function makePost(
  id: string,
  data: Partial<Post["data"]> & { publishedAt: Date },
): Post {
  return {
    id,
    data: {
      title: id,
      description: "x".repeat(90),
      author: { collection: "authors", id: "autor" },
      categories: [],
      tags: [],
      coverAlt: "capa",
      draft: false,
      featured: false,
      ...data,
    },
  } as unknown as Post;
}

const NOW = new Date("2026-06-01T12:00:00Z");

describe("isPublishable", () => {
  it("em dev, deixa passar rascunho e artigo futuro", () => {
    const draftFuture = makePost("a", {
      publishedAt: new Date("2030-01-01"),
      draft: true,
    });
    expect(isPublishable(draftFuture, NOW, false)).toBe(true);
  });

  it("em prod, barra rascunho e data futura", () => {
    expect(
      isPublishable(
        makePost("a", { publishedAt: new Date("2026-01-01"), draft: true }),
        NOW,
        true,
      ),
    ).toBe(false);
    expect(
      isPublishable(
        makePost("b", { publishedAt: new Date("2030-01-01") }),
        NOW,
        true,
      ),
    ).toBe(false);
    expect(
      isPublishable(
        makePost("c", { publishedAt: new Date("2026-01-01") }),
        NOW,
        true,
      ),
    ).toBe(true);
  });
});

describe("sortByDateDesc", () => {
  it("ordena do mais recente ao mais antigo sem mutar a entrada", () => {
    const input = [
      makePost("velho", { publishedAt: new Date("2025-01-01") }),
      makePost("novo", { publishedAt: new Date("2026-05-01") }),
    ];
    const out = sortByDateDesc(input);
    expect(out.map((p) => p.id)).toEqual(["novo", "velho"]);
    expect(input[0].id).toBe("velho"); // entrada preservada
  });
});

describe("selectFeatured", () => {
  it("escolhe o destaque mais recente e ignora não-destaques", () => {
    const posts = [
      makePost("f-antigo", {
        publishedAt: new Date("2025-01-01"),
        featured: true,
      }),
      makePost("normal", { publishedAt: new Date("2026-05-01") }),
      makePost("f-novo", {
        publishedAt: new Date("2026-03-01"),
        featured: true,
      }),
    ];
    expect(selectFeatured(posts)?.id).toBe("f-novo");
  });

  it("retorna undefined quando não há destaque", () => {
    expect(
      selectFeatured([makePost("x", { publishedAt: NOW })]),
    ).toBeUndefined();
  });
});

describe("selectRelated", () => {
  const base = makePost("base", {
    publishedAt: new Date("2026-05-01"),
    categories: ["dados-e-ia"],
    tags: ["python"],
  });

  it("prioriza sobreposição de categoria sobre tag e exclui o próprio", () => {
    const candidates = [
      base,
      makePost("mesma-cat", {
        publishedAt: new Date("2026-04-01"),
        categories: ["dados-e-ia"],
      }),
      makePost("mesma-tag", {
        publishedAt: new Date("2026-04-02"),
        tags: ["python"],
      }),
      makePost("sem-relacao", {
        publishedAt: new Date("2026-04-03"),
        categories: ["mobile"],
      }),
    ];
    const related = selectRelated(base, candidates);
    expect(related.map((p) => p.id)).toEqual(["mesma-cat", "mesma-tag"]);
  });

  it("respeita o limite", () => {
    const candidates = Array.from({ length: 5 }, (_, i) =>
      makePost(`r${i}`, {
        publishedAt: new Date(2026, 0, i + 1),
        categories: ["dados-e-ia"],
      }),
    );
    expect(selectRelated(base, candidates, 2)).toHaveLength(2);
  });
});
