import { MathUtils } from '../../../../common/utils/math-utils';
import { Point } from '../../point/point';
import { Line } from '../line/line';
import { Stroke } from '../stroke';
import { Vector } from '../vector/vector';

export class Segment extends Line {
  constructor(p1: Point | number, p2: Point | number, x2?: number, y2?: number) {
    if (typeof p1 === 'number' && typeof p2 === 'number' && x2 && y2) {
      super([new Point(p1, p2), new Point(x2, y2)]);
    } else if (p1 instanceof Point && p2 instanceof Point) {
      super([p1, p2]);
    } else {
      throw new Error('wrong parameter: segment constructor must contain 2 points or 4 coords');
    }
  }

  get p1(): Point {
    return this.points[0];
  }

  get p2(): Point {
    return this.points[1];
  }

  get distance(): number {
    return MathUtils.distance(this.points[0], this.points[1]);
  }

  public get endings(): [Point, Point] {
    return [this.p1, this.p2];
  }

  containPoint(p: Point): boolean {
    return MathUtils.isEqual(
      MathUtils.distance(this.points[0], p) + MathUtils.distance(p, this.points[1]),
      this.distance
    );
  }

  containStroke(stroke: Stroke): boolean {
    return this.containPoint(stroke.endings[0]) && this.containPoint(stroke.endings[1]);
  }

  getIntersectionPointWith(stroke: Stroke): Point | undefined {
    if (stroke instanceof Line) {
      const intersectPts = super.getIntersectionPointWith(stroke);
      if (!intersectPts) {
        return;
      }
      if (this.containPoint(intersectPts) && stroke.containPoint(intersectPts)) {
        return intersectPts;
      }
    }
    return;
  }

  getConfusedLineWith(stroke: Stroke): Stroke | undefined {
    if (!stroke.containPoint(this.p1) && !stroke.containPoint(this.p2)) {
      return;
    }
    const pts = [...stroke.endings, ...this.points];
    const furthestPoints = MathUtils.getFurthestPoints(pts);
    const longestLine = new Segment(furthestPoints[0], furthestPoints[1]);
    for (let p of pts) {
      if (!longestLine.containPoint(p)) {
        return;
      }
    }
    return longestLine;
  }

  public toVector(): Vector {
    return new Vector(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
  }

  isEqualTo(stroke: Stroke): boolean {
    return (
      stroke instanceof Segment &&
      stroke.endings.find(e => e.isEqualTo(this.p1)) !== undefined &&
      stroke.endings.find(e => e.isEqualTo(this.p2)) !== undefined
    );
  }

  toString(): string {
    return `{Seg [${this.p1.toString()}, ${this.p2.toString()}]}`;
  }
}
