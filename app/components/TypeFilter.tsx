'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, type ChangeEvent } from 'react';
import type { PokemonTypeFilterOption, PokemonTypeName } from '@/types';

type TypeFilterProps = {
  options: PokemonTypeFilterOption[];
  activeType?: PokemonTypeName;
  label: string;
  ariaLabel: string;
  allLabel: string;
};

const TypeFilter = ({ options, activeType, label, ariaLabel, allLabel }: TypeFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as PokemonTypeName | '';

    startTransition(() => {
      const nextParams = new URLSearchParams(searchParams.toString());
      if (value) {
        nextParams.set('type', value);
      } else {
        nextParams.delete('type');
      }
      nextParams.delete('page');
      const query = nextParams.toString();
      router.push(query ? `/?${query}` : '/');
    });
  };

  return (
    <label className="type-filter">
      <span className="type-filter__label">{label}</span>
      <div className="type-filter__control">
        <select
          name="type"
          value={activeType ?? ''}
          onChange={handleChange}
          className="type-filter__select"
          aria-label={ariaLabel}
          disabled={isPending}
        >
          <option value="">{allLabel}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {isPending && <span className="type-filter__spinner" aria-hidden="true" />}
      </div>
    </label>
  );
};

export default TypeFilter;
