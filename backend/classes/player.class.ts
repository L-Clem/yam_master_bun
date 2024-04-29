import {Deck} from './deck.class.ts';
import {Score} from './score.class.ts';

class Player {
    public deck: Deck;
    public score: Score;

    constructor() {
        this.deck = this.createDeck();
        this.score = this.createScore();
    }

    private createDeck(): Deck {
        return new Deck();
    }

    private createScore(): Score {
        return new Score();
    }
}

export { Player };