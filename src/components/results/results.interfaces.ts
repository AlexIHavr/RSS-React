import { ApiResult } from 'api/api.interfaces';
import { ApiResults } from 'api/api.types';
import { Dispatch, SetStateAction } from 'react';

export interface ResultsProps {
  results: ApiResults;
  count: number;
  page: number;
  setPageHandler: (pageNumber: number) => void;
  setDetails: Dispatch<SetStateAction<ApiResult | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
