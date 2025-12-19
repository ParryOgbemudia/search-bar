import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useCountry } from "../context/CountryContext";

function SearchBar() {
  const [input, setInput] = useState("");
  const [searchType, setSearchType] = useState<
    "name" | "capital" | "code" | "currency"
  >("name");
  const {
    fetchCountryByName,
    fetchCountryByCapital,
    fetchCountryByCode,
    fetchCountryByCurrency,
    getSuggestions,
    suggestions,
    selectCountry,
    loading,
  } = useCountry();

  // Update suggestions as user types
  useEffect(() => {
    getSuggestions(input);
  }, [input]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleSearch() {
    if (!input.trim()) return;

    // Search based on selected type
    switch (searchType) {
      case "name":
        fetchCountryByName(input);
        break;
      case "capital":
        fetchCountryByCapital(input);
        break;
      case "code":
        fetchCountryByCode(input);
        break;
      case "currency":
        fetchCountryByCurrency(input);
        break;
    }
  }

  function handleSuggestionClick(country: any) {
    selectCountry(country);
    setInput(country.name.common);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="relative w-full">
      {/* Search Type Selector */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSearchType("name")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            searchType === "name"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Name
        </button>
        <button
          onClick={() => setSearchType("capital")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            searchType === "capital"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Capital
        </button>
        <button
          onClick={() => setSearchType("code")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            searchType === "code"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Code
        </button>
        <button
          onClick={() => setSearchType("currency")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            searchType === "currency"
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Currency
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-brand-light flex h-18 w-full items-center justify-center rounded-3xl px-5 py-2 shadow-md">
        <FaSearch
          className="text-primary size-6 cursor-pointer transition-transform hover:scale-110"
          onClick={handleSearch}
        />
        <input
          type="search"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={`Search by ${searchType}...`}
          className="h-full w-full border-0 bg-transparent pl-3 text-2xl outline-none"
          disabled={loading}
        />
        {loading && (
          <div className="border-primary ml-2 h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && input.trim() && (
        <div className="absolute z-10 mt-2 max-h-96 w-full overflow-y-auto rounded-xl bg-white shadow-lg">
          {suggestions.map((country) => (
            <button
              key={country.cca3}
              onClick={() => handleSuggestionClick(country)}
              className="flex w-full items-center gap-4 border-b border-gray-100 px-5 py-3 text-left transition-colors hover:bg-gray-50"
            >
              <img
                src={country.flags.png}
                alt={country.flags.alt || `${country.name.common} flag`}
                className="h-8 w-12 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {country.name.common}
                </p>
                <div className="flex gap-3 text-sm text-gray-500">
                  {country.capital && (
                    <span>Capital: {country.capital[0]}</span>
                  )}
                  <span>Code: {country.cca2}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
