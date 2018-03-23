import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './routing/app-routing.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModulesModule} from "./material-modules/material-modules.module";
import { CombatCoreComponent } from './combat-core/combat-core.component';


@NgModule({
    declarations: [
        AppComponent,
        CombatCoreComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModulesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
