import { Point } from '../../app/geometrics/point/point';
import { StrokeOptions, isSegmentCoordsOptions, isSegmentPointsOptions } from './StrokeOptions';

describe('StrokeOptions', () => {
  const A_POINT = new Point(0, 0);
  const ANOTHER_POINT = new Point(1, 1);
  let A_LINE_OPTIONS: StrokeOptions;

  it('should check is segment points options with correct segment points options', () => {
    A_LINE_OPTIONS = {
      p1: A_POINT,
      p2: ANOTHER_POINT,
    };

    expect(isSegmentPointsOptions(A_LINE_OPTIONS)).toBeTruthy();
  });

  it('should check is segment points options with wrong segment points options', () => {
    A_LINE_OPTIONS = {
      x1: 0,
      y1: 2,
      x2: 1,
      y2: 1,
    };

    expect(isSegmentPointsOptions(A_LINE_OPTIONS)).toBeFalsy();
  });

  it('should check is segment coords options with wrong segment coords options', () => {
    A_LINE_OPTIONS = {
      x1: 0,
      y1: 2,
      x2: 1,
      y2: 1,
    };

    expect(isSegmentCoordsOptions(A_LINE_OPTIONS)).toBeTruthy();
  });

  it('should check is segment coords options with correct segment coords options', () => {
    A_LINE_OPTIONS = {
      p1: A_POINT,
      p2: ANOTHER_POINT,
    };

    expect(isSegmentCoordsOptions(A_LINE_OPTIONS)).toBeFalsy();
  });
});
