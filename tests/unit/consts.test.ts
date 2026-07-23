import { describe, expect, it } from "vitest";
import { POSTS_PER_PAGE, SITE, SITE_URL } from "../../src/consts";

describe("consts", () => {
  it("expõe a URL de produção na raiz da organização", () => {
    expect(SITE_URL).toBe("https://techs-community.github.io");
  });

  it("usa locale pt-BR e fuso editorial de São Paulo", () => {
    expect(SITE.locale).toBe("pt-BR");
    expect(SITE.timeZone).toBe("America/Sao_Paulo");
  });

  it("pagina em blocos de 12 artigos", () => {
    expect(POSTS_PER_PAGE).toBe(12);
  });
});
