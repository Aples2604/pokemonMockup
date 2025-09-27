import type { Dictionary } from '@/types/i18n';

const en: Dictionary = {
  home: {
    title: 'Pokédex',
    subtitle: 'Browse the Pokédex and drill down by type. Powered by the public PokéAPI.',
    filterLabel: 'Filter by type',
    filterAriaLabel: 'Filter Pokémon by type',
    filterAllOption: 'All types',
    metaAll: 'Showing {start}–{end} of {total} Pokémon.',
    metaType: 'Showing {start}–{end} of {total} Pokémon in the {type} family.',
    empty: 'No Pokémon match your filters.',
    noResults: 'No Pokémon found.'
  },
  pagination: {
    previous: 'Previous',
    next: 'Next',
    goToPage: 'Go to page {page}',
    pageSummary: 'Page {current} of {total}'
  },
  card: {
    viewDetails: 'View details for {name}'
  },
  detail: {
    back: '← Back to Pokédex',
    height: 'Height',
    weight: 'Weight',
    baseExp: 'Base EXP',
    abilities: 'Abilities',
    hiddenAbility: 'Hidden',
    stats: 'Base Stats',
    notFoundTitle: 'Pokémon not found',
    notFoundDescription: 'The Pokémon you requested does not exist in the Pokédex.'
  },
  locale: {
    label: 'Language',
    ariaLabel: 'Switch application language',
    options: {
      en: 'English',
      vi: 'Tiếng Việt'
    }
  }
};

export default en;
