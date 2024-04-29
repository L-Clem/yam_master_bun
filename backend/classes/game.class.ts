import type {choice} from '../types';
import {Timer} from './timer.class.ts'
import {Grid} from './grid.class.ts';
import {Player} from './player.class.ts'

class Game {
    public currentTurn: string;
    public timer: Timer;
    public playerOne: Player;
    public playerTwo: Player;
    public grid: Grid;

//TODO deck type
    constructor(turnTime: number = 30) {
        this.currentTurn = 'player:1';
        this.timer = this.createTimer(turnTime);
        this.playerOne = this.createPlayer();
        this.playerTwo = this.createPlayer();
        this.grid = this.createGrid();
    }

    private createTimer(turnTime: number): Timer {
        return new Timer(turnTime);
    }

    private createGrid(): Grid {
      return new Grid();
    }

    private createPlayer(): Player {
      return new Player();
    }
}


export {Game};