import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-reportusecasecomponent',
    templateUrl: './reportusecasecomponent.component.html',
    styleUrls: ['./reportusecasecomponent.component.css']
})
export class ReportusecasecomponentComponent implements OnInit {
     
    selected: any;
    reportusecaseone = true;
    reportusecasetwo = false;

    constructor(){}
    ngOnInit(){
        this.selected = 1

    }
    sidenavChanged(){}
    setactiveProject1(item: any) {
        this.reportusecaseone = true;
        this.reportusecasetwo = false;
        this.selected = item;
    }
    setactiveProject2(item: any) {
        this.reportusecaseone = false;
        this.reportusecasetwo = true;
        this.selected = item;
    }
  isActive(item: any) {
    return this.selected === item;
}
}
