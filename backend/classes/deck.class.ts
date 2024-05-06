import {Dice} from './dice.class.ts';
import type {Game} from "./game.class.ts";

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

    public setDefaultDeck(diceNumber: number = 5): void {
        this.rollsCounter = 1;
        this.rollsMaximum = 3;
        this.dices = this.createDices(diceNumber);
    }

    public rollDices() {
        this.dices = this.dices.map((dice): Dice => {
            dice.roll();
            return dice;
        });
        this.rollsCounter++;
    }
    public lockDices() {
        this.dices = this.dices.map((dice): Dice => {
            dice.locked = true;
            return dice;
        });
    }
}

export {Deck};