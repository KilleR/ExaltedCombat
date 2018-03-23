import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSliderModule,
    MatSlideToggleModule,
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
        MatSlideToggleModule,
        MatIconModule,
        MatSliderModule
    ],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatIconModule,
        MatSliderModule
    ],
    declarations:
[]
})

export class MaterialModulesModule {
}
