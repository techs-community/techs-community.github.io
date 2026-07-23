# Plano de implementação — Blog Techs Community

## Como usar este plano

- Marcar uma tarefa somente depois de cumprir sua definição de pronto.
- IDs indicam dependências e facilitam dividir pull requests.
- Cada fase deve deixar `main` publicável.
- Mudanças de escopo devem atualizar primeiro `requirements.md` e `design.md`.

## Fase 0 — Fundação

- [ ] **T001 — Inicializar Astro com TypeScript estrito**
  - Criar o projeto na raiz sem sobrescrever `.specs` ou histórico existente.
  - Configurar saída estática, `site` como `https://techs-community.github.io` e
    política de barra final.
  - Adicionar scripts `dev`, `build`, `preview`, `check`, `lint`, `format` e `test`.
  - Versionar `package-lock.json` e ignorar `dist`, caches e relatórios.
  - **Pronto quando:** instalação limpa, `npm run check` e `npm run build` passam.

- [ ] **T002 — Integrar Tailwind CSS e tokens visuais** — depende de T001
  - Instalar Tailwind pelo plugin oficial de Vite e o plugin Typography.
  - Criar `global.css`, tokens retro-editoriais derivados da arte oficial,
    reset/base, temas claro/escuro e estilos tipográficos de artigo.
  - Documentar limites para utilitários, CSS scoped e valores arbitrários.
  - **Pronto quando:** build contém apenas CSS usado e exemplos passam contraste AA.

- [ ] **T003 — Configurar qualidade de código** — depende de T001
  - Configurar formatter, linter, `astro check` e Vitest.
  - Adicionar verificação local única para os mesmos checks do CI.
  - **Pronto quando:** um erro intencional de tipo, lint ou formato quebra o check.

## Fase 1 — Conteúdo e domínio

- [ ] **T101 — Criar Content Collections** — depende de T001
  - Implementar schemas de artigos e autores conforme o design.
  - Criar vocabulário central de categorias.
  - Validar datas, referências, slugs, imagens e textos alternativos.
  - **Pronto quando:** fixtures inválidas falham com mensagens acionáveis.

- [ ] **T102 — Implementar utilitários de conteúdo** — depende de T101
  - Filtrar rascunhos e publicações futuras no modo produção.
  - Ordenar por data, normalizar tags/slugs e calcular tempo de leitura.
  - Selecionar destaque e artigos relacionados de forma determinística.
  - **Pronto quando:** casos de borda estão cobertos por testes unitários.

- [ ] **T103 — Adicionar conteúdo inicial** — depende de T101
  - Criar dois autores, três artigos demonstrativos e o conjunto inicial de
    categorias.
  - Incluir capa, texto alternativo, headings, links e bloco de código.
  - Criar um rascunho fixture disponível no desenvolvimento e ausente em produção.
  - **Pronto quando:** schemas passam e o rascunho não aparece em `dist/`.

- [ ] **T104 — Documentar autoria** — depende de T101
  - Criar modelo de artigo e instruções de frontmatter, assets e preview.
  - Documentar convenções editoriais, revisão e atualização de artigos.
  - **Pronto quando:** um colaborador consegue criar um artigo apenas com o guia.

## Fase 2 — Design system e shell

- [ ] **T200 — Preparar a identidade oficial** — depende de T002
  - Confirmar licença/autorização e registrar a origem da arte oficial.
  - Incorporar o arquivo-fonte sem hotlink e gerar variantes responsivas otimizadas,
    preservando proporção e conteúdo.
  - Selecionar famílias tipográficas abertas, hospedadas localmente, e documentar
    suas licenças.
  - Definir wordmark tipográfico provisório; não criar símbolo compacto sem
    aprovação explícita da comunidade.
  - **Pronto quando:** origem, direitos, proporções, textos alternativos, fontes e
    regras de uso estão documentados e revisados.

- [ ] **T201 — Implementar layout base** — depende de T200
  - Criar `BaseLayout`, container, skip link, header, navegação e footer.
  - Aplicar landmarks, foco visível, estados responsivos e largura de leitura.
  - **Pronto quando:** navegação funciona com teclado a partir de 320 px.

- [ ] **T202 — Implementar tema claro/escuro** — depende de T201
  - Respeitar preferência do sistema antes da pintura inicial.
  - Persistir seleção explícita e evitar flash de tema incorreto.
  - Respeitar `prefers-reduced-motion`.
  - **Pronto quando:** funciona com teclado, sem erro quando storage não está
    disponível e sem bloquear leitura com JavaScript desativado.

- [ ] **T203 — Construir componentes editoriais** — depende de T102 e T201
  - Criar cards, destaque, metadados, tags, autoria, breadcrumbs, paginação,
    sumário e estados vazios.
  - Tratar imagens responsivas e blocos de código.
  - **Pronto quando:** estados e variantes usam tokens e não duplicam markup.

- [ ] **T204 — Aplicar a direção retrofuturista** — depende de T201 e T203
  - Criar grade editorial, bordas, labels, registros e texturas discretas descritas
    no design, usando informação real em vez de ornamento arbitrário.
  - Usar a arte oficial completa nos contextos definidos, sem distorção ou efeitos.
  - Validar que ruído, assimetria, caixa alta e microtipografia não prejudiquem
    leitura, responsividade, seleção de texto ou tecnologia assistiva.
  - **Pronto quando:** home expressiva e artigo contido parecem parte da mesma marca,
    atendem contraste AA e continuam utilizáveis sem CSS avançado ou JavaScript.

