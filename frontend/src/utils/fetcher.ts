export const API_BASE_URL = 'http://localhost:5555/api'; // See backend/src/index.ts

export async function fetcher<T>(path: string = '', baseUrl?: string): Promise<T> {
  const fetchUrl = `${baseUrl ?? API_BASE_URL}${path}`;

  return fetch(fetchUrl).then((res) => {
    if (!res.ok) {
      return Promise.reject(new Error(`Error fetching ${fetchUrl}: ${res.statusText}`));
    }
    return res.json() as Promise<T>;
  });
}
