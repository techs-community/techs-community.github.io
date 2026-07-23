# Requisitos — Blog Techs Community

## 1. Visão do produto

O Techs Community será o portal editorial público da comunidade, publicado em
`https://techs-community.github.io/`. O site deve permitir que pessoas encontrem,
leiam e compartilhem conteúdo técnico e que colaboradores proponham novos artigos
por pull request.

O produto será um site estático: todo o conteúdo público deve ser gerado durante o
build e servido pelo GitHub Pages, sem servidor de aplicação, banco de dados ou
segredos no navegador.

## 2. Objetivos

- Publicar artigos técnicos em português do Brasil com boa legibilidade.
- Tornar simples a contribuição de conteúdo pelo fluxo Git/GitHub.
- Oferecer navegação por categoria, tag, autoria e data.
- Entregar uma experiência rápida, acessível, responsiva e indexável.
- Manter build e deploy reproduzíveis e compatíveis com GitHub Pages.

## 3. Fora do escopo inicial

- CMS com painel administrativo.
- Login, perfis de leitores ou conteúdo privado.
- Banco de dados, API própria ou renderização no servidor.
- Comentários nativos, notificações e newsletter transacional.
- Internacionalização da interface e dos artigos.
- Métricas que dependam de cookies ou identificação individual.

Esses itens podem ser propostos futuramente, desde que preservem a hospedagem
estática ou sejam tratados como serviços externos opcionais e aprovados em uma
nova decisão arquitetural.

## 4. Pessoas e jornadas principais

### Leitor

1. Acessa a página inicial.
2. Identifica artigos recentes e destaques editoriais.
3. Filtra ou busca um assunto.
4. Lê um artigo e navega para conteúdo relacionado.
5. Compartilha a URL estável do artigo.

### Autor ou colaborador

1. Cria um arquivo de artigo a partir do modelo do repositório.
2. Preenche metadados e conteúdo em Markdown ou MDX.
3. Executa as validações locais.
4. Abre um pull request.
5. Após revisão e merge em `main`, o artigo é publicado automaticamente.

### Mantenedor

1. Revisa conteúdo, metadados e preview do pull request.
2. Aprova ou solicita ajustes.
3. Monitora o build e o deploy no GitHub Actions.

## 5. Requisitos funcionais

### RF-01 — Página inicial

A página inicial deve apresentar:

- identidade e propósito da comunidade;
- linguagem visual retrofuturista e editorial inspirada na atmosfera distópica de
  _1984_, aplicada de forma original e sem reproduzir capas ou ilustrações da obra;
- um destaque editorial opcional;
- lista de artigos mais recentes em ordem decrescente de publicação;
- acesso visível a categorias, busca, página sobre e contribuição;
- paginação quando o volume definido no design for excedido.

### RF-02 — Artigos

Cada artigo deve possuir:

- título, resumo, data de publicação, autor e imagem social;
- uma ou mais categorias e zero ou mais tags;
- slug único e URL permanente no formato `/blog/<slug>/`;
- corpo em Markdown ou MDX;
- tempo estimado de leitura;
- sumário para artigos com subtítulos;
- links para o perfil do autor, categorias, tags e artigos relacionados;
- indicação clara quando estiver em rascunho ou programado, sem publicar esses
  estados no build de produção.

### RF-03 — Arquivo e taxonomia

O site deve gerar páginas estáticas para:

- listagem completa e paginada de artigos em `/blog/`;
- categoria em `/categorias/<slug>/`;
- tag em `/tags/<slug>/`;
- autoria em `/autores/<slug>/`.

Categorias devem vir de uma lista editorial controlada. Tags podem ser livres,
mas precisam ser normalizadas no build para evitar duplicatas por caixa, acento ou
variação de slug.

### RF-04 — Busca

A busca deve funcionar inteiramente no cliente sobre um índice estático produzido
no build. Deve pesquisar título, resumo, categoria, tags e conteúdo, sem enviar a
consulta a terceiros. A página deve funcionar sem JavaScript, exceto pela busca.

### RF-05 — Autores

Autores devem ser mantidos em uma coleção própria e reutilizável, com nome, slug,
biografia curta, avatar opcional e links públicos opcionais. Um artigo não pode
referenciar um autor inexistente.

### RF-06 — Conteúdo institucional

O site deve conter páginas estáticas para:

- Sobre a comunidade;
- Como contribuir;
- Código de Conduta;
- Política de privacidade, caso alguma medição ou incorporação externa seja usada.

### RF-07 — Descoberta e compartilhamento

O build deve gerar:

- `sitemap.xml`;
- feed RSS com os artigos publicados;
- metadados `title`, `description`, canonical, Open Graph e Twitter Card;
- dados estruturados `BlogPosting` nas páginas de artigo;
- `robots.txt` compatível com o endereço de produção;
- página `404.html` personalizada.

### RF-08 — Tema visual

O site deve usar exclusivamente o tema claro da identidade editorial, sem depender
da preferência de cor do sistema ou de JavaScript para apresentar o conteúdo.

### RF-09 — Contribuição e qualidade editorial

O repositório deve fornecer:

- modelo de artigo com todos os campos documentados;
- guia de contribuição com comandos de instalação, preview, validação e build;
- validação automática do schema dos metadados;
- verificação de links internos e slugs duplicados no CI;
- preview local equivalente ao artefato de produção.