## Fase 3 — Páginas e navegação

- [ ] **T301 — Criar página inicial** — depende de T103 e T204
  - Montar hero editorial, destaque, recentes, categorias e chamada de contribuição.
  - **Pronto quando:** dados vêm das coleções e há estado válido sem destaque.

- [ ] **T302 — Criar listagem e página de artigo** — depende de T103 e T204
  - Implementar `/blog/`, `/blog/pagina/<n>/` e `/blog/<slug>/`.
  - Incluir sumário, autoria e relacionados sem duplicar o artigo atual.
  - **Pronto quando:** URLs e ordenação seguem a especificação.

- [ ] **T303 — Criar páginas de taxonomia e autoria** — depende de T302
  - Gerar categorias, tags e autores conhecidos no build.
  - Tratar taxonomias vazias sem gerar páginas órfãs.
  - **Pronto quando:** todos os links de metadados levam a listagens corretas.

- [ ] **T304 — Criar páginas institucionais e 404** — depende de T201
  - Implementar Sobre, Contribua, Código de Conduta e 404.
  - Incluir caminhos de recuperação na 404.
  - **Pronto quando:** `dist/404.html` existe e páginas estão na navegação adequada.

## Fase 4 — Busca e descoberta

- [ ] **T401 — Integrar Pagefind** — depende de T302 e T303
  - Gerar o índice depois do build.
  - Excluir navegação, footer, rascunhos e páginas não editoriais do índice.
  - Implementar busca acessível com loading, zero resultados e erro.
  - **Pronto quando:** encontra termos do corpo e metadados no preview de produção,
    sem requisições a serviços externos.

- [ ] **T402 — Implementar SEO centralizado** — depende de T302
  - Criar defaults do site e `SeoHead`.
  - Adicionar canonical, Open Graph, Twitter Card e JSON-LD `BlogPosting`.
  - Definir imagem social padrão e fallback de capa.
  - **Pronto quando:** páginas representativas têm um canonical e metadados válidos.

- [ ] **T403 — Gerar sitemap, RSS e robots** — depende de T402
  - Configurar sitemap e feed com URLs absolutas.
  - Impedir entrada de rascunhos, futuros, busca e duplicatas.
  - **Pronto quando:** XMLs validam e todas as URLs públicas retornam sucesso.

## Fase 5 — Testes e automação

- [ ] **T501 — Adicionar testes E2E** — depende de T304 e T401
  - Configurar Playwright contra o preview do build.
  - Cobrir navegação, artigo, paginação, taxonomia, busca, tema e 404.
  - Executar um cenário essencial com JavaScript desabilitado.
  - **Pronto quando:** testes passam localmente e geram artefatos úteis ao falhar.

- [ ] **T502 — Automatizar acessibilidade e links** — depende de T501
  - Integrar axe-core nas rotas representativas.
  - Verificar links internos e assets após o build.
  - Criar checklist manual para teclado, zoom, leitor de tela e contraste.
  - **Pronto quando:** não há violações críticas/sérias nem links internos quebrados.

- [ ] **T503 — Criar workflow de CI** — depende de T003, T501 e T502
  - Executar instalação limpa, checks, testes, build, Pagefind e E2E em pull requests.
  - Aplicar cache seguro sem substituir o lockfile como fonte de dependências.
  - **Pronto quando:** cada classe de falha bloqueia o merge e o log aponta a causa.

- [ ] **T504 — Criar workflow de deploy** — depende de T503
  - Usar o fluxo oficial do Astro/GitHub Pages, permissões mínimas, environment e
    controle de concorrência.
  - Permitir execução em push para `main` e manual.
  - **Pronto quando:** o artefato de `main` é publicado na URL raiz e uma execução
    antiga não sobrescreve uma nova.

## Fase 6 — Validação e lançamento

- [ ] **T601 — Executar auditoria de performance** — depende de T504
  - Medir home e artigo de referência sobre build de produção.
  - Corrigir imagens, fontes, layout shift e JavaScript até cumprir RNF-02.
  - **Pronto quando:** resultados e ambiente da medição estão registrados no PR.

- [ ] **T602 — Fazer revisão editorial e cross-browser** — depende de T504
  - Revisar textos, links, responsividade e navegadores suportados.
  - Validar datas e fuso `America/Sao_Paulo`.
  - **Pronto quando:** não restam defeitos bloqueadores ou de alta prioridade.

- [ ] **T603 — Preparar operação do projeto** — depende de T504
  - Atualizar README com visão, stack, comandos, arquitetura e status do deploy.
  - Configurar branch protection, revisão de conteúdo e responsáveis pelo Pages.
  - Habilitar teste semanal de links externos sem bloquear publicações por falhas
    transitórias de terceiros.
  - **Pronto quando:** uma pessoa mantenedora diferente consegue publicar e reverter
    uma versão seguindo a documentação.

- [ ] **T604 — Aprovar o MVP** — depende de T601, T602 e T603
  - Percorrer todos os critérios de aceite de `requirements.md`.
  - Registrar débitos não bloqueadores como issues.
  - **Pronto quando:** critérios estão evidenciados e a versão está pública.

## Ordem sugerida de pull requests

1. `T001–T003`: fundação e qualidade.
2. `T101–T104`: modelo e conteúdo.
3. `T200–T204`: identidade, design system e componentes.
4. `T301–T304`: páginas estáticas.
5. `T401–T403`: busca e descoberta.
6. `T501–T504`: testes, CI e deploy.
7. `T601–T604`: hardening e lançamento.
