import { useMemo } from 'react';

import { Select, type SelectOption } from './Select';

// Get all IANA timezones, memoized at module level
const TIMEZONES = Intl.supportedValuesOf('timeZone');

export type TimezoneSelectProps = {
  value: string | null;
  onValueChange: (value: string | null) => void;
  /** Allow clearing the selection */
  allowNone?: boolean;
  placeholder?: string;
  fill?: boolean;
  disabled?: boolean;
  id?: string;
};

export function TimezoneSelect({
  value,
  onValueChange,
  allowNone = false,
  placeholder = 'Select timezone...',
  fill,
  disabled,
  id,
}: TimezoneSelectProps) {
  const options = useMemo(() => {
    const opts: SelectOption[] = [];

    if (allowNone) {
      opts.push({
        value: '',
        label: 'None',
      });
    }

    for (const tz of TIMEZONES) {
      opts.push({
        value: tz,
        label: tz.replace(/_/g, ' '),
      });
    }

    return opts;
  }, [allowNone]);

  return (
    <Select
      id={id}
      options={options}
      value={value ?? ''}
      onValueChange={(v) => onValueChange(v === '' ? null : v)}
      placeholder={placeholder}
      fill={fill}
      disabled={disabled}
      searchable
      searchPlaceholder="Search timezones..."
    />
  );
}
