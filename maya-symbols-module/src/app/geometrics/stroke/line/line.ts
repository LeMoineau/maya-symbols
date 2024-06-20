import { LineEquation, isLineEquation } from '../../../../common/types/LineEquation';
import { MathUtils } from '../../../../common/utils/math-utils';
import { Point } from '../../point/point';
import { Stroke } from '../stroke';

export class Line extends Stroke {
  public equation: LineEquation;

  constructor(pointsOrEquation: Point[] | { a: number; b: number }) {
    super();
    if (Array.isArray(pointsOrEquation)) {
      this.points = pointsOrEquation;
      this.equation = this._calculateEquation();
    } else if (pointsOrEquation.a && pointsOrEquation.b) {
      const { a, b } = pointsOrEquation;
      this.points = [];
      this.equation = {
        a,
        b,
        x: y => (y - b) / a,
        y: x => a * x + b,
      };
    } else {
      throw new Error('wrong constructor parameter: must be Point[] or LineEquation');
    }
  }

  get distance() {
    return MathUtils.INFINI;
  }

  public get endings(): [Point, Point] {
    return [
      new Point(this.equation.x(-MathUtils.INFINI), this.equation.y(-MathUtils.INFINI)),
      new Point(this.equation.x(MathUtils.INFINI), this.equation.y(MathUtils.INFINI)),
    ];
  }

  _calculateEquation(): LineEquation {
    const [p1, p2] = [this.points[0], this.points[1]];
    if (this.points.length < 2) {
      throw new Error("can't get equation without at least 2 pts");
    }
    if (MathUtils.isEqual(p1.x, p2.x)) {
      if (MathUtils.isEqual(p1.y, p2.y)) {
        throw new Error('Points given for line creation are confused');
      }
      return {
        x: _ => p1.x,
        y: _ => 0,
      };
    }
    const a = (p2.y - p1.y) / (p2.x - p1.x);
    const b = p1.y - a * p1.x;
    return {
      a,
      b,
      x: y => (y - b) / a,
      y: x => a * x + b,
    };
  }

  containPoint(p: Point): boolean {
    return MathUtils.isEqual(this.equation.x(p.x), p.y);
  }

  getIntersectionPointWith(line: Stroke): Point | undefined {
    if (line instanceof Line) {
      const equationA = this.equation;
      const equationB = line.equation;
      if (equationA.a === undefined || equationA.b === undefined) {
        return new Point(equationA.x(0), equationB.y(equationA.x(0)));
      }
      if (equationB.a === undefined || equationB.b === undefined) {
        return new Point(equationB.x(0), equationA.y(equationB.x(0)));
      }
      if (MathUtils.isEqual(equationA.a, equationB.a)) {
        if (MathUtils.isEqual(equationA.b, equationB.b)) {
          return this.points[0]; //line confused
        }
        return;
      }
      const x = (equationB.b - equationA.b) / (equationA.a - equationB.a);
      const y = equationA.y(x);
      const intersectPoint = new Point(x, y);
      return this.containPoint(intersectPoint) && line.containPoint(intersectPoint)
        ? intersectPoint
        : undefined;
    }
    return;
  }

  getConfusedLineWith(line: Stroke): Stroke | undefined {
    throw new Error('Method not implemented.');
  }

  isEqualTo(stroke: Stroke): boolean {
    return (
      stroke instanceof Line &&
      stroke.equation.a === this.equation.a &&
      stroke.equation.b === this.equation.b
    );
  }

  toString(): string {
    return `[ Line { equation: {a: ${this.equation.a}, b: ${this.equation.b}} } ]`;
  }
}
