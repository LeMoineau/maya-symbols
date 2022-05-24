import { SChip } from "./s-chip";
import { SFrame } from "./s-frame";
import { SLine } from "./s-line";
export declare class Symbol {
    frame: SFrame;
    lines: SLine[];
    chips: SChip[];
    constructor();
    addLine(line: SLine): void;
    removeLine(id: string): void;
}
