import { ApiResult } from 'api/api.interfaces';
import { ApiResults } from 'api/api.types';
import { Dispatch, SetStateAction } from 'react';

export interface ResultsProps {
  results: ApiResults;
  setDetails: Dispatch<SetStateAction<ApiResult | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
