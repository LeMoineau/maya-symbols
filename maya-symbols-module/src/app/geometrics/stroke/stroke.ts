import { MathUtils } from '../../../common/utils/math-utils';
import { GeometricInstance } from '../geometric-instance';
import { Point } from '../point/point';

export abstract class Stroke implements GeometricInstance {
  protected points: Point[];

  constructor() {
    this.points = [];
  }

  public abstract get distance(): number;

  public abstract get endings(): [Point, Point];

  /**
   * Check if stroke contain a point
   * @param p point to check containing
   * @returns boolean true if contain, false else
   */
  abstract containPoint(p: Point): boolean;

  public containStroke(stroke: Stroke): boolean {
    return this.containPoint(stroke.endings[0]) && this.containPoint(stroke.endings[1]);
  }

  /**
   * Get intersection point between 2 strokes if exist
   * @param stroke stroke with which find intersection point
   * @returns intersection point if exist, undefined else
   */
  abstract getIntersectionPointWith(stroke: Stroke): Point | undefined;

  public intersect(stroke: Stroke): boolean {
    return this.getIntersectionPointWith(stroke) !== undefined;
  }

  /**
   * Get confused stroke between 2 if exist
   * @param stroke stroke with which to get confusion stroke
   * @returns Confused stroke if exist, undefined else
   */
  abstract getConfusedLineWith(stroke: Stroke): Stroke | undefined;

  /**
   * Get touching ending point between 2 strokes if exist
   * @returns touching ending point if exist, undefined else
   */
  endingsTouchEndingOf(stroke: Stroke): Point | undefined {
    return this.endings.find(p => stroke.endings.find(e => e.isEqualTo(p)));
  }

  public getNearestEndingOf(target: Point): Point {
    let nearestEnding = this.endings[0];
    for (let ending of this.endings) {
      if (MathUtils.distance(target, ending) < MathUtils.distance(target, nearestEnding)) {
        nearestEnding = ending;
      }
    }
    return nearestEnding;
  }

  public getOtherEnding(ending: Point): Point {
    if (!this.endings.some(e => e.isEqualTo(ending))) {
      throw new Error(`Point ${ending.toString()} not in segment endings`);
    }
    const otherEnding = this.endings.find(e => !e.isEqualTo(ending))!;
    return otherEnding;
  }

  abstract isEqualTo(instance: GeometricInstance): boolean;

  abstract toString(): string;
}
