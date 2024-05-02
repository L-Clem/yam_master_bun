import type {choice} from '../types';
import {Timer} from './timer.class.ts'
import {Grid} from './grid.class.ts';
import {Player} from './player.class.ts'
import uniqid from "uniqid";

class Game {
    public id: string;
    public currentTurn: Player | undefined;
    public timer: Timer;
    public playerOne: Player | undefined;
    public playerTwo: Player | undefined;
    public grid: Grid;

//TODO deck type
    constructor(turnTime: number) {
        this.id = uniqid();
        this.currentTurn = undefined;
        this.playerOne = undefined;
        this.playerTwo = undefined;
        this.timer = this.createTimer(turnTime);
        this.grid = this.createGrid();
    }

    private createTimer(turnTime: number): Timer {
        return new Timer(turnTime);
    }

    private createGrid(): Grid {
      return new Grid();
    }

    public addPlayerOne(player: Player): void {
        this.playerOne = player;
    }
    public addPlayerTwo(player: Player): void {
        this.playerTwo = player;
    }

}


export {Game};