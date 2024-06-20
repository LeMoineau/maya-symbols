import { SymbolOptions } from '../common/types/SymbolOptions';
import polygonFactory from '../common/factories/polygon.factory';

export function encryptSymbol(options: SymbolOptions): Symbol | undefined {
  let nbLines = 0;
  let nbFormsInner = 0;
  let nbFormsOuter = 0;

  const allStrokes = options.forms.flat();

  const polygons = polygonFactory.create(allStrokes);
  polygons.forEach(p => (nbLines += p.nbStrokes));
  //polygons.push(canvas)

  //create forms from polygons
  //put meanings ?
  return undefined;
}
