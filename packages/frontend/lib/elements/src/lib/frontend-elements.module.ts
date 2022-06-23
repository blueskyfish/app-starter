import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrontendThemeModule } from '@blueskyfish/frontend-theme';
import {
  DropdownControlComponent,
  HiddenControlComponent,
  InputControlComponent,
  RadioGroupComponent
} from './components';
import { ResizerDirective } from './directives';
import { SafeHtmlPipe } from './pipes';

const components = [
  DropdownControlComponent,
  RadioGroupComponent,
  HiddenControlComponent,
  InputControlComponent,
];

const directives = [
  ResizerDirective,
];

const pipes = [
  SafeHtmlPipe,
];

@NgModule({
  declarations: [
    ...components,
    ...directives,
    ...pipes,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FrontendThemeModule,
  ],
  exports: [
    ...components,
    ...directives,
    ...pipes,
  ]
})
export class FrontendElementsModule {}
