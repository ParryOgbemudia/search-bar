// Types
export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  cca2: string; // 2-letter country code
  cca3: string; // 3-letter country code
}

export interface CountryContextType {
  countries: Country[];
  selectedCountry: Country | null;
  loading: boolean;
  error: string | null;
  suggestions: Country[];
  fetchAllCountries?: () => Promise<void>;
  fetchCountryByName: (name: string) => Promise<void>;
  fetchCountryByCode: (code: string) => Promise<void>;
  fetchCountryByCapital: (capital: string) => Promise<void>;
  fetchCountryByCurrency: (currency: string) => Promise<void>;
  getSuggestions: (query: string) => void;
  selectCountry: (country: Country) => void;
  clearError: () => void;
}
