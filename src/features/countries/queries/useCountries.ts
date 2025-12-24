import { useQuery } from "@tanstack/react-query";
import { fetchAllCountries } from "../api/countryApi";

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
    staleTime: 1000 * 60 * 60, // 1 hour cache
    retry: 1, // Only retry once on failure
    retryDelay: 2000, // Wait 2 seconds before retry
  });
}
