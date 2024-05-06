import {Cell} from "./cell.class.ts";

class Grid {
    public cells: Array<Array<Cell>>;

    constructor() {
        this.cells = this.createCells();
    }

    private createCells(): Array<Array<Cell>> {
        let grid: Array<Array<Cell>> = [];
        grid.push([
            new Cell('1', 'row1Brelan1'),
            new Cell('3', 'row1Brelan3'),
            new Cell('Défi', 'row1Defi'),
            new Cell('4', 'row1Brelan4'),
            new Cell('6', 'row1Brelan6')
        ])
        grid.push([
            new Cell('2', 'row1Brelan2'),
            new Cell('Carré', 'row1Carre'),
            new Cell('Sec', 'row1Sec'),
            new Cell('Full', 'row1Full'),
            new Cell('5', 'row1Brelan5')
        ])
        grid.push([
            new Cell('≤8', 'row1MoinsHuit'),
            new Cell('Full', 'row1Full'),
            new Cell('Yam', 'row1Yam'),
            new Cell('Défi', 'row1Defi'),
            new Cell('Suite', 'row1Suite')
        ])
        grid.push([
            new Cell('6', 'row1Brelan6'),
            new Cell('Sec', 'row1Sec'),
            new Cell('Suite', 'row1Suite'),
            new Cell('≤8', 'row1MoinsHuit'),
            new Cell('1', 'row1Brelan1')
        ])
        grid.push([
            new Cell('3', 'row1Brelan3'),
            new Cell('2', 'row1Brelan2'),
            new Cell('Carré', 'row1Carre'),
            new Cell('5', 'row1Brelan5'),
            new Cell('4', 'row1Brelan4')
        ])
        return grid;
    };

    public resetCellsState() {
        this.cells.forEach((row) => {
            row.forEach((cell: Cell) => {
                cell.canBeChecked = false;
            })
        })
    }
}

export { Grid };