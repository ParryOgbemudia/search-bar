import { useQueryClient } from "@tanstack/react-query";
import type { Country } from "../types/countrytype";
import {
  matchesCapital,
  matchesCode,
  matchesCurrency,
  matchesName,
} from "../utils/helper";

export function useSuggestions(query: string) {
  const queryClient = useQueryClient();
  const countries = queryClient.getQueryData<Country[]>(["countries"]);

  if (!query || !countries) return [];

  const lower = query.toLowerCase();

  return countries
    .filter(
      (c) =>
        matchesName(c, lower) || // ✅ "Nigeria" or "nig"
        matchesCapital(c, lower) || // ✅ "Abuja"
        matchesCurrency(c, lower) || // ✅ "NGN" or "Naira"
        matchesCode(c, lower), // ✅ "NG" or "NGA"
    )
    .slice(0, 10); // ✅ Max 10 results
}
