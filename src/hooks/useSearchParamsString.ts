import { useSearchParams } from 'react-router-dom';

export function useSearchParamsString(name: string = ''): string {
  const [searchParams] = useSearchParams();

  return `${import.meta.env.BASE_URL}${name}?${searchParams}`;
}
