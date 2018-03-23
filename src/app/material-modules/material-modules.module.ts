import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule, MatToolbarModule} from "@angular/material";

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatCardModule
    ],
    exports: [
        MatToolbarModule,
        MatCardModule
    ],
    declarations:
[]
})

export class MaterialModulesModule {
}
