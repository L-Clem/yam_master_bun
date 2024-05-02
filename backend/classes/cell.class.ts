class Cell {
    public viewContent: string;
    public id: string;
    public owner: undefined;
    public canBeChecked: boolean;

    constructor(viewContent: string, id: string) {
        this.viewContent = viewContent;
        this.id = id;
        this.owner = undefined;
        this.canBeChecked = false;
    }
}

export { Cell };