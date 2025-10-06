export const BASE_API_URL =
  (import.meta.env.VITE_APP_API_URL as string | undefined) ||
  'http://localhost:5000';
