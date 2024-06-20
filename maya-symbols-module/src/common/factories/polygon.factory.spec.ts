import { ArrayUtils } from '../utils/array-utils';
import { Point } from '../../app/geometrics/point/point';
import { Polygon } from '../../app/geometrics/polygon/polygon';
import { Segment } from '../../app/geometrics/stroke/segment/segment';
import { Stroke } from '../../app/geometrics/stroke/stroke';
import PolygonFactory from './polygon.factory';

describe('polygon-factory', () => {
  it('should throw error when creating polygons with less than 2 strokes', () => {
    const SOME_LINES = [new Segment(new Point(0, 0), new Point(1, 1))];

    expect(() => PolygonFactory.create(SOME_LINES)).toThrow();
  });

  it('should not return polygon when creating polygons from not joining strokes', () => {
    const SOME_LINES: Stroke[] = [
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
    ];

    const polygons = PolygonFactory.create(SOME_LINES);

    expect(polygons.length).toBe(0);
  });

  it('should return correct polygon when creating polygons from joining strokes', () => {
    const SOME_LINES: Stroke[] = [
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ];
    const DESIRE_POLYGON = new Polygon(SOME_LINES);

    const polygons = PolygonFactory.create(SOME_LINES);

    expect(polygons.length).toBe(1);
    expect(polygons[0].isEqualTo(DESIRE_POLYGON)).toBeTruthy();
  });

  it('should return polygon when creating polygons with joining reverse ending strokes', () => {
    const SOME_LINES: Stroke[] = [
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 0), new Point(5, 5)),
      new Segment(new Point(0, 0), new Point(5, 0)),
    ];
    const DESIRE_POLYGON = new Polygon(SOME_LINES);

    const polygons = PolygonFactory.create(SOME_LINES);

    expect(polygons.length).toBe(1);
    expect(polygons[0].isEqualTo(DESIRE_POLYGON)).toBeTruthy();
  });

  it('should return many polygons when creating polygons from multiple joining strokes', () => {
    const SOME_LINES: Stroke[] = [
      new Segment(new Point(0, 0), new Point(0, 5)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ];
    const SOME_OTHER_LINES: Stroke[] = [
      new Segment(new Point(1, 1), new Point(1, 2)),
      new Segment(new Point(1, 2), new Point(2, 3)),
      new Segment(new Point(2, 3), new Point(1, 1)),
    ];
    const A_DESIRE_POLYGON = new Polygon(SOME_LINES);
    const ANOTHER_DESIRE_POLYGON = new Polygon(SOME_OTHER_LINES);

    const polygons = PolygonFactory.create(SOME_LINES.concat(SOME_OTHER_LINES));

    expect(polygons.length).toBe(2);
    expect(polygons.some(p => p.isEqualTo(A_DESIRE_POLYGON))).toBeTruthy();
    expect(polygons.some(p => p.isEqualTo(ANOTHER_DESIRE_POLYGON))).toBeTruthy();
  });

  it('should return polygons according to strokes given (two glued rects)', () => {
    const SOME_LINES: Stroke[] = [
      new Segment(new Point(0, 0), new Point(0, 3)),
      new Segment(new Point(0, 3), new Point(0, 5)),
      new Segment(new Point(0, 3), new Point(5, 3)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 3)),
      new Segment(new Point(5, 3), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ];
    const DESIRE_POLYGONS_1: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 3)),
      new Segment(new Point(0, 3), new Point(5, 3)),
      new Segment(new Point(5, 3), new Point(5, 0)),
      new Segment(new Point(5, 0), new Point(0, 0)),
    ]);
    const DESIRE_POLYGONS_2: Polygon = new Polygon([
      new Segment(new Point(0, 3), new Point(0, 5)),
      new Segment(new Point(0, 3), new Point(5, 3)),
      new Segment(new Point(0, 5), new Point(5, 5)),
      new Segment(new Point(5, 5), new Point(5, 3)),
    ]);

    const polygons = PolygonFactory.create(SOME_LINES);

    expect(polygons.length).toBe(2);
    expect(polygons.some(p => p.isEqualTo(DESIRE_POLYGONS_1))).toBeTruthy();
    expect(polygons.some(p => p.isEqualTo(DESIRE_POLYGONS_2))).toBeTruthy();
  });

  it('should return polygons according to strokes given (two separted rects)', () => {
    const SOME_LINES: Stroke[] = [
      new Segment(new Point(0, 0), new Point(0, 2)),
      new Segment(new Point(6, 2), new Point(0, 2)),
      new Segment(new Point(6, 2), new Point(6, 0)),
      new Segment(new Point(0, 0), new Point(6, 0)),
      new Segment(new Point(0, 4), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(6, 4)),
      new Segment(new Point(0, 4), new Point(6, 4)),
    ];
    const DESIRE_POLYGONS_1: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 2)),
      new Segment(new Point(6, 2), new Point(0, 2)),
      new Segment(new Point(6, 2), new Point(6, 0)),
      new Segment(new Point(0, 0), new Point(6, 0)),
    ]);
    const DESIRE_POLYGONS_2: Polygon = new Polygon([
      new Segment(new Point(0, 4), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(6, 4)),
      new Segment(new Point(0, 4), new Point(6, 4)),
    ]);

    const polygons = PolygonFactory.create(SOME_LINES);

    expect(polygons.length).toBe(2);
    expect(polygons.some(p => p.isEqualTo(DESIRE_POLYGONS_1))).toBeTruthy();
    expect(polygons.some(p => p.isEqualTo(DESIRE_POLYGONS_2))).toBeTruthy();
  });

  it('should return polygons according to strokes given (two crossed rects)', () => {
    const SOME_LINES: Stroke[] = [
      new Segment(new Point(0, 0), new Point(0, 2)),
      new Segment(new Point(6, 4), new Point(0, 2)),
      new Segment(new Point(6, 2), new Point(6, 0)),
      new Segment(new Point(0, 0), new Point(6, 0)),
      new Segment(new Point(0, 4), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(6, 4)),
      new Segment(new Point(0, 4), new Point(6, 2)),
    ];
    const DESIRE_POLYGONS_1: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 2)),
      new Segment(new Point(3, 3), new Point(0, 2)),
      new Segment(new Point(3, 3), new Point(6, 2)),
      new Segment(new Point(6, 2), new Point(6, 0)),
      new Segment(new Point(0, 0), new Point(6, 0)),
    ]);
    const DESIRE_POLYGONS_2: Polygon = new Polygon([
      new Segment(new Point(0, 4), new Point(0, 6)),
      new Segment(new Point(3, 3), new Point(0, 4)),
      new Segment(new Point(3, 3), new Point(6, 4)),
      new Segment(new Point(6, 6), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(6, 4)),
    ]);

    const polygons = PolygonFactory.create(SOME_LINES);

    expect(polygons.length).toBe(2);
    expect(polygons.some(p => p.isEqualTo(DESIRE_POLYGONS_1))).toBeTruthy();
    expect(polygons.some(p => p.isEqualTo(DESIRE_POLYGONS_2))).toBeTruthy();
  });

  it('should return polygons according to strokes given (remove confused strokes)', () => {
    const SOME_LINES: Stroke[] = [
      new Segment(new Point(0, 0), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 0)),
      new Segment(new Point(2, 2), new Point(4, 4)),
    ];

    const DESIRE_POLYGONS: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 0)),
    ]);

    const polygons = PolygonFactory.create(SOME_LINES);

    expect(polygons.length).toBe(1);
    expect(polygons.some(p => p.isEqualTo(DESIRE_POLYGONS))).toBeTruthy();
  });

  it('should return polygons according to strokes given (fusion continued strokes)', () => {
    const SOME_LINES: Stroke[] = [
      new Segment(new Point(0, 0), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 6)),
      new Segment(new Point(2, 2), new Point(6, 6)),
      new Segment(new Point(2, 2), new Point(0, 0)),
    ];

    const DESIRE_POLYGONS: Polygon = new Polygon([
      new Segment(new Point(0, 0), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 6)),
      new Segment(new Point(6, 6), new Point(0, 0)),
    ]);

    const polygons = PolygonFactory.create(SOME_LINES);

    expect(polygons.length).toBe(1);
    expect(polygons.some(p => p.isEqualTo(DESIRE_POLYGONS))).toBeTruthy();
  });

  it('should return polygons according to strokes given (fusion continued strokes)', () => {
    const SOME_LINES: Stroke[] = [
      new Segment(new Point(2, 0), new Point(2, 2)),
      new Segment(new Point(8, 2), new Point(2, 2)),
      new Segment(new Point(8, 2), new Point(8, 4)),
      new Segment(new Point(10, 4), new Point(8, 4)),
      new Segment(new Point(10, 4), new Point(10, 0)),
      new Segment(new Point(2, 0), new Point(10, 0)),
      new Segment(new Point(0, 2), new Point(2, 2)),
      new Segment(new Point(2, 4), new Point(2, 2)),
      new Segment(new Point(2, 4), new Point(8, 4)),
      new Segment(new Point(8, 6), new Point(8, 4)),
      new Segment(new Point(8, 6), new Point(0, 6)),
      new Segment(new Point(0, 2), new Point(0, 6)),
      new Segment(new Point(2.5, 2.5), new Point(7.5, 2.5)),
      new Segment(new Point(7.5, 3.5), new Point(7.5, 2.5)),
      new Segment(new Point(7.5, 3.5), new Point(2.5, 3.5)),
      new Segment(new Point(2.5, 2.5), new Point(2.5, 3.5)),
      new Segment(new Point(0, 0), new Point(10, 0)),
      new Segment(new Point(10, 6), new Point(10, 0)),
      new Segment(new Point(10, 6), new Point(0, 6)),
      new Segment(new Point(0, 0), new Point(0, 6)),
    ];
    const DESIRE_POLYGONS = [
      new Polygon([
        new Segment(2.5, 2.5, 7.5, 2.5),
        new Segment(7.5, 3.5, 7.5, 2.5),
        new Segment(7.5, 3.5, 2.5, 3.5),
        new Segment(2.5, 2.5, 2.5, 3.5),
      ]),
      new Polygon([
        new Segment(new Point(2, 0), new Point(2, 2)),
        new Segment(new Point(2, 0), new Point(10, 0)),
        new Segment(new Point(10, 4), new Point(10, 0)),
        new Segment(new Point(10, 4), new Point(8, 4)),
        new Segment(new Point(8, 2), new Point(8, 4)),
        new Segment(new Point(8, 2), new Point(2, 2)),
      ]),
      new Polygon([
        new Segment(new Point(2, 0), new Point(2, 2)),
        new Segment(new Point(0, 0), new Point(2, 0)),
        new Segment(new Point(0, 0), new Point(0, 2)),
        new Segment(new Point(0, 2), new Point(2, 2)),
      ]),
      new Polygon([
        new Segment(new Point(8, 2), new Point(2, 2)),
        new Segment(new Point(8, 2), new Point(8, 4)),
        new Segment(new Point(2, 4), new Point(8, 4)),
        new Segment(new Point(2, 4), new Point(2, 2)),
      ]),
      new Polygon([
        new Segment(new Point(10, 4), new Point(8, 4)),
        new Segment(new Point(10, 6), new Point(10, 4)),
        new Segment(new Point(10, 6), new Point(8, 6)),
        new Segment(new Point(8, 6), new Point(8, 4)),
      ]),
      new Polygon([
        new Segment(new Point(0, 2), new Point(2, 2)),
        new Segment(new Point(0, 2), new Point(0, 6)),
        new Segment(new Point(8, 6), new Point(0, 6)),
        new Segment(new Point(8, 6), new Point(8, 4)),
        new Segment(new Point(2, 4), new Point(8, 4)),
        new Segment(new Point(2, 4), new Point(2, 2)),
      ]),
    ];

    const polygons = PolygonFactory.create(SOME_LINES);
    ArrayUtils.consoleLogAllFrom(polygons);

    expect(polygons.length).toBe(6);
    expect(DESIRE_POLYGONS.every(p => polygons.some(poly => poly.isEqualTo(p)))).toBeTruthy();
  });

  it('should break stroke when strokes are confused with one same ending', () => {
    const SOME_LINES = [
      new Segment(new Point(0, 0), new Point(0, 6)),
      new Segment(new Point(0, 0), new Point(0, 4)),
    ];
    const DESIRE_LINES = [
      new Segment(new Point(0, 0), new Point(0, 4)),
      new Segment(new Point(0, 4), new Point(0, 6)),
    ];

    const strokes: Stroke[] = (PolygonFactory as any)._breakAllContainedStrokes(SOME_LINES);

    expect(strokes.length).toBe(2);
    expect(strokes.some(s => s.isEqualTo(DESIRE_LINES[0]))).toBeTruthy();
    expect(strokes.some(s => s.isEqualTo(DESIRE_LINES[1]))).toBeTruthy();
  });

  it('should break stroke when strokes are confused with one same ending 2', () => {
    const SOME_LINES = [
      new Segment(new Point(0, 0), new Point(0, 4)),
      new Segment(new Point(0, 0), new Point(0, 6)),
    ];
    const DESIRE_LINES = [
      new Segment(new Point(0, 0), new Point(0, 4)),
      new Segment(new Point(0, 4), new Point(0, 6)),
    ];

    const strokes: Stroke[] = (PolygonFactory as any)._breakAllContainedStrokes(SOME_LINES);

    expect(strokes.length).toBe(2);
    expect(strokes.some(s => s.isEqualTo(DESIRE_LINES[0]))).toBeTruthy();
    expect(strokes.some(s => s.isEqualTo(DESIRE_LINES[1]))).toBeTruthy();
  });

  it('should break stroke when strokes are confused without same endings', () => {
    const SOME_LINES = [
      new Segment(new Point(0, 0), new Point(0, 6)),
      new Segment(new Point(0, 2), new Point(0, 4)),
    ];
    const DESIRE_LINES = [
      new Segment(new Point(0, 0), new Point(0, 2)),
      new Segment(new Point(0, 4), new Point(0, 2)),
      new Segment(new Point(0, 4), new Point(0, 6)),
    ];

    const strokes: Stroke[] = (PolygonFactory as any)._breakAllContainedStrokes(SOME_LINES);

    expect(strokes.length).toBe(3);
    expect(strokes.some(s => s.isEqualTo(DESIRE_LINES[0]))).toBeTruthy();
    expect(strokes.some(s => s.isEqualTo(DESIRE_LINES[1]))).toBeTruthy();
    expect(strokes.some(s => s.isEqualTo(DESIRE_LINES[2]))).toBeTruthy();
  });
});
