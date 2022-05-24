import { Symbol } from "../components/symbol";
export declare class DuskBox {
    constructor();
    _getNbLines(symbol: Symbol): number;
    _getNbFormes(symbol: Symbol): number;
    tradPast(symbol: Symbol): string;
    tradPresent(symbol: Symbol): string;
    save(symbol: Symbol): void;
}
