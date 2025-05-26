
export const getParentElement = (target: EventTarget | null): HTMLElement | null => {
  if (target && 'parentElement' in target) {
    return (target as HTMLElement).parentElement;
  }
  return null;
};

export const getTargetValue = (target: EventTarget | null): string => {
  if (target && 'value' in target) {
    return (target as HTMLInputElement).value;
  }
  return '';
};
