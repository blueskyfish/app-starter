import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginUserGuard } from '@blueskyfish/frontend-auth-util';
import { RouteName } from '@blueskyfish/frontend-commons';
import { LoginViewComponent } from './views';

const views = [
  LoginViewComponent,
];

@NgModule({
  declarations: [
    ...views,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule.forChild([
      {
        // abs-path: /user/login
        path: RouteName.Login,
        component: LoginViewComponent,
        // FIXME The translation of the user login
        title: 'User Login',
        canActivate: [
          LoginUserGuard,
        ]
      }
    ])
  ],
  exports: [
    RouterModule,
  ]
})
export class FrontendUserModule {}
