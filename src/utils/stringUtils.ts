
export const getStringValue = (str: string, prop: 'value' | 'valueOf'): string => {
  if (prop === 'valueOf') {
    return str.valueOf();
  }
  return str;
};

export const getElementValue = (element: Element): string => {
  if (element && 'value' in element) {
    return (element as HTMLInputElement).value;
  }
  return '';
};

export const getElementStyle = (element: Element): CSSStyleDeclaration | null => {
  if (element && 'style' in element) {
    return (element as HTMLElement).style;
  }
  return null;
};
