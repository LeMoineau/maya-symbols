import { v4 as uuidv4 } from 'uuid';
import { Coordonate } from './coordonates';

export class SLine {
    id: string;
    c1: Coordonate;
    c2: Coordonate;

    constructor(c1: Coordonate, c2: Coordonate) {
        this.id = uuidv4();
        this.c1 = c1;
        this.c2 = c2;
    }
}