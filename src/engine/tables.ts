
export function quotient(a: number, b: number): number {
    return (a - a % b) / b;
}

export function arrayContainOnly(arr: any[], b: any): boolean {
    return arr.every((a: any) => a === b);
}

export class Table {
    characters: string[] = [ // permet d'avoir des alphabets différents en fonction des languages
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
        "T", "U", "V", "W", "X", "Y", "Z", " ", ".", ",", "?", "!", "...", ":", ";", '"', "()"
    ];
    tailleTableX: number;
    decalage: number;
    table: string[][];
    defaultCharacter: string = '';

    constructor(tailleTableX: number, decalage: number) {
        this.tailleTableX = tailleTableX;
        this.decalage = decalage;
        this.table = []
        this._init()
    }

    _init() {
        let compteur = 0;
        let current_line : string[] = [];
        while (compteur < this.characters.length) {
            // Ajout d'une ligne si compteur multiple de tailleTableX
            if (quotient(compteur, this.tailleTableX) > this.table.length) {
                this.table.push(current_line);
                current_line = [];
                for (let i = 0; i<this.tailleTableX; i++) {
                    current_line.push(this.defaultCharacter);
                }
            }
            // Set du character a la bonne place dans la currentLine
            let indexCharacter = (compteur + this.decalage) % (this.tailleTableX);
            current_line[indexCharacter] = this.characters[compteur];
            // Update compteur
            compteur += 1;
        }
        // Ajout de la currentLine en création
        if (!arrayContainOnly(current_line, this.defaultCharacter)) {
            this.table.push(current_line)
        }
    }

    preprocessInputs(x: number, y: number) {
        y -= 1;
        return [x, y];
    }

    getLetterFor(x: number, y: number): string {
        [x, y] = this.preprocessInputs(x, y);
        x = x % this.tailleTableX
        if (y >= 0 && x >= 0 && y < this.table.length && x < this.table[y].length)
            return this.table[y][x];
        return this.defaultCharacter;
    }
}

export const PresentTable = new Table(9, 3);
PresentTable.preprocessInputs = (x, y) => {y -= 1; x -= 1; return [x, y]};

export const PastTable = new Table(8, 0);