"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuskBox = void 0;
const tables_1 = require("./tables");
class DuskBox {
    constructor() {
    }
    _getNbLines(symbol) {
        return symbol.lines.length; // check collisions
    }
    _getNbFormes(symbol) {
        return 0;
    }
    tradPast(symbol) {
        return tables_1.PastTable.getLetterFor(this._getNbLines(symbol), this._getNbFormes(symbol));
    }
    tradPresent(symbol) {
        return tables_1.PresentTable.getLetterFor(this._getNbLines(symbol), this._getNbFormes(symbol));
    }
    save(symbol) {
    }
}
exports.DuskBox = DuskBox;
