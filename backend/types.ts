import type { Socket } from "socket.io";

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

export type { game, gameState, choice, Combination }