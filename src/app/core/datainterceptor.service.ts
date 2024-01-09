import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatainterceptorService implements HttpInterceptor  {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<any> {
    // All HTTP requests are going to go through this method
    // let id = localStorage.getItem('cookieid');
    let newHeaders = req.headers;
      // if (id) {
         // If we have a token, we append it to
        //  newHeaders = newHeaders.append('Content-Type', 'application/json');
      // }
      // Finally we have to clone our request with our new headers
      // This is required because HttpRequests are immutable
      const authReq = req.clone({headers: newHeaders});
      // Then we return an Observable that will run the request
      // or pass it to the next interceptor if any
      return next.handle(authReq);
  }
}
