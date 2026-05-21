export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
  status?: Pokemon;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
  base_experience: number;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  other: {
    dream_world: {
      front_default: string;
    };
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  names: SpeciesName[];
  genera: Genus[];
  flavor_text_entries: FlavorTextEntry[];
}

export interface SpeciesName {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface Genus {
  genus: string;
  language: {
    name: string;
    url: string;
  };
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export type PokemonTypeName =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export interface TypeColorMap {
  [key: string]: {
    primary: string;
    secondary: string;
    text: string;
  };
}
