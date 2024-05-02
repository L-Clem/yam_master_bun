class Dice {
    public id: number;
    public value: string;
    public locked: boolean;

    constructor(id: number) {
        this.id = id;
        this.value = '';
        this.locked = true;
    }
}

export { Dice };