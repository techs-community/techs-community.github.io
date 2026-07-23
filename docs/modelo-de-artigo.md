---
# ── Modelo de artigo — copie este arquivo para src/content/blog/<slug>.md ──
# O nome do arquivo vira o slug e a URL: /blog/<slug>/
# Remova estes comentários antes de abrir o pull request.

# Obrigatórios ------------------------------------------------------------
title: "Título do artigo"
# Resumo entre 80 e 180 caracteres (aparece em listagens, SEO e RSS):
description: "Um resumo claro do artigo, com pelo menos oitenta caracteres e no máximo cento e oitenta, sem quebra de linha."
publishedAt: 2026-01-31 # data de publicação (America/Sao_Paulo)
author: seu-handle-do-github # id de um arquivo em src/content/authors/
categories: # ao menos uma do vocabulário controlado
  - desenvolvimento-web
cover: ../../assets/covers/seu-arquivo.svg # imagem 16:9 em src/assets/covers
coverAlt: "Descrição objetiva da capa para leitores de tela."

# Opcionais ---------------------------------------------------------------
# updatedAt: 2026-02-10            # data da última revisão relevante
# tags:                           # livres; normalizadas no build
#   - Astro
#   - Performance
# featured: true                  # no máximo um destaque efetivo no site
# draft: true                     # rascunho: some do build de produção
# canonicalUrl: https://...       # só quando o original está fora do portal
---

Escreva o artigo em Markdown a partir daqui. Use `##` e `###` para as seções —
os subtítulos alimentam o sumário automático.

## Uma seção

Parágrafos, listas e links internos (por exemplo, [a listagem](/blog/)).

```ts
// Blocos de código recebem destaque de sintaxe e rótulo de linguagem.
const ola = "mundo";
```

## Categorias válidas

`desenvolvimento-web`, `mobile`, `dados-e-ia`, `devops-e-cloud`,
`carreira-e-comunidade`. A lista canônica vive em `src/consts.ts`.
