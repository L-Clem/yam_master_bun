class Dice {
    public id: number;
    public value: string;
    public locked: boolean;

    constructor(id: number) {
        this.id = id;
        this.value = '';
        this.locked = true;
    }

    public roll(): void {
        if (this.value === '') {
            this.value = String(Math.floor(Math.random() * 6 + 1));
            this.locked = false;
        }
        else if (!this.locked) {
            this.value = String(Math.floor(Math.random() * 6 + 1));
        }
    }
}

export { Dice };