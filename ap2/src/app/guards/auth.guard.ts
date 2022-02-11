import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private auth: AuthService,
    private router: Router, private alertCtrl: AlertController){
  }

  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log(this.auth.user);
    return this.auth.user.pipe(
      take(1),
      map(user => {
        console.log('in can activate: ', user);
        if(!user){
          this.alertCtrl.create({
            header: 'Unauthorised',
            message: 'You are not allowed to access this page.',
            buttons: ['OK']
          }).then(alert => alert.present());
          this.router.navigateByUrl('/');
          return false;
        }else{
          return true;
        }
      })
    )
  }
}
