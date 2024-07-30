interface LocalStorageData {
  searchValue: string;
}

type LocalStorageKey = keyof LocalStorageData;

export class LocalStorageService {
  public static saveData<K extends LocalStorageKey>(key: K, data: LocalStorageData[K]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key.toString(), JSON.stringify(data));
  }

  public static getData<K extends LocalStorageKey>(key: K): LocalStorageData[K] | null {
    if (typeof window === 'undefined') return null;

    const data = localStorage.getItem(key.toString());
    return data ? JSON.parse(data) : null;
  }

  public static removeData<K extends LocalStorageKey>(key: K): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key.toString());
  }

  public static removeAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  }
}
