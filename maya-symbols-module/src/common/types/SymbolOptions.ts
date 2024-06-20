import { Stroke } from '../../app/geometrics/stroke/stroke';

export interface SymbolOptions {
  canvas: { width: number; height: number };
  forms: Stroke[][];
  futureMeaning?: string;
}
