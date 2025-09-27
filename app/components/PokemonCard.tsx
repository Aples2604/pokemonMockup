import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_LOCALE, formatMessage, type Locale } from '@/lib/i18n';
import type { PokemonListItem } from '@/types';

type PokemonCardProps = {
  pokemon: PokemonListItem;
  returnTo?: string;
  locale: Locale;
  cardLabelTemplate: string;
};

const formatName = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1);

const PokemonCard = ({ pokemon, returnTo, locale, cardLabelTemplate }: PokemonCardProps) => {
  const idLabel = `#${pokemon.id.toString().padStart(3, '0')}`;
  const formattedName = formatName(pokemon.name);
  const query: Record<string, string> = {};
  if (returnTo) {
    query.returnTo = returnTo;
  }
  if (locale !== DEFAULT_LOCALE) {
    query.lang = locale;
  }

  const href = Object.keys(query).length
    ? { pathname: `/pokemon/${pokemon.id}` as const, query }
    : (`/pokemon/${pokemon.id}` as const);

  const ariaLabel = formatMessage(cardLabelTemplate, { name: formattedName });

  return (
    <article className="pokemon-card" role="listitem">
      <Link
        href={href}
        className="pokemon-card__link"
        aria-label={ariaLabel}
      >
        <span className="pokemon-card__id">{idLabel}</span>
        <div className="pokemon-card__image-wrapper">
          <Image
            src={pokemon.artwork}
            alt={formattedName}
            width={256}
            height={256}
            className="pokemon-card__image"
            priority={pokemon.id <= 20}
          />
        </div>
        <h3 className="pokemon-card__name">{formattedName}</h3>
        <ul className="pokemon-card__types">
          {pokemon.types.map((type) => (
            <li key={type} className={`type-pill type-pill--${type}`}>
              {formatName(type)}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
};

export default PokemonCard;
