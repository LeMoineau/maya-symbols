import { MathUtils } from '../../../../common/utils/math-utils';
import { Point } from '../../point/point';
import { Vector } from '../vector/vector';
import { Segment } from './segment';

describe('segment', () => {
  it('should return the 2 points of the line when getting its points', () => {
    const A_PTS = new Point(0, 0);
    const ANOTHER_PTS = new Point(1, 0);
    const A_SEGMENT = new Segment(A_PTS, ANOTHER_PTS);

    expect(A_SEGMENT.endings).toContain(A_PTS);
    expect(A_SEGMENT.endings).toContain(ANOTHER_PTS);
  });

  it('should be defined when construct with 4 coords instead of points', () => {
    const A_SEGMENT = new Segment(0, 0, 1, 1);

    expect(A_SEGMENT).toBeDefined();
    expect(A_SEGMENT.endings.some(e => e.isEqualTo(new Point(0, 0)))).toBeTruthy();
    expect(A_SEGMENT.endings.some(e => e.isEqualTo(new Point(1, 1)))).toBeTruthy();
  });

  it('should return true when containing a point', () => {
    const A_SEGMENT = new Segment(new Point(-1, -1), new Point(1.2, 1.2));
    const CONTAINED_POINT = new Point(0, 0);

    expect(A_SEGMENT.containPoint(CONTAINED_POINT)).toBeTruthy();
  });

  it('should return false when not containing a point', () => {
    const A_SEGMENT = new Segment(new Point(-1, -1), new Point(1.2, 1.2));
    const CONTAINED_POINT = new Point(2, 0);

    expect(A_SEGMENT.containPoint(CONTAINED_POINT)).toBeFalsy();
  });

  it('should return undefined when getting not existing confused line', () => {
    const A_SEGMENT = new Segment(new Point(-1, -1), new Point(1.2, 1.2));
    const ANOTHER_SEGMENT = new Segment(new Point(-2, -1), new Point(1.2, 1.2));

    expect(A_SEGMENT.getConfusedLineWith(ANOTHER_SEGMENT)).toBeUndefined();
  });

  it('should return longest confused line when getting not existing confused line', () => {
    const FURTHEST_POINTS = [new Point(0, 0), new Point(4, 0)];
    const A_SEGMENT = new Segment(FURTHEST_POINTS[0], new Point(3, 0));
    const ANOTHER_SEGMENT = new Segment(new Point(2, 0), FURTHEST_POINTS[1]);

    const longestLine = A_SEGMENT.getConfusedLineWith(ANOTHER_SEGMENT);
    expect(longestLine?.endings).toContain(FURTHEST_POINTS[0]);
    expect(longestLine?.endings).toContain(FURTHEST_POINTS[1]);
  });

  it('should return undefined when getting confused line between no intersect lines', () => {
    const FURTHEST_POINTS = [new Point(0, 0), new Point(4, 0)];
    const A_SEGMENT = new Segment(FURTHEST_POINTS[0], new Point(2, 0));
    const ANOTHER_SEGMENT = new Segment(new Point(3, 0), FURTHEST_POINTS[1]);

    expect(A_SEGMENT.getConfusedLineWith(ANOTHER_SEGMENT)).toBeUndefined();
  });

  it('should return first point when getting p1', () => {
    const A_PTS = new Point(0, 0);
    const A_SEGMENT = new Segment(A_PTS, new Point(1, 0));

    expect(A_SEGMENT.p1).toBe(A_PTS);
  });

  it('should return second point when getting p2', () => {
    const A_PTS = new Point(0, 0);
    const A_SEGMENT = new Segment(new Point(1, 0), A_PTS);

    expect(A_SEGMENT.p2).toBe(A_PTS);
  });

  it('should return true when compare equality with equal segment but reverse endings', () => {
    const A_SEGMENT = new Segment(new Point(0, 0), new Point(1, 0));
    const ANOTHER_SEGMENT = new Segment(new Point(1, 0), new Point(0, 0));

    expect(A_SEGMENT.isEqualTo(ANOTHER_SEGMENT)).toBeTruthy();
  });

  it('should throw error when getting other ending with not an ending point', () => {
    const FIRST_ENDING = new Point(0, 0);
    const SECOND_ENDING = new Point(1, 0);
    const A_SEGMENT = new Segment(FIRST_ENDING, SECOND_ENDING);

    expect(() => A_SEGMENT.getOtherEnding(new Point(2, 2))).toThrow();
  });

  it('should return other ending when getting other ending', () => {
    const FIRST_ENDING = new Point(0, 0);
    const SECOND_ENDING = new Point(1, 0);
    const A_SEGMENT = new Segment(FIRST_ENDING, SECOND_ENDING);

    expect(A_SEGMENT.getOtherEnding(FIRST_ENDING).isEqualTo(SECOND_ENDING)).toBeTruthy();
  });

  it('should convert to correct vector when converting to vector', () => {
    const A_SEGMENT = new Segment(new Point(0, 0), new Point(1, 1));
    const DESIRE_VECTOR = new Vector(1, 1);

    expect(A_SEGMENT.toVector().isEqualTo(DESIRE_VECTOR)).toBeTruthy();
  });

  it('should return true when segment intersect with segment corner', () => {
    const A_SEGMENT = new Segment(new Point(0, 0), new Point(1, 1));
    const ANOTHER_SEGMENT = new Segment(new Point(0, 0), new Point(0, 1));

    expect(A_SEGMENT.intersect(ANOTHER_SEGMENT)).toBeTruthy();
  });

  it('should return true when segment intersect with segment border', () => {
    const A_SEGMENT = new Segment(new Point(0, 0), new Point(0, 5));
    const ANOTHER_SEGMENT = new Segment(new Point(0, 1), new Point(5, 6));

    const intersection = A_SEGMENT.getIntersectionPointWith(ANOTHER_SEGMENT);

    expect(intersection).not.toBeUndefined();
    expect(intersection?.isEqualTo(new Point(0, 1))).toBeTruthy();
  });

  it('should return true when segment intersect raycast', () => {
    const A_SEGMENT = new Segment(new Point(5, 5), new Point(5, 0));
    const A_RAYCAST = new Segment(new Point(MathUtils.INFINI, MathUtils.INFINI), new Point(4, 1));

    expect(A_SEGMENT.intersect(A_RAYCAST)).toBeTruthy();
  });
});
