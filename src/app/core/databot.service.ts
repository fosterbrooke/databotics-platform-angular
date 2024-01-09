import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';


export interface Todo {
  // title: string;
  // description: string;
  // done: boolean;

  
  imei: string
  deviceUUID: string
  driverId            : string
  firstName            : string
  lastName              : string
  personName            : string
  assetTracker           : string
  deviceReportTypeCode    : string
  latitude                : string    
  longitude               : string 
  heading                 : string 
  appDriverId             : string 
  appDriverName           : string       
  date                    : string
  editDate                : string     
  speed                   : string     
  speeding                : string       
  behaviorCd              : string      
  estSpeedLimit           : string      
  fleetId                 : string   
  personMisc4             : string 
  personMisc5             : string   
  personMisc6             : string     
  personMisc7             : string    
  personMisc8             : string     
  vin                     : string  
  make                    : string      
  model                   : string        
  year                    : string        
  fuelLevel               : string     
  battery                 : string       
  direction               : string        
  trueOdo                 : string        
  virtualOdo              : string         
  sensorData              : string              
}

@Injectable({
  providedIn: 'root'
})
export class DatabotService {
  private apiendpoint = environment.apiEndPoint;
  private linxupEndpoint = environment.linxupEndPoint;
  private linxupApiEndpoint = environment.linxupApiEndPoint;
  private linxupDB = environment.linxupDBEndPoint;
  private getCollections = '/linxup/dbcollections';
  private postData = '/linxup/locations';

  constructor(public http: HttpClient) { }

  public isAuthnticated():boolean{

    return true;
  }

  public login(loginData){
    return this.http.post(this.apiendpoint +'user/login',loginData);
  }

  loadHrdashboard1() {
    return this.http.get('../../assets/data/HR_Dashboard1.json');
  }

  loadHrHiringDashboard() {
    return this.http.get('../../assets/data/Hiring_pipelines (2).json');
  }
  loadHiringOnboarding() {
    return this.http.get('../../assets/data/Onbording_Status.json');
  }

  loadAttritionData(){
    return this.http.get('../../assets/data/Attrition_List.json');
  }

  loadEthnicityData(){
    return this.http.get('../../assets/data/ethnicity.json');
  }

  loadPoliticsData(){
    return this.http.get('../../assets/data/politics.json')
  }

  loadPoliticsTrendDistrict(){
    return this.http.get('../../assets/data/Dist_final.json');
  }

  loadPoliticsTrendAssembly(){
    return this.http.get('../../assets/data/Constituency_Final.json');
  }

  loadPoliticsTrendBooth(){
    return this.http.get('../../assets/data/booth_json_final.json');
  }
  getFinancedDataOne(){
    return this.http.get('../../assets/data/retailone.json');
  }
  getFinancedDataOne1(){
    return this.http.get('../../assets/data/retaildata1.json');
  }
  getFinancedDataOne2(){
    return this.http.get('../../assets/data/retaildata2.json');
  }
  getFinancedDataTwo(){
    return this.http.get('../../assets/data/retail2.json');
  }
  getFinancedByCategory(){
    return this.http.get('../../assets/data/retailCategorys.json');
  }
  getSupplyUsecaseone(){
    return this.http.get('../../assets/data/supplyusecaseone.json');
  }
  getSupplyUsecaseTwo(){
    return this.http.get('../../assets/data/supplyusecasetwo.json');
  }
  getReportCaseOne(){
    return this.http.get('../../assets/data/reportusecaseone.json');
  }
  getReportUsecaseTwo(){
    return this.http.get('../../assets/data/reportDataTwo.json');
  }
  getReportCaseOneCategory(){
    return this.http.get('../../assets/data/reportusecaseCategory.json');
  }
  getReportCaseOneRegion(){
    return this.http.get('../../assets/data/reportusecaseRegion.json');
  }
  getReportCaseOneMarket(){
    return this.http.get('../../assets/data/reportusecaseMarket.json');
  }
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


