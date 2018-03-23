import {Component, OnInit} from '@angular/core';
import {DiceRollerService} from "../dice-roller.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Attack} from "./attack";

@Component({
    selector: 'app-combat-core',
    templateUrl: './combat-core.component.html',
    styleUrls: ['./combat-core.component.css']
})
export class CombatCoreComponent implements OnInit {
    inputForm: FormGroup;
    attacks: Attack[];

    constructor(private _diceRoller: DiceRollerService,
                private _fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.attacks = [];
    }

    createForm() {
        this.inputForm = this._fb.group({
            skill: 5,
            attr: 10,
            essence: 5,
            initiative: 15,
            enemyDef: 7,
            fireAndStones: true,
            fireAndStonesValue: 5,
            excellentStrike: true,
            hungryTiger: false,
            invincibleFury: true,
            invincibleFuryNum: 1,
        })
    }

    roll() {
        // reset results
        this.attacks = [];
        // get attack pool
        let attack = new Attack();
        let attackPool = 0;
        attackPool += this.getVal('attr');
        attackPool += this.getVal('skill');

        // roll attack
        let rolls = this.getVal('excellentStrike') ? this._diceRoller.roll(attackPool, 2) : this._diceRoller.roll(attackPool);
        console.log('To Hit:', rolls);
        attack.toHitResults = rolls.sort((n1, n2) => n1 - n2);

        // get wound pool
        attack.hitMargin = attack.toHitTotal - this.getVal('enemyDef');
        if(this.getVal('excellentStrike')) {
            attack.hitMargin++;
        }
        console.log('Hit margin:', attack.hitMargin);

        if (attack.hitMargin >= 0) {
            let woundPool = 0;
            woundPool += this.getVal('initiative');
            console.log('Iniitative', this.getVal('initiative'));
            if (this.getVal('hungryTiger')) {
                woundPool += attack.hitMargin;
                console.log('Hungry Tiger', attack.hitMargin);
            }
            if (this.getVal('fireAndStones')) {
                let fns = Math.min(this.getVal('fireAndStonesValue'), attack.hitMargin);
                woundPool += fns;
                console.log('Fire and Stones', fns);
            }

            rolls = this._diceRoller.roll(woundPool);
            attack.woundResults = rolls.sort((n1, n2) => n1 - n2);
        }

        this.attacks.push(attack);
    }

    rollTest() {
        console.log(this._diceRoller.rollTest());
    }

    // helper to fetch core values
    getVal(v: string): any {
        return this.inputForm.get(v).value;
    }
}
