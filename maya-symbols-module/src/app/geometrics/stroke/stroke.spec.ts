import { Point } from '../point/point';
import { Segment } from './segment/segment';
import { Stroke } from './stroke';

describe('stroke', () => {
  it('should return touching ending point', () => {
    const s1 = new Segment(new Point(0, 0), new Point(0, 1));
    const s2 = new Segment(new Point(0, 0), new Point(0, 2));

    const touchingPts = s1.endingsTouchEndingOf(s2);

    expect(touchingPts?.isEqualTo(new Point(0, 0))).toBeTruthy();
  });

  it('should return nearest ending when getting nearest ending 1', () => {
    const A_SEGMENT = new Segment(new Point(0, 0), new Point(3, 3));
    const A_POINT = new Point(1, 1);

    const nearestEnding = A_SEGMENT.getNearestEndingOf(A_POINT);

    expect(nearestEnding.isEqualTo(new Point(0, 0))).toBeTruthy();
  });
  it('should return nearest ending when getting nearest ending 2', () => {
    const A_SEGMENT = new Segment(new Point(0, 0), new Point(3, 3));
    const A_POINT = new Point(4, 4);

    const nearestEnding = A_SEGMENT.getNearestEndingOf(A_POINT);

    expect(nearestEnding.isEqualTo(new Point(3, 3))).toBeTruthy();
  });
});
