import { SearchParams } from 'api/api.consts';
import { useSearchParams } from 'next/navigation';

export function useSearchParamsString(path: string = '/', name: string = ''): string {
  const searchParams = useSearchParams();
  const params = new URLSearchParams();
  params.set(SearchParams.PAGE, String(searchParams.get(SearchParams.PAGE) ?? 1));

  return `${path}/${name}?${params}`;
}
