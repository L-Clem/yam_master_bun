import type {Player} from "./player.class.ts";
import type {Combination} from "../types.ts";

class Turn {
    public currentPlayer: Player | undefined;
    //TODO to keep?
    public isDefi: boolean;
    public isSec: boolean;
    public idSelectedChoice: string;

    public availableChoices: Array<Combination>;

    constructor() {
        this.isDefi = false;
        this.isSec = false;
        this.idSelectedChoice = '';
        this.availableChoices = [];
    }
}

export {Turn};