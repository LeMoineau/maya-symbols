"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Symbol = void 0;
const s_chip_1 = require("./s-chip");
const s_frame_1 = require("./s-frame");
class Symbol {
    constructor() {
        this.frame = new s_frame_1.SFrame();
        this.lines = [];
        this.chips = [new s_chip_1.SChip(), new s_chip_1.SChip(), new s_chip_1.SChip()];
    }
    addLine(line) {
        this.lines.push(line);
    }
    removeLine(id) {
        let test = [];
        let index = this.lines.findIndex((l) => l.id === id);
        if (index != -1) {
            this.lines.splice(index, 1);
        }
    }
}
exports.Symbol = Symbol;
