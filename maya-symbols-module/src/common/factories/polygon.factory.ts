import { ArrayUtils } from '../utils/array-utils';
import { Polygon } from '../../app/geometrics/polygon/polygon';
import { Stroke } from '../../app/geometrics/stroke/stroke';
import Factory from './factory';
import { Point } from '../../app/geometrics/point/point';
import { Segment } from '../../app/geometrics/stroke/segment/segment';

class PolygonFactory implements Factory {
  /**
   * Find all strokes join from the selected {currentPoint}
   * @param currentPoint Point from where find joined strokes
   * @param alreadyTreatStrokes Strokes already treated
   * @param toTreatStrokes Possibles joined strokes
   * @returns list of Stroke joined by the {currentPoint}
   */
  private _findAllJoiningStrokesFromPoint(
    currentPoint: Point,
    alreadyTreatStrokes: Stroke[],
    toTreatStrokes: Stroke[]
  ): Stroke[] {
    return toTreatStrokes.filter(
      s =>
        s.endings.find(p => p.isEqualTo(currentPoint)) &&
        !alreadyTreatStrokes.some(ts => ts.isEqualTo(s)) &&
        !alreadyTreatStrokes.some(ts => ts.containStroke(s) || s.containStroke(ts))
    );
  }

  /**
   * Recursive method to run through the next stroke according to the currentPoint
   * @param nextStroke next stroke to running through
   * @param currentPoint previous point from where we run through
   * @param startPoint the running start point
   * @param alreadyTreatPoints points already pass through
   * @param alreadyTreatStrokes strokes already pass through
   * @param toTreatStrokes strokes remaining to potencially run through
   * @returns list of polygon found from running through
   */
  private _runThroughNextStroke(
    nextStroke: Stroke,
    currentPoint: Point,
    startPoint: Point,
    alreadyTreatPoints: Point[],
    alreadyTreatStrokes: Stroke[],
    toTreatStrokes: Stroke[]
  ): Polygon[] {
    ArrayUtils.removeFrom(toTreatStrokes, nextStroke);
    const nextPoint = nextStroke.getOtherEnding(currentPoint);
    if (startPoint.isEqualTo(nextPoint)) {
      return [new Polygon(alreadyTreatStrokes)];
    }
    if (alreadyTreatPoints.some(p => p.isEqualTo(nextPoint))) {
      return [];
    }
    return this._runThroughStrokesFromPoint(
      nextPoint,
      startPoint,
      [...alreadyTreatPoints, nextPoint],
      [...alreadyTreatStrokes],
      [...toTreatStrokes]
    );
  }

  /**
   * Base of recursive calling, will run through all strokes from a point
   * @param currentPoint point from where run throuhg connected strokes
   * @param startPoint the running start point
   * @param alreadyTreatPoints points already pass through
   * @param alreadyTreatStrokes strokes already pass through
   * @param toTreatStrokes strokes remaining to potencially run through
   * @returns list of polygons found from running through
   */
  private _runThroughStrokesFromPoint(
    currentPoint: Point,
    startPoint: Point,
    alreadyTreatPoints: Point[],
    alreadyTreatStrokes: Stroke[],
    toTreatStrokes: Stroke[]
  ): Polygon[] {
    const nextStrokes = this._findAllJoiningStrokesFromPoint(
      currentPoint,
      alreadyTreatStrokes,
      toTreatStrokes
    );
    const polygons = [];
    for (let nextStroke of nextStrokes) {
      polygons.push(
        ...this._runThroughNextStroke(
          nextStroke,
          currentPoint,
          startPoint,
          [...alreadyTreatPoints],
          [...alreadyTreatStrokes, nextStroke],
          [...toTreatStrokes]
        )
      );
    }
    return polygons;
  }

  /**
   * Break into substrokes all contained strokes
   * @param strokes list of strokes to break contained strokes
   * @returns list of strokes without contained strokes
   */
  private _breakAllContainedStrokes(strokes: Stroke[]): Stroke[] {
    let toTreat = [...strokes];
    let toKeep = [];
    let index = 0;
    while (index < toTreat.length) {
      const stroke = toTreat[index];

      const containedStrokes = toTreat.filter(s => !stroke.isEqualTo(s) && stroke.containStroke(s));
      for (let containedStroke of containedStrokes) {
        const sameEndings = containedStroke.endings.filter(e =>
          stroke.endings.some(ending => ending.isEqualTo(e))
        );
        if (sameEndings.length <= 0) {
          //stroke inclue
          for (let ending of stroke.endings) {
            const nearestEnding = containedStroke.getNearestEndingOf(ending);
            toTreat.push(new Segment(ending, nearestEnding));
          }
          ArrayUtils.removeFrom(toTreat, stroke);
        } else if (sameEndings.length === 1) {
          //only one same ending
          toTreat.push(
            new Segment(
              stroke.getOtherEnding(sameEndings[0]),
              containedStroke.getOtherEnding(sameEndings[0])
            )
          );
          ArrayUtils.removeFrom(toTreat, stroke);
        } else if (sameEndings.length === 2) {
          //same lines
          ArrayUtils.removeFrom(toTreat, stroke);
        }
      }

      if (containedStrokes.length <= 0) {
        toKeep.push(stroke);
        index += 1;
      }
    }
    return toKeep;
  }

