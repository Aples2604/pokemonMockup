import { cache } from 'react';
import type {
  PokemonAbility,
  PokemonDetail,
  PokemonListItem,
  PokemonListResponse,
  PokemonStat,
  PokemonTypeFilterOption,
  PokemonTypeName
} from '@/types';
import { POKEMON_TYPES } from '@/types';

const API_BASE_URL = process.env.API_BASE_URL ?? 'https://pokeapi.co/api/v2';
const ARTWORK_BASE_URL =
  process.env.ARTWORK_BASE_URL ??
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export const PAGE_SIZE = 20;
const REVALIDATE_SECONDS = 60 * 60;

const knownTypeSet = new Set<string>(POKEMON_TYPES);

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: REVALIDATE_SECONDS }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

type PokeApiListResult = {
  name: string;
  url: string;
};

type PokeApiPokemonType = {
  pokemon: PokeApiListResult;
};

type PokeApiPokemonResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  sprites: {
    front_default: string | null;
    other?: {
      ['official-artwork']?: {
        front_default: string | null;
      };
    };
  };
  abilities: Array<{
    is_hidden: boolean;
    ability: { name: string };
  }>;
  types: Array<{
    slot: number;
    type: { name: string };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: { name: string };
  }>;
};

const toArtworkUrl = (id: number): string => `${ARTWORK_BASE_URL}/${id}.png`;

const mapPokemonSummary = (data: PokeApiPokemonResponse): PokemonListItem => {
  const officialArtwork =
    data.sprites.other?.['official-artwork']?.front_default ?? data.sprites.front_default ?? toArtworkUrl(data.id);

  const types = data.types
    .map((entry) => entry.type.name)
    .filter((typeName): typeName is PokemonTypeName => knownTypeSet.has(typeName));

  return {
    id: data.id,
    name: data.name,
    artwork: officialArtwork,
    types
  };
};

const mapPokemonDetail = (data: PokeApiPokemonResponse): PokemonDetail => {
  const summary = mapPokemonSummary(data);

  const abilities: PokemonAbility[] = data.abilities.map((entry) => ({
    name: entry.ability.name,
    isHidden: entry.is_hidden
  }));

  const stats: PokemonStat[] = data.stats.map((entry) => ({
    name: entry.stat.name,
    value: entry.base_stat
  }));

  return {
    ...summary,
    height: data.height,
    weight: data.weight,
    baseExperience: data.base_experience ?? null,
    abilities,
    stats
  };
};

const fetchPokemonRaw = cache(async (identifier: string): Promise<PokeApiPokemonResponse> => {
  return fetchJson<PokeApiPokemonResponse>(`${API_BASE_URL}/pokemon/${identifier}`);
});

const fetchPokemonSummary = async (identifier: string): Promise<PokemonListItem> => {
  const data = await fetchPokemonRaw(identifier);
  return mapPokemonSummary(data);
};

export const fetchPokemonDetail = async (identifier: string): Promise<PokemonDetail> => {
  const data = await fetchPokemonRaw(identifier);
  return mapPokemonDetail(data);
};

const extractPokemonId = (url: string): number => {
  const match = /\/pokemon\/(\d+)\/?$/.exec(url);
  if (!match) {
    throw new Error(`Could not extract Pokémon id from ${url}`);
  }
  return Number(match[1]);
};

const fetchPaginatedPokemon = async (page: number, pageSize: number): Promise<PokemonListResponse> => {
  const offset = (page - 1) * pageSize;
  const data = await fetchJson<{
    count: number;
    results: PokeApiListResult[];
  }>(`${API_BASE_URL}/pokemon?offset=${offset}&limit=${pageSize}`);

  const items = await Promise.all(
    data.results.map(async (pokemon) => {
      const id = extractPokemonId(pokemon.url);
      return fetchPokemonSummary(String(id));
    })
  );

  return {
    items,
    total: data.count,
    page,
    pageSize
  };
};

const fetchPokemonByType = async (
  page: number,
  pageSize: number,
  type: PokemonTypeName
): Promise<PokemonListResponse> => {
  const typeData = await fetchJson<{
    pokemon: PokeApiPokemonType[];
  }>(`${API_BASE_URL}/type/${type}`);

  const allPokemon = typeData.pokemon.map((entry) => entry.pokemon);
  const total = allPokemon.length;
  const offset = (page - 1) * pageSize;
  const slice = allPokemon.slice(offset, offset + pageSize);

  const items = await Promise.all(
    slice.map(async (pokemon) => {
      const id = extractPokemonId(pokemon.url);
      return fetchPokemonSummary(String(id));
    })
  );

  return {
    items,
    total,
    page,
    pageSize
  };
};

export const fetchPokemonList = async (
  page: number,
  pageSize: number,
  type?: PokemonTypeName
): Promise<PokemonListResponse> => {
  if (type) {
    return fetchPokemonByType(page, pageSize, type);
  }
  return fetchPaginatedPokemon(page, pageSize);
};

export const fetchPokemonTypes = cache(async (): Promise<PokemonTypeFilterOption[]> => {
  const data = await fetchJson<{
    results: PokeApiListResult[];
  }>(`${API_BASE_URL}/type?limit=100`);

  return data.results
    .filter((type) => knownTypeSet.has(type.name))
    .map((type) => ({
      value: type.name as PokemonTypeName,
      label: type.name.charAt(0).toUpperCase() + type.name.slice(1)
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
});
