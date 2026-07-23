---
title: "Como programar usando SDD (Spec-Driven Development)"
description: "Aprenda a transformar uma ideia em software verificável usando especificações como fonte de verdade para decisões, implementação e validação."
publishedAt: 2026-07-22
author: otechmista
categories:
  - desenvolvimento-web
  - carreira-e-comunidade
tags:
  - SDD
  - Engenharia de Software
  - Arquitetura
  - IA
cover: ../../assets/covers/sdd.svg
coverAlt: "Capa editorial do artigo sobre Spec-Driven Development, com fluxo entre especificação, código e validação."
featured: true
---

Programar com **SDD — Spec-Driven Development**, ou desenvolvimento orientado a
especificações, significa tornar a intenção do produto explícita antes de transformar
essa intenção em código. A especificação deixa de ser um documento esquecido e passa
a funcionar como a fonte de verdade compartilhada entre pessoas e ferramentas.

Isso não exige escrever uma enciclopédia antes de começar. Uma boa especificação é
pequena o suficiente para ser revisada, precisa o bastante para orientar decisões e
verificável por testes ou critérios de aceite.

## O ciclo do SDD

Um fluxo prático pode ser organizado em cinco etapas:

1. **Defina o problema:** registre quem precisa da mudança, qual resultado espera e o
   que está fora do escopo.
2. **Descreva o comportamento:** transforme a necessidade em regras, exemplos e
   critérios de aceite observáveis.
3. **Projete a solução:** documente contratos, dados, estados, riscos e decisões
   técnicas relevantes.
4. **Implemente em partes pequenas:** cada alteração deve apontar para uma parte da
   especificação.
5. **Valide e atualize:** testes comprovam o comportamento; mudanças descobertas
   durante a implementação voltam para a especificação.

```text
problema → requisitos → design → tarefas → código → validação
    ↑                                                │
    └──────────── aprendizado e atualização ─────────┘
```

## Comece pelo resultado, não pela tecnologia

Imagine que uma comunidade queira publicar artigos técnicos. Uma especificação fraca
diria apenas “criar um blog em Astro”. Ela já escolheu a ferramenta, mas ainda não
explicou o que precisa funcionar.

Uma especificação melhor descreve resultados:

- leitores encontram artigos por assunto;
- cada artigo possui uma URL estável;
- rascunhos não aparecem no build de produção;
- colaboradores conseguem validar uma publicação antes do pull request;
- a página permanece legível sem JavaScript.

Agora decisões técnicas podem ser avaliadas contra necessidades reais. Astro pode ser
uma boa escolha, mas deixa de ser o objetivo e passa a ser um meio.

## Escreva critérios que possam falhar

“A página deve ser rápida” expressa uma intenção, mas não define sucesso. Prefira
critérios verificáveis:

- o build gera apenas arquivos estáticos;
- a página inicial alcança Performance 90 ou mais no Lighthouse;
- a navegação funciona por teclado a partir de 320 px;
- um artigo marcado como rascunho não existe no diretório de produção.

Se um critério não pode falhar, ele provavelmente ainda está vago demais para orientar
a implementação.

## Transforme a especificação em tarefas

Depois de fechar requisitos e design, quebre o trabalho em entregas pequenas e
ordenadas por dependência. Cada tarefa precisa ter uma definição de pronto.

```md
- [ ] Criar o schema de artigos
  - validar título, descrição, data, autor e capa;
  - rejeitar referências de autor inexistentes;
  - pronto quando fixtures válidas passam e inválidas falham no build.
```

Essa estrutura ajuda tanto pessoas quanto assistentes de programação. Em vez de pedir
“faça o site”, você oferece contexto, limites e uma forma objetiva de conferir o
resultado.

## Onde a IA entra

Ferramentas de IA ficam mais úteis quando recebem uma especificação consistente. Elas
podem propor um plano, implementar uma tarefa, executar os checks e comparar o
resultado com os critérios de aceite. Ainda assim, decisões de produto, segurança e
arquitetura continuam exigindo revisão humana.

Um bom pedido para um agente contém:

- o objetivo e o comportamento esperado;
- arquivos ou módulos dentro do escopo;
- restrições técnicas e de segurança;
- comandos de validação;
- o que não deve ser alterado.

## SDD não é cascata

A especificação não precisa ser imutável. Implementar revela limitações, casos de
borda e premissas erradas. No SDD, esse aprendizado volta ao documento antes de o
código seguir adiante. A diferença é manter decisão, implementação e validação
sincronizadas.

Comece pequeno: escolha uma funcionalidade, escreva três critérios de aceite e só
então implemente. Se outra pessoa conseguir entender por que o código existe e provar
que ele funciona, a especificação já está cumprindo seu papel.
