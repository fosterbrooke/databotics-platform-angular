import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http ,Headers, Response} from '@angular/http';
import { Observable } from 'rxjs';

import { Router, RouterEvent, NavigationEnd } from '@angular/router';

// import 'rxjs/add/operator/map';
// //import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;


  constructor(private http: HttpClient, private https:Http, private router: Router) { 

    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });

  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
  
  public getCurrentUrl() {
    return this.currentUrl;
  }

    private handleError(err: HttpErrorResponse) {
      return Observable.throw(err.message);
  }
}
