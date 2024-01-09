import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-supplyusercomponent',
  templateUrl: './supplyusercomponent.component.html',
  styleUrls: ['./supplyusercomponent.component.css']
})
export class SupplyusercomponentComponent implements OnInit {

  selected: any;
  sypplychainone = true;
  sypplychaintwo = false;

  constructor(){}

  ngOnInit(){
    this.selected = 1;
  }
  

  setactiveProject1(item: any) {
    this.sypplychainone = true;
    this.sypplychaintwo = false;
    this.selected = item;
  }
  setactiveProject2(item: any) {
    this.sypplychainone = false;
    this.sypplychaintwo = true;
    this.selected = item;
  }

  isActive(item: any) {
    return this.selected === item;
  }
}
