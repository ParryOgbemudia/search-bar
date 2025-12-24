import type { Country } from "../types/countrytype";

export function matchesName(c: Country, q: string) {
  return (
    c.name.common.toLowerCase().includes(q) ||
    c.name.official.toLowerCase().includes(q)
  );
}

export function matchesCapital(c: Country, q: string) {
  return c.capital?.some((cap) => cap.toLowerCase().includes(q));
}

export function matchesCurrency(c: Country, q: string) {
  if (!c.currencies) return false;
  return Object.keys(c.currencies).some(
    (code) =>
      code.toLowerCase().includes(q) ||
      c.currencies![code].name.toLowerCase().includes(q),
  );
}

export function matchesCode(c: Country, q: string) {
  return c.cca2.toLowerCase().includes(q) || c.cca3.toLowerCase().includes(q);
}
