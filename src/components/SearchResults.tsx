import { useCountry } from "../context/CountryContext";

function SearchResults() {
  const { selectedCountry, loading, error, clearError } = useCountry();

  // Show loading state
  if (loading) {
    return (
      <div className="mt-8 flex w-full items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="mt-8 w-full rounded-xl bg-red-50 p-6 text-center">
        <p className="text-lg font-semibold text-red-600">Error</p>
        <p className="mt-2 text-red-500">{error}</p>
        <button
          onClick={clearError}
          className="mt-4 rounded-lg bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700"
        >
          Clear Error
        </button>
      </div>
    );
  }

  // Show selected country
  if (selectedCountry) {
    const currencies = selectedCountry.currencies
      ? Object.values(selectedCountry.currencies)
          .map((c) => `${c.name} (${c.symbol})`)
          .join(", ")
      : "N/A";

    const languages = selectedCountry.languages
      ? Object.values(selectedCountry.languages).join(", ")
      : "N/A";

    return (
      <div className="mt-8 w-full rounded-2xl bg-white p-8 shadow-lg">
        {/* Flag and Name */}
        <div className="flex items-center gap-6">
          <img
            src={selectedCountry.flags.svg}
            alt={
              selectedCountry.flags.alt || `${selectedCountry.name.common} flag`
            }
            className="h-24 w-36 rounded-lg object-cover shadow-md"
          />
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              {selectedCountry.name.common}
            </h2>
            <p className="mt-1 text-xl text-gray-500">
              {selectedCountry.name.official}
            </p>
          </div>
        </div>

        {/* Country Details Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Capital
            </p>
            <p className="mt-1 text-lg text-gray-900">
              {selectedCountry.capital?.[0] || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Region
            </p>
            <p className="mt-1 text-lg text-gray-900">
              {selectedCountry.region}
              {selectedCountry.subregion && ` (${selectedCountry.subregion})`}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Population
            </p>
            <p className="mt-1 text-lg text-gray-900">
              {selectedCountry.population.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Country Codes
            </p>
            <p className="mt-1 text-lg text-gray-900">
              {selectedCountry.cca2} / {selectedCountry.cca3}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Currencies
            </p>
            <p className="mt-1 text-lg text-gray-900">{currencies}</p>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
              Languages
            </p>
            <p className="mt-1 text-lg text-gray-900">{languages}</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  return (
    <div className="mt-8 w-full rounded-xl bg-gray-50 p-12 text-center">
      <p className="text-xl text-gray-500">
        Search for a country to see details
      </p>
    </div>
  );
}

export default SearchResults;
