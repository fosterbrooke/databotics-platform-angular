import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { CaterpillarService } from 'src/app/core/caterpillar.service';
import { HttpClient } from '@angular/common/http';
declare var google: any;
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { count } from 'rxjs/operators';
import _ from 'lodash';
import { DatabotService } from 'src/app/core/databot.service';
import { DataService } from 'src/app/core/data.service';
import { element } from 'protractor';

import { NgxSpinnerService } from "ngx-spinner";
const numeral = require('numeral');


@Component({
  selector: 'app-supplychain-usecase-two',
  templateUrl: './supplychain-usecase-two.component.html',
  styleUrls: ['./supplychain-usecase-two.component.css']
})
export class SupplychainUsecaseTwoComponent implements OnInit {
  // map:any;
  Months: any = [];
  // dummyArray : any = [];
  // Data = [];
  products = [];
  // columnChartOption:any;
  // columnChart:any;
  // columChartOption:any;
  // columchart:any;
  // lineChartOption:any;
  // linechart:any;
  // columnChartDataOver:any =[];
  // columnChartSeries:any=[];
  // colChartDataOver:any=[];
  // colChartSeries:any=[];
  // pieChartDataOver:any=[];
  // pieChartOverview:any=[];



  buyerChartOptions: any;
  buychart: any;
  categoryOptions: any;
  categorychart: any;
  electricity: any;
  electricityOptions: any;
  category = [];
  categoryArray: number = 0;
  yearArray: number = 0;
  cityArray: number = 0;
  chainArray: number = 0;
  buyerArray: number = 0;
  monthArray: number = 0;
  QuarterArray: number = 0;
  Year = [];
  chain = [];
  city = [];
  dynamicMonthOverview = [];
  dynamicMonth = [];
  dynamicCat = [];
  dynamicCatOverview = [];
  dynamicCatOverview1 = [];
  dynamichain = [];
  dynamicPie = [];
  MonthOptions: any;
  colum: any;
  pieOptions: any;
  pievalue: any;
  piOptions: any;
  pi: any;
  bar1: any;
  bar1Options: any
  dummyArray: any = [];
  DelivariesData = [];
  supplyData: any = [];
  Region: any = [];
  Category: any = [];
  subcategory: any = [];
  totalSalesDynamicData: any = [];
  totalSalesLyDynamicData: any = [];
  count: number = 0;
  categoryUpade: any = [];
  chainUpade: any = [];

