import { ApiResults } from './api.types';

export interface ApiResult {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
}

export interface ApiData {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: ApiResults;
}
