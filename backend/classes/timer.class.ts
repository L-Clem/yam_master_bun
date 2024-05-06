import type {GameInterval} from "../types.ts";
import  {Game} from "./game.class.ts";

class Timer {
    public startingTime: number;
    public currentTime: number;
    private readonly game: Game;
    private task: globalThis.Timer | undefined;

    constructor(game: Game, timerDuration: number) {
        this.startingTime = timerDuration;
        this.currentTime = timerDuration;
        this.game = game;
    }

    public decreaseTimeBy(time: number) {
        this.currentTime -= time;
    }

    public executeAtInterval(callback: GameInterval, interval: number) {
        this.task = setInterval(() => {
            this.decreaseTimeBy(interval)
            callback(this.game);
        }, interval);
    }
    public clearAtInterval() {
        clearInterval(this.task);
        this.task = undefined;
    }

    public resetTime() {
        this.currentTime = this.startingTime;
    }
}

export { Timer };