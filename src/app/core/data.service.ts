import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of , throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { RequestOptions, Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  endpoint = environment.newEndPoint;
  // covidpoint = environment.covidEndPoint;
;
  constructor(private httpClient: HttpClient) { }

  /**get cookie id */
  getCookieId(): Observable<any> {
    const url = 'session';
    const api = `${this.endpoint}${url}`;
    const body = {
      password: "trianabot@2020",
      username: "vijay.d@d4dt.com",
      remember: true
    };
    // const httpheaders = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    return this.httpClient.post(api , body)
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError)
    );
  }

   /**Get data from api */
   getApiData(): Observable<any>{
    const url = 'inpatient-charges?_limit=-1';
    const api = `${this.endpoint}${url}`;
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get(api , {headers: httpheaders})
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError)
    );
  }

  /**Get data from api */
  getProviderList(filters): Observable<any>{
    const url = 'inpatient-charges/aggregates/ProviderName?_limit=-1'+filters;
    const api = `${this.endpoint}${url}`;
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get(api , {headers: httpheaders})
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError)
    );
  }

  /**Get data from api */
  getDischargeList(filters): Observable<any>{
    const url = 'inpatient-charges/aggregates/DischargeStatus?_limit=-1'+filters;
    const api = `${this.endpoint}${url}`;
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get(api , {headers: httpheaders})
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError)
    );
  }

  getDrgList(filters): Observable<any>{
    const url = 'inpatient-charges/aggregates/DRG_Definition?_limit=-1'+filters;
    const api = `${this.endpoint}${url}`;
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get(api , {headers: httpheaders})
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError)
    );
  }

  getPhysicianList(filters): Observable<any>{
    const url = 'inpatient-charges/aggregates/PhysicianGroup?_limit=-1'+filters;
    const api = `${this.endpoint}${url}`;
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get(api , {headers: httpheaders})
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError)
    );
  }

    /**Get data from covid api */
    getCovidData(): Observable<any>{
      const url = 'covids/aggregates?_limit=-1';
      const api = `${this.endpoint}${url}`;
      const httpheaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(api , {headers: httpheaders})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError)
      );
    }


     /**Get data from covid api */
     getTotalCData(filter): Observable<any>{
      const url = 'covids?_limit=-1'+filter;
      const api = `${this.endpoint}${url}`;
      const httpheaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(api , {headers: httpheaders})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError)
      );
    }

    /**Gt data from finance Api */
    getFinancedDataOne(): Observable<any>{
      const url = 'opportunity-counts?_limit=-1';
      const api = `${this.endpoint}${url}`;
      const httpheaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(api , {headers: httpheaders})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError)
      );
    }
    getRetailDataOne(): Observable<any>{
      const url = 'retailanalytics?_limit=-1';
      const api = `${this.endpoint}${url}`;
      const httpheaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(api , {headers: httpheaders})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError)
      );
    }
    getFinancedDataTwo(): Observable<any>{
      const url = 'finances?_limit=-1';
      const api = `${this.endpoint}${url}`;
      const httpheaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(api , {headers: httpheaders})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError)
      );
    }
    
    
     /**Get data from api remaining Screens */
   getCovidsAPi(): Observable<any>{
    const url = 'pg-county-exps?_limit=-1';
    const api = `${this.endpoint}${url}`;
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get(api , {headers: httpheaders})
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError)
    );
  }
    /**Get data from api */
   getMapAPi(): Observable<any>{
    const url = 'us-covids?_limit=-1';
    const api = `${this.endpoint}${url}`;
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get(api , {headers: httpheaders})
    .pipe(
      tap(_ => this.log('response received')),
      catchError(this.handleError)
    );
  }
     /**Get data from api */
     getManufactureAPi(): Observable<any>{
      const url = 'supplychains?_limit=-1';
      const api = `${this.endpoint}${url}`;
      const httpheaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(api , {headers: httpheaders})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError)
      );
    }
    getSupplychainApi(): Observable<any>{
      const url = 'suppluchain-2-s?_limit=-1';
      const api = `${this.endpoint}${url}`;
      const httpheaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(api , {headers: httpheaders})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError)
      );
    }
    getManufactureStockAPi(): Observable<any>{
      const url = 'stockbreakdowns?_limit=-1';
      const api = `${this.endpoint}${url}`;
      const httpheaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(api , {headers: httpheaders})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError)
      );
    }
    // government api
    getConstructionsApi(): Observable<any>{
      const url = 'govt-constructions?_limit=-1';
      const api = `${this.endpoint}${url}`;
      const httpheaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(api , {headers: httpheaders})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError)
      );
    }
    getPublicworksApi(): Observable<any>{
      const url = 'govt-publicworks?_limit=-1';
      const api = `${this.endpoint}${url}`;
      const httpheaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(api , {headers: httpheaders})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError)
      );
    }
    getGovtFinancesApi(): Observable<any>{
      const url = 'govt-finances?_limit=-1';
      const api = `${this.endpoint}${url}`;
      const httpheaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(api , {headers: httpheaders})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError)
      );
    }
    getSafetiesApi(): Observable<any>{
      const url = 'govt-safeties?_limit=-1';
      const api = `${this.endpoint}${url}`;
      const httpheaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(api , {headers: httpheaders})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError)
      );
    }
    getEnegryAPi(): Observable<any>{
      const url = 'energy?_limit=-1';
      const api = `${this.endpoint}${url}`;
      const httpheaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.httpClient.get(api , {headers: httpheaders})
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError)
      );
    }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return throwError(error);
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }




}
