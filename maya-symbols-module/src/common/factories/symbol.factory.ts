import { throws } from 'assert';
import { Stroke } from '../../app/geometrics/stroke/stroke';
import { Symbol } from '../../app/symbol/symbol';
import { SymbolOptions } from '../types/SymbolOptions';
import Factory from './factory';
import polygonFactory from './polygon.factory';

class SymbolFactory implements Factory {
  private _formsAreValid(forms: Stroke[][]): boolean {
    for (let form of forms) {
      //check if strokes intersect
      for (let stroke of form) {
        if (
          forms.some(f =>
            f.some(s => {
              if (s.isEqualTo(stroke)) return false;
              const intersectionPoint = stroke.getIntersectionPointWith(s);
              if (intersectionPoint && !stroke.endings.some(e => e.isEqualTo(intersectionPoint))) {
                return true;
              }
              return !(s.containStroke(stroke) || stroke.containStroke(s));
            })
          )
        ) {
          throw new Error('segments of forms intersects');
        }
      }
    }
    return true;
  }

  public create(options: SymbolOptions): Symbol {
    this._formsAreValid(options.forms);

    let nbLines = 0;
    let nbFormsInner = 0;
    let nbFormsOuter = 0;

    const allStrokes = options.forms.flat();

    const polygons = polygonFactory.create(allStrokes);
    polygons.forEach(p => (nbLines += p.nbStrokes));
    //polygons.push(canvas)

    //create forms from polygons
    //put meanings ?
    return new Symbol();
  }
}
