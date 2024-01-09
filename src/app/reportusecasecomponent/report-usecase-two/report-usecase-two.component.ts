import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import _ from 'lodash';
import { DataService } from 'src/app/core/data.service';
const numeral = require('numeral');
import * as moment from 'moment';
import * as $ from 'jquery';
import { DatabotService } from 'src/app/core/databot.service';
@Component({
  selector: 'app-report-usecase-two',
  templateUrl: './report-usecase-two.component.html',
  styleUrls: ['./report-usecase-two.component.css']
})
export class ReportUsecaseTwoComponent implements OnInit {
  totalData: any = [];
  dummyArray: any = [];
  Months: any = [];
  reportData = [];
  dynamiePie = [];
  fromDate: string | Date;
  toDate: string | Date;
  columnChart: any;
  column: any
  FinanceData: any = [];
  FinanceCopyData: any = [];
  category = [];
  year: any = [];
  Market: any = [];
  Region: any = [];
  dynamiePieOverview = [];
  sales: any = [];
  decimalData: any = [];
  shippingCostData: any = [];
  totalSalesData: any = [];

  constructor(private router: Router, private dataService: DataService, private databotService: DatabotService) { }

  ngOnInit() {
    this.getFinancedData();
    // this.columnChart1();
  }
  getFinancedData() {
    this.databotService.getReportUsecaseTwo().subscribe(data => {
      console.log(data);
      this.FinanceData = data;
      this.FinanceCopyData = data;
      this.category = _.uniqBy(data, 'Category');
      this.year = _.uniqBy(data, 'year');
      this.Market = _.uniqBy(data, 'Market');
      this.Region = _.uniqBy(data, 'Region');
      this.getPieChart(data);
    }, err => {
      console.log("error", err);
    })
  }

  updatePieData(event) {
    this.columnChart1(this.dynamiePieOverview, this.sales, this.decimalData, this.shippingCostData, this.totalSalesData, event);
    let dataArray: any = [];
    for (let obj of this.FinanceCopyData) {
      if (obj['Category'] == event) {
        dataArray.push(obj);
      }
    }
    this.FinanceData = dataArray;
    console.log(this.FinanceData);
  }
  selectedRegion(event) {
    var element = event.currentTarget.value;
    let dataArray: any = [];
    console.log(element)
    if (element == "ALL") {
      dataArray = this.FinanceCopyData;
    }
    console.log(element);
    for (let obj of this.FinanceCopyData) {
      if (obj['Region'] == element) {
        dataArray.push(obj);
      }
    }
    this.FinanceData = dataArray;
    this.getPieChart(this.FinanceData)
  }
  selectedMarket(event) {
    var element = event.currentTarget.value;
    console.log(element)
    let dataArray: any = [];
    if (element == "ALL") {
      dataArray = this.FinanceCopyData;
    }
    console.log(element);
    for (let obj of this.FinanceCopyData) {
      if (obj['Market'] == element) {
        dataArray.push(obj);
      }
    }
    this.FinanceData = dataArray;
    this.getPieChart(this.FinanceData)
  }
  selectedCategory(event) {
    var element = event.currentTarget.value;
    let dataArray: any = [];
    if (element == "ALL") {
      dataArray = this.FinanceCopyData;
    }
    for (let obj of this.FinanceCopyData) {
      if (obj['Category'] == element) {
        dataArray.push(obj);
      }
    }
    this.FinanceData = dataArray;
    this.getPieChart(this.FinanceData)
  }
  selectedMonth(event) {
    var element = event.currentTarget.value;
    console.log(element)
    let dataArray: any = [];
    if (element == "ALL") {
      dataArray = this.FinanceCopyData;
    }
    console.log(element);
    for (let obj of this.FinanceCopyData) {
      if (obj['year'] == element) {
        dataArray.push(obj);
      }
    }
    this.FinanceData = dataArray;
    this.getPieChart(this.FinanceData)
  }
  getPieChart(data) {
    var hash = Object.create(null);
    var result = [];
    data.forEach(function (a) {
      var key = ['Category'].map(function (k) { return a[k]; }).join('|');
      if (a.Aachensales === undefined || a.Aachensales === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.Category, b: 0, c: 0, d: 0, e: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.b += a.Aachensales;
      hash[key].data.c += a.Aachentargetsales;
      hash[key].data.d += a.decimal;
      hash[key].data.e += a.shippingCost;
      hash[key].data.definition = a.Category;
      hash[key].count++;
    });
    var names = ['expenseType', 'fundDescription'];
    var color = ['#118DFF', '#C25763']
    var Xaxis: any = [];
    var Yaxis: any = [];
    var series: any = [];
    var TotalSales: any = [];
    var Aachentargetsales: any = [];
    var decimal: any = [];
    var shippingCost: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      TotalSales.push(result[index].b);
      Aachentargetsales.push(result[index].c);
      decimal.push(result[index].d);
      shippingCost.push(result[index].e);
      Xaxis.push(result[index].definition);
      // Yaxis.push(result[index].datanames);
      totalcases = [TotalSales];
    });
    result.map((item, index) => {
      series.push({ data: TotalSales })
    });
    console.log(result, Xaxis, '', Aachentargetsales, decimal, shippingCost, TotalSales);
    this.dynamiePieOverview = Xaxis;
    this.dynamiePie = result;
    this.sales = Aachentargetsales;
    this.decimalData = decimal;
    this.shippingCostData = shippingCost;
    this.totalSalesData = TotalSales;

