import { useQuery } from "@tanstack/react-query";
import { fetchCountryDetails } from "../api/countryApi";

export function useCountryDetails(
  identifier: string | null,
  type: "name" | "code" | "capital" = "code",
) {
  return useQuery({
    queryKey: ["country-details", identifier, type],
    queryFn: () => fetchCountryDetails(identifier!, type),
    enabled: !!identifier, // Only fetch when identifier exists
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
}
