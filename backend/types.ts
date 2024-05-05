import type { Socket } from "socket.io";
import type {Game} from "./classes/game.class.ts";

/**================================================================================================
 *                                         TYPES & INTERFACES
 *================================================================================================**/
//TODO remove?
 interface game {

}

 interface gameState {

}

 interface choice {

}

type queue = Array<Socket>;

type Combination = {
    value: string,
    id: string,
}

type GameInterval = (game: Game) => any;

export type { game, gameState, choice, Combination, GameInterval}