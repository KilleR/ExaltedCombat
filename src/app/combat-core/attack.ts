import {DiceRollerService} from '../dice-roller.service';

export class Attack {
    attackPool: number;
    attackAdded: number = 0;
    toHitResults: number[] = [];

    get toHitTotal(): number {
        return DiceRollerService.countSuccesses(this.toHitResults) + this.attackAdded;
    }

    hitMargin: number;

    woundAdded: number = 0;

    woundMultiple: number = 1;
    woundResults: number[] = [];

    get woundTotal(): number {
        return (DiceRollerService.countSuccesses(this.woundResults) + this.woundAdded) * this.woundMultiple;
    }

    extraWoundAdded: number = 0;
    extraWoundResults: number[] = [];

    get extraWoundTotal(): number {
        return DiceRollerService.countSuccesses(this.extraWoundResults) + this.extraWoundAdded;
    }

    constructor() {

    }

}
