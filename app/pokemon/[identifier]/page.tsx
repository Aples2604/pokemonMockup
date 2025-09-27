import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchPokemonDetail } from '@/lib/pokeapi';
import { DEFAULT_LOCALE, getDictionary, resolveLocale, type Locale } from '@/lib/i18n';

const formatLabel = (value: string): string =>
  value
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');

type PageParams = {
  identifier: string;
};

type PageSearchParams = Record<string, string | string[] | undefined>;

type PageProps = {
  params: PageParams;
  searchParams?: PageSearchParams;
};

const getFirstParam = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

type RootHref = {
  pathname: '/';
  query?: Record<string, string>;
};

const resolveReturnPath = (searchParams: PageSearchParams | undefined, locale: Locale): RootHref => {
  const raw = getFirstParam(searchParams?.returnTo);
  if (raw) {
    try {
      const url = new URL(raw, 'https://example.com');
      const query: Record<string, string> = {};
      url.searchParams.forEach((value, key) => {
        query[key] = value;
      });
      return {
        pathname: '/',
        query: Object.keys(query).length ? query : undefined
      };
    } catch (error) {
      // fall through to default handling
    }
  }

  const fallbackQuery: Record<string, string> = {};
  if (locale !== DEFAULT_LOCALE) {
    fallbackQuery.lang = locale;
  }

  return {
    pathname: '/',
    query: Object.keys(fallbackQuery).length ? fallbackQuery : undefined
  };
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const identifier = decodeURIComponent(params.identifier);

  try {
    const pokemon = await fetchPokemonDetail(identifier);
    const title = `${formatLabel(pokemon.name)} · Pokédex #${pokemon.id.toString().padStart(3, '0')}`;

    return {
      title,
      description: `Thông tin chi tiết về ${formatLabel(pokemon.name)} trong Pokédex.`
    };
  } catch (error) {
    return {
      title: 'Pokémon không tồn tại',
      description: 'Pokémon bạn tìm không tồn tại trong Pokédex.'
    };
  }
};

const PokemonDetailPage = async ({ params, searchParams }: PageProps) => {
  const identifier = decodeURIComponent(params.identifier);
  const localeParam = getFirstParam(searchParams?.lang);
  const locale = resolveLocale(localeParam);
  const returnPath = resolveReturnPath(searchParams, locale);

  const dictionary = await getDictionary(locale);
  const { detail } = dictionary;

  const pokemon = await fetchPokemonDetail(identifier).catch(() => null);

  if (!pokemon) {
    notFound();
  }

  const idLabel = `#${pokemon.id.toString().padStart(3, '0')}`;
  const heightInMeters = (pokemon.height / 10).toFixed(1);
  const weightInKilograms = (pokemon.weight / 10).toFixed(1);

  return (
    <main className="pokemon-detail">
      <Link className="pokemon-detail__back" href={returnPath} prefetch={false}>
        {detail.back}
      </Link>

      <section className="pokemon-detail__hero">
        <div className="pokemon-detail__image">
          <Image
            src={pokemon.artwork}
            alt={formatLabel(pokemon.name)}
            width={384}
            height={384}
            priority
          />
        </div>
        <div className="pokemon-detail__summary">
          <span className="pokemon-detail__id">{idLabel}</span>
          <h1 className="pokemon-detail__name">{formatLabel(pokemon.name)}</h1>
          <ul className="pokemon-detail__types">
            {pokemon.types.map((type) => (
              <li key={type} className={`type-pill type-pill--${type}`}>
                {formatLabel(type)}
              </li>
            ))}
          </ul>
          <dl className="pokemon-detail__stats">
            <div>
              <dt>{detail.height}</dt>
              <dd>{heightInMeters} m</dd>
            </div>
            <div>
              <dt>{detail.weight}</dt>
              <dd>{weightInKilograms} kg</dd>
            </div>
            {pokemon.baseExperience !== null && (
              <div>
                <dt>{detail.baseExp}</dt>
                <dd>{pokemon.baseExperience}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section className="pokemon-detail__content">
        <div className="pokemon-detail__panel">
          <h2>{detail.abilities}</h2>
          <ul className="pokemon-detail__abilities">
            {pokemon.abilities.map((ability) => (
              <li key={ability.name}>
                <span>{formatLabel(ability.name)}</span>
                {ability.isHidden && <span className="pokemon-detail__ability-tag">{detail.hiddenAbility}</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="pokemon-detail__panel">
          <h2>{detail.stats}</h2>
          <ul className="pokemon-detail__base-stats">
            {pokemon.stats.map((stat) => {
              const percent = Math.min(stat.value, 255) / 255;
              return (
                <li key={stat.name}>
                  <span className="pokemon-detail__stat-name">{formatLabel(stat.name)}</span>
                  <span className="pokemon-detail__stat-value">{stat.value}</span>
                  <span className="pokemon-detail__stat-bar">
                    <span className="pokemon-detail__stat-bar-fill" style={{ width: `${Math.round(percent * 100)}%` }} />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default PokemonDetailPage;
