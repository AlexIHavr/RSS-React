import { SearchParams, TYPE_API_DATA } from './api.consts';
import { ApiData, ApiResult } from './api.interfaces';

const API_URL = `https://swapi.dev/api/${TYPE_API_DATA}`;

export async function getApiData(searchValue: string, page: number): Promise<ApiData> {
  const response = await fetch(`${API_URL}?search=${searchValue}&${SearchParams.PAGE}=${page}`);
  const data = (await response.json()) as ApiData;

  return data;
}

export async function getApiItem(name: string): Promise<ApiResult | null> {
  const response = await fetch(`${API_URL}?search=${name}`);
  const data = (await response.json()) as ApiData;

  return data.results?.[0] ?? null;
}
