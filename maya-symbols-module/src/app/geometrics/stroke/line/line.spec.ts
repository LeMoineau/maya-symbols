// it should throw error when getting equation without at least 2 pts

import { MathUtils } from '../../../../common/utils/math-utils';
import { Point } from '../../point/point';
import { Line } from './line';

describe('Line', () => {
  it('should be able to init with list of points', () => {
    const line = new Line([new Point(0, 0), new Point(1, 0)]);
    expect(line).toBeDefined();
  });

  it('should be able to init line equation with list of points', () => {
    const line = new Line([new Point(0, 0), new Point(1, 0)]);
    expect(line.equation).toBeDefined();
  });

  it('should be able to init with line equation', () => {
    const line = new Line({ a: 2, b: -5 });
    expect(line).toBeDefined();
  });

  it('should have infini distance', () => {
    const A_LINE = new Line({ a: 2, b: -5 });

    expect(A_LINE.distance).toBe(MathUtils.INFINI);
  });

  it('should throw error when init line with same points', () => {
    expect(() => {
      new Line([new Point(0, 0), new Point(0, 0)]);
    }).toThrow(Error);
  });

  it('should return a and b line equation factor when getting equation', () => {
    const A_LINE = new Line([new Point(6, -2), new Point(3, 4)]);

    expect((A_LINE as any).equation.a).toBe(-2);
    expect((A_LINE as any).equation.b).toBe(10);
  });

  it('should return a and b line equation factor when getting equation', () => {
    const A_LINE = new Line([new Point(0, 0), new Point(0, 5)]);

    expect((A_LINE as any).equation.a).toBeUndefined();
    expect((A_LINE as any).equation.b).toBeUndefined();
  });

  it('should return true when compare equality with equal line', () => {
    const A_LINE = new Line([new Point(0, 0), new Point(1, 1)]);
    const ANOTHER_LINE = new Line([new Point(-1, -1), new Point(2, 2)]);

    expect(A_LINE.isEqualTo(ANOTHER_LINE)).toBeTruthy();
  });

  it('should return intersect point when getting intersection with other line', () => {
    const A_LINE = new Line([new Point(0, 0), new Point(1, 1)]);
    const ANOTHER_LINE = new Line([new Point(0, 1), new Point(1, 0)]);

    const intersectPoint = A_LINE.getIntersectionPointWith(ANOTHER_LINE);
    expect(intersectPoint).not.toBeUndefined();
    expect(intersectPoint?.isEqualTo(new Point(0.5, 0.5))).toBeTruthy();
  });

  it('should return true when segment intersect with segment border', () => {
    const A_SEGMENT = new Line([new Point(0, 0), new Point(0, 5)]);
    const ANOTHER_SEGMENT = new Line([new Point(0, 1), new Point(5, 4)]);

    const point = A_SEGMENT.getIntersectionPointWith(ANOTHER_SEGMENT);

    expect(point).not.toBeUndefined();
    expect(point?.isEqualTo(new Point(0, 1))).toBeTruthy();
  });

  it('should return true when segment intersect raycast', () => {
    const A_SEGMENT = new Line([new Point(5, 5), new Point(5, 0)]);
    const A_RAYCAST = new Line([new Point(MathUtils.INFINI, MathUtils.INFINI), new Point(4, 1)]);

    const point = A_SEGMENT.getIntersectionPointWith(A_RAYCAST);

    expect(point).not.toBeUndefined();
    expect(point?.isEqualTo(new Point(5, 2))).toBeTruthy();
  });
});
