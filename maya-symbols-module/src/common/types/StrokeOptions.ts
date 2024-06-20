import { Point } from '../../app/geometrics/point/point';

export type StrokeOptions = SegmentPointsOptions | SegmentCoordsOptions;

export interface SegmentPointsOptions {
  p1: Point;
  p2: Point;
}

export function isSegmentPointsOptions(options: StrokeOptions): options is SegmentPointsOptions {
  const segmentOption: SegmentPointsOptions = options as SegmentPointsOptions;
  return segmentOption.p1 !== undefined && segmentOption.p2 !== undefined;
}

export interface SegmentCoordsOptions {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function isSegmentCoordsOptions(options: StrokeOptions): options is SegmentPointsOptions {
  const segmentOption: SegmentCoordsOptions = options as SegmentCoordsOptions;
  return (
    segmentOption.x1 !== undefined &&
    segmentOption.y1 !== undefined &&
    segmentOption.x2 !== undefined &&
    segmentOption.y2 !== undefined
  );
}
