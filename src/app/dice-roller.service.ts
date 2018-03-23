import {Injectable} from '@angular/core';

@Injectable()
export class DiceRollerService {
    diceSize: number = 10;

    constructor() {
    }

    rollOne(min?: number): number {
        if(!min) {
            min = 1
        }
        return Math.floor(Math.random() * (this.diceSize - (min-1)) + min) // roll between min and n ( [0 : n-min]+min
    }


    roll(n: number, min?: number): number[] {
        let rolls: number[] = [];
        for (let i = 0; i < n; i++) {
            rolls.push(this.rollOne(min));
        }
        return rolls;
    }

    rollTest() {
        let rollCounts: number[] = [];
        for (let i = 0; i < 10; i++) {
            rollCounts[i] = 0;
        }
        for (let i = 0; i < 10000000; i++) {
            let roll = this.rollOne();
            rollCounts[roll - 1]++;
        }
        return rollCounts
    }

    static countSuccesses(n: number[]): number {
        let retval = 0;
        if(n === undefined) {
            return 0;
        }
        for (let i = 0; i < n.length; i++) {
            if (n[i] == 10) {
                retval++
            }
            if (n[i] >= 7) {
                retval++
            }
        }
        return retval
    }
}
