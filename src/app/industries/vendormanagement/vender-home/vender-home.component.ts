import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-vender-home',
  templateUrl: './vender-home.component.html',
  styleUrls: ['./vender-home.component.css']
})
export class VenderHomeComponent implements OnInit {
  asgChartOptions: any;
  asgChart: any;
  selected = localStorage.getItem('activeTab') == null ? 1 : parseInt(localStorage.getItem('activeTab'));
  endtype: any;
  showVMO: boolean;
  showTimeStamp: boolean;
  constructor() { }

  ngOnInit() {
    var currentuser = localStorage.getItem('username');
    if (currentuser == 'VMO') {
      this.showVMO = true;
      this.showTimeStamp = true;
    } else {
      this.showVMO = false;
      this.showTimeStamp = false;
    }
  }
  charts() {
    this.asgChartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      title: {
        text: null
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [
          ['Architect', 10],
          ['Database Analyst', 5],
          ['Business Analyst', 7]
        ],
        type: undefined
      }]
    },
      this.asgChart = new Chart(this.asgChartOptions);
  }

  showDashboard(item) {
    this.selected = item;
    localStorage.setItem('activeTab', item);
    // let key = item;
    // let value = item;
    // sessionStorage.setItem(key,value);
    // console.log(value);
  }

  isActive(item: any) {
    return this.selected === item;
  };

  showView(item) {
    if (this.selected == item) {
      return true;
    } else {
      return false;
    }
  }
  public randomNumber: number;

  public onNumberGenerated(randomNumber: any) {
    console.log(randomNumber.num, randomNumber.eventtype);
    this.endtype = randomNumber.eventtype;
    this.selected = randomNumber.num;
    this.showView(randomNumber.num);
  }

}
