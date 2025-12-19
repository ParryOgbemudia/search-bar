import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

//Types import
import type { Country, CountryContextType } from "../types/countrytype";

const CountryContext = createContext<CountryContextType | undefined>(undefined);

// Provider Component
export function CountryProvider({ children }: { children: ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Country[]>([]);

  const BASE_URL = "https://restcountries.com/v3.1";

  // Fetch by country name
  async function fetchCountryByName(name: string) {
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/name/${encodeURIComponent(name)}`,
      );
      if (!response.ok) throw new Error("Country not found");

      const data: Country[] = await response.json();
      setSelectedCountry(data[0]); // Get first result
      setCountries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Country not found");
    } finally {
      setLoading(false);
    }
  }

  // Fetch by country code (2 or 3 letter)
  async function fetchCountryByCode(code: string) {
    if (!code.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/alpha/${encodeURIComponent(code)}`,
      );
      if (!response.ok) throw new Error("Country not found");

      const data: Country = await response.json();
      setSelectedCountry(data);
      setCountries([data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Country not found");
    } finally {
      setLoading(false);
    }
  }

  // Fetch by capital city
  async function fetchCountryByCapital(capital: string) {
    if (!capital.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/capital/${encodeURIComponent(capital)}`,
      );
      if (!response.ok) throw new Error("Country not found");

      const data: Country[] = await response.json();
      setSelectedCountry(data[0]);
      setCountries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Country not found");
    } finally {
      setLoading(false);
    }
  }

  // Fetch by currency code
  async function fetchCountryByCurrency(currency: string) {
    if (!currency.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/currency/${encodeURIComponent(currency)}`,
      );
      if (!response.ok) throw new Error("Country not found");

      const data: Country[] = await response.json();
      setCountries(data);
      setSelectedCountry(data[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Country not found");
    } finally {
      setLoading(false);
    }
  }

  // Get suggestions based on query (searches locally from all countries)
  function getSuggestions(query: string) {
    if (!query.trim() || countries.length === 0) {
      setSuggestions([]);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const filtered = countries.filter((country) => {
      // Search by name
      const nameMatch =
        country.name.common.toLowerCase().includes(lowerQuery) ||
        country.name.official.toLowerCase().includes(lowerQuery);

      // Search by capital
      const capitalMatch = country.capital?.some((cap) =>
        cap.toLowerCase().includes(lowerQuery),
      );

      // Search by country code
      const codeMatch =
        country.cca2.toLowerCase().includes(lowerQuery) ||
        country.cca3.toLowerCase().includes(lowerQuery);

      // Search by currency
      const currencyMatch =
        country.currencies &&
        Object.keys(country.currencies).some(
          (code) =>
            code.toLowerCase().includes(lowerQuery) ||
            country.currencies![code].name.toLowerCase().includes(lowerQuery),
        );

      return nameMatch || capitalMatch || codeMatch || currencyMatch;
    });

    setSuggestions(filtered.slice(0, 10)); // Limit to 10 suggestions
  }

  // Select a country from suggestions
  function selectCountry(country: Country) {
    setSelectedCountry(country);
    setSuggestions([]);
  }

  // Clear error
  function clearError() {
    setError(null);
  }
  // ... rest of your logic

  const value: CountryContextType = {
    countries,
    selectedCountry,
    loading,
    error,
    suggestions,
    fetchCountryByName,
    fetchCountryByCode,
    fetchCountryByCapital,
    fetchCountryByCurrency,
    getSuggestions,
    selectCountry,
    clearError,
  };

  // FIX: Use CountryContext (the value), not CountryContextType (the type)
  // Corrected JSX
  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
}

// Custom hook remains the same
export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
}
