import { Point } from '../point/point';
import { Segment } from '../stroke/segment/segment';
import { Polygon } from './polygon';

describe('polygon', () => {
  it('should return true when compare equality with equal polygon', () => {
    const A_POLYGON = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const ANOTHER_POLYGON = new Polygon([
      new Segment(new Point(5, 0), new Point(0, 0)),
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
    ]);

    expect(A_POLYGON.isEqualTo(ANOTHER_POLYGON)).toBeTruthy();
    expect(ANOTHER_POLYGON.isEqualTo(A_POLYGON)).toBeTruthy();
  });

  it('should return false when compare equality with not equal polygon', () => {
    const A_POLYGON = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 7)),
      new Segment(new Point(0, 7), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const ANOTHER_POLYGON = new Polygon([
      new Segment(new Point(5, 0), new Point(0, 0)),
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
    ]);

    expect(A_POLYGON.isEqualTo(ANOTHER_POLYGON)).toBeFalsy();
    expect(ANOTHER_POLYGON.isEqualTo(A_POLYGON)).toBeFalsy();
  });

  it('should return false when compare equality with more strokes polygon', () => {
    const A_POLYGON = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const ANOTHER_POLYGON = new Polygon([
      new Segment(new Point(5, 0), new Point(0, 0)),
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(0, 5), new Point(0, 10)),
      new Segment(new Point(0, 10), new Point(5, 10)),
      new Segment(new Point(5, 10), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(0, 5)),
    ]);

    expect(A_POLYGON.isEqualTo(ANOTHER_POLYGON)).toBeFalsy();
    expect(ANOTHER_POLYGON.isEqualTo(A_POLYGON)).toBeFalsy();
  });

  it('should remove continious storkes when simplified polygons', () => {
    const NOT_SIMPLIFIED_POLY = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 6)),
      new Segment(new Point(2, 2), new Point(6, 6)),
      new Segment(new Point(2, 2), new Point(0, 0)),
    ]);
    const DESIRE_POLYGONS = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 0)),
    ]);

    NOT_SIMPLIFIED_POLY.simplify();

    expect(NOT_SIMPLIFIED_POLY.isEqualTo(DESIRE_POLYGONS)).toBeTruthy();
  });

  it('should return all uniques points when getting points', () => {
    const POINT_1 = new Point(0, 0);
    const POINT_2 = new Point(0, 6);
    const POINT_3 = new Point(6, 6);
    const A_POLYGON = new Polygon([
      new Segment(POINT_1, POINT_2),
      new Segment(POINT_3, POINT_2),
      new Segment(POINT_3, POINT_1),
    ]);

    const points = A_POLYGON.points;

    expect(points.length).toBe(3);
    expect(points.find(p => p.isEqualTo(POINT_1)));
    expect(points.find(p => p.isEqualTo(POINT_2)));
    expect(points.find(p => p.isEqualTo(POINT_3)));
  });

  it('should return correct nb of points when getting points', () => {
    const A_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 2)),
      new Segment(new Point(6, 2), new Point(0, 2)),
      new Segment(new Point(6, 2), new Point(6, 0)),
      new Segment(new Point(0, 0), new Point(6, 0)),
    ]);

    expect(A_POLYGON.points.length).toBe(4);
  });

  it('should return true when point in polygon', () => {
    const A_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const AN_INCLUDED_POINT = new Point(2, 2);

    expect(A_POLYGON.containPoint(AN_INCLUDED_POINT)).toBeTruthy();
  });

  it('should return true when point in polygon corner', () => {
    const A_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const AN_INCLUDED_POINT = new Point(0, 0);

    expect(A_POLYGON.containPoint(AN_INCLUDED_POINT)).toBeTruthy();
  });

  it('should return true when point in polygon border', () => {
    const A_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const AN_INCLUDED_POINT = new Point(0, 1);

    expect(A_POLYGON.containPoint(AN_INCLUDED_POINT)).toBeTruthy();
  });

  it('should return false when point not in polygon', () => {
    const A_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const AN_INCLUDED_POINT = new Point(-5, -5);

    expect(A_POLYGON.containPoint(AN_INCLUDED_POINT)).toBeFalsy();
  });

  it('should return true when polygon contain point', () => {
    const A_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(5, 5), new Point(0, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(0, 0), new Point(5, 0)),
    ]);

    expect(A_POLYGON.containPoint(new Point(4, 1))).toBeTruthy();
  });

  it('should return true when polygon contain polygon', () => {
    const A_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const AN_INCLUDED_POLYGON: Polygon = new Polygon([
      new Segment(new Point(1, 1), new Point(1, 4)),
      new Segment(new Point(4, 4), new Point(1, 4)),
      new Segment(new Point(4, 4), new Point(4, 1)),
      new Segment(new Point(1, 1), new Point(4, 1)),
    ]);

    expect(A_POLYGON.containPolygon(AN_INCLUDED_POLYGON)).toBeTruthy();
  });

  it('should return false when polygon do not contain polygon', () => {
    const A_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const AN_NOT_INCLUDED_POLYGON: Polygon = new Polygon([
      new Segment(new Point(1, 1), new Point(1, 4)),
      new Segment(new Point(1, 4), new Point(6, 6)),
      new Segment(new Point(6, 6), new Point(4, 1)),
      new Segment(new Point(4, 1), new Point(1, 1)),
    ]);

    expect(A_POLYGON.containPolygon(AN_NOT_INCLUDED_POLYGON)).toBeFalsy();
  });

  it('should return false when polygon only touch a corner of a polygon', () => {
    const A_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const AN_INCLUDED_POLYGON: Polygon = new Polygon([
      new Segment(new Point(-5, -5), new Point(-5, 0)),
      new Segment(new Point(-5, 0), new Point(0, 0)),
      new Segment(new Point(0, 0), new Point(0, -5)),
      new Segment(new Point(0, -5), new Point(-5, -5)),
    ]);

    expect(A_POLYGON.containPolygon(AN_INCLUDED_POLYGON)).toBeFalsy();
  });

  it('should return true when polygon contain same polygon', () => {
    const A_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const AN_INCLUDED_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);

    expect(A_POLYGON.containPolygon(AN_INCLUDED_POLYGON)).toBeTruthy();
  });

  it('should return true when polygon contain polygon glued in border', () => {
    const A_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const AN_INCLUDED_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 1), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 1)),
      new Segment(new Point(5, 1), new Point(0, 1)),
    ]);

    expect(A_POLYGON.containPolygon(AN_INCLUDED_POLYGON)).toBeTruthy();
  });

  it('should return false when polygon do not contain polygon but is glued in some borders', () => {
    const A_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const AN_INCLUDED_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 1), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 1)),
      new Segment(new Point(5, 1), new Point(0, 1)),
    ]);

    expect(AN_INCLUDED_POLYGON.containPolygon(A_POLYGON)).toBeFalsy();
  });

  it('should simplify polygons', () => {
    const A_POLYGON: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 6)),
      new Segment(new Point(0, 0), new Point(2, 2)),
      new Segment(new Point(2, 2), new Point(4, 4)),
      new Segment(new Point(6, 6), new Point(4, 4)),
      new Segment(new Point(6, 6), new Point(0, 6)),
    ]);
    const DESIRE_POLYGONS: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 0)),
    ]);

    A_POLYGON.simplify();

    expect(A_POLYGON.isEqualTo(DESIRE_POLYGONS)).toBeTruthy();
  });
});
