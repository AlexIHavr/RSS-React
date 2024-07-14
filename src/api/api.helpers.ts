import { ApiData } from './api.interfaces';
import { ApiResults } from './api.types';

const API_URL = 'https://swapi.dev/api/films';

export async function getApiResults(searchValue: string): Promise<ApiResults> {
  const response = await fetch(`${API_URL}?search=${searchValue}`);
  const data = (await response.json()) as ApiData;

  return data.results;
}
