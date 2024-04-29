import {Cell} from "./cell.class.ts";

class Grid {
    public cells: Array<Array<Cell>>;

    constructor() {
        this.cells = this.createCells();
    }

    private createCells(): Array<Array<Cell>> {

    }
}

export { Grid };