import { MathUtils } from '../../../common/utils/math-utils';
import { GeometricInstance } from '../geometric-instance';

export class Point implements GeometricInstance {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isEqualTo(pt: Point): boolean {
    return MathUtils.isEqual(pt.x, this.x) && MathUtils.isEqual(pt.y, this.y);
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
