export const POKEMON_TYPES = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
  'stellar',
  'unknown'
] as const;

export type PokemonTypeName = (typeof POKEMON_TYPES)[number];

export type PokemonListItem = {
  id: number;
  name: string;
  artwork: string;
  types: PokemonTypeName[];
};

export type PokemonListResponse = {
  items: PokemonListItem[];
  total: number;
  page: number;
  pageSize: number;
};

export type PokemonTypeFilterOption = {
  value: PokemonTypeName;
  label: string;
};

export const isPokemonTypeName = (value: string | undefined | null): value is PokemonTypeName =>
  Boolean(value && POKEMON_TYPES.includes(value as PokemonTypeName));

export type PokemonStat = {
  name: string;
  value: number;
};

export type PokemonAbility = {
  name: string;
  isHidden: boolean;
};

export type PokemonDetail = PokemonListItem & {
  height: number;
  weight: number;
  baseExperience: number | null;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
};
