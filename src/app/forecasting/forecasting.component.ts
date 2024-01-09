import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forecasting',
  templateUrl: './forecasting.component.html',
  styleUrls: ['./forecasting.component.css']
})
export class ForecastingComponent implements OnInit {

  selected: any;
  forecastingone = true;
  forecastingtwo = false;

 constructor(){}
 ngOnInit(){
 this.selected = 1;
 }
 sidenavChanged(){

}
setactiveProject1(item: any) {
  this.forecastingone = true;
  this.forecastingtwo = false
  this.selected = item;
}
setactiveProject2(item: any) {
  this.forecastingone = false;
  this.forecastingtwo = true
  this.selected = item;
}
isActive(item: any) {
  return this.selected === item;
}
 
}
