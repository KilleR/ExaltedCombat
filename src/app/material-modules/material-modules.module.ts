import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatSlideToggleModule,
    MatToolbarModule
} from "@angular/material";

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatSlideToggleModule
    ],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatSlideToggleModule
    ],
    declarations:
[]
})

export class MaterialModulesModule {
}