  name: any;
  value: any;
  constructor(public http: HttpClient, private dataservice: DataService, private dataService: DataService,
    private SpinnerService: NgxSpinnerService) { }
  ngOnInit() {
    this.getAllData();
    // this.storeData();
    // this.laodColomChartData();
  }
  updatepieData(event, sliced) {
    if (sliced == undefined || sliced == false) {
      console.log(" if");
      console.log(event)
      var selectedRegion = [];
      for (let obj of this.dummyArray) {
        if (obj.Region == event) {
          selectedRegion.push(obj);
        }
      }
      selectedRegion.map(item => {
        if (item.Sales != null) {
          this.categoryArray += item.Sales * 2;
        }
      })
      selectedRegion.map(item => {
        if (item.TargetSales != null) {
          this.yearArray += parseInt(item.TargetSales) * 2;
        }
      })
      selectedRegion.map(item => {
        if (item.Sales != null) {
          this.cityArray += item.Sales * 3;
        }
      })
      this.dummyArray.map(item => {
        if (item.TargetSales != null) {
          this.chainArray += item.TargetSales * 3;
        }
      })
      this.dummyArray.map(item => {
        if (item.Sales != null) {
          this.buyerArray += parseInt(item.Sales) * 4;
        }
      })
      this.dummyArray.map(item => {
        if (item.TargetSales != null) {
          this.monthArray += item.TargetSales * 4;
        }
      })
      this.dummyArray.map(item => {
        if (item.Sales != null) {
          this.QuarterArray += item.Sales * 5;
        }
      })
      this.getCategoryCount(selectedRegion);
      this.getChainCount(selectedRegion);
      this.getWeekCount(selectedRegion);
    } else if (sliced == true) {
      console.log("else if");
      this.categoryArray = 0;
      this.yearArray = 0;
      this.cityArray = 0;
      this.chainArray = 0;
      this.buyerArray = 0;
      this.monthArray = 0;
      this.QuarterArray = 0;
      this.dummyArray.map(item => {
        if (item.Sales != null) {
          this.categoryArray += item.Sales * 2;
        }
      })
      this.dummyArray.map(item => {
        if (item.TargetSales != null) {
          this.yearArray += parseInt(item.TargetSales) * 2;
        }
      })
      this.dummyArray.map(item => {
        if (item.Sales != null) {
          this.cityArray += item.Sales * 3;
        }
      })
      this.dummyArray.map(item => {
        if (item.TargetSales != null) {
          this.chainArray += item.TargetSales * 3;
        }
      })
      this.dummyArray.map(item => {
        if (item.Sales != null) {
          this.buyerArray += parseInt(item.Sales) * 4;
        }
      })
      this.dummyArray.map(item => {
        if (item.TargetSales != null) {
          this.monthArray += item.TargetSales * 4;
        }
      })
      this.dummyArray.map(item => {
        if (item.Sales != null) {
          this.QuarterArray += item.Sales * 5;
        }
      })
      this.getCategoryCount(this.dummyArray);
      this.getChainCount(this.dummyArray);
      this.getWeekCount(this.dummyArray);
    }
    //     if('Africa'==event){
    //        this.chainUpade = this.dynamichain
    //         this.categoryArray = 171
    //         this.yearArray =289
    //         this.cityArray =403
    //         this.chainArray =214
    //         this.buyerArray =346
    //         this.monthArray =75
    //         this.QuarterArray =1151
    //         this.dynamicMonthOverview.forEach(element => {
    //           element.y = element.y*2
    //         });
    //       this.dynamichain.forEach(element => {
    //         element.y = element.y*2
    //       });
    //       this.dynamicCatOverview.forEach(element => {
    //         element.y = element.y*3
    //       });
    //       this.dynamicCatOverview1.forEach(element => {
    //         element.y = element.y*2
    //       });
    //       console.log(this.dynamichain,this.dynamicCatOverview,this.dynamicCatOverview1,event)
    //       this.categoryArray = this.categoryArray*16.6;
    //       this.yearArray = this.yearArray*16.6;
    //       this.cityArray = this.cityArray*16.6;
    //       this.chainArray = this.chainArray*16.6;
    //       this.buyerArray = this.buyerArray*16.6;
    //       this.monthArray = this.monthArray*16.6;
    //       this.QuarterArray = this.QuarterArray*16.6;
    //       this.categoryChart(this.dynamicCat,this.dynamicCatOverview,this.dynamicCatOverview1,event);
    //       this.chainChart(this.chainUpade,event);
    //       this.monthChart(this.dynamicMonth,this.dynamicMonthOverview,event);
    //     }
    //     if('Caribbean'==event){
    //       this.chainUpade = this.dynamichain
    //       this.categoryArray = 171
    //       this.yearArray =289
    //       this.cityArray =403
    //       this.chainArray =214
    //       this.buyerArray =346
    //       this.monthArray =75
    //       this.QuarterArray =1151
    //   this.dynamicMonthOverview.forEach(element =>{
    //     element.y = element.y*3
    //   });
    //      this.dynamichain.forEach(element => {
    //        element.y = element.y*2
    //      });
    //      this.dynamicCatOverview.forEach(element => {
    //        element.y = element.y*2
    //      });
    //      this.dynamicCatOverview1.forEach(element => {
    //        element.y = element.y*3
    //      });
    //      console.log(this.dynamichain,this.dynamicCatOverview,this.dynamicCatOverview1,event)
    //      this.categoryArray = this.categoryArray*7.7;
    //      this.yearArray = this.yearArray*7.7;
    //      this.cityArray = this.cityArray*7.7;
    //      this.chainArray = this.chainArray*7.7;
    //      this.buyerArray = this.buyerArray*7.7;
    //      this.monthArray = this.monthArray*7.7;
    //      this.QuarterArray = this.QuarterArray*7.7;
    //      this.categoryChart(this.dynamicCat,this.dynamicCatOverview,this.dynamicCatOverview1,event);
    //      this.chainChart(this.chainUpade,event);
    //      this.monthChart(this.dynamicMonth,this.dynamicMonthOverview,event);
    //    }
    //    if('Central Asia'==event){
    //     this.chainUpade = this.dynamichain
    //     this.categoryArray = 171
    //     this.yearArray =289
    //     this.cityArray =403
    //     this.chainArray =214
    //     this.buyerArray =346
    //     this.monthArray =75
    //     this.QuarterArray =1151
    // this.dynamicMonthOverview.forEach(element =>{
    //   element.y = element.y*4
    // });
    //    this.dynamichain.forEach(element => {
    //      element.y = element.y*3
    //    });
    //    this.dynamicCatOverview.forEach(element => {
    //      element.y = element.y*3
    //    });
    //    this.dynamicCatOverview1.forEach(element => {
    //      element.y = element.y*3
    //    });
    //    console.log(this.dynamichain,this.dynamicCatOverview,this.dynamicCatOverview1,event)
    //    this.categoryArray = this.categoryArray*4;
    //    this.yearArray = this.yearArray*4;
    //    this.cityArray = this.cityArray*4;
    //    this.chainArray = this.chainArray*4;
    //    this.buyerArray = this.buyerArray*4;
    //    this.monthArray = this.monthArray*4;
    //    this.QuarterArray = this.QuarterArray*4;
    //    this.categoryChart(this.dynamicCat,this.dynamicCatOverview,this.dynamicCatOverview1,event);
    //    this.chainChart(this.chainUpade,event);
    //    this.monthChart(this.dynamicMonth,this.dynamicMonthOverview,event);
    //  }
    //  if('East'==event){
    //   this.chainUpade = this.dynamichain
    //   this.categoryArray = 171
    //   this.yearArray =289
    //   this.cityArray =403
    //   this.chainArray =214
    //   this.buyerArray =346
    //   this.monthArray =75
    //   this.QuarterArray =1151
    // this.dynamicMonthOverview.forEach(element =>{
    //   element.y = element.y*5
    // });
    //  this.dynamichain.forEach(element => {
    //    element.y = element.y*5
    //  });
    //  this.dynamicCatOverview.forEach(element => {
    //    element.y = element.y*5
    //  });
    //  this.dynamicCatOverview1.forEach(element => {
    //    element.y = element.y*5
    //  });
    //  console.log(this.dynamichain,this.dynamicCatOverview,this.dynamicCatOverview1,event)
    //  this.categoryArray = this.categoryArray*6.8;
    //  this.yearArray = this.yearArray*6.8;
    //  this.cityArray = this.cityArray*6.8;
    //  this.chainArray = this.chainArray*6.8;
    //  this.buyerArray = this.buyerArray*6.8;
    //  this.monthArray = this.monthArray*6.8;
    //  this.QuarterArray = this.QuarterArray*6.8;
    //  this.categoryChart(this.dynamicCat,this.dynamicCatOverview,this.dynamicCatOverview1,event);
    //  this.chainChart(this.chainUpade,event);
    //  this.monthChart(this.dynamicMonth,this.dynamicMonthOverview,event);
    // }
    // if('EMEA'==event){
    //   this.chainUpade = this.dynamichain
    //   this.categoryArray = 171
    //   this.yearArray =289
    //   this.cityArray =403
    //   this.chainArray =214
    //   this.buyerArray =346
    //   this.monthArray =75
    //   this.QuarterArray =1151
    // this.dynamicMonthOverview.forEach(element =>{
    //   element.y = element.y*6
    // });
    //  this.dynamichain.forEach(element => {
    //    element.y = element.y*1
    //  });
    //  this.dynamicCatOverview.forEach(element => {
    //    element.y = element.y*1
    //  });
    //  this.dynamicCatOverview1.forEach(element => {
    //    element.y = element.y*1
    //  });
    //  console.log(this.dynamichain,this.dynamicCatOverview,this.dynamicCatOverview1,event)
    //  this.categoryArray = this.categoryArray*13.3;
    //  this.yearArray = this.yearArray*13.3;
    //  this.cityArray = this.cityArray*13.3;
    //  this.chainArray = this.chainArray*13.3;
    //  this.buyerArray = this.buyerArray*13.3;
    //  this.monthArray = this.monthArray*13.3;
    //  this.QuarterArray = this.QuarterArray*13.3;
    //  this.categoryChart(this.dynamicCat,this.dynamicCatOverview,this.dynamicCatOverview1,event);
    //  this.chainChart(this.chainUpade,event);
    //  this.monthChart(this.dynamicMonth,this.dynamicMonthOverview,event);
    // }
    // if('North'==event){
    //   this.chainUpade = this.dynamichain
    //   this.categoryArray = 171
    //   this.yearArray =289
    //   this.cityArray =403
    //   this.chainArray =214
    //   this.buyerArray =346
    //   this.monthArray =75
    //   this.QuarterArray =1151
    // this.dynamicMonthOverview.forEach(element =>{
    //   element.y = element.y*7
    // });
    //  this.dynamichain.forEach(element => {
    //    element.y = element.y*2
    //  });
    //  this.dynamicCatOverview.forEach(element => {
    //    element.y = element.y*2
    //  });
    //  this.dynamicCatOverview1.forEach(element => {
    //    element.y = element.y*2
    //  });
    //  console.log(this.dynamichain,this.dynamicCatOverview,this.dynamicCatOverview1,event)
    //  this.categoryArray = this.categoryArray*5.9;
    //  this.yearArray = this.yearArray*5.9;
    //  this.cityArray = this.cityArray*5.9;
    //  this.chainArray = this.chainArray*5.9;
    //  this.buyerArray = this.buyerArray*5.9;
    //  this.monthArray = this.monthArray*5.9;
    //  this.QuarterArray = this.QuarterArray*5.9;
    //  this.categoryChart(this.dynamicCat,this.dynamicCatOverview,this.dynamicCatOverview1,event);
    //  this.chainChart(this.chainUpade,event);
    //  this.monthChart(this.dynamicMonth,this.dynamicMonthOverview,event);
    // }
    // if('Central Asia'==event){
    //   this.chainUpade = this.dynamichain
    //   this.categoryArray = 171
    //   this.yearArray =289
    //   this.cityArray =403
    //   this.chainArray =214
    //   this.buyerArray =346
    //   this.monthArray =75
    //   this.QuarterArray =1151
    //  var series = [];
    //  var arr_2019 = ["Jan 2019","Feb 2019","Mar 2019","Apr 2019","May 2019","Jun 2019","Jul 2019","Aug 2019","Sep 2019","Oct 2019","Nov 2019","Dec 2019"];
    //  var names = ['TotalSales', 'TotalSalesly'];
    //  var color = ['#03cb44', '#ff6b1b'];
    //  this.totalSalesDynamicData.forEach(element => {
    //   element[0].y = element[0].y*3;
    //   element[1].y = element[1].y*3;
    // });
    //   var totalcases = [this.totalSalesDynamicData.concat(this.totalSalesDynamicData),this.totalSalesLyDynamicData.concat(this.totalSalesLyDynamicData)]
    // names.map((item, index) => {
    //  series.push({ name: names[index], color: color[index], data: this.totalSalesDynamicData[index] })
    // });

    //  this.dynamichain.forEach(element => {
    //    element.y = element.y*3
    //  });
    //  this.dynamicCatOverview.forEach(element => {
    //    element.y = element.y*3
    //  });
    //  this.dynamicCatOverview1.forEach(element => {
    //    element.y = element.y*3
    //  });
    //  console.log(this.dynamichain,this.dynamicCatOverview,this.dynamicCatOverview1,series)
    //  this.categoryArray = this.categoryArray*9.5;
    //  this.yearArray = this.yearArray*9.5;
    //  this.cityArray = this.cityArray*9.5;
    //  this.chainArray = this.chainArray*9.5;
    //  this.buyerArray = this.buyerArray*9.5;
    //  this.monthArray = this.monthArray*9.5;
    //  this.QuarterArray = this.QuarterArray*9.5;
    //  this.categoryChart(this.dynamicCat,this.dynamicCatOverview,this.dynamicCatOverview1,event);
    //  this.chainChart(this.chainUpade,event);
    //  this.monthChart(this.dynamicMonth.concat(arr_2019),series,event);
    // }
    // if('West'==event){
    //   this.chainUpade = this.dynamichain
    //   this.categoryArray = 171
    //   this.yearArray =289
    //   this.cityArray =403
    //   this.chainArray =214
    //   this.buyerArray =346
    //   this.monthArray =75
    //   this.QuarterArray =1151
    //  var series = [];
    //  var arr_2019 = ["Jan 2019","Feb 2019","Mar 2019","Apr 2019","May 2019","Jun 2019","Jul 2019","Aug 2019","Sep 2019","Oct 2019","Nov 2019","Dec 2019"];
    //  var names = ['TotalSales', 'TotalSalesly'];
    //  var color = ['#03cb44', '#ff6b1b'];
    //  this.totalSalesDynamicData.forEach(element => {
    //   element[0].y = element[0].y*4;
    //   element[1].y = element[1].y*4;
    // });
    //   var totalcases = [this.totalSalesDynamicData.concat(this.totalSalesDynamicData),this.totalSalesLyDynamicData.concat(this.totalSalesLyDynamicData)]
    // names.map((item, index) => {
    //  series.push({ name: names[index], color: color[index], data: this.totalSalesDynamicData[index] })
    // });

    //  this.dynamichain.forEach(element => {
    //    element.y = element.y*4
    //  });
    //  this.dynamicCatOverview.forEach(element => {
    //    element.y = element.y*4
    //  });
    //  this.dynamicCatOverview1.forEach(element => {
    //    element.y = element.y*4
    //  });
    //  console.log(this.dynamichain,this.dynamicCatOverview,this.dynamicCatOverview1,series)
    //  this.categoryArray = this.categoryArray*3.6;
    //  this.yearArray = this.yearArray*3.6;
    //  this.cityArray = this.cityArray*3.6;
    //  this.chainArray = this.chainArray*3.6;
    //  this.buyerArray = this.buyerArray*3.6;
    //  this.monthArray = this.monthArray*3.6;
    //  this.QuarterArray = this.QuarterArray*3.6;
    //  this.categoryChart(this.dynamicCat,this.dynamicCatOverview,this.dynamicCatOverview1,event);
    //  this.chainChart(this.chainUpade,event);
    //  this.monthChart(this.dynamicMonth.concat(arr_2019),series,event);
    // }
    // if('East'==event){
    //   this.chainUpade = this.dynamichain
    //   this.categoryArray = 171
    //   this.yearArray =289
    //   this.cityArray =403
    //   this.chainArray =214
    //   this.buyerArray =346
    //   this.monthArray =75
    //   this.QuarterArray =1151
    //  var series = [];
    //  var arr_2019 = ["Jan 2019","Feb 2019","Mar 2019","Apr 2019","May 2019","Jun 2019","Jul 2019","Aug 2019","Sep 2019","Oct 2019","Nov 2019","Dec 2019"];
    //  var names = ['TotalSales', 'TotalSalesly'];
    //  var color = ['#03cb44', '#ff6b1b'];
    //  this.totalSalesDynamicData.forEach(element => {
    //   element[0].y = element[0].y*5;
    //   element[1].y = element[1].y*5;
    // });
    //   var totalcases = [this.totalSalesDynamicData.concat(this.totalSalesDynamicData),this.totalSalesLyDynamicData.concat(this.totalSalesLyDynamicData)]
    // names.map((item, index) => {
    //  series.push({ name: names[index], color: color[index], data: this.totalSalesDynamicData[index] })
    // });

    //  this.dynamichain.forEach(element => {
    //    element.y = element.y*5
    //  });
    //  this.dynamicCatOverview.forEach(element => {
    //    element.y = element.y*5
    //  });
    //  this.dynamicCatOverview1.forEach(element => {
    //    element.y = element.y*5
    //  });
    //  console.log(this.dynamichain,this.dynamicCatOverview,this.dynamicCatOverview1,series)
    //  this.categoryArray = this.categoryArray*10.4;
    //  this.yearArray = this.yearArray*10.4;
    //  this.cityArray = this.cityArray*10.4;
    //  this.chainArray = this.chainArray*10.4;
    //  this.buyerArray = this.buyerArray*10.4;
    //  this.monthArray = this.monthArray*10.4;
    //  this.QuarterArray = this.QuarterArray*10.4;
    //  this.categoryChart(this.dynamicCat,this.dynamicCatOverview,this.dynamicCatOverview1,event);
    //  this.chainChart(this.chainUpade,event);
    //  this.monthChart(this.dynamicMonth.concat(arr_2019),series,event);
    // }
    // if('Canada'==event){
    //   this.chainUpade = this.dynamichain
    //   this.categoryArray = 171
    //   this.yearArray =289
    //   this.cityArray =403
    //   this.chainArray =214
    //   this.buyerArray =346
    //   this.monthArray =75
    //   this.QuarterArray =1151
    //  var series = [];
    //  var arr_2019 = ["Jan 2019","Feb 2019","Mar 2019","Apr 2019","May 2019","Jun 2019","Jul 2019","Aug 2019","Sep 2019","Oct 2019","Nov 2019","Dec 2019"];
    //  var names = ['TotalSales', 'TotalSalesly'];
    //  var color = ['#03cb44', '#ff6b1b'];
    //  this.totalSalesDynamicData.forEach(element => {
    //   element[0].y = element[0].y*2;
    //   element[1].y = element[1].y*2;
    // });
    //   var totalcases = [this.totalSalesDynamicData.concat(this.totalSalesDynamicData),this.totalSalesLyDynamicData.concat(this.totalSalesLyDynamicData)]
    // names.map((item, index) => {
    //  series.push({ name: names[index], color: color[index], data: this.totalSalesDynamicData[index] })
    // });

    //  this.dynamichain.forEach(element => {
    //    element.y = element.y*2
    //  });
    //  this.dynamicCatOverview.forEach(element => {
    //    element.y = element.y*2
    //  });
    //  this.dynamicCatOverview1.forEach(element => {
    //    element.y = element.y*2
    //  });
    //  console.log(this.dynamichain,this.dynamicCatOverview,this.dynamicCatOverview1,series)
    //  this.categoryArray = this.categoryArray*2;
    //  this.yearArray = this.yearArray*2;
    //  this.cityArray = this.cityArray*2;
    //  this.chainArray = this.chainArray*2;
    //  this.buyerArray = this.buyerArray*2;
    //  this.monthArray = this.monthArray*2;
    //  this.QuarterArray = this.QuarterArray*2;
    //  this.categoryChart(this.dynamicCat,this.dynamicCatOverview,this.dynamicCatOverview1,event);
    //  this.chainChart(this.chainUpade,event);
    //  this.monthChart(this.dynamicMonth.concat(arr_2019),series,event);
    // }
    // if('Central'==event){
    //   this.chainUpade = this.dynamichain
    //   this.categoryArray = 171
    //   this.yearArray =289
    //   this.cityArray =403
    //   this.chainArray =214
    //   this.buyerArray =346
    //   this.monthArray =75
    //   this.QuarterArray =1151
    //  var series = [];
    //  var arr_2019 = ["Jan 2019","Feb 2019","Mar 2019","Apr 2019","May 2019","Jun 2019","Jul 2019","Aug 2019","Sep 2019","Oct 2019","Nov 2019","Dec 2019"];
    //  var names = ['TotalSales', 'TotalSalesly'];
    //  var color = ['#03cb44', '#ff6b1b'];
    //  this.totalSalesDynamicData.forEach(element => {
    //   element[0].y = element[0].y*3;
    //   element[1].y = element[1].y*3;
    // });
    //   var totalcases = [this.totalSalesDynamicData.concat(this.totalSalesDynamicData),this.totalSalesLyDynamicData.concat(this.totalSalesLyDynamicData)]
    // names.map((item, index) => {
    //  series.push({ name: names[index], color: color[index], data: this.totalSalesDynamicData[index] })
    // });

    //  this.dynamichain.forEach(element => {
    //    element.y = element.y*3
    //  });
    //  this.dynamicCatOverview.forEach(element => {
    //    element.y = element.y*3
    //  });
    //  this.dynamicCatOverview1.forEach(element => {
    //    element.y = element.y*3
    //  });
    //  console.log(this.dynamichain,this.dynamicCatOverview,this.dynamicCatOverview1,series)
    //  this.categoryArray = this.categoryArray*3;
    //  this.yearArray = this.yearArray*3;
    //  this.cityArray = this.cityArray*3;
    //  this.chainArray = this.chainArray*3;
    //  this.buyerArray = this.buyerArray*3;
    //  this.monthArray = this.monthArray*3;
    //  this.QuarterArray = this.QuarterArray*3;
    //  this.categoryChart(this.dynamicCat,this.dynamicCatOverview,this.dynamicCatOverview1,event);
    //  this.chainChart(this.chainUpade,event);
    //  this.monthChart(this.dynamicMonth.concat(arr_2019),series,event);
    // }
    // if('South'==event){
    //   this.chainUpade = this.dynamichain
    //   this.categoryArray = 171
    //   this.yearArray =289
    //   this.cityArray =403
    //   this.chainArray =214
    //   this.buyerArray =346
    //   this.monthArray =75
    //   this.QuarterArray =1151
    //  var series = [];
    //  var arr_2019 = ["Jan 2019","Feb 2019","Mar 2019","Apr 2019","May 2019","Jun 2019","Jul 2019","Aug 2019","Sep 2019","Oct 2019","Nov 2019","Dec 2019"];
    //  var names = ['TotalSales', 'TotalSalesly'];
    //  var color = ['#03cb44', '#ff6b1b'];
    //  this.totalSalesDynamicData.forEach(element => {
    //   element[0].y = element[0].y*1;
    //   element[1].y = element[1].y*1;
    // });
    //   var totalcases = [this.totalSalesDynamicData.concat(this.totalSalesDynamicData),this.totalSalesLyDynamicData.concat(this.totalSalesLyDynamicData)]
    // names.map((item, index) => {
    //  series.push({ name: names[index], color: color[index], data: this.totalSalesDynamicData[index] })
    // });

    //  this.dynamichain.forEach(element => {
    //    element.y = element.y*1
    //  });
    //  this.dynamicCatOverview.forEach(element => {
    //    element.y = element.y*1
    //  });
    //  this.dynamicCatOverview1.forEach(element => {
    //    element.y = element.y*1
    //  });
    //  console.log(this.dynamichain,this.dynamicCatOverview,this.dynamicCatOverview1,series)
    //  this.categoryArray = this.categoryArray*13;
    //  this.yearArray = this.yearArray*13;
    //  this.cityArray = this.cityArray*13;
    //  this.chainArray = this.chainArray*13;
    //  this.buyerArray = this.buyerArray*13;
    //  this.monthArray = this.monthArray*13;
    //  this.QuarterArray = this.QuarterArray*13;
    //  this.categoryChart(this.dynamicCat,this.dynamicCatOverview,this.dynamicCatOverview1,event);
    //  this.chainChart(this.chainUpade,event);
    //  this.monthChart(this.dynamicMonth.concat(arr_2019),series,event);
    // }
    // this.chainUpade = this.dynamichain
    // if(this.count == 5){
    //   this.count = 0
    // }else{
    //   this.count = this.count+0.5;
    // }
    // console.log(this.count)

    // this.totalSalesLyDynamicData.forEach(element => {
    //   element.y = element.y*this.count;
    // });

    // var totalcases = [this.totalSalesDynamicData.concat(this.totalSalesDynamicData),this.totalSalesLyDynamicData.concat(this.totalSalesLyDynamicData)]
    // names.map((item, index) => {
    //   series.push({ name: names[index], color: color[index], data: this.totalSalesDynamicData[index] })
    // });
    // this.dynamichain.forEach(element => {
    //   element.y = element.y*this.count
    // });
    // this.dynamicCatOverview.forEach(element => {
    //   element.y = element.y*this.count
    // });
    // this.dynamicCatOverview1.forEach(element => {
    //   element.y = element.y*this.count
    // });
    // this.categoryArray = this.categoryArray*this.count;
    // this.yearArray = this.yearArray*this.count;
    // this.cityArray = this.cityArray*this.count;
    // this.chainArray = this.chainArray*this.count;
    // this.buyerArray = this.buyerArray*this.count;
    // this.monthArray = this.monthArray*this.count;
    // this.QuarterArray = this.QuarterArray*this.count;

  }
  updateCategorychartData(event) {
    this.pieChart(this.dynamicPie, event);
    this.categoryChart(this.dynamicCat, this.dynamicCatOverview, this.dynamicCatOverview1, event);
    this.monthChart(this.dynamicMonth, this.dynamicMonthOverview, event);
    this.chainChart(this.dynamichain, event);
  }
  updateMonthChartData(event) {
    this.pieChart(this.dynamicPie, event);
    this.categoryChart(this.dynamicCat, this.dynamicCatOverview, this.dynamicCatOverview1, event);
    this.monthChart(this.dynamicMonth, this.dynamicMonthOverview, event);
    this.chainChart(this.dynamichain, event);
  }
  updateChainChartData(event) {
    this.pieChart(this.dynamicPie, event);
    this.categoryChart(this.dynamicCat, this.dynamicCatOverview, this.dynamicCatOverview1, event);
    this.monthChart(this.dynamicMonth, this.dynamicMonthOverview, event);
    //  this.chainChart(this.dynamichain,event);
  }
  getAllData() {
    this.SpinnerService.show();
    this.dataservice.getSupplychainApi().subscribe(data => {
      console.log(data);
      this.supplyData = data;
      this.dummyArray = data;
      this.chainUpade = data;
      this.categoryUpade = data;
      this.Region = _.uniqBy(data, 'Region')
      this.Category = _.uniqBy(data, 'Category')
      this.subcategory = _.uniqBy(data, 'SubCategory');
      this.Months = _.uniqBy(data, 'Year')
      this.getBuyerCount(data);
      this.getWeekCount(data);
      this.getCategoryCount(data);
      this.getChainCount(data);
      this.SpinnerService.hide();
      this.dummyArray.map(item => {
        if (item.Sales != null) {
          this.categoryArray += item.Sales * 2;
        }
      })
      this.dummyArray.map(item => {
        if (item.TargetSales != null) {
          this.yearArray += item.TargetSales * 2;
        }
      })
      this.dummyArray.map(item => {
        if (item.Sales != null) {
          this.cityArray += item.Sales * 3;
        }
      })
      this.dummyArray.map(item => {
        if (item.TargetSales != null) {
          this.chainArray += item.TargetSales * 3;
        }
      })
      this.dummyArray.map(item => {
        if (item.Sales != null) {
          this.buyerArray += item.Sales * 4;
        }
      })
      this.dummyArray.map(item => {
        if (item.TargetSales != null) {
          this.monthArray += item.TargetSales / 10;
        }
      })
      this.dummyArray.map(item => {
        if (item.Sales != null) {
          this.QuarterArray += item.Sales / 10;
        }
      })
    }, err => {
      console.log("error", err);
      this.SpinnerService.hide();
    })
  }
  // storeData(){
  //   this.dataService.getManufactureAPi().subscribe(data=>{
  //     console.log("maindata",data)
  //     this.Months = _.uniqBy(data,'Region')
  //     this.Months = _.uniqBy(data,'Category')
  //     this.products = _.uniqBy(data,'subcategory')
  //     this.dummyArray = data;
  //     this.getBuyerCount(data);
  //     this.getWeekCount(data);
  //     data.map(item =>{
  //       this.categoryArray +=item.stock*3
  //       this.yearArray +=item.stock*4
  //       this.cityArray +=item.stock*5
  //       this.chainArray +=item.stock*6
  //       this.buyerArray +=item.stock*7
  //       this.monthArray +=item.stock*8
  //       this. QuarterArray +=item.stock*10
  //   })
  //   })
  // }
  // laodColomChartData() {
  //   this.dataService.getManufactureStockAPi().subscribe(data => {
  //     console.log("all",data);
  //     console.log(this.Months)
  //     this.DelivariesData = data;
  //     this.getCategoryCount(data);
  //     this.getChainCount(data);
  //   })
  // }

