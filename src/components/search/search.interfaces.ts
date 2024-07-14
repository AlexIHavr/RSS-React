import { ApiResults } from 'api/api.types';

export interface SearchState {
  results: ApiResults;
  isLoading: boolean;
  isError: boolean;
}