### RF-10 — Identidade da comunidade

- A referência visual oficial é o arquivo
  [`profile/assets/logo.png`](https://github.com/techs-community/.github/blob/main/profile/assets/logo.png)
  mantido pela organização.
- O link principal para a comunidade deve apontar para
  [`github.com/techs-community`](https://github.com/techs-community).
- A arte oficial deve preservar proporção, conteúdo, contraste e cores, sem
  distorção, recoloração, recorte destrutivo ou aplicação de efeitos sobre a fonte.
- Como a arte é quadrada, detalhada e sem transparência, versões compactas como
  favicon e avatar precisam de um símbolo simplificado aprovado pela comunidade;
  até essa aprovação, devem usar uma solução tipográfica claramente identificada.
- O uso do nome _1984_ descreve uma direção de atmosfera — imprensa, vigilância,
  tecnologia analógica, burocracia e propaganda — e não autoriza copiar uma edição,
  capa, ilustração, slogan ou composição protegida existente.

## 6. Requisitos não funcionais

### RNF-01 — Compatibilidade com GitHub Pages

- O resultado de produção deve ser composto somente por HTML, CSS, JavaScript e
  assets estáticos em `dist/`.
- O deploy deve usar GitHub Actions e as actions oficiais/recomendadas para Pages.
- O endereço de produção inicial é a raiz de
  `https://techs-community.github.io/`; portanto, `base` deve permanecer `/`.
- Nenhuma rota pode depender de fallback de SPA, função serverless, SSR ou
  middleware de servidor.
- Links e assets devem continuar válidos em preview local e em produção.

### RNF-02 — Desempenho

Em uma auditoria Lighthouse executada sobre um build de produção, as páginas
inicial e de artigo de referência devem alcançar, em ambiente de CI estável:

- Performance >= 90;
- Accessibility >= 95;
- Best Practices >= 95;
- SEO >= 95.

O JavaScript enviado ao cliente deve ser zero por padrão e adicionado apenas a
ilhas interativas justificadas, como busca e alternância de tema. Imagens devem
ter dimensões declaradas, formatos modernos quando possível e carregamento tardio
fora da primeira dobra.

### RNF-03 — Acessibilidade

- Atender WCAG 2.2 nível AA nos fluxos principais.
- Permitir navegação completa por teclado e exibir foco visível.
- Usar HTML semântico, landmarks, hierarquia correta de títulos e link de pular
  para o conteúdo.
- Manter contraste mínimo de 4,5:1 para texto comum e 3:1 para texto grande e
  elementos gráficos essenciais.
- Respeitar `prefers-reduced-motion`.
- Toda imagem informativa deve ter texto alternativo; imagens decorativas devem
  ter alternativa vazia.

### RNF-04 — Responsividade e compatibilidade

- Layout utilizável a partir de 320 px sem rolagem horizontal acidental.
- Abordagem mobile-first com pontos de quebra definidos no design system.
- Suporte às duas versões estáveis mais recentes de Chrome, Firefox, Safari e
  Edge na data de cada release.
- Texturas, ruído, carimbos e ornamentos retro não podem prejudicar leitura,
  contraste, foco, seleção de texto ou desempenho em dispositivos móveis.

### RNF-05 — Segurança e privacidade

- Não incluir segredos, tokens privados ou dados pessoais no bundle.
- Dependências devem ser travadas por lockfile e auditadas no CI.
- Links externos abertos em nova aba devem impedir acesso a `window.opener`.
- Scripts, iframes, analytics e fontes de terceiros exigem decisão explícita e
  documentação de privacidade.
- Preferir fontes do sistema ou arquivos de fonte hospedados no próprio site.

### RNF-06 — Manutenibilidade

- TypeScript em modo estrito.
- Componentes pequenos e reutilizáveis, sem duplicar regras de layout ou SEO.
- Tokens visuais centralizados; não espalhar cores e medidas arbitrárias.
- Conteúdo separado de componentes de apresentação.
- Build, lint e testes devem ser executáveis com comandos documentados.

## 7. Critérios de aceite do MVP

O MVP estará pronto quando:

1. um clone limpo puder ser instalado e gerar `dist/` sem erro;
2. o workflow publicar `main` no GitHub Pages;
3. home, blog, artigo, categoria, tag, autor, sobre, contribuição e 404 existirem;
4. houver ao menos três artigos de exemplo, duas categorias e dois autores;
5. busca, RSS, sitemap, canonical e imagem social forem validados;
6. rascunhos não aparecerem no artefato de produção;
7. testes automatizados cobrirem schema de conteúdo, rotas essenciais e ausência
   de links internos quebrados;
8. a auditoria de acessibilidade não apresentar violações críticas ou sérias;
9. os limites do RNF-02 forem atendidos nas páginas de referência;
10. a documentação permitir que outra pessoa publique um artigo por pull request.

## 8. Premissas

- O idioma inicial é `pt-BR` e o fuso editorial padrão é
  `America/Sao_Paulo`.
- A organização oficial é
  [`techs-community`](https://github.com/techs-community) no GitHub.
- A branch de publicação é `main`.
- O repositório permanece com o nome especial `techs-community.github.io`, logo
  não exige prefixo com nome do repositório na URL.
- Interações sociais permanecem no GitHub da comunidade durante o MVP.
