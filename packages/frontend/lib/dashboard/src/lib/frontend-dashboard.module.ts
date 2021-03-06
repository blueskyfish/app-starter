import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthUserGuard } from '@blueskyfish/frontend-auth-util';
import { DashboardViewComponent } from './view';

const views = [
  DashboardViewComponent,
]

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
        // full-path: /dashboard
        path: '',
        pathMatch: 'full',
        component: DashboardViewComponent,
        canActivate: [
          AuthUserGuard,
        ]
      }
    ])
  ]
})
export class FrontendDashboardModule {

}
