export const reduceDimension = (object: any[], dim: string): string[] => [
  ...new Set(object.map((item) => item[dim]?.split(", ") || []).flat()),
];

