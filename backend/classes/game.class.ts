import type { choice } from '../types';

export class Game {
  public currentTurn: string;
  public timer: number;
  public player1Score: number;
  public player2Score: number;
  public choices: Object;
  public deck: Object;
  public grid: Object;

//TODO deck type
  constructor(timer: number = 30, deck: any, choices, grid) {
    this.currentTurn = 'player:1';
    this.timer = timer;
    this.player1Score = 0;
    this.player2Score = 0;
    this.deck = {};
    this.choices = {};
    this.choices = {};
    this.grid = {};
  }
}
