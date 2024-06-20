import { Point } from '../../app/geometrics/point/point';
import { MathUtils } from './math-utils';

describe('math', () => {
  const A_POINT = new Point(1, 1);
  const ANOTHER_POINT = new Point(4, 5);
  const EPSILON = 0.01;

  it('should return distance between 2 points', () => {
    expect(MathUtils.distance(A_POINT, ANOTHER_POINT)).toBe(5);
  });

  it('should return true if 2 numbers are equal to within EPSILON', () => {
    expect(MathUtils.isEqual(0, 0.01, EPSILON)).toBeTruthy();
  });

  it('should return false if 2 numbers are equal to within EPSILON', () => {
    expect(MathUtils.isEqual(0, 0.011, EPSILON)).toBeFalsy();
  });

  it('should throw error when getting furthest points with less than 2 pts', () => {
    expect(() => {
      MathUtils.getFurthestPoints([A_POINT]);
    }).toThrow(Error);
  });

  it('should get furthest points in a list of 2 pts', () => {
    expect(MathUtils.getFurthestPoints([A_POINT, ANOTHER_POINT])).toStrictEqual([
      A_POINT,
      ANOTHER_POINT,
    ]);
  });

  it('should get furthest points in a list of most pts', () => {
    const FURTHEST_POINTS = [new Point(100, 100), new Point(-100, -100)];
    const A_PTS_LIST = [new Point(0, 2), new Point(-6, 10), FURTHEST_POINTS[0], FURTHEST_POINTS[1]];

    const furthestPoints = MathUtils.getFurthestPoints(A_PTS_LIST);
    expect(furthestPoints).toContain(FURTHEST_POINTS[0]);
    expect(furthestPoints).toContain(FURTHEST_POINTS[1]);
  });
});
