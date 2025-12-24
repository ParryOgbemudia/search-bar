import { BASE_URL } from "../constants/endpoints";

// // Specify the fields you need (up to 10 fields max)
// const fields = [
//   "name",
//   "capital",
//   "region",
//   "subregion",
//   "population",
//   "flags",
//   "currencies",
//   "languages",
//   "cca2",
//   "cca3",
// ].join(",");

// export async function fetchAllCountries() {
//   const response = await fetch(`${BASE_URL}/all?fields=${fields}`);

//   // Check for HTTP errors
//   if (!response.ok) {
//     // You can create custom errors based on status
//     if (response.status === 404) {
//       throw new Error(`"Countries endpoint not found.`);
//     }
//     if (response.status === 429) {
//       throw new Error(`Rate limit exceeded. Please try again later.`);
//     }
//     if (response.status >= 500) {
//       throw new Error(`Server error. Please try again later.`);
//     }

//     throw new Error(`Failed to fetch countries: ${response.status}`);
//   }

//   // Parse JSON - this can also throw if response isn't valid JSON
//   return response.json();
// }

// export async function fetchCountryByName(name: string) {
//   if (!name.trim()) {
//     throw new Error("Country name is required");
//   }
//   const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}`);

//   if (!response.ok) {
//     if (response.status === 404) {
//       throw new Error(`Country "${name}" not found`);
//     }
//     throw new Error(`Failed to fetch country (${response.status})`);
//   }

//   return response.json();
// }

// export async function fetchCountryByCode(code: string) {
//   if (!code.trim()) {
//     throw new Error("Code is required");
//   }
//   const response = await fetch(`${BASE_URL}/alpha/${encodeURIComponent(code)}`);

//   if (!response.ok) {
//     if (response.status === 404) {
//       throw new Error(`Country code "${code}" not found`);
//     }
//     throw new Error(`Failed to fetch country (${response.status})`);
//   }

//   return response.json();
// }

// export async function fetchCountryByCapital(capital: string) {
//   if (!capital.trim()) {
//     throw new Error("Capital name is required");
//   }

//   const url = `${BASE_URL}/capital/${encodeURIComponent(capital)}`;
//   console.log("🔍 Fetching from:", url);

//   try {
//     const resp = await fetch(url);

//     if (!resp.ok) {
//       if (resp.status === 404) {
//         throw new Error(`Country with capital "${capital}" not found`);
//       }
//       throw new Error(`Failed to fetch country (${resp.status})`);
//     }

//     return resp.json();
//   } catch (error) {
//     console.error("❌ Fetch error:", error);
//     throw error;
//   }
// }

export async function fetchAllCountries() {
  // Only fetch fields needed for suggestions
  const fields = ["name", "capital", "flags", "cca2", "cca3"].join(",");

  const url = `${BASE_URL}/all?fields=${fields}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.status}`);
  }

  return response.json();
}

// NEW: Fetch full details for a single country
export async function fetchCountryDetails(
  identifier: string,
  type: "name" | "code" | "capital",
) {
  let endpoint = "";

  switch (type) {
    case "name":
      endpoint = `name/${encodeURIComponent(identifier)}`;
      break;
    case "code":
      endpoint = `alpha/${encodeURIComponent(identifier)}`;
      break;
    case "capital":
      endpoint = `capital/${encodeURIComponent(identifier)}`;
      break;
  }

  const response = await fetch(`${BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Country not found: ${response.status}`);
  }

  const data = await response.json();
  // API returns an array, we want the first result
  return Array.isArray(data) ? data[0] : data;
}
