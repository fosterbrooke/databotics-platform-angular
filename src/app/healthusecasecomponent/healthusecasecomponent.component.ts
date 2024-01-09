import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-healthusecasecomponent',
  templateUrl: './healthusecasecomponent.component.html',
  styleUrls: ['./healthusecasecomponent.component.css']
})
export class HealthusecasecomponentComponent implements OnInit {

  selected: any;
  inpatientone = true;
  inpatienttwo = false;
  inpatientthree = false;
  constructor() { }

  ngOnInit() {
    this.selected = 1;
  }
  setactiveProject1(item: any) {
    this.inpatientone = true;
    this.inpatienttwo = false
    this.inpatientthree = false
    this.selected = item;
  }
  setactiveProject2(item: any) {
    this.inpatientone = false;
    this.inpatienttwo = true
    this.inpatientthree = false
    this.selected = item;
  }
  setactiveProject3(item: any) {
    this.inpatientone = false;
    this.inpatienttwo = false
    this.inpatientthree = true
    this.selected = item;
  }
  isActive(item: any) {
    return this.selected === item;
  }
}