  /**
   * Break into substrokes all intersect strokes
   * @param strokes list of strokes to break into substrokes
   * @returns list of strokes without intersections
   */
  private _breakAllIntersectStrokes(strokes: Stroke[]): Stroke[] {
    let toTreat = [...strokes];
    let index = 0;
    while (index < toTreat.length) {
      const stroke = toTreat[index];

      const intersectStrokes = toTreat.filter(s => {
        const intersectPoint = s.getIntersectionPointWith(stroke);
        if (!intersectPoint) return false;
        return (
          !s.endings.some(e => e.isEqualTo(intersectPoint)) &&
          !stroke.endings.some(e => e.isEqualTo(intersectPoint))
        );
      });
      for (let intersectStroke of intersectStrokes) {
        for (let ending of [...stroke.endings, ...intersectStroke.endings]) {
          toTreat.push(new Segment(stroke.getIntersectionPointWith(intersectStroke)!, ending));
        }
        ArrayUtils.removeFrom(toTreat, intersectStroke);
      }

      if (intersectStrokes.length <= 0) {
        index += 1;
      } else {
        ArrayUtils.removeFrom(toTreat, stroke);
      }
    }
    return toTreat;
  }

  /**
   * Remove all duplicate strokes in a list
   * @param allStrokes list of strokes from where remove duplicates
   * @returns list of strokes without duplicates
   */
  private _removeAllDuplicateStrokes(allStrokes: Stroke[]): Stroke[] {
    let strokes: Stroke[] = [];
    for (let stroke of allStrokes) {
      if (strokes.some(s => s.isEqualTo(stroke))) continue;
      strokes.push(stroke);
    }
    return strokes;
  }

  /**
   * Remove potencial container polygon (polygon which are addition of severals subpolygons)
   * @param polygons list of polygons where check if contains container polygon
   * @returns list of polygons without container polygon
   */
  private _removeContainerPolygon(polygons: Polygon[]): Polygon[] {
    let toKeep: Polygon[] = [];
    for (let poly of polygons) {
      for (let stroke of poly.strokes) {
        const containedPolygons = polygons.some(p => {
          const res =
            !p.isEqualTo(poly) &&
            poly.containPolygon(p) &&
            p.strokes.some(s => s.isEqualTo(stroke));
          return res;
        });
        if (!containedPolygons) {
          toKeep.push(poly);
          break;
        }
      }
    }
    return toKeep;
  }

  /**
   * Create Polygons from a list a strokes
   * @param strokes List of strokes to transform to polygons
   * @returns list of polygons found with the given strokes
   */
  public create(strokes: Stroke[]): Polygon[] {
    if (strokes.length < 2) {
      throw new Error('not enough strokes to create a polygon (need at least 2)');
    }

    let allStrokes = this._removeAllDuplicateStrokes(strokes);
    allStrokes = this._breakAllIntersectStrokes(allStrokes);
    allStrokes = this._removeAllDuplicateStrokes(allStrokes);
    allStrokes = this._breakAllContainedStrokes(allStrokes);
    allStrokes = this._removeAllDuplicateStrokes(allStrokes);

    let polygons: Polygon[] = [];

    for (let stroke of allStrokes) {
      let toTreat: Stroke[] = [...allStrokes];
      ArrayUtils.removeFrom(toTreat, stroke);
      for (let p of stroke.endings) {
        const foundPolygons = this._runThroughStrokesFromPoint(
          p,
          stroke.getOtherEnding(p),
          stroke.endings,
          [stroke],
          toTreat
        );
        for (let poly of foundPolygons) {
          if (!polygons.some(p => poly.isEqualTo(p))) {
            polygons.push(poly);
          }
        }
      }
    }

    polygons = this._removeContainerPolygon(polygons);
    for (let poly of polygons) {
      poly.simplify();
    }

    return polygons;
  }
}

export default new PolygonFactory();
