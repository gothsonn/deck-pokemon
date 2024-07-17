# DeckPokemon
## Descrição do Projeto

Este projeto é uma aplicação web desenvolvida usando Angular 16+ para permitir que jogadores de Pokémon TCG criem, removam e visualizem baralhos de cartas. A aplicação consome a API do Pokémon TCG (https://docs.pokemontcg.io/#api_v1cards_list) e fornece uma interface de usuário rica e interativa utilizando Tailwind CSS e a biblioteca UI Infragistics.

## Funcionalidades

### Lista de Baralhos

- Visualizar todos os baralhos criados.
- Criar um novo baralho.
- Remover um baralho existente.
- Visualizar os detalhes de um baralho ao clicar nele.

### Criação de um Baralho

- Adicionar um nome ao baralho.
- Inserir cartas no baralho.
- Restrições:
    - O baralho deve conter no mínimo 24 cartas e no máximo 60 cartas.
    - Apenas 4 cartas com o mesmo nome são permitidas em um baralho.
- Após salvar, o usuário é redirecionado para a lista de baralhos atualizada.
- Os baralhos são salvos apenas em memória.

### Detalhes do Baralho

- Visualizar a quantidade de Pokémon e cartas de treinador no baralho (atributo supertype).
- Visualizar a quantidade de cores (types únicos) no baralho.

## Tecnologias Utilizadas

- **Angular 16+**: Framework principal para o desenvolvimento da aplicação.
- **Tailwind CSS**: Utilizado para estilização rápida e responsiva.
- **Infragistics UI**: Biblioteca de componentes UI para Angular.

## Requisitos Adicionais

- **Virtualização**: Utilizada para melhorar a performance ao renderizar listas longas de cartas.
- **Componentes Standalone**: Utilizados para modularizar a aplicação e facilitar o reuso de componentes.
- **Signals**: Implementados para gerenciar estados reativos de maneira eficiente.
- **Diretivas Angular `@if` (Angular v17)**: Utilizadas para renderização condicional de componentes.
- **Lazy Loading**: Implementado para carregar módulos de forma assíncrona e otimizar o desempenho da aplicação.
- **Infragistics Templates**: Utilizados para fornecer uma interface de usuário rica e consistente.

## Estrutura do Projeto

```markdown
src/
├── app/
│   ├── components/
│   │   ├── deck-list/
│   │   │   ├── deck-list.component.ts
│   │   │   ├── deck-list.component.html
│   │   │   ├── deck-list.component.css
│   │   ├── deck-create/
│   │   │   ├── deck-create.component.ts
│   │   │   ├── deck-create.component.html
│   │   │   ├── deck-create.component.css
│   │   ├── deck-details/
│   │   │   ├── deck-details.component.ts
│   │   │   ├── deck-details.component.html
│   │   │   ├── deck-details.component.css
│   │   ├── dialog/
│   │   │   ├── dialog.component.ts
│   │   │   ├── dialog.component.html
│   │   │   ├── dialog.component.css
│   │   ├── deck-details/
│   │   │   ├── navbar.component.ts
│   │   │   ├── navbar.component.html
│   │   │   ├── navbar.component.css
│   ├── models/
│   │   ├── card.model.ts
│   │   ├── deck.model.ts
│   ├── services/
│   │   ├── deck.service.ts
│   │   ├── pokemon-tcg.service.ts
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.ts
│   ├── app.config.server.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app-routing.module.ts
├── index.html
├── main.server.ts
├── main.ts
├── styles.css
```
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.