  df(value) {
    return numeral(value).format('$0,0.00');
  }
  selectedCategory(event) {
    var element = event.currentTarget.value;
    this.categoryArray = 0;
    this.yearArray = 0;
    this.cityArray = 0;
    this.chainArray = 0;
    this.buyerArray = 0;
    this.monthArray = 0;
    this.QuarterArray = 0;
    // console.log(element)
    let dataArray: any = [];
    if ('ALL' == element) {
      dataArray = this.dummyArray;
    }
    for (let obj of this.dummyArray) {
      if (obj['Category'] == element) {
        dataArray.push(obj);
      }
    }
    // this.DummyArray = dataArray;
    var data = dataArray;
    data.map(item => {
      this.categoryArray += item.Sales * 3
      this.yearArray += item.TargetSales * 4
      this.cityArray += item.Sales * 5
      this.chainArray += item.TargetSales * 6
      this.buyerArray += item.Sales * 7
      this.monthArray += item.TargetSales % 100
      this.QuarterArray += item.TargetSales * 10
    })
    this.getBuyerCount(data);
    this.getWeekCount(data);
    this.getCategoryCount(data);
    this.getChainCount(data);
  }
  selectedSubCategory(event) {
    var element = event.currentTarget.value;
    this.categoryArray = 0;
    this.yearArray = 0;
    this.cityArray = 0;
    this.chainArray = 0;
    this.buyerArray = 0;
    this.monthArray = 0;
    this.QuarterArray = 0;
    // console.log(element)
    let dataArray: any = [];
    if ('ALL' == element) {
      dataArray = this.dummyArray;
    }
    for (let obj of this.dummyArray) {
      if (obj['SubCategory'] == element) {
        dataArray.push(obj);
      }
    }
    // this.DummyArray = dataArray;
    var data = dataArray;
    data.map(item => {
      this.categoryArray += item.TargetSales * 3
      this.yearArray += item.Sales * 4
      this.cityArray += item.TargetSales * 5
      this.chainArray += item.Sales * 6
      this.buyerArray += item.TargetSales * 7
      this.monthArray += item.Sales % 100
      this.QuarterArray += item.TargetSales * 10
    })
    this.getBuyerCount(data);
    this.getWeekCount(data);
    this.getCategoryCount(data);
    this.getChainCount(data);
  }
  selectedRegion(event) {
    var element = event.currentTarget.value;
    this.categoryArray = 0;
    this.yearArray = 0;
    this.cityArray = 0;
    this.chainArray = 0;
    this.buyerArray = 0;
    this.monthArray = 0;
    this.QuarterArray = 0;
    // console.log(element)
    let dataArray: any = [];
    if ('ALL' == element) {
      dataArray = this.dummyArray;
    }
    for (let obj of this.dummyArray) {
      if (obj['Region'] == element) {
        dataArray.push(obj);
      }
    }
    // this.DummyArray = dataArray;
    var data = dataArray;
    data.map(item => {
      this.categoryArray += item.Sales * 3
      this.yearArray += item.TargetSales * 4
      this.cityArray += item.Sales * 5
      this.chainArray += item.TargetSales * 6
      this.buyerArray += item.Sales * 7
      this.monthArray += item.TargetSales % 100
      this.QuarterArray += item.Sales * 10
    })
    this.getBuyerCount(data);
    this.getWeekCount(data);
    this.getCategoryCount(data);
    this.getChainCount(data);
  }
  selectedMonth(event) {
    var element = event.currentTarget.value;
    this.categoryArray = 0;
    this.yearArray = 0;
    this.cityArray = 0;
    this.chainArray = 0;
    this.buyerArray = 0;
    this.monthArray = 0;
    this.QuarterArray = 0;
    // console.log(element)
    let dataArray: any = [];
    if ('ALL' == element) {
      dataArray = this.dummyArray;
    }
    for (let obj of this.dummyArray) {
      if (obj['Year'] == element) {
        dataArray.push(obj);
      }
    }
    // this.DummyArray = dataArray;
    var data = dataArray;
    data.map(item => {
      this.categoryArray += item.TargetSales * 3
      this.yearArray += item.Sales * 4
      this.cityArray += item.TargetSales * 5
      this.chainArray += item.Sales * 6
      this.buyerArray += item.TargetSales * 7
      this.monthArray += item.Sales % 100
      this.QuarterArray += item.TargetSales * 10
    })
    this.getBuyerCount(data);
    this.getWeekCount(data);
    this.getCategoryCount(data);
    this.getChainCount(data);
  }
  getBuyerCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['Region'].map(function (k) { return a[k]; }).join('|');
      if (a.Sales === undefined || a.Sales === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.Region, y: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.y += a.Sales;
      hash[key].count++;
    });
    result.map(item => {
      item.y = parseFloat(item.y.toFixed(2));
    })
    this.dynamicPie = result;
    // console.log(result)
    this.pieChart(result, '')
  }
  getChainCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['Segment'].map(function (k) { return a[k]; }).join('|');
      if (a.Sales === undefined || a.Sales === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.Segment, y: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.y += a.Sales;
      hash[key].count++;
    });
    result.map(item => {
      item.y = parseFloat(item.y.toFixed(2));
    })
    this.dynamichain = result;
    this.chainChart(result, '')
  }
  getCategoryCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['SubCategory'].map(function (k) { return a[k]; }).join('|');
      if (a.Sales === undefined || a.Sales === null && a.TargetSales === undefined || a.TargetSales === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.SubCategory, y: 0, z: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.y = a.Sales;
      hash[key].data.z = a.TargetSales;
      hash[key].data.definition = a.SubCategory;
      hash[key].count++;
    });
    // console.log("category", result)
    var names = ['Misseddeliveries'];
    var names1 = ['Delivered'];
    var color = ['#03cb44']
    var color1 = ['#ff6b1b']
    // console.log("chartData", color)
    var Xaxis: any = [];
    var series: any = [];
    var series1: any = [];
    var chartInfo: any = [];
    var TotalSales: any = [];
    var TotalSalesly: any = [];
    var totalcases: any = [];
    var totalcases1: any = [];
    result.map((item, index) => {
      TotalSales.push(result[index].y);
      TotalSalesly.push(result[index].z);
      Xaxis.push(result[index].definition);
      // console.log(TotalSales, TotalSalesly)
      totalcases = [TotalSales];
      totalcases1 = [TotalSalesly];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] })
    });
    // console.log("color", color);
    names1.map((item, index) => {
      series1.push({ name: names1[index], color: color1[index], data: totalcases1[index] })
    });
    // console.log("series", TotalSales);
    // console.log("series1", TotalSalesly);
    this.dynamicCat = Xaxis;
    this.dynamicCatOverview = TotalSales;
    this.dynamicCatOverview1 = TotalSalesly;
    this.categoryChart(Xaxis, TotalSales, TotalSalesly, '');
  }
  getWeekCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['WeekNumber'].map(function (k) { return a[k]; }).join('|');
      if (a.Sales === undefined || a.Sales === null && a.TargetSales === undefined || a.TargetSales === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.WeekNumber, y: 0, z: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.y += a.Sales;
      hash[key].data.z += a.TargetSales;
      hash[key].data.definition = a.WeekNumber;
      hash[key].count++;
    });
    // console.log("category", result)
    // var arr_2019 = ["Jan 2019","Feb 2019","Mar 2019","Apr 2019","May 2019","Jun 2019","Jul 2019","Aug 2019","Sep 2019","Oct 2019","Nov 2019","Dec 2019"];
    var names = ['Sales', 'TargetSales'];
    var color = ['#03cb44', '#ff6b1b']
    var Xaxis: any = [];
    var series: any = [];
    var chartInfo: any = [];
    var TotalSales: any = [];
    var TotalSalesly: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      TotalSales.push(result[index].y);
      TotalSalesly.push(result[index].z);
      Xaxis.push(result[index].definition);
      totalcases = [TotalSales, TotalSalesly];
    });
    // totalcases = [TotalSales.concat(TotalSales),TotalSalesly.concat(TotalSalesly)];
    // Xaxis = Xaxis;
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] })
    });
    // this.totalSalesDynamicData = totalcases;
    // this.totalSalesLyDynamicData = TotalSalesly;
    this.dynamicMonth = Xaxis;
    this.dynamicMonthOverview = series;
    this.monthChart(Xaxis, series, '')
  }
  pieChart(chartData, name) {
    var $this = this;
    var tooltipEnabled = true;
    this.pieOptions = {
      chart: {
        options3d: {
          enabled: true,
          alpha: 25,
          beta: 0
        },
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        events: {
        }
      },
      title: {
        text: null,
        align: 'center',
        verticalAlign: 'middle',
        y: 10
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 45,
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          },
          colors: ['#1769a3', '#ff6b1b', '#03cb44', '#a42cee', '#eb641b', '#39639d', '#474b78', '#7d3c4a', '#2d5dbf', '#da6e1f', '#ebc61b', '#40399d'],
          events: {
            click: function (event) {
              let sliced: boolean;
              sliced = event.point.options.sliced
              console.log(sliced)
              $this.updatepieData(event.point.name, sliced);
            },
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Browser share',
        innerSize: '50%',
        data: chartData,
        point: {
          events: {
            mouseOver: function (event) {
              // console.log(event.target.name, event.target.color)
              $this.name = event.target.name;
              $this.value = event.target.y;
              //  $this.updateTableData(event.target.name,event.target.color);
              $this.setTranslation(this, true);
            },
            mouseOut: function () {
              //  $this.updateTableData(event.target.name,event.target.color);
              $this.setTranslation(this, false);
            },
          }
        }
      }]
    }
    this.pievalue = new Chart(this.pieOptions);
  }
  categoryChart(Xaxis, series, series1, name) {
    // console.log("chartData", series1)
    var $this = this;
    var tooltipEnabled = true;
    this.bar1Options = {
      chart: {
        zoomType: 'xy',
        backgroundColor: "#ffffff",
        events: {
          load: function (e) {
            // console.log("e1",e);
            var dataarr = e.target.series[0].data;
            var dataarr1 = e.target.series[1].data;
            // console.log("dataarr",dataarr);
            dataarr.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#84e4a4'
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
                  color: '#FFAC4E'
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
      xAxis: {
        categories: Xaxis
      },
      yAxis: [{ // Primary yAxis
        // labels: {
        //   format: '{value}°C',
        // },
        title: {
          text: null
        }
      }, {
        title: {
          text: null
        },
        // labels: {
        //   format: '{value} mm',
        // },
        opposite: true
      }],
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click: function (event) {
                console.log(event)
                $this.updateCategorychartData(event.point.category);
                console.log(event.point.category);
              },
            }
          }
        }
      },
      exporting: false,
      series: [{
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        data: series,
        color: '#03cb44',
        tooltip: {
          valueSuffix: ' mm'
        }

      }, {
        name: 'Temperature',
        type: 'spline',
        data: series1,
        color: '#ff6b1b',
        tooltip: {
          valueSuffix: '°C'
        }
      }]

    }
    this.bar1 = new Chart(this.bar1Options);
  }
  monthChart(xAxis, series, name) {
    // console.log(xAxis)
    var $this = this;
    var tooltipEnabled = true;
    this.MonthOptions = {
      chart: {
        type: 'column',
        backgroundColor: "#ffffff",
        events: {
          load: function (e) {
            // console.log("e2",e);
            var dataarr = e.target.series[0].data;
            var dataarr1 = e.target.series[1].data;
            // console.log("dataarr",dataarr);
            dataarr.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#84e4a4'
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
                  color: '#FFAC4E'
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
      xAxis: {
        categories: xAxis
      },
      yAxis: {
        title: {
          text: null
        }
      },
      legend: {
        align: 'left',
        x: 40,
        verticalAlign: 'top',
        y: -30,
        // floating: true,
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click: function (event) {
                console.log(event)
                $this.updateMonthChartData(event.point.category);
                console.log(event.point.category);
              },
            }
          }
        }
      },
      exporting: false,
      series: series,

    }
    this.colum = new Chart(this.MonthOptions);
  }
  chainChart(chartData, name) {
    // console.log(chartData)
    var $this = this;
    var tooltipEnabled = true;
    this.piOptions = {
      chart: {
        options3d: {
          enabled: true,
          alpha: 25,
          beta: 0
        },
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        events: {

        }
      },
      title: {
        text: null,
        align: 'center',
        verticalAlign: 'middle',
        y: 10
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 45,
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          },
          colors: ['#1769a3', '#ff6b1b', '#03cb44'],
          events: {
            click: function (event) {
              console.log(event)
              $this.updateChainChartData(event.point.name);
              console.log(event.point.name);
            },
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Browser share',
        innerSize: '50%',
        data: chartData,
        point: {
          events: {
            mouseOver: function (event) {
              // console.log(event.target.name, event.target.color)
              $this.name = event.target.name;
              $this.value = event.target.y;
              //  $this.updateTableData(event.target.name,event.target.color);
              $this.setTranslation(this, true);
            },
            mouseOut: function () {
              //  $this.updateTableData(event.target.name,event.target.color);
              $this.setTranslation(this, false);
            },
          }
        }
      }]
    }
    this.pi = new Chart(this.piOptions);
  }
  setTranslation(p, slice) {
    p.sliced = slice;
    if (p.sliced) {
      p.graphic.animate(p.slicedTranslation);
    } else {
      p.graphic.animate({
        translateX: 0,
        translateY: 0
      });
    }

  }
}
