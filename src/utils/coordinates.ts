
export type Coordinates = [number, number];

export const ensureCoordinates = (coords: number[] | undefined): Coordinates => {
  if (!coords || coords.length < 2) {
    return [0, 0]; // Default coordinates
  }
  return [coords[0], coords[1]] as Coordinates;
};

export const parseCoordinates = (coordString: string): Coordinates => {
  try {
    const parsed = JSON.parse(coordString);
    return ensureCoordinates(parsed);
  } catch {
    return [0, 0];
  }
};
