# Design system — Techs Community

Este documento descreve o sistema visual em uso no site (não o que estava
planejado em `.specs/design.md`, que registra a direção original "distopia
editorial". A direção atual — decidida em conversa com a comunidade — é um
**chrome de sistema operacional retrô**, inspirado em interfaces de UI dos
anos 90 (janelas com barra de título pontilhada, botões com bisel 3D,
checkboxes/radios reais) em roxo + verde-água + branco.

Sempre que `.specs/design.md` e este documento divergirem em decisões de
sistema visual, este documento é a fonte de verdade — ele é atualizado a
cada mudança de direção; o outro registra o raciocínio original do MVP.

## 1. Direção

- **Referência:** kits de UI "retro interface" (Windows 95/98) — janelas com
  título pontilhado e ícones de controle, botões com relevo/entalhe,
  checkboxes e radio buttons reais, bordas grossas pretas, sombra sólida
  deslocada (nunca `blur`).
- **Regra de composição:** cor como duas camadas — roxo marca ação/destaque
  (botões, títulos, acentos), verde-água é o preenchimento de
  janelas/painéis. Nunca as duas como texto uma sobre a outra (ver §2.1).
- **Tensão controlada:** o chrome pesado (bordas, bisel, pontilhado) fica nos
  elementos de interface; o texto de leitura longa (corpo de artigo) continua
  calmo — sem bisel, sem pontilhado, tipografia serifada normal.

## 2. Cores

Tokens semânticos em `src/styles/global.css`, expostos ao Tailwind via
`@theme inline`. Componentes consomem os papéis (`var(--color-*)`), nunca um
hex solto.

| Token                    | Valor     | Papel                                                               |
| ------------------------ | --------- | ------------------------------------------------------------------- |
| `--color-bg`             | `#e3fbf5` | Fundo de página (verde-água bem claro)                              |
| `--color-surface`        | `#2fcbc0` | Preenchimento de janelas/cards/painéis                              |
| `--color-text`           | `#15131d` | Texto principal, tinta das bordas                                   |
| `--color-muted`          | `#433d50` | Texto secundário                                                    |
| `--color-border`         | `#15131d` | Bordas grossas, sombra sólida (= `--color-text`)                    |
| `--color-brand`          | `#6c2bd9` | Roxo — ação, títulos, acentos                                       |
| `--color-brand-strong`   | `#4c1b9e` | Roxo escuro — variante para texto sobre `surface`                   |
| `--color-brand-contrast` | `#ffffff` | Texto sobre preenchimento roxo                                      |
| `--color-alert`          | `#c7333b` | Rascunho/erro (sempre como fundo, nunca como texto sobre `surface`) |
| `--color-focus`          | `#0057d8` | Anel de foco de teclado — deliberadamente distinto do roxo          |

### 2.1 Regra de contraste roxo × verde-água

`--color-brand` (roxo) sobre `--color-surface` (verde-água) dá **3.49:1** —
abaixo do mínimo de 4.5:1 do WCAG AA para texto normal. As duas cores só se
combinam como **blocos adjacentes** (ex. botão roxo dentro de um card
verde-água), nunca como texto roxo em cima de fundo verde-água.

Quando for preciso um acento roxo _sobre_ `--color-surface` (ex. categoria
de um card, número de um passo), use `--color-brand-strong` — **5.32:1**,
passa AA. Todos os pares em uso estão verificados:

| Combinação                                     | Contraste |
| ---------------------------------------------- | --------- |
| `--color-text` sobre `--color-bg`              | 16.96:1   |
| `--color-text` sobre `--color-surface`         | 9.12:1    |
| `--color-muted` sobre `--color-bg`             | 9.59:1    |
| `--color-muted` sobre `--color-surface`        | 5.16:1    |
| `--color-brand` sobre `--color-bg`             | 6.49:1    |
| `--color-brand-strong` sobre `--color-surface` | 5.32:1    |
| `--color-brand-contrast` sobre `--color-brand` | 7.03:1    |
| `--color-alert` sobre `--color-bg`             | 4.89:1    |
| `--color-focus` sobre `--color-bg`             | 5.78:1    |

A faixa roxa de fundo total (seção "Assuntos" da home, `.categories`) inverte
a regra: como o roxo aqui é o **fundo**, o texto usa `--color-bg` (quase
branco, 6.57:1) ou o acento derivado
`color-mix(in srgb, var(--color-surface) 55%, white)` (verde-água clareado,
4.70:1) — nunca `--color-muted`, que contra roxo cai para ~1.3:1.

Ao introduzir uma cor nova, valide o contraste antes de usar como texto —
não assuma que "parece legível" é suficiente.

## 3. Tipografia

Três famílias variáveis, auto-hospedadas em `/public/fonts` (WOFF2,
subconjuntos `latin`/`latin-ext`, sem chamada a Google Fonts/CDN em
produção — ver `@font-face` em `global.css` e a licença em
`public/fonts/LICENSE.txt`).

| Papel   | Token            | Fonte          | Uso                                               |
| ------- | ---------------- | -------------- | ------------------------------------------------- |
| Display | `--font-display` | Big Shoulders  | Manchetes, wordmark — condensada, peso 700–900    |
| Corpo   | `--font-body`    | Newsreader     | Texto de artigo e parágrafos — serifada editorial |
| Mono    | `--font-mono`    | JetBrains Mono | Labels, metadados, badges, código — peso 500–800  |

Cada família é variável e carrega **um arquivo por subconjunto** (não um por
peso) — declare o peso exato que precisar em `font-weight`, o navegador
interpola dentro da faixa carregada (700–900 para Big Shoulders, 400–700
Newsreader normal, 400–600 Newsreader itálico, 500–800 JetBrains Mono).

**Cuidado com escala em títulos de conteúdo real:** a manchete da home
(`.hero h1`) usa `clamp(3rem, 5.25vw, 5.4rem)` porque o texto é curto e fixo
("CRACHÁ."). Títulos de artigo (`h1` em `[slug].astro`) usam uma escala bem
menor — `clamp(2.1rem, 4.6vw, 4rem)` — porque o texto vem do conteúdo e pode
ser longo; a escala do hero aplicada a um título de artigo real produz uma
manchete gigante e quebra em várias linhas. Ao criar uma nova página com
título dinâmico, comece pela escala do artigo, não pela do hero.

## 4. Bordas, sombra e espaçamento do chrome

```css
--chrome-border: 2px;
--chrome-shadow: 4px 4px 0 var(--color-border);
--chrome-dots: radial-gradient(var(--color-border) 1px, transparent 1.4px);
--radius-sm: 0; /* cantos sempre retos — nunca arredondar o chrome */
```

- Bordas de janela/card: `var(--chrome-border) solid var(--color-border)`.
- Sombra: sempre sólida e deslocada (`4px 4px 0 ...`), nunca `blur`/glassmorphism.
- Divisores internos finos (ex. colunas de uma barra de estatísticas) podem
  ficar em `1px` — a espessura de 2px é reservada para o contorno de
  janelas/cards, não para toda linha do layout.

## 5. Biblioteca de componentes (`.win-*`)

Definidos em `@layer components` de `global.css`, usáveis em qualquer página
sem duplicar CSS. Título "win" porque imitam chrome de janela.

| Classe                           | O que é                                                                                                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.win`                           | Contorno + fundo `--color-surface` + sombra sólida — a "janela" base.                                                                                                                 |
| `.win-title`                     | Barra de título: fundo pontilhado, rótulo em mono caixa-alta, borda inferior. Combine com `.win-controls`.                                                                            |
| `.win-controls` / `.win-control` | Par/trio de "botões" de janela (─, ×) — sempre decorativo, envolva com `aria-hidden="true"`.                                                                                          |
| `.win-btn` / `.win-btn-primary`  | Botão com bisel 3D (relevo claro/escuro), desloca 3px e inverte o bisel no `:active`. `-primary` preenche com `--color-brand`.                                                        |
| `.win-checkbox` / `.win-radio`   | Glifo decorativo de caixa/rádio (quadrado ou círculo com marca interna). **Nunca a única pista de estado** — sempre ao lado de texto real, e `aria-hidden="true"` quando ilustrativo. |
| `.win-tag`                       | Selo retangular preenchido (fundo `--color-text`, texto `--color-bg`) para metadados curtos.                                                                                          |

Exemplo — card com barra de título (ver `.record-card` em `index.astro`):

```html
<article class="record-card">
  <div class="win-title">
    <span>REGISTRO 01</span>
    <span class="win-control" aria-hidden="true">×</span>
  </div>
  <!-- imagem, corpo... -->
</article>
```

`.win-btn:active` desloca o botão com `transform: translate(3px, 3px)`;
respeita `prefers-reduced-motion` (o deslocamento vira instantâneo/nulo, já
tratado na própria classe — não precisa reimplementar isso por componente).

## 6. Tratamento de imagens — duotone + pixelado

Duas situações diferentes:

1. **Arte que o site desenha (capas de artigo em SVG):** recolorida
   diretamente no arquivo fonte para os tokens da paleta atual (ex.
   `src/assets/covers/sdd.svg`). Como é vetor, fica nítida em qualquer
   tamanho — nenhum tratamento adicional é necessário.
2. **Fotografia/arte oficial em raster (logo da comunidade):** a arte
   original (`src/assets/techs-community-logo.png`) **não é alterada** —
   `.specs/design.md` §6.2 proíbe recolorir a arte-fonte oficial, e é a
   referência de proveniência/licença da organização. Em vez disso,
   `scripts/pixelate-logo.mjs` gera uma variante derivada
   (`techs-community-logo-pixel.png`) aplicando:
   - downscale para uma grade grosseira (110×110) com kernel `nearest` e
     upscale de volta com `nearest` — produz blocos de pixel nítidos, não
     um blur;
   - remapeamento duotone por luminância (4 paradas: `--color-border` →
     `--color-brand` → `--color-surface` → `--color-bg`) aplicado pixel a
     pixel sobre o buffer já pixelado.

   A variante pixelada é a usada na home (`communityLogoPixel`); a
   **original continua sendo a fonte para o `<meta>` de compartilhamento
   social** (`socialImageUrl`), porque é a representação reconhecível da
   marca fora do site.

   Ao usar a variante pixelada em CSS, sempre declare
   `image-rendering: pixelated` no `<img>` — sem isso o navegador suaviza a
   imagem ao redimensionar e os blocos de pixel viram um borrão.

   Para gerar de novo após trocar a arte oficial ou a paleta:

   ```bash
   node scripts/pixelate-logo.mjs
   ```

## 7. Acessibilidade

- Todo glifo puramente decorativo (`.win-control`, `.win-checkbox`,
  `.win-radio` quando não é um controle real, separadores como `◆`) leva
  `aria-hidden="true"`. O estado real (categoria, "rascunho", etc.) sempre
  existe como texto visível ao lado.
- `:focus-visible` usa `--color-focus` (azul), deliberadamente fora da
  paleta roxo/verde-água para continuar distinguível em qualquer contexto.
- `prefers-reduced-motion: reduce` zera o deslocamento de `.win-btn:active`
  e qualquer transição/animação do site (regra global em `@layer base`).
- Alvo mínimo de toque: `.win-btn` tem `min-height: 44px`.

## 8. Como estender

- Cor nova → adicione o token em `:root` **e** em `@theme inline` (mesmo
  nome), valide contraste (§2.1) antes de usar como texto.
- Padrão de chrome que se repete em mais de uma página → vira classe em
  `@layer components` de `global.css` (não duplique CSS por página).
- Padrão específico de uma página → fica no `<style>` escopado daquela
  página, usando os tokens (nunca um valor cru).
- Nunca reintroduza sombra com `blur`, cantos arredondados no chrome, ou
  glassmorphism — quebra a leitura "sistema operacional retrô" do resto do
  site.
