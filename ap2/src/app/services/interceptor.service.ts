import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http'
import { from} from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private auth : AuthService) { }

  // func that intercepts each request, calls handle func
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // convert promise to observable using 'from' operator
    return from(this.handle(req, next))
  }

  // func to handle the HTTP requests
  async handle(req: HttpRequest<any>, next: HttpHandler) {

    // gets the token
    let authToken = await this.auth.getToken()

    // sets token in Auth. Header
    const authReq = req.clone({
      setHeaders: {
        Authorization: "Bearer "+authToken
      }
    })

    // returns token, as a promise
    return next.handle(authReq).toPromise()
  }

}

