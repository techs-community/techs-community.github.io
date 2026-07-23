# Techs Community

Portal editorial da [Techs Community](https://github.com/techs-community), uma
comunidade divertida e nerd para quem vive e respira tecnologia. O site reúne
conteúdo em português sobre arquitetura de software, sistemas, desenvolvimento,
segurança, carreira e comunidade.

O projeto é construído com Astro, TypeScript e Tailwind CSS e publicado como site
estático no GitHub Pages.

## Executando localmente

Requisitos: Node.js 22 ou mais recente e npm.

```bash
git clone https://github.com/techs-community/techs-community.github.io.git
cd techs-community.github.io
npm ci
npm run dev
```

O servidor informa no terminal o endereço do preview local, normalmente
`http://localhost:4321`.

## Como contribuir com artigos

Todo artigo entra por pull request. O fluxo resumido é:

1. crie um fork ou uma branch a partir de `main`;
2. cadastre sua autoria em `src/content/authors/`, caso ainda não exista;
3. copie [`docs/modelo-de-artigo.md`](docs/modelo-de-artigo.md) para
   `src/content/blog/<slug-do-artigo>.md`;
4. adicione a capa em `src/assets/covers/`, com texto alternativo no frontmatter;
5. escreva e revise o conteúdo em português do Brasil;
6. execute as validações locais e abra o pull request.

Exemplo de frontmatter:

```yaml
---
title: "Título do artigo"
description: "Resumo claro entre 80 e 180 caracteres para listagens e mecanismos de busca."
publishedAt: 2026-07-22
author: seu-handle
categories:
  - desenvolvimento-web
tags:
  - Astro
cover: ../../assets/covers/minha-capa.svg
coverAlt: "Descrição objetiva da imagem para leitores de tela."
draft: true
---
```

Use `draft: true` enquanto o texto estiver em revisão. Rascunhos aparecem no
servidor de desenvolvimento, mas não são publicados no build de produção.

O guia completo, incluindo cadastro de autoria, categorias aceitas e convenções
editoriais, está em [CONTRIBUTING.md](CONTRIBUTING.md).

## Validação antes do pull request

Execute:

```bash
npm run verify
npm run build
```

`npm run verify` verifica formatação, lint, tipos, schema do conteúdo e testes. O
build confirma que o artigo e seus assets podem ser gerados como páginas estáticas.

Ao abrir ou atualizar um pull request, o workflow **Validar e publicar** executa
automaticamente os mesmos comandos com Node.js 22. O PR fica pronto para revisão
editorial quando o check `Qualidade e build` estiver aprovado. Depois do merge em
`main`, a mesma rotina publica exclusivamente o conteúdo de `dist/` no GitHub
Pages. No repositório, a fonte do Pages deve estar configurada como **GitHub
Actions** em
`Settings → Pages → Build and deployment → Source`.

### Enviando a contribuição

```bash
git checkout -b artigo/<slug-do-artigo>
git add src/content/blog src/content/authors src/assets/covers
git commit -m "post: título do artigo"
git push -u origin artigo/<slug-do-artigo>
```

Depois, abra um pull request para `main` e preencha o checklist apresentado pelo
template. Não inclua `dist/`, `.astro/` ou `node_modules/` no commit.

## Scripts principais

| Comando           | Finalidade                                |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento.     |
| `npm run verify`  | Executa formatação, lint, tipos e testes. |
| `npm run build`   | Gera o site estático em `dist/`.          |
| `npm run preview` | Abre localmente o resultado do build.     |

## Participar da comunidade

Para entrar nos grupos da Techs Community, [abra uma solicitação de
acesso](https://github.com/techs-community/.github/issues/new?template=solicitar-acesso.yml).
