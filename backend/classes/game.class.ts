import {Timer} from './timer.class.ts'
import {Grid} from './grid.class.ts';
import {Player} from './player.class.ts'
import uniqid from "uniqid";
import {Turn} from "./turn.class.ts";
import type {SocketId} from "socket.io-adapter/dist/in-memory-adapter";

class Game {
    public id: string;
    public currentTurn: Turn;
    public timer: Timer;
    public playerOne: Player;
    public playerTwo: Player;
    public grid: Grid;

    constructor(playerOne: Player, playerTwo: Player, turnDuration: number) {
        this.id = uniqid();
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.playerOne.setCurrentGame(this);
        this.playerTwo.setCurrentGame(this);
        this.timer = this.createTimer(turnDuration);
        this.grid = this.createGrid();
        this.currentTurn = new Turn(playerOne, turnDuration);
    }

    private createTimer(turnTime: number): Timer {
        return new Timer(this, turnTime);
    }

    private createGrid(): Grid {
      return new Grid();
    }

    public playerInGame(id: SocketId): boolean {
        if (this.playerOne.socket.id !== id && this.playerTwo.socket.id !== id) {
            return false;
        }
        return true;
    }

    public getPlayerOpponent(player: Player): Player {
        if (player.socket.id === this.playerOne.socket.id) {
            return this.playerTwo;
        } else if (player.socket.id === this.playerTwo.socket.id) {
            return this.playerOne;
        } else {
            throw new Error(`Player ${player.socket.id} not in the game.`);
        }
    }

    public getPlayerTurnTimers(player: Player) {
        return {
            playerTimer: this.currentTurn.currentPlayer.socket.id === player.socket.id ? this.timer.startingTime : 0,
            opponentTimer: this.currentTurn.currentPlayer.socket.id !== player.socket.id ? this.timer.startingTime : 0,
        };
    }

    public switchTurn() {
        this.currentTurn.currentPlayer = this.currentTurn.currentPlayer.socket.id === this.playerTwo.socket.id ? this.playerOne : this.playerTwo;
    }
}


export {Game};