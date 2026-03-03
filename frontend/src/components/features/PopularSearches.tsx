import { POPULAR_SEARCHES } from '@/utils/mockData';

export interface PopularSearchesProps {
  onSearchClick: (searchTerm: string) => void;
}

export function PopularSearches({ onSearchClick }: PopularSearchesProps) {
  return (
    <div className="w-full">
      <p className="text-body-sm text-neutral-600 font-body mb-2">
        Popular searches:
      </p>
      <div className="flex flex-wrap gap-2">
        {POPULAR_SEARCHES.map((searchTerm) => (
          <button
            key={searchTerm}
            type="button"
            onClick={() => onSearchClick(searchTerm)}
            className="px-3 py-1 text-body-sm font-body text-neutral-700 bg-white border border-neutral-300 rounded-full hover:border-primary hover:text-primary transition-colors duration-200"
          >
            {searchTerm}
          </button>
        ))}
      </div>
    </div>
  );
}
