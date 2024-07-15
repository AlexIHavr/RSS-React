export interface PaginationProps {
  page: number;
  count: number;
  onSetPageHandler: (pageNumber: number) => void;
}
