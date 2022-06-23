import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RouteName } from '@blueskyfish/frontend-commons';
import { AuthManagerService } from '../services/auth-manager.service';

/**
 * The guard protects a router, that needs an auth token
 */
@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {
  constructor(private router: Router, private authManager: AuthManagerService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.authManager.hasToken) {
      return this.router.createUrlTree([RouteName.Root, RouteName.User, RouteName.Login]);
    }
    // The auth token is present
    return true;
  }

}
