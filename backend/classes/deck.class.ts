import {Dice} from './dice.class.ts';

class Deck {
    public pieces: number;
    public dices: Array<Dice>;
    public rollsCounter: number;
    public rollsMaximum: number;

    constructor(pieces: number) {
        this.pieces = pieces;
        this.rollsCounter = 1;
        this.rollsMaximum = 3;
        this.dices = this.createDices(5);
    }

    private createDices(numberOfDices: number): Array<Dice> {
        let dices: Array<Dice> = [];
        for (let i: number = 0; i <= numberOfDices; i++) {
            dices.push(new Dice(i));
        }
        return dices;
    }
}

export {Deck};