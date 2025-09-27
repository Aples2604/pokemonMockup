import Link from 'next/link';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import type { PokemonTypeName } from '@/types';

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  activeType?: PokemonTypeName;
  locale: Locale;
  labels: {
    previous: string;
    next: string;
    goToPage: (page: number) => string;
    pageSummary: (current: number, total: number) => string;
  };
};

type PaginationQuery = {
  page?: string;
  type?: PokemonTypeName;
  lang?: Locale;
};

type PaginationHref = {
  pathname: '/';
  query?: PaginationQuery;
};

const buildHref = (page: number, activeType: PokemonTypeName | undefined, locale: Locale): PaginationHref => {
  const query: PaginationQuery = {};
  if (page > 1) {
    query.page = String(page);
  }
  if (activeType) {
    query.type = activeType;
  }
  if (locale !== DEFAULT_LOCALE) {
    query.lang = locale;
  }

  if (Object.keys(query).length === 0) {
    return { pathname: '/' };
  }

  return {
    pathname: '/',
    query
  };
};

const Pagination = ({ currentPage, totalItems, pageSize, activeType, locale, labels }: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalPages <= 1) {
    return null;
  }

  const windowSize = 2;
  const startPage = Math.max(1, currentPage - windowSize);
  const endPage = Math.min(totalPages, currentPage + windowSize);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  const previousHref = currentPage > 1 ? buildHref(currentPage - 1, activeType, locale) : undefined;
  const nextHref = currentPage < totalPages ? buildHref(currentPage + 1, activeType, locale) : undefined;

  return (
    <nav className="pagination" aria-label="Pagination">
      <div className="pagination__controls">
        {previousHref ? (
          <Link className="pagination__button" href={previousHref} prefetch={false}>
            {labels.previous}
          </Link>
        ) : (
          <span className="pagination__button pagination__button--disabled">{labels.previous}</span>
        )}
        <ul className="pagination__list">
          {startPage > 1 && (
            <li>
              <Link
                className="pagination__page"
                href={buildHref(1, activeType, locale)}
                aria-label={labels.goToPage(1)}
                prefetch={false}
              >
                1
              </Link>
            </li>
          )}
          {startPage > 2 && <li className="pagination__ellipsis">…</li>}
          {pages.map((page) => (
            <li key={page}>
              <Link
                className={
                  page === currentPage ? 'pagination__page pagination__page--active' : 'pagination__page'
                }
                href={buildHref(page, activeType, locale)}
                aria-current={page === currentPage ? 'page' : undefined}
                aria-label={labels.goToPage(page)}
                prefetch={false}
              >
                {page}
              </Link>
            </li>
          ))}
          {endPage < totalPages - 1 && <li className="pagination__ellipsis">…</li>}
          {endPage < totalPages && (
            <li>
              <Link
                className="pagination__page"
                href={buildHref(totalPages, activeType, locale)}
                aria-label={labels.goToPage(totalPages)}
                prefetch={false}
              >
                {totalPages}
              </Link>
            </li>
          )}
        </ul>
        {nextHref ? (
          <Link className="pagination__button" href={nextHref} prefetch={false}>
            {labels.next}
          </Link>
        ) : (
          <span className="pagination__button pagination__button--disabled">{labels.next}</span>
        )}
      </div>
      <p className="pagination__summary">
        {labels.pageSummary(currentPage, totalPages)}
      </p>
    </nav>
  );
};

export default Pagination;
