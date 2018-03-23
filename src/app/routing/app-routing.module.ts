import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CombatCoreComponent} from "../combat-core/combat-core.component";

const routes: Routes = [
    {
        path: '',
        component: CombatCoreComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
