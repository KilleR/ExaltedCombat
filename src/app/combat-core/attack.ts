import {DiceRollerService} from "../dice-roller.service";

export class Attack {
    attackPool: number;
    toHitResults: number[] = [];
    get toHitTotal(): number {
        return DiceRollerService.countSuccesses(this.toHitResults)
    }
    hitMargin: number;

    woundMultiple: number= 1;
    woundResults: number[] = [];
    get woundTotal(): number {
        return DiceRollerService.countSuccesses(this.woundResults) * this.woundMultiple;
    }

    extraWoundResults: number[] = [];
    get extraWoundTotal(): number {
        return DiceRollerService.countSuccesses(this.extraWoundResults)
    }

    constructor(){

    }

}
