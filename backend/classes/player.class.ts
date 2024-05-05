import {Deck} from './deck.class.ts';
import {Score} from './score.class.ts';
import type {Socket} from "socket.io";
import type {Game} from "./game.class.ts";

class Player {
    public inQueue: boolean;
    public inGame: boolean;
    public socket: Socket;
    public deck: Deck;
    public score: Score;
    private currentGame: Game | undefined;
    //TODO add currentGame property

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

    public setCurrentGame(game: Game): void {
        this.currentGame = game;
    }

    //TODO Refaire
    public getGameState() {
        return {
            inQueue: this.inQueue,
            inGame: this.inGame,
            idPlayer: this.socket.id,
            idOpponent: this.currentGame!.getPlayerOpponent(this),
        };
    }
    public getQueueState(){
        return {
            inQueue: this.inQueue,
            inGame: this.inGame,
        };
    }

    public getDeckState() {
        return {
            displayPlayerDeck: this.currentGame!.currentTurn.currentPlayer.socket.id === this.socket.id,
            displayOpponentDeck: this.currentGame!.currentTurn.currentPlayer.socket.id !== this.socket.id,
            //TODO displayRollButton
            rollsCounter: this.deck.rollsCounter,
            rollsMaximum: this.deck.rollsMaximum,
            dices: this.deck.dices,
        };
    }

    public getGridState() {
        return {
            displayGrid: true,
            canSelectCells: this.currentGame!.currentTurn.currentPlayer.socket.id === this.socket.id && this.currentGame!.currentTurn.availableChoices.length > 0,
            grid: this.currentGame!.grid,
        };
    }
}

export { Player };