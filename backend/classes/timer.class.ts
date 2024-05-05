import type {GameInterval} from "../types.ts";
import  {Game} from "./game.class.ts";

class Timer {
    public startingTime: number;
    public currentTime: number;
    private game: Game;

    constructor(game: Game, timerDuration: number) {
        this.startingTime = timerDuration;
        this.currentTime = timerDuration;
        this.game = game;
    }

    public decreaseTimeBy(time: number) {
        this.currentTime -= time;
    }

    public executeAtInterval(callback: GameInterval, interval: number) {
        setInterval(() => {
            callback(this.game);
            this.decreaseTimeBy(interval)
        }, interval);
    }
}

export { Timer };