import { ApiResult } from 'api/api.interfaces';

export interface DetailsProps {
  details: ApiResult;
  closeDetailsHandler: () => void;
}
