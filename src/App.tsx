import { useState } from "react";
import SearchBar from "./features/countries/components/SearchBar";
import SearchResults from "./features/countries/components/SearchResults";
import { useCountryDetails } from "./features/countries/queries/useCountryDetails";

function App() {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null,
  );

  // Fetch full details when a country is selected
  const {
    data: countryDetails,
    isLoading,
    error,
  } = useCountryDetails(selectedCountryCode, "code");

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-100 to-indigo-900 px-4">
      <div className="container max-w-4xl py-12">
        <h1 className="mb-8 w-full bg-linear-to-r from-blue-500 via-black to-orange-300 bg-clip-text text-center text-2xl font-black tracking-normal text-transparent uppercase drop-shadow-sm sm:text-4xl md:text-[100px]">
          Country Finder
        </h1>

        <SearchBar onSelectCountry={setSelectedCountryCode} />

        <SearchResults
          selectedCountry={countryDetails}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
