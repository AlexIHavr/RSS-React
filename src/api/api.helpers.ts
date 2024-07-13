import { SearchParams } from './api.consts';
import { ApiData } from './api.interfaces';

const API_URL = 'https://swapi.dev/api/people';

export async function getApiData(searchValue: string, page: number): Promise<ApiData> {
  const response = await fetch(`${API_URL}?search=${searchValue}&${SearchParams.PAGE}=${page}`);
  const data = (await response.json()) as ApiData;

  return data;
}
