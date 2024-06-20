import { Point } from '../../app/geometrics/point/point';

export namespace MathUtils {
  export const INFINI: number = 100000;
  export const EPSILON = 0.01;

  /**
   * Calculate distances between 2 points
   * @param p1 first point
   * @param p2 second point
   * @returns absolute distance between these 2 points
   */
  export function distance(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  /**
   * Check equality between 2 numbers
   * @param a first number
   * @param b second number
   * @param epsilon error accepted
   * @returns check equality around epsilon between 2 number
   */
  export function isEqual(a: number, b: number, epsilon: number = EPSILON): boolean {
    return a >= b - epsilon && a <= b + epsilon;
  }

  /**
   * Get the 2 furthest point of a list
   * @param pts list of points
   * @returns 2 furthest points of the list
   */
  export function getFurthestPoints(pts: Point[]): [Point, Point] {
    if (pts.length < 2) {
      throw new Error('not enough points (need at least 2)');
    }
    let furthestPoints: [Point, Point] = [pts[0], pts[1]];
    for (let p1 of pts) {
      for (let p2 of pts) {
        if (distance(p1, p2) > distance(furthestPoints[0], furthestPoints[1])) {
          furthestPoints = [p1, p2];
        }
      }
    }
    return furthestPoints;
  }
}
