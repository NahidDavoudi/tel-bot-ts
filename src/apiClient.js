import "dotenv/config";


const API_URL = process.env.API_BASE;
const API_KEY = process.env.API_KEY;

if (!API_URL) {
  throw new Error("FAMO_API_URL is not defined");
}

if (!API_KEY) {
  throw new Error("FAMO_API_KEY is not defined");
}

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `Famo API error: ${response.status}`
    );
  }

  return data;
}