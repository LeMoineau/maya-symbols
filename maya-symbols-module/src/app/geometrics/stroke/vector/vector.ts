import { MathUtils } from '../../../../common/utils/math-utils';
import { GeometricInstance } from '../../geometric-instance';

export class Vector implements GeometricInstance {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public isCollinearWith(vector: Vector): boolean {
    return MathUtils.isEqual(vector.x * this.y, vector.y * this.x);
  }

  isEqualTo(instance: GeometricInstance): boolean {
    return (
      instance instanceof Vector &&
      ((MathUtils.isEqual(instance.x, this.x) && MathUtils.isEqual(instance.y, this.y)) ||
        (MathUtils.isEqual(instance.x, -this.x) && MathUtils.isEqual(instance.y, -this.y)))
    );
  }

  toString(): string {
    return `{Vec [${this.x.toString()}, ${this.y.toString()}]}`;
  }
}
