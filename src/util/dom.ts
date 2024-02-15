export const hasAncestorWithId = (element: HTMLElement | null, id: string): boolean => {
  if (!element) return false;
  if (element.id === id) return true;
  return hasAncestorWithId(element.parentElement, id);
};
