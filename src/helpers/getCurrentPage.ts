export function getCurrentPage(page: string | null): number {
  if (!page) return 1;

  const pageToNumber = parseInt(page);

  if (Number.isNaN(pageToNumber)) return 1;

  return pageToNumber;
}
