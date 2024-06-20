import { ArrayUtils } from '../../../common/utils/array-utils';
import { MathUtils } from '../../../common/utils/math-utils';
import { GeometricInstance } from '../geometric-instance';
import { Point } from '../point/point';
import { Segment } from '../stroke/segment/segment';
import { Stroke } from '../stroke/stroke';

export class Polygon implements GeometricInstance {
  private _strokes: Stroke[];

  constructor(strokes: Stroke[]) {
    this._strokes = strokes;
  }

  get strokes() {
    return this._strokes;
  }

  get nbStrokes() {
    return this.strokes.length;
  }

  get points(): Point[] {
    const allEndings = this.strokes.flatMap(s => s.endings);
    let points: Point[] = [];
    for (let e of allEndings) {
      if (points.some(p => p.isEqualTo(e))) continue;
      points.push(e);
    }
    return points;
  }

  isEqualTo(polygon: GeometricInstance): boolean {
    if (!(polygon instanceof Polygon) || polygon.strokes.length !== this.strokes.length) {
      return false;
    }
    return polygon.strokes.find(s => !this.strokes.find(ss => s.isEqualTo(ss))) === undefined;
  }

  /**
   * Simplify the polygon by fusion continious strokes
   */
  simplify(): void {
    let toTreat = [...this.strokes];
    let toKeep = [];
    let index = 0;
    while (index < toTreat.length) {
      const stroke = toTreat[index];
      if (stroke instanceof Segment) {
        let hasBeenReplace = false;
        for (let point of stroke.endings) {
          const continiousStroke = toTreat.find(
            s => s.endings.some(e => e.isEqualTo(point)) && !s.isEqualTo(stroke)
          );
          if (
            continiousStroke instanceof Segment &&
            stroke.toVector().isCollinearWith(continiousStroke.toVector())
          ) {
            toTreat.push(
              new Segment(stroke.getOtherEnding(point), continiousStroke.getOtherEnding(point))
            );
            ArrayUtils.removeFrom(toTreat, continiousStroke);
            hasBeenReplace = true;
          }
        }
        if (!hasBeenReplace) {
          toKeep.push(stroke);
          index += 1;
        } else {
          ArrayUtils.removeFrom(toTreat, stroke);
        }
      }
    }
    this._strokes = toKeep;
  }

  public containPoint(point: Point): boolean {
    const raycast = new Segment(point, new Point(MathUtils.INFINI, MathUtils.INFINI));
    let intersectionPoints: Point[] = [];
    for (let s of this.strokes) {
      if (s.containPoint(point)) return true;
      const intersectPoint = raycast.getIntersectionPointWith(s);
      if (intersectPoint && !intersectionPoints.some(p => p.isEqualTo(intersectPoint))) {
        intersectionPoints.push(intersectPoint);
      }
    }
    return intersectionPoints.length % 2 === 1;
  }

  public containPolygon(polygon: Polygon): boolean {
    if (!polygon.points.every(p => this.containPoint(p))) {
      return false;
    }
    for (let stroke of this.strokes) {
      for (let s of polygon.strokes.filter(s => !stroke.containStroke(s))) {
        const intersection = stroke.getIntersectionPointWith(s);
        if (intersection && !s.endings.some(e => e.isEqualTo(intersection))) {
          return false;
        }
      }
    }
    return true;
  }

  toString(): string {
    return `{Poly [${this.strokes.map(s => s.toString()).join(', \n  ')}]}`;
  }
}
