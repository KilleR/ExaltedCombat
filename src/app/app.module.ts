import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './routing/app-routing.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModulesModule} from "./material-modules/material-modules.module";
import { CombatCoreComponent } from './combat-core/combat-core.component';
import {DiceRollerService} from "./dice-roller.service";
import {ReactiveFormsModule} from "@angular/forms";
import { TestComponentComponent } from './test-component/test-component.component';


@NgModule({
    declarations: [
        AppComponent,
        CombatCoreComponent,
        TestComponentComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModulesModule
    ],
    providers: [DiceRollerService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
