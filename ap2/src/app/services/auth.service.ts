import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, from, Observable} from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';


const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>;
  private userData = new BehaviorSubject(null);



  constructor(
    private storage: Storage,
    private router: Router,
    private http: HttpClient,
    private plt: Platform)
    {
      // ionic storage created
      this.storage.create();

      // check if user already authenticated
      this.loadStoredToken();
     }


    // function to get token
    async getToken() {
      return this.storage.get('jwt-token');
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

        // if token found, decode and assign to userData
        if(token){
          let decoded = helper.decodeToken(token);
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

      // create form data object for making API call
      let loginData = new FormData();
      loginData.append("email", credentials.email);
      loginData.append("password", credentials.pw);

      // call API endpoint, through webservice
      // take & map remove access token, as a string, from Object
      return this.http.post('http://localhost:5000/api/v1/login', loginData).pipe(
        take(1),
        map(res => {
          return(res["access_token"]);
        }),

        // decodes token and sets value to userData var
        switchMap(token =>{
          let decoded = helper.decodeToken(token);
            //console.log('decoded:',decoded);
            this.userData.next(decoded);
            
            // token set in storage and returned
            let storageObs = from(this.storage.set(TOKEN_KEY,token));
            return storageObs;
        })
      )
    }

    // function get the user's login data
    getUser() {
      return this.userData.getValue();
    }

    // function log a user out
    // remove token from storage, redirect to login and resets userData
    logout() {
      this.storage.remove(TOKEN_KEY).then(() => {
        this.router.navigateByUrl('/');
        this.userData.next(null);
      })
    }


    
} // authService class closed
