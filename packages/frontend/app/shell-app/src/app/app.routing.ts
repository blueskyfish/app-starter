import { Routes } from '@angular/router';
import { RouteName } from '@blueskyfish/frontend-commons';

export const ROTES: Routes = [
  {
    path: RouteName.User,
    loadChildren: () => import('@blueskyfish/frontend-user').then(m => m.FrontendUserModule),
  },
  {
    path: RouteName.Dashboard,
    loadChildren: () => import('@blueskyfish/frontend-dashboard').then(m => m.FrontendDashboardModule),
  },
  {
    path: '**',
    redirectTo: RouteName.Dashboard,
  }
]
