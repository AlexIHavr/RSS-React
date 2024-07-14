import { ApiResults } from './api.types';

export interface ApiData {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: ApiResults;
}
