import {DiceRollerService} from "../dice-roller.service";

export class Attack {
    attackPool: number;
    toHitResults: number[] = [];
    get toHitTotal(): number {
        return DiceRollerService.countSuccesses(this.toHitResults)
    }
    hitMargin: number;
    woundResults: number[] = [];
    get woundTotal(): number {
        return DiceRollerService.countSuccesses(this.woundResults)
    }

    constructor(){

    }

}
