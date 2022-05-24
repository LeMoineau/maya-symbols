import { SChip } from "./s-chip"
import { SFrame } from "./s-frame"
import { SLine } from "./s-line"

export class Symbol {
    frame: SFrame;
    lines: SLine[];
    chips: SChip[];

    constructor() {
        this.frame = new SFrame();
        this.lines = [];
        this.chips = [new SChip(), new SChip(), new SChip()];
    }

    addLine(line: SLine) {
        this.lines.push(line);
    }

    removeLine(id: string) {
        let test = []
        
        let index = this.lines.findIndex((l: SLine) => l.id === id);
        if (index != -1) {
            this.lines.splice(index, 1)
        }
    }
}