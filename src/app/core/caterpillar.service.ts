import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of, Subscription, Subject, BehaviorSubject } from 'rxjs';

export interface UserData {
  OTI: String
  emailId: String
  industriesUsecase: Array<[String]>
  isVerified: Boolean
  organizationCategory: String
  password: String
  role: String
  sysCreatedBy: String
  sysCreatedDate: String
  sysUpdatedBy: String
  sysUpdatedDate: String
  userId: String
  userName: String
  wrongAttempts: String
  _id: String
}

export interface UserInfo {
  success: Boolean
  token: string
  userData: UserData
}

@Injectable({
  providedIn: 'root'
})
export class CaterpillarService {

  apiEndpoint = environment.apiEndPoint;
  apiEndpointRoute = this.apiEndpoint + '/caterpillar';
  private subjectUser = new BehaviorSubject<UserInfo>(null);
  User$ = this.subjectUser.asObservable();
  user: UserInfo

  constructor(private http: HttpClient) { }

  private get_http_options() {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJjb21wYW55SWQiOiIzMjgzNTUiLCJpc3MiOiJhZ2lsaXMiLCJwZXJzb25JZCI6Ijk1MDIyMSIsImV4cCI6MTcyMjk5NzgxMiwiaWF0IjoxNTY1MTQ1MDEyLCJ1c2VybmFtZSI6ImluZm9AZGF0YWFnaWxlLmNvbSJ9.CFiTePNkn_DBWWb1Q5wc5PKz7RhrJhLnlY6TDw4oc_k'
    });
    let options = {
      headers: httpHeaders
    };
    return options;
  }

  registerCaterpillar(body) {
    return this.http.post(this.apiEndpoint + "/registerCaterpillar", body)
  }

  login(loginData) {

    return this.http.post<UserInfo>(this.apiEndpoint + '/user/login', JSON.stringify(loginData), this.get_http_options()).pipe(
      catchError(this.handleError<UserInfo>('getBasicUserInfo'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      /* should send error to remote logging infrastructure */
      console.error('manager.service.ts');
      console.error(error);
      return of(result as T);
    };
  }

  updateUser(user: UserInfo) {
    this.subjectUser.next(user);
  }

  getSupplierSpend(params) {
    return this.http.post(this.apiEndpointRoute + '/getCaterpillarOverviewSpend/' + params , this.get_http_options());
  }

  getCategorySpend(params) {
    return this.http.post(this.apiEndpointRoute + '/getSpendByCategory/' + params , this.get_http_options());
  }

  getDeptSpend(params) {
    return this.http.post(this.apiEndpointRoute + '/getSpendByDept/' + params , this.get_http_options());
  }

  getSupplierSavings(params) {
    return this.http.post(this.apiEndpointRoute + '/getSupplierSavings/' + params , this.get_http_options());
  }

  getContractValue(params) {
    return this.http.post(this.apiEndpointRoute + '/contractbyvalue/' + params , this.get_http_options());
  }

  getVendorsandContracts() {
    return this.http.get(this.apiEndpointRoute + '/totalVendorsContracts');
  }

  getDigitalSavings() {
    return this.http.get(this.apiEndpointRoute + '/digitalsavings');
  }

  postSSRating(body) {
    return this.http.post(this.apiEndpointRoute + '/postSSRating', body);
  }
  postSScomment(body) {
    return this.http.post(this.apiEndpointRoute + '/postSScomment', body);
  }


  postSCRating(body) {
    return this.http.post(this.apiEndpointRoute + '/postSCRating', body);
  }
  postSCcomment(body) {
    return this.http.post(this.apiEndpointRoute + '/postSCcomment', body);
  }

  postSDRating(body) {
    return this.http.post(this.apiEndpointRoute + '/postSDRating', body);
  }
  postSDcomment(body) {
    return this.http.post(this.apiEndpointRoute + '/postSDcomment', body);
  }

  postCVRating(body) {
    return this.http.post(this.apiEndpointRoute + '/postCVRating', body);
  }
  postCVcomment(body) {
    return this.http.post(this.apiEndpointRoute + '/postCVcomment', body);
  }

  //////supplierscreen
  getsupplierfilters() {
    return this.http.get(this.apiEndpointRoute + '/supplierfilters');
  }

  getbysupplier(params) {
    console.log(params);
    return this.http.get(this.apiEndpointRoute + '/getbysupplier?param=' + params);
  }

  ////category profile

  getcategoryfilters() {
    return this.http.get(this.apiEndpointRoute + '/getcategoryfilters');
  }

  getbyCategory(params) {
    return this.http.get(this.apiEndpointRoute + '/getbycategory?param=' + params);
  }

  /////deptbu

  getdeptbufilters() {
    return this.http.get(this.apiEndpointRoute + '/getdeptbufilters');
  }

  getbyDeptbu(params) {
    return this.http.get(this.apiEndpointRoute + '/getbydeptbu?param=' + params);
  }

  ///////

  postBulkData(data) {
    return this.http.post(this.apiEndpointRoute + '/postCaterpillarOverview', data);
  }

  /////

  getallusers() {
    return this.http.get(this.apiEndpoint + '/user/getallusers');
  }

  editUser(user) {
    return this.http.post(this.apiEndpoint + '/user/updateuser', user);
  }

  /////

  getallinfo(body) {
    return this.http.post(this.apiEndpointRoute + '/getallinfo', body);
  }
  

}
