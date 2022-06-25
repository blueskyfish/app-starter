import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { createFormControl } from '@blueskyfish/frontend-commons';
import { UserFacadeService } from '@blueskyfish/frontend-user-store';

@Component({
  selector: 'app-login-view',
  template: `
    <div class="app-login-page app-page app-forms" [formGroup]="formLogin">
      <h2>{{ 'app.user.pages.login.title' | transloco }}</h2>
      <app-input-control
        type="text"
        [label]="'app.user.pages.login.email.label' | transloco"
        formControlName="email"
      ></app-input-control>
      <app-input-control
        type="password"
        [label]="'app.user.pages.login.password.label' | transloco"
        formControlName="password"
      ></app-input-control>
      <div class="app-button-bar align-end">
        <button
          type="button"
          class="btn btn-outline-primary d-flex align-items-center"
          [disabled]="formLogin.invalid"
          (click)="sendLogin()"
        >
          <span>{{ 'app.user.pages.login.button.okay.label' | transloco }}</span>
          <i class="mdi mdi-chevron-right ms-2"></i>
        </button>
      </div>
    </div>
  `,
  styleUrls: [ './login-view.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class LoginViewComponent {
  /**
   * Form group with 2 input controls for the user credentials.
   */
  readonly formLogin = new FormGroup({
    email: createFormControl('', false, Validators.required, Validators.email),
    password: createFormControl('', false, Validators.required, Validators.minLength(3)),
  });

  constructor(private userFacade: UserFacadeService) {
  }

  sendLogin(): void {
    const value = this.formLogin.getRawValue();
    this.userFacade.sendLogin(value);
  }
}
