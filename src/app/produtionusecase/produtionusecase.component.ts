import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtionusecase',
  templateUrl: './produtionusecase.component.html',
  styleUrls: ['./produtionusecase.component.css']
})
export class ProdutionusecaseComponent implements OnInit {

  selected: any;
  inventoryReport = true;
  inventoryMap: any;
  trackOrder: any;

  constructor() { }

  ngOnInit() {
      this.selected = 1;
  }

  setActiveInventory(item: any) {
    this.inventoryReport = true;
    this.inventoryMap = false;
    this.trackOrder = false;
    this.selected = item;
  }

  setactiveStock(item: any){
    this.inventoryReport = false;
    this.inventoryMap = true;
    this.trackOrder = false;
    this.selected = item;
  }

  settrackOrder(item: any){
    this.inventoryReport = false;
    this.inventoryMap = false;
    this.trackOrder = true;
    this.selected = item;
  }

  isActive(item: any) {
    return this.selected === item;
  }

}
