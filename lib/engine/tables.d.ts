export declare function quotient(a: number, b: number): number;
export declare function arrayContainOnly(arr: any[], b: any): boolean;
export declare class Table {
    characters: string[];
    tailleTableX: number;
    decalage: number;
    table: string[][];
    defaultCharacter: string;
    constructor(tailleTableX: number, decalage: number);
    _init(): void;
    preprocessInputs(x: number, y: number): number[];
    getLetterFor(x: number, y: number): string;
}
export declare const PresentTable: Table;
export declare const PastTable: Table;
