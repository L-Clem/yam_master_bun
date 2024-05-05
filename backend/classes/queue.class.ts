import type {Player} from "./player.class.ts";

class Queue<T> {
    public elements: Array<T>;

    constructor() {
        this.elements = new Array<T>();
    }

    public addElementToQueue(element: T) {
        this.elements.push(element);
    }

    public removeFirstElementFromQueue(): T {
        if (this.elements.length === 0) {
            throw new RangeError('Nothing in the queue to remove and return.');
        }
        return this.elements.shift()!;
    }
}

export { Queue };