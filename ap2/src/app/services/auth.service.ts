import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { WebService } from './../web.service';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  constructor(
    private webService: WebService,
    private storage: Storage,
    private router: Router,
    private http: HttpClient,
    private plt: Platform){

      // ionic storage created
      this.storage.create();

      // check if user already authenticated
      this.loadStoredToken();
     }

     // function to check if token already stored in platform
     loadStoredToken(){

      // subscribe to platform when ready
      // + converts platform promise to observable
      let platformObs = from(this.plt.ready());

      // switchMap subcribes to the token observable
      // + gets token from storage
      this.user = platformObs.pipe(
        switchMap(() => {
          return from(this.storage.get(TOKEN_KEY))
        }),
        map(token =>{
          console.log('Token from storage: ', token);

          // if token found, decode and....
          if(token){
            let decoded = helper.decodeToken(token);
            console.log('decoded:',decoded);
            this.userData.next(decoded); 
            return true;
          }

          // if not found, set to null
          else{
            return null;
          }
        })
      );
     }

    // function to make login API call and retrieve JWT
    login(credentials: {email : string, pw : string}) : Observable<any>{


      // ignore if credentials wrong
      if(credentials.email != 'Jim' || credentials.pw != '123'){
        return of(null);
      }

      // variable to hold API token
      var api_token : any;

      this.webService.postLogin(credentials.email, credentials.pw)
      .subscribe((res : any) => {
        console.log(res)
        return res;
      }),

      switchMap(token =>{
        let decoded = helper.decodeToken(api_token);
          console.log('decoded:',decoded);
          this.userData.next(decoded);
          
          let storageObs = from(this.storage.set(TOKEN_KEY,token));
          return storageObs;
      })
    }

    getUser() {
      return this.userData.getValue();
    }


    logout() {
      this.storage.remove(TOKEN_KEY).then(() => {
        this.router.navigateByUrl('/');
        this.userData.next(null);
      })
    }

    


}
