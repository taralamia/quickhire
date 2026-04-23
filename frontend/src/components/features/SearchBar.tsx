import type { SearchParams } from '@/types/api';
import type { QHDropdownOption } from '@/components/ui/QHDropdown';
import { QHInput } from '@/components/ui/QHInput';
import { QHDropdown } from '@/components/ui/QHDropdown';
import { QHButton } from '@/components/ui/QHButton';
import { TEXT } from '@/constants/text';
import { POPULAR_SEARCHES } from '@/utils/mockData';
import { useState } from 'react';

export interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
  initialQuery?: string;
  initialLocation?: string;
}

const LOCATION_OPTIONS: QHDropdownOption[] = [
  { value: '', label: TEXT.hero.locationPlaceholder },
  { value: 'San Francisco, CA', label: 'San Francisco, CA' },
  { value: 'New York, NY', label: 'New York, NY' },
  { value: 'Austin, TX', label: 'Austin, TX' },
  { value: 'Seattle, WA', label: 'Seattle, WA' },
  { value: 'Chicago, IL', label: 'Chicago, IL' },
  { value: 'Boston, MA', label: 'Boston, MA' },
  { value: 'Denver, CO', label: 'Denver, CO' },
  { value: 'Portland, OR', label: 'Portland, OR' },
  { value: 'Los Angeles, CA', label: 'Los Angeles, CA' },
  { value: 'Remote', label: 'Remote' },
];

export function SearchBar({ onSearch, initialQuery = '', initialLocation = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const searchParams: SearchParams = {};

    if (query.trim()) {
      searchParams.query = query.trim();
    }

    if (location) {
      searchParams.location = location;
    }

    onSearch(searchParams);
  };


  return (
    <div className="w-full">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col md:flex-row gap-3 bg-white rounded-lg p-2 shadow-lg">
          {/* Job Title Input */}
          <div className="flex-1">
            <QHInput
              type="search"
              placeholder={TEXT.hero.searchPlaceholder}
              value={query}
              onChange={setQuery}
              className="border-0 focus:ring-0"
              id="job-search-input"
              name="query"
            />
          </div>

          {/* Location Dropdown */}
          <div className="flex-1">
            <QHDropdown
              options={LOCATION_OPTIONS}
              value={location}
              onChange={setLocation}
              placeholder={TEXT.hero.locationPlaceholder}
              className="border-0 focus:ring-0"
              id="location-dropdown"
              name="location"
            />
          </div>

          {/* Search Button */}
          <div className="md:w-auto">
            <QHButton
              variant="primary"
              size="md"
              type="submit"
              className="w-full md:w-auto whitespace-nowrap"
            >
              {TEXT.hero.searchButton}
            </QHButton>
          </div>
        </div>
      </form>

      {/* Popular Search Terms */}
      <div className="mt-4">
        <p className="text-body-sm text-neutral-600 font-body mb-2">
          <span className="font-semibold">{TEXT.hero.popular}</span> {POPULAR_SEARCHES.join(', ')}
        </p>
      </div>
    </div>
  );
}
