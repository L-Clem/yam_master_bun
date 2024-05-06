import type {Combination} from "../types.ts";

class Combinations {
    public static combinations: Array<Combination> = [
        { value: 'Brelan1', id: 'brelan1' },
        { value: 'Brelan2', id: 'brelan2' },
        { value: 'Brelan3', id: 'brelan3' },
        { value: 'Brelan4', id: 'brelan4' },
        { value: 'Brelan5', id: 'brelan5' },
        { value: 'Brelan6', id: 'brelan6' },
        { value: 'Full', id: 'full' },
        { value: 'Carré', id: 'carre' },
        { value: 'Yam', id: 'yam' },
        { value: 'Suite', id: 'suite' },
        { value: '≤8', id: 'moinshuit' },
        { value: 'Sec', id: 'sec' },
        { value: 'Défi', id: 'defi' },
    ];

    public static findCombinationById(idToFind: string): Combination | void {
        return Combinations.combinations.find((element) => {
           if (element.id.includes(idToFind.toLowerCase())) {
               return element;
           }
           return undefined;
        });
    }
}

export { Combinations };