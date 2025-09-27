import { PAGE_SIZE, fetchPokemonList, fetchPokemonTypes } from '@/lib/pokeapi';
import { formatMessage, getDictionary, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import type { PokemonTypeName } from '@/types';
import PokemonGrid from './PokemonGrid';
import Pagination from './Pagination';
import TypeFilter from './TypeFilter';
import LocaleSwitcher from './LocaleSwitcher';

type PokemonPageContentProps = {
  requestedPage: number;
  activeType?: PokemonTypeName;
  locale: Locale;
};

const PokemonPageContent = async ({ requestedPage, activeType, locale }: PokemonPageContentProps) => {
  const [typeOptions, initialList] = await Promise.all([
    fetchPokemonTypes(),
    fetchPokemonList(requestedPage, PAGE_SIZE, activeType)
  ]);

  const dictionary = await getDictionary(locale);
  const { home, pagination, card } = dictionary;

  const computedTotalPages = Math.max(1, Math.ceil(initialList.total / initialList.pageSize));
  const effectivePage = Math.min(requestedPage, computedTotalPages);

  const pokemonList =
    effectivePage === requestedPage
      ? initialList
      : await fetchPokemonList(effectivePage, PAGE_SIZE, activeType);

  const startIndex = pokemonList.items.length ? (effectivePage - 1) * pokemonList.pageSize + 1 : 0;
  const endIndex = pokemonList.items.length ? startIndex + pokemonList.items.length - 1 : 0;
  const returnToParams = new URLSearchParams();
  if (activeType) {
    returnToParams.set('type', activeType);
  }
  if (effectivePage > 1) {
    returnToParams.set('page', String(effectivePage));
  }
  if (locale !== DEFAULT_LOCALE) {
    returnToParams.set('lang', locale);
  }
  const returnToPath = returnToParams.toString() ? `/?${returnToParams.toString()}` : undefined;

  const paginationLabels = {
    previous: pagination.previous,
    next: pagination.next,
    goToPage: (page: number) => formatMessage(pagination.goToPage, { page }),
    pageSummary: (current: number, total: number) => formatMessage(pagination.pageSummary, { current, total })
  };

  const typeLabel = activeType ? activeType.charAt(0).toUpperCase() + activeType.slice(1) : '';

  const metaText = pokemonList.total > 0
    ? formatMessage(activeType ? home.metaType : home.metaAll, {
        start: startIndex,
        end: endIndex,
        total: pokemonList.total,
        type: typeLabel
      })
    : home.noResults;

  return (
    <main className="page">
      <header className="page__header">
        <div>
          <h1 className="page__title">{home.title}</h1>
          <p className="page__subtitle">{home.subtitle}</p>
        </div>
        <div className="page__actions">
          <LocaleSwitcher
            locale={locale}
            label={dictionary.locale.label}
            ariaLabel={dictionary.locale.ariaLabel}
            options={dictionary.locale.options}
          />
          <TypeFilter
            options={typeOptions}
            activeType={activeType}
            label={home.filterLabel}
            ariaLabel={home.filterAriaLabel}
            allLabel={home.filterAllOption}
          />
        </div>
      </header>

      <section className="page__meta" aria-live="polite">
        <p>{metaText}</p>
      </section>

      <PokemonGrid
        items={pokemonList.items}
        returnTo={returnToPath}
        emptyMessage={home.empty}
        locale={locale}
        cardLabelTemplate={card.viewDetails}
      />

      <Pagination
        currentPage={effectivePage}
        totalItems={pokemonList.total}
        pageSize={pokemonList.pageSize}
        activeType={activeType}
        locale={locale}
        labels={paginationLabels}
      />
    </main>
  );
};

export default PokemonPageContent;