    this.columnChart1(Xaxis, Aachentargetsales, decimal, shippingCost, TotalSales, '');
  }
  df(value) {
    return numeral(value).format('0,0.0');
  }
  columnChart1(Xaxis, Aachentargetsales, decimal, shippingCost, TotalSales, name) {
    var $this = this
    this.columnChart = {
      chart: {
        type: 'column',
        backgroundColor: '#ffffff',
        events: {
          load: function (e) {
            console.log("e1", e);
            var dataarr = e.target.series[0].data;
            var dataarr1 = e.target.series[1].data;
            var dataarr2 = e.target.series[2].data;
            var dataarr3 = e.target.series[3].data;
            dataarr.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#1769a380'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr1.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#ff6b1b91'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr2.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#03cb4475'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr3.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#a42cee57'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
          }
        }
      },
      title: {
        text: null
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      legend: {
        enable: true,
        align: 'center',
        verticalAlign: 'top',
      },

      xAxis: {
        categories: Xaxis,
      },
      yAxis: {
        min: 0,
        title: {
          text: null
        },

      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false
          },
          showInLegend: false,
        },
        series: {
          point: {
            events: {
              click: function (event) {
                console.log(event)
                $this.updatePieData(event.point.category);
                // $this.updatechartData(event.point.category);
                console.log(event.point.category);
              },
            }
          }
        }
      },
      series: [
        {
          name: 'Total Sale',
          data: TotalSales,
          color: '#1769a3'
        }, {
          name: 'Target Sales',
          data: Aachentargetsales,
          color: '#ff6b1b'
        },
        {
          name: 'Sales w/o Decimal',
          data: decimal,
          color: '#03cb44'
        },
        {
          name: 'Shipping Cost',
          data: shippingCost,
          color: '#a42cee'
        },
      ]
      // [{
      //   name: 'John',
      //   data: [5, 3, 4, 7, 2,4,3,2,6,8,1,2,3,4,5,6]
      // }, {
      //   name: 'Jane',
      //   data: [2, 2, 3, 2, 1,5,6,7,8,9,1,2,3,4,5,6]
      // }, {
      //   name: 'Jane',
      //   data: [2, 2, 3, 2, 1,9,8,7,6,5,1,2,3,4,5,6]
      // },
      //  {
      //   name: 'Joe',
      //   data: [3, 4, 4, 2, 5,1,2,3,4,5,1,2,3,4,5,6]
      // }]

    }
    this.column = new Chart(this.columnChart);
  }
}
