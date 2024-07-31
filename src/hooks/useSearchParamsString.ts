import { SearchParams } from 'api/api.consts';
import { useSearchParams } from 'next/navigation';

export function useSearchParamsString(name: string = ''): string {
  const searchParams = useSearchParams();

  return `/people/${name}?${searchParams.get(SearchParams.PAGE)}`;
}
