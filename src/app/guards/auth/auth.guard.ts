import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { TABLES } from 'src/resources/constants/TABLES';
import { PAGES } from 'src/resources/constants/pages';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = this.storage.get(TABLES.session) !== null;
    if (!isLoggedIn) {
      this.router.navigate([PAGES.LOGIN])
    }
    return isLoggedIn;
  }
}
