import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-helth-care-covid',
  templateUrl: './helth-care-covid.component.html',
  styleUrls: ['./helth-care-covid.component.css']
})
export class HelthCareCovidComponent implements OnInit {
  selected : any;
  healthAnalysis: any;
  covidusecaseone = true;
  covidusecasetwo = false;
  covidusecasethree = false;
constructor(){}

ngOnInit(){
  this.selected = 1;

}
setactiveProject1(item:any){
  this.covidusecaseone = true;
  this.covidusecasetwo = false;
  this.covidusecasethree = false;
  this.selected = item;
}
setactiveProject2(item:any){
  this.covidusecaseone = false;
  this.covidusecasetwo = true;
  this.covidusecasethree = false;
  this.selected = item;
}
setactiveProject3(item:any){
  this.covidusecaseone = false;
  this.covidusecasetwo = false;
  this.covidusecasethree = true;
  this.selected = item;
}
isActive(item: any) {
  return this.selected === item;
}

}

