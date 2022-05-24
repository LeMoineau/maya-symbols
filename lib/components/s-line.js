"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLine = void 0;
const uuid_1 = require("uuid");
class SLine {
    constructor(c1, c2) {
        this.id = (0, uuid_1.v4)();
        this.c1 = c1;
        this.c2 = c2;
    }
}
exports.SLine = SLine;
