import { SearchParams } from 'api/api.consts';
import { useSearchParams } from 'next/navigation';

export function useSearchParamsString(name: string = ''): string {
  const searchParams = useSearchParams();

  return `${process.env.NEXT_PUBLIC_BASE_PATH}${name}?${searchParams.get(SearchParams.PAGE)}`;
}
