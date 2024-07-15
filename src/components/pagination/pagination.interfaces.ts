export interface PaginationProps {
  page: number;
  count: number;
  setPageHandler: (pageNumber: number) => void;
}
