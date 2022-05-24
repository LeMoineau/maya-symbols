import { Symbol as s } from "./components/symbol";
import { SLine as sl} from "./components/s-line";
import { SChip as sc} from "./components/s-chip";
import { SFrame as sf} from "./components/s-frame";
import { Coordonate as c} from "./components/coordonates";
import { DuskBox } from "./engine/dusk-box";
import { PastTable, PresentTable } from "./engine/tables";
import { Table } from "./engine/tables";

export const Symbol = s;
export const SLine = sl;
export const SFrame = sf;
export const SChip = sc;
export const Coordonate = c;
export const pastTable = PastTable;
export const presentTable = PresentTable;
export const table = Table;