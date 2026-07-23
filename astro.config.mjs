// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// Site estático publicado na raiz de https://techs-community.github.io.
// Repositório de organização com nome especial: `base` permanece "/".
// `trailingSlash: "always"` mantém uma única política de canonical.
export default defineConfig({
  site: "https://techs-community.github.io",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
