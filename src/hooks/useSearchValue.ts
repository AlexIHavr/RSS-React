import { useEffect, useState } from 'react';
import { LocalStorageService } from 'services/localStorage.service';

export function useSearchValue(): string {
  const [searchValue] = useState('');

  useEffect(() => {
    return (): void => LocalStorageService.saveData('searchValue', searchValue);
  }, [searchValue]);

  return searchValue;
}
