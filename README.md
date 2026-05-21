# Pokédex

Catálogo de Pokémon construído com **Angular 19** — standalone components, signals, nova sintaxe de control flow (`@if/@for`) e tipagem TypeScript completa.

A aplicação consome a [PokéAPI](https://pokeapi.co) e exibe os **1025 Pokémon** com busca por nome, cards coloridos conforme o tipo e página de detalhes com estatísticas em barras de progresso.

## Funcionalidades

- **Listagem** dos 1025 Pokémon com grid responsivo (3 → 2 → 1 colunas)
- **Busca em tempo real** por nome do Pokémon
- **Cards coloridos** — o gradiente do card muda conforme o tipo primário do Pokémon
- **Página de detalhes** exibe sprite, nome, espécie, ID, tipos, estatísticas (HP, Ataque, Defesa, etc.) com barras de progresso, altura e peso
- **Skeleton loading** durante o carregamento dos dados
- **Cache de 1 hora** na lista de Pokémon e detalhes, evitando requisições repetidas à API

## Arquitetura

```
src/
├── app/
│   ├── app.component.ts          # Root component (standalone)
│   ├── app.config.ts             # Configuração da aplicação (providers)
│   ├── app.routes.ts             # Rotas com lazy loading por componente
│   ├── models/
│   │   └── pokemon.interface.ts  # Interfaces TypeScript (Pokemon, Species, etc.)
│   ├── services/
│   │   └── poke-api.service.ts   # Serviço HTTP com cache e RxJS
│   ├── pages/
│   │   ├── home/                 # Página inicial (lista de Pokémon)
│   │   └── details/              # Página de detalhes do Pokémon
│   └── shared/
│       ├── poke-header/          # Header com logo
│       ├── poke-search/          # Campo de busca com glassmorphism
│       └── poke-list/            # Grid de cards com cores por tipo
├── assets/                       # Imagens, ícones e backgrounds
├── index.html
├── main.ts                       # Bootstrap standalone
└── styles.scss                   # Estilos globais e variáveis CSS
```

### Stack

| Categoria | Tecnologia |
|---|---|
| Framework | Angular 19.2 (standalone) |
| Linguagem | TypeScript 5.6 |
| Estilo | SCSS |
| HTTP | `@angular/common/http` |
| Reatividade | RxJS 7.8 + Signals |
| Testes | Jest 29 |
| Lint | ESLint 9 + Angular ESLint |
| Formatação | Prettier 3 |

## Scripts

```bash
npm start          # Servidor de desenvolvimento (http://localhost:4200)
npm run build      # Build de produção (output em dist/pokedex)
npm test           # Testes unitários com Jest
npm run lint       # Verificação de código com ESLint
npm run format     # Formatação com Prettier
```

## Créditos

Desenvolvido originalmente por **Antonio Denilson Canuto** (2022). Modernizado para Angular 19 em 2026.

Dados fornecidos pela [PokéAPI](https://pokeapi.co).
