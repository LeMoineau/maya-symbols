import { Point } from '../../app/geometrics/point/point';
import { Segment } from '../../app/geometrics/stroke/segment/segment';
import { Stroke } from '../../app/geometrics/stroke/stroke';
import strokeFactory from './stroke.factory';

describe('stroke-factory', () => {
  let CREATED_LINE: Stroke;

  it('should create a segment when giving 2 points', () => {
    CREATED_LINE = strokeFactory.create({
      p1: new Point(0, 0),
      p2: new Point(1, 1),
    });

    expect(CREATED_LINE).toBeInstanceOf(Segment);
  });

  it('should create a segment when giving 4 pos', () => {
    CREATED_LINE = strokeFactory.create({
      x1: 0,
      y1: 2,
      x2: 1,
      y2: 1,
    });

    expect(CREATED_LINE).toBeInstanceOf(Segment);
  });
});
