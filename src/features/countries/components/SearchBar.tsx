import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useCountries } from "../queries/useCountries";
import { useSuggestions } from "../queries/useSuggestions";
import type { Country } from "../types/countrytype";

interface SearchBarProps {
  onSelectCountry: (countryCode: string) => void; // Changed: Pass code instead of full object
}

// Fetch all countries on mount for suggestions

function SearchBar({ onSelectCountry }: SearchBarProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { isLoading: loadingCountries } = useCountries();

  // Get suggestions based on input
  const suggestions = useSuggestions(input);

  function handleSuggestionClick(country: Country) {
    onSelectCountry(country.cca2); // Pass country code
    setInput(country.name.common);
    setShowSuggestions(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    if (e.target.value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }

  function handleClear() {
    setInput("");
    setShowSuggestions(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setShowSuggestions(false);
    } else if (e.key === "Enter" && suggestions.length > 0) {
      // Select first suggestion on Enter
      handleSuggestionClick(suggestions[0]);
    }
  }

  // Helper function to determine what field matched
  function getMatchInfo(country: Country, query: string): string {
    const lower = query.toLowerCase();

    // Check country name
    if (
      country.name.common.toLowerCase().includes(lower) ||
      country.name.official.toLowerCase().includes(lower)
    ) {
      return "Country name";
    }

    // Check capital
    if (country.capital?.some((cap) => cap.toLowerCase().includes(lower))) {
      return `Capital: ${country.capital[0]}`;
    }

    // Check country codes
    if (
      country.cca2.toLowerCase().includes(lower) ||
      country.cca3.toLowerCase().includes(lower)
    ) {
      return `Code: ${country.cca2}`;
    }

    // Check currencies
    if (country.currencies) {
      const currencyMatch = Object.entries(country.currencies).find(
        ([code, curr]) =>
          code.toLowerCase().includes(lower) ||
          curr.name.toLowerCase().includes(lower),
      );
      if (currencyMatch) {
        return `Currency: ${currencyMatch[0]}`;
      }
    }

    return "Match found";
  }

  return (
    <div className="relative w-full">
      {/* Search Bar */}
      <div className="bg-brand-light flex h-18 w-full items-center rounded-3xl px-5 py-2 shadow-md transition-shadow focus-within:shadow-lg">
        <FaSearch className="text-primary size-6" />

        <input
          type="search"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => input.trim() && setShowSuggestions(true)}
          placeholder="Search by name, capital, code, or currency..."
          className="h-full w-full border-0 bg-transparent pl-3 text-2xl outline-none placeholder:text-gray-400"
          disabled={loadingCountries}
        />

        {input && (
          <button
            onClick={handleClear}
            className="ml-2 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
            aria-label="Clear search"
          >
            <FaTimes className="size-5" />
          </button>
        )}

        {loadingCountries && (
          <div className="border-primary ml-2 h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
        )}
      </div>

      {/* Helper text */}
      <p className="mt-2 text-center text-sm text-gray-500">
        Try: "Nigeria", "Abuja", "NGN", or "Naira"
      </p>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && input.trim() && (
        <div className="ring-opacity-5 absolute z-10 mt-2 max-h-96 w-full overflow-y-auto rounded-xl bg-white shadow-xl ring-1 ring-black">
          {suggestions.map((country) => (
            <button
              key={country.cca3}
              onClick={() => handleSuggestionClick(country)}
              className="flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
            >
              {/* Flag */}
              <img
                src={country.flags.png}
                alt={country.flags.alt || `${country.name.common} flag`}
                className="h-10 w-14 rounded object-cover shadow-sm"
              />

              {/* Country Info */}
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {country.name.common}
                </p>
                <div className="mt-1 flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {getMatchInfo(country, input)}
                  </span>
                  {country.capital && (
                    <span className="text-gray-500">
                      📍 {country.capital[0]}
                    </span>
                  )}
                  <span className="text-gray-500">🏴 {country.cca2}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions &&
        input.trim() &&
        suggestions.length === 0 &&
        !loadingCountries && (
          <div className="ring-opacity-5 absolute z-10 mt-2 w-full rounded-xl bg-white p-6 text-center shadow-xl ring-1 ring-black">
            <p className="text-gray-600">
              No countries found matching "{input}"
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Try searching by name, capital, code, or currency
            </p>
          </div>
        )}
    </div>
  );
}

export default SearchBar;
