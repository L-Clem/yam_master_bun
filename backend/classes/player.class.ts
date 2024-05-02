import {Deck} from './deck.class.ts';
import {Score} from './score.class.ts';
import type {Socket} from "socket.io";

class Player {
    public inQueue: boolean;
    public inGame: boolean;
    public socket: Socket;
    public deck: Deck;
    public score: Score;

    constructor(socket: Socket) {
        this.inQueue = false;
        this.inGame = false;
        this.socket = socket;
        this.deck = this.createDeck();
        this.score = this.createScore(0);
    }

    private createDeck(): Deck {
        return new Deck(12);
    }

    private createScore(score: number): Score {
        return new Score(score);
    }

    public getState() {

    }
}

export { Player };