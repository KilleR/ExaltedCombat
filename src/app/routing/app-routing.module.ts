import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CombatCoreComponent} from '../combat-core/combat-core.component';
import {TestComponentComponent} from '../test-component/test-component.component';

const routes: Routes = [
    {
        path: '',
        component: CombatCoreComponent
    },
    {
        path: 'test',
        component: TestComponentComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
