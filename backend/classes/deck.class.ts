import {Dice} from './dice.class.ts';

class Deck {
    public pieces: number;
    public dices: Array<Dice>;

    constructor(pieces: number = 12) {
        this.pieces = pieces;
        this.dices = this.createDices();
    }

    private createDices(): Array<Dice> {

    }
}

export {Deck};