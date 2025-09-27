import type { Dictionary } from '@/types/i18n';

export const SUPPORTED_LOCALES = ['en', 'vi'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('@/locales/en').then((mod) => mod.default),
  vi: () => import('@/locales/vi').then((mod) => mod.default)
};

export const resolveLocale = (value: string | undefined | null): Locale => {
  if (!value) {
    return DEFAULT_LOCALE;
  }
  if (SUPPORTED_LOCALES.includes(value as Locale)) {
    return value as Locale;
  }
  const normalized = value.split('-')[0];
  if (SUPPORTED_LOCALES.includes(normalized as Locale)) {
    return normalized as Locale;
  }
  return DEFAULT_LOCALE;
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => dictionaries[locale]();

export const formatMessage = (
  template: string,
  values: Record<string, string | number>
): string =>
  template.replace(/\{(.*?)\}/g, (match, key) => {
    const value = values[key.trim()];
    return value !== undefined ? String(value) : match;
  });
