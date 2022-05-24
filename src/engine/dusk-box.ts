import { Symbol } from "../components/symbol";
import { PastTable, PresentTable } from "./tables";

export class DuskBox {
    constructor() {

    }   

    _getNbLines(symbol: Symbol): number {
        return symbol.lines.length; // check collisions
    }

    _getNbFormes(symbol: Symbol): number {
        return 0
    }

    tradPast(symbol: Symbol): string {
        return PastTable.getLetterFor(this._getNbLines(symbol), this._getNbFormes(symbol));
    }

    tradPresent(symbol: Symbol): string {
        return PresentTable.getLetterFor(this._getNbLines(symbol), this._getNbFormes(symbol));
    }

    save(symbol: Symbol) {

    }
}