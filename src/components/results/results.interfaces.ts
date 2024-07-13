import { ApiResults } from 'api/api.types';

export interface ResultsProps {
  results: ApiResults;
  count: number;
  page: number;
  setPageHandler: (pageNumber: number) => void;
}
