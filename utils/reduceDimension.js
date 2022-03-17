export const reduceDimension = (object, dim) => [
  ...new Set(object.map((item) => item[dim]?.split(", ") || []).flat()),
];
