import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RouteName } from '@blueskyfish/frontend-commons';
import { AuthManagerService } from '../services/auth-manager.service';

/**
 * The guard redirect to the dashboard url, if the user is already logged-in
 */
@Injectable({
  providedIn: 'root'
})
export class LoginUserGuard implements CanActivate {

  constructor(private router: Router, private authManager: AuthManagerService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authManager.hasToken) {
      return this.router.createUrlTree([RouteName.Root, RouteName.Dashboard])
    }
    return true;
  }
}
