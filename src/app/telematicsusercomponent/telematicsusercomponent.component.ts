import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-telematicsusercomponent',
  templateUrl: './telematicsusercomponent.component.html',
  styleUrls: ['./telematicsusercomponent.component.css']
})
export class TelematicsusercomponentComponent implements OnInit {

  selected: any;
  fleetOverview = true;
  driverProfile: any;
  trackOrder: any;
  custFeed: any;
  constructor() { }

  ngOnInit() {
      this.selected = 1;
  }

  setfleetOverview(item: any) {
    this.fleetOverview = true;
    this.driverProfile = false;
    this.trackOrder = false;
    this.custFeed = false;
    this.selected = item;
  }

  setDriver(item: any){
    this.fleetOverview = false;
    this.driverProfile = true;
    this.trackOrder = false;
    this.custFeed = false;
    this.selected = item;
  }

  setvehicleMetric(item: any){
    this.fleetOverview = false;
    this.driverProfile = false;
    this.trackOrder = true;
    this.custFeed = false;
    this.selected = item;
  }

  
  setcustomerFeed(item: any){
    this.fleetOverview = false;
    this.driverProfile = false;
    this.trackOrder = false;
    this.custFeed = true;
    this.selected = item;
  }


  isActive(item: any) {
    return this.selected === item;
  }

}
