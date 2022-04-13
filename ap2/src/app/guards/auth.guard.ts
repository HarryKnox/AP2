import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  // Code Reference https://devdactic.com/jwt-authentication-ionic/

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // checks user's login status, using auth service
    return this.auth.user.pipe(
      take(1),
      map((user) => {
        // if no valid token, error alert given
        if (!user) {
          this.alertCtrl
            .create({
              header: 'Unauthorised',
              message: 'You are not allowed to access this page.',
              buttons: ['OK'],
            })
            .then((alert) => alert.present());

          // user redirected to login page
          this.router.navigateByUrl('/');
          return false;

          // access given if valid token
        } else {
          return true;
        }
      })
    );
  } // canActive func closed
} // AuthGuard class closed
