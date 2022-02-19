import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private auth : AuthService, private storage: Storage
  ) { }


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler):Observable<HttpEvent<any>>{

      if(request.url.includes('/api/v1/login')){
        return next.handle(request);
      }

    this.storage.get('jwt-token').then(
      res => {
        console.log(res);
        request = request.clone({
          setHeaders: {
            'Authorization':"Bearer",res
          }
        })
      }

    )

    // set header w/ token value
    // if (token) {
    //   request = request.clone({
    //     setHeaders: {
    //       'Authorization': token
    //     }
    //   });
    // }

    // if no content-type, set as app/json
    if(!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders : {
          'content-type' : 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    })

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if(event instanceof HttpResponse) {
          console.log('event ---->>>',event);
        }
        return event;
      }),

      catchError((error:HttpErrorResponse) => {
        console.log(error);
        return throwError(error);
      })
    );

 

    //   if(request.url.includes('/api/v1/login')){
    //     return next.handle(request);
    //   }

    //   let jwt = this.auth.getToken()
    //     // request = request.clone({
    //     //   headers : request.headers.set('authorization' ,jwt)

    //   console.log(jwt);
    
    // return next.handle(request);
  }
}

