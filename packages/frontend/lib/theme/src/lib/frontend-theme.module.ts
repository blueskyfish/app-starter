import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbOffcanvasModule,
  NgbTimepickerModule,
  NgbToastModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbOffcanvasModule,
    NgbModalModule,
    NgbTimepickerModule,
    NgbToastModule,
    NgbTypeaheadModule,
  ],
})
export class FrontendThemeModule {}
