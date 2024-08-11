import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LocalStorageService } from 'services/localStorage.service';

export function useSearchValue(): [string, Dispatch<SetStateAction<string>>] {
  const [searchValue, setSearchValue] = useState(LocalStorageService.getData('searchValue') ?? '');

  useEffect(() => {
    LocalStorageService.saveData('searchValue', searchValue);
  }, [searchValue]);

  return [searchValue, setSearchValue];
}
