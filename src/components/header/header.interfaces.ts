export interface HeaderProps {
  page: number;
  onSearchHandler: (currentPage: number, savedValue?: string | null) => Promise<void>;
}
