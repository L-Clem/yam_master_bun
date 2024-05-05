import type {Player} from "./player.class.ts";
import type {Combination} from "../types.ts";

class Turn {
    public currentPlayer: Player;
    //TODO to keep?
    public isDefi: boolean;
    public isSec: boolean;
    public idSelectedChoice: string;

    public availableChoices: Array<Combination>;
    public turnDuration: number;

    constructor(firstPlayer: Player, turnDuration: number) {
        this.isDefi = false;
        this.isSec = false;
        this.idSelectedChoice = '';

        this.availableChoices = [];
        this.currentPlayer = firstPlayer;
        this.turnDuration = turnDuration;
    }


}

export {Turn};