  clientRegistration(clientdata) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.post(this.apiendpoint + '/user/registertenant', JSON.stringify(clientdata), options);
  }


  userRegistration(userdata) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.post(this.apiendpoint + '/user/registeruser', JSON.stringify(userdata), options);
  }

  userLogin(loginData) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.post(this.apiendpoint + '/user/login', JSON.stringify(loginData), options);
  }

  /** Get the devices for the user */

  getDevices(userdata) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Encoding': 'application/gzip'
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.post(this.linxupEndpoint + '/login', JSON.stringify(userdata), options);
  }

  /** Get the current location of the vehicle or device */

  getCurrentPostition(body) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Encoding': 'application/gzip'
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.post(this.linxupEndpoint + '/map', JSON.stringify(body), options);
  }

  /** Get the historical data of particular vehicle or device */

  getVehicleHistory(body) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Encoding': 'application/gzip'
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.post(this.linxupEndpoint + '/hist', JSON.stringify(body), options);
  }

  /** Get the stops of the devices or vehicles */

  getVehicleStops(body) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Encoding': 'application/gzip'
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.post(this.linxupEndpoint + '/stops', JSON.stringify(body), options);
  }

  /** Get vehicle trips data */

  getVehicleTrips(body) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Encoding': 'application/gzip'
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.post(this.linxupEndpoint + '/trips', JSON.stringify(body), options);
  }

  /**Get vehicle advanced trips */

  getVehicleAdvancedTrips(body) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Encoding': 'application/gzip'
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.post(this.linxupEndpoint + '/advancedTrips', JSON.stringify(body), options);
  }

  getVehicleAlerts(body) {
    return this.http.post(this.linxupApiEndpoint + 'alerts', JSON.stringify(body), this.get_http_options());
  }

  getVehicleLocations(body) {
    return this.http.post(this.linxupApiEndpoint + 'locations', JSON.stringify(body), this.get_http_options());
  }
  getVehicleRouteLocations(body, imei) {
    return this.http.post(this.linxupApiEndpoint + 'locations' + '/' + imei, JSON.stringify(body), this.get_http_options());
  }
  getLocationInfo() {
    return this.http.get('http://192.168.5.191:5000/filter/128193');
  }
  sendEmail(body) {
    return this.http.post('http://localhost:7000/sendmail/sendInfo', body);
  }
  alertEmail(body) {
    return this.http.post('http://localhost:7000/sendmail/alert', {firstname:body});
  }
  getMelroseInfo() {
    return this.http.get('http://13.71.1.239:5000/default/cal/129900');
  }

  getAllInfo() {
    return this.http.get('http://13.71.1.239:5000/default/cal/1');
  }

  getMelroseInfobyDates(fromdate, todate) {
    return this.http.get('http://13.71.1.239:5000/selected_range/cal/129900/' + fromdate + '/' + todate);
  }

  getAllInfobyDates(fromdate, todate) {
    return this.http.get('http://13.71.1.239:5000/selected_range/cal/1/' + fromdate + '/' + todate);
  }

  getidleArraymelinfo() {
    return this.http.get('http://13.71.1.239:5000/alt_stp/Melrose%20Park/stops');
  }

  getidleArraymelinfoByDates(fromdate, todate) {
    return this.http.get('http://13.71.1.239:5000/alt_stp_range/Melrose%20Park/stops/' + fromdate + '/' + todate);
  }

  getidleArrayinfo() {
    return this.http.get('http://13.71.1.239:5000/alt_stp/default/stops');
  }

  getidleArrayinfoByDates(fromdate, todate) {
    return this.http.get('http://13.71.1.239:5000/alt_stp_range/default/stops/' + fromdate + '/' + todate);
  }

  getalertArrayMelinfo() {
    return this.http.get('http://13.71.1.239:5000/alt_stp/Melrose%20Park/alerts');
  }

  getalertArrayMelinfoByDates(fromdate, todate) {
    return this.http.get('http://13.71.1.239:5000/alt_stp_range/Melrose%20Park/alerts/' + fromdate + '/' + todate);
  }

  getalertArrayinfo() {
    return this.http.get('http://13.71.1.239:5000/alt_stp/default/alerts');
  }

  getalertArrayinfoByDates(fromdate, todate) {
    return this.http.get('http://13.71.1.239:5000/alt_stp_range/default/alerts/' + fromdate + '/' + todate);
  }

  getEachDriverInfo(driver, fromdate, todate) {
    return this.http.get('http://13.71.1.239:5000/screen2/' + driver + '/' + fromdate + '/' + todate );
  }

  getDBCollections() {
    return this.http.get(this.linxupDB + this.getCollections);
  }

  postDBCollections(body) {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.linxupDB + '/linxup/locations' , body, httpOptions);
  }




  loadRetailData(){
    return this.http.get('../../assets/data/retail.json')
  }
  loadHelthCareData(){
    return this.http.get('../../assets/data/helthcare_table.json')
  }
  loadExtraprocedure(){
    return this.http.get('../../assets/data/extraprocedure.json')
  }

}
