import { useSearchParams } from 'react-router-dom';

export function useSearchParamsString(name: string = ''): string {
  const [searchParams] = useSearchParams();

  return `${process.env.NEXT_PUBLIC_BASE_PATH}${name}?${searchParams}`;
}
