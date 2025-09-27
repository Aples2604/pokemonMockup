import type { PokemonListItem } from '@/types';
import type { Locale } from '@/lib/i18n';
import PokemonCard from './PokemonCard';

type PokemonGridProps = {
  items: PokemonListItem[];
  returnTo?: string;
  emptyMessage: string;
  locale: Locale;
  cardLabelTemplate: string;
};

const PokemonGrid = ({ items, returnTo, emptyMessage, locale, cardLabelTemplate }: PokemonGridProps) => {
  if (!items.length) {
    return <p className="pokemon-grid__empty">{emptyMessage}</p>;
  }

  return (
    <section aria-label="Pokémon results" className="pokemon-grid">
      <div className="pokemon-grid__list" role="list">
        {items.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            returnTo={returnTo}
            locale={locale}
            cardLabelTemplate={cardLabelTemplate}
          />
        ))}
      </div>
    </section>
  );
};

export default PokemonGrid;
