import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-humancapitalusecomponent',
  templateUrl: './humancapitalusecomponent.component.html',
  styleUrls: ['./humancapitalusecomponent.component.css']
})
export class HumancapitalusecomponentComponent implements OnInit {

  selected: any;
  hrOverview = true;
  hrHire: any;

  constructor() { }

  ngOnInit() {
      this.selected = 1;
  }

  sethrOverview(item: any) {
    this.hrOverview = true;
    this.hrHire = false;
    this.selected = item;
  }

  sethrHire(item: any){
    this.hrOverview = false;
    this.hrHire = true;
    this.selected = item;
  }

  

  isActive(item: any) {
    return this.selected === item;
  }

}
