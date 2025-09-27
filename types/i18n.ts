export type Dictionary = {
  home: {
    title: string;
    subtitle: string;
    filterLabel: string;
    filterAriaLabel: string;
    filterAllOption: string;
    metaAll: string;
    metaType: string;
    empty: string;
    noResults: string;
  };
  pagination: {
    previous: string;
    next: string;
    goToPage: string;
    pageSummary: string;
  };
  card: {
    viewDetails: string;
  };
  detail: {
    back: string;
    height: string;
    weight: string;
    baseExp: string;
    abilities: string;
    hiddenAbility: string;
    stats: string;
    notFoundTitle: string;
    notFoundDescription: string;
  };
  locale: {
    label: string;
    ariaLabel: string;
    options: Record<string, string>;
  };
};
