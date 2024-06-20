export type LineEquation = {
  a?: number;
  b?: number;
  x: (y: number) => number;
  y: (x: number) => number;
};

export function isLineEquation(equation: any): equation is LineEquation {
  return equation && equation.x && equation.y;
}
