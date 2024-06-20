import {
  StrokeOptions,
  isSegmentCoordsOptions,
  isSegmentPointsOptions,
} from '../types/StrokeOptions';
import { Point } from '../../app/geometrics/point/point';
import { Segment } from '../../app/geometrics/stroke/segment/segment';
import { Stroke } from '../../app/geometrics/stroke/stroke';
import { StrokeType } from '../types/StrokeType';
import Factory from './factory';

class StrokeFactory implements Factory {
  public create(options: StrokeOptions): StrokeType {
    if (isSegmentPointsOptions(options)) {
      return new Segment(options.p1, options.p2);
    } else if (isSegmentCoordsOptions(options)) {
      return new Segment(new Point(options.x1, options.y1), new Point(options.x2, options.y2));
    }
    return {} as Stroke;
  }
}

export default new StrokeFactory();
