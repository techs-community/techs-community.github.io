import { describe, expect, it } from "vitest";
import { normalizeTags, readingTimeMinutes, slugify } from "../../src/lib/text";

describe("slugify", () => {
  it("remove acentos e normaliza separadores", () => {
    expect(slugify("Dados & IA")).toBe("dados-ia");
    expect(slugify("DevOps  e   Cloud")).toBe("devops-e-cloud");
    expect(slugify("Café com Código")).toBe("cafe-com-codigo");
  });

  it("apara hífens das pontas", () => {
    expect(slugify("  --Olá!--  ")).toBe("ola");
  });
});

describe("normalizeTags", () => {
  it("deduplica por caixa e acento e ordena", () => {
    expect(normalizeTags(["React", "react", "Réact", "Astro"])).toEqual([
      "Astro",
      "React",
    ]);
  });

  it("ignora tags vazias após normalização", () => {
    expect(normalizeTags(["", "  ", "!!!", "Vite"])).toEqual(["Vite"]);
  });
});

describe("readingTimeMinutes", () => {
  it("estima por 200 palavras/min com mínimo de 1", () => {
    expect(readingTimeMinutes("uma frase curta")).toBe(1);
    expect(readingTimeMinutes(Array(400).fill("palavra").join(" "))).toBe(2);
  });
});
