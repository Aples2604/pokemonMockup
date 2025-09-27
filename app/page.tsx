import { Suspense } from 'react';
import { resolveLocale } from '@/lib/i18n';
import { isPokemonTypeName } from '@/types';
import PageSkeleton from './components/PageSkeleton';
import PokemonPageContent from './components/PokemonPageContent';

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const getFirstParam = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const parsePage = (value: string | undefined): number => {
  if (!value) {
    return 1;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const HomePage = ({ searchParams }: PageProps) => {
  const pageParam = getFirstParam(searchParams?.page);
  const typeParam = getFirstParam(searchParams?.type);
  const languageParam = getFirstParam(searchParams?.lang);

  const requestedPage = parsePage(pageParam);
  const activeType = isPokemonTypeName(typeParam) ? typeParam : undefined;
  const locale = resolveLocale(languageParam);
  const suspenseKey = `${locale}-${activeType ?? 'all'}-${requestedPage}`;

  return (
    <Suspense key={suspenseKey} fallback={<PageSkeleton />}>
      <PokemonPageContent requestedPage={requestedPage} activeType={activeType} locale={locale} />
    </Suspense>
  );
};

export default HomePage;
