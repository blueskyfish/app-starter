import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrontendThemeModule } from '@blueskyfish/frontend-theme';
import { ShellBarComponent } from './components';

@NgModule({
    declarations: [
        ShellBarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FrontendThemeModule,
    ],
    exports: [
        ShellBarComponent
    ]
})
export class FrontendShellBarUiModule {}
