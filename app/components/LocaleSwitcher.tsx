'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, type ChangeEvent } from 'react';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '@/lib/i18n';

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
  ariaLabel: string;
  options: Record<Locale, string>;
};

const LocaleSwitcher = ({ locale, label, ariaLabel, options }: LocaleSwitcherProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Locale;

    startTransition(() => {
      const nextParams = new URLSearchParams(searchParams.toString());
      if (value === DEFAULT_LOCALE) {
        nextParams.delete('lang');
      } else {
        nextParams.set('lang', value);
      }
      const query = nextParams.toString();
      router.push(query ? `/?${query}` : '/');
    });
  };

  return (
    <label className="locale-switcher">
      <span className="locale-switcher__label">{label}</span>
      <div className="locale-switcher__control">
        <select
          name="lang"
          value={locale}
          onChange={handleChange}
          aria-label={ariaLabel}
          className="locale-switcher__select"
          disabled={isPending}
        >
          {SUPPORTED_LOCALES.map((item) => (
            <option key={item} value={item}>
              {options[item]}
            </option>
          ))}
        </select>
        {isPending && <span className="locale-switcher__spinner" aria-hidden="true" />}
      </div>
    </label>
  );
};

export default LocaleSwitcher;
