# Como contribuir com um artigo

Obrigado por escrever para a **Techs Community**! O portal é um site estático
(Astro) e todo conteúdo entra por pull request. Este guia leva você do zero ao
pull request.

## 1. Pré-requisitos

- Node.js 22 (LTS) e npm.
- Uma conta no GitHub — a autoria é vinculada ao seu handle. Se ainda não fizer
  parte da comunidade, [solicite o
  acesso](https://github.com/techs-community/.github/issues/new?template=solicitar-acesso.yml).

## 2. Instalação

```bash
git clone git@github.com:techs-community/techs-community.github.io.git
cd techs-community.github.io
npm ci
```

## 3. Cadastre-se como autor (uma vez)

Crie `src/content/authors/<seu-handle>.md` (o id do arquivo é o seu handle do
GitHub em minúsculas):

```yaml
---
name: Seu Nome
githubUser: seu-handle-do-github
bio: "Uma linha curta sobre você e seus interesses técnicos."
# website: https://...   # opcional
# linkedin: https://...  # opcional
---
```

## 4. Escreva o artigo

1. Copie o modelo [`docs/modelo-de-artigo.md`](docs/modelo-de-artigo.md) para
   `src/content/blog/<slug>.md`. O nome do arquivo é o slug e define a URL
   `/blog/<slug>/`.
2. Preencha o frontmatter. Campos obrigatórios: `title`, `description` (80–180
   caracteres), `publishedAt`, `author`, `categories` (ao menos uma do
   vocabulário) e `cover` + `coverAlt`.
3. Adicione a capa em `src/assets/covers/` na proporção **16:9**. Ela é otimizada
   no build — não use links externos.
4. Escreva em Markdown. Use `##`/`###` para gerar o sumário e blocos de código
   com a linguagem indicada.

Enquanto estiver rascunhando, marque `draft: true`: o artigo aparece no preview
local, mas **não** entra no build de produção.

## 5. Valide localmente

```bash
npm run check     # tipos + schema do conteúdo (astro check)
npm run test      # utilitários de conteúdo
npm run build     # build estático de produção em dist/
npm run preview   # serve dist/ para revisão final
```

O atalho `npm run verify` roda formatação, lint, tipos e testes — os mesmos
checks do CI.

O schema recusa: descrição fora de 80–180 caracteres, categoria fora do
vocabulário, autor inexistente, `coverAlt` vazio e datas inválidas. A mensagem de
erro aponta o campo.

## 6. Abra o pull request

```bash
git checkout -b artigo/<slug>
git add .
git commit -m "post: <título do artigo>"
git push -u origin artigo/<slug>
```

Abra o pull request para `main`. Após revisão editorial e merge, a publicação no
GitHub Pages é automática.

O template do PR apresenta o checklist editorial. A rotina **Validar e publicar**
executa `npm run verify` e `npm run build` automaticamente; aguarde o check
`Qualidade e build` ficar verde antes de solicitar a aprovação final. O deploy só
é liberado depois que a alteração chega à branch `main`.

## Convenções editoriais

- Idioma: português do Brasil; fuso editorial `America/Sao_Paulo`.
- `description` funciona como resumo em listagens, SEO e RSS — escreva-a com
  capricho.
- Categorias vêm do vocabulário controlado em `src/consts.ts`; tags são livres e
  normalizadas no build (caixa/acento não geram duplicatas).
- Para revisar um artigo já publicado, atualize `updatedAt`.
