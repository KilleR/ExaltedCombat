import {Component, OnInit} from '@angular/core';
import {DiceRollerService} from "../dice-roller.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Attack} from "./attack";
import {Cost} from "../cost";

@Component({
    selector: 'app-combat-core',
    templateUrl: './combat-core.component.html',
    styleUrls: ['./combat-core.component.css']
})
export class CombatCoreComponent implements OnInit {
    cost: Cost;
    inputForm: FormGroup;
    attacks: Attack[];

    get woundTotal():number {
        let tot = 0;
        for(let i = 0; i<this.attacks.length; i++) {
            tot += this.attacks[i].woundTotal;
            tot += this.attacks[i].extraWoundTotal;
        }
        return tot;
    }

    get basicWoundTotal(): number {
        let tot = 0;
        for(let i = 0; i<this.attacks.length; i++) {
            tot += this.attacks[i].woundTotal;
        }
        return tot;
    }

    get extraWoundTotal(): number{
        let tot = 0;
        for(let i = 0; i<this.attacks.length; i++) {
            tot += this.attacks[i].extraWoundTotal;
        }
        return tot;
    }

    constructor(private _diceRoller: DiceRollerService,
                private _fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.attacks = [];
        this.cost = new Cost();
    }

    createForm() {
        this.inputForm = this._fb.group({
            skill: 5,
            attr: 10,
            stunt: 0,
            essence: 5,
            initiative: 15,
            enemyDef: 7,
            enemyOnslaught: true,
            fireAndStones: true,
            fireAndStonesValue: 5,
            immortalBlade: true,
            excellentStrike: true,
            morningSunlight: true,
            hungryTiger: true,
            thunderboltAttack: true,
            invincibleFury: true,
            invincibleFuryNum: 10,
        })
    }

    roll() {
        // reset results
        this.attacks = [];
        this.cost = new Cost();

        let attackInitiative = this.getVal('initiative');

        // calculate initial costs and modifiers
        let attackCount = 1;
        if (this.getVal('invincibleFury')) {
            this.cost.motes += 5;
            this.cost.willpower += 1;
            attackCount = this.getVal('invincibleFuryNum');
        }

        if(this.getVal('excellentStrike')) {
            this.cost.motes += 3;
        }
        if(this.getVal('hungryTiger')) {
            this.cost.motes += 3;
            this.cost.initiative += 2;
            attackInitiative -= 2
        }
        if(this.getVal('fireAndStones')) {
            this.cost.motes += this.getVal('fireAndStonesValue')
        }
        if(this.getVal('thunderboltAttack')) {
            this.cost.motes += 4;
            this.cost.willpower += 1;
        }

        // loop attacks
        for (let i = 0; i < attackCount; i++) {
            // get attack pool
            let attack = new Attack();
            let attackPool = 0;
            attackPool += this.getVal('attr');
            attackPool += this.getVal('skill');
            attackPool += this.getVal('stunt');

            if(this.getVal('thunderboltAttack')) {
                attack.woundMultiple++;
            }

            // roll attack
            let rolls = this.getVal('excellentStrike') ? this._diceRoller.roll(attackPool, 2) : this._diceRoller.roll(attackPool);
            console.log('To Hit:', rolls);
            attack.toHitResults = rolls.sort((n1, n2) => n1 - n2);

            // get wound pool
            attack.hitMargin = attack.toHitTotal;
            if (this.getVal('enemyOnslaught')) {
                attack.hitMargin -= Math.max(1, this.getVal('enemyDef') - i);
                // console.log("Def after onslaught:",Math.max(1, this.getVal('enemyDef') - i));
            } else {
                attack.hitMargin -= this.getVal('enemyDef');
            }
            if (this.getVal('excellentStrike')) {
                attack.hitMargin++;
            }
            // console.log('Hit margin:', attack.hitMargin);

            if (attack.hitMargin >= 0) {
                // edge of morning sunlight wounds
                if (this.getVal('morningSunlight')) {
                    this.cost.motes += 2;

                    attack.extraWoundResults = this._diceRoller.roll(this.getVal('essence'))
                }

                // regular wound calculations
                let woundPool = 0;

                if (this.getVal('invincibleFury')) {
                    woundPool++;
                }

                // base attack value
                woundPool += Math.floor(attackInitiative / attackCount);
                // rollover initiative
                if ((attackInitiative % attackCount + i) >= attackCount) {
                    woundPool++;
                }
                console.log('Wound Pool from init:', woundPool);
                if(this.getVal('invincibleFury')) {
                    woundPool++; // +1 base per attack during IFOD
                }

                if (this.getVal('hungryTiger')) {
                    woundPool += attack.hitMargin;
                    // console.log('Hungry Tiger', attack.hitMargin);
                }
                if (this.getVal('fireAndStones')) {
                    let fns = Math.min(this.getVal('fireAndStonesValue'), attack.hitMargin);
                    woundPool += fns;
                    // console.log('Fire and Stones', fns);
                }
                if (this.getVal('immortalBlade')) {
                    woundPool += this.getVal('stunt'); // add stunt bonus

                    let immortalBladeMoved = Math.min(this.getVal('essence'), woundPool);
                    woundPool -= immortalBladeMoved;
                    attack.woundAdded = immortalBladeMoved;
                }

                rolls = this._diceRoller.roll(woundPool);
                attack.woundResults = rolls.sort((n1, n2) => n1 - n2);
            }

            this.attacks.push(attack);
        }
    }

    rollTest() {
        console.log(this._diceRoller.rollTest());
    }

    // helper to fetch core values
    getVal(v: string): any {
        return this.inputForm.get(v).value;
    }
}
