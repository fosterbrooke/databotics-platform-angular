import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { DataService } from 'src/app/core/data.service';
import _ from 'lodash';
const numeral = require('numeral');

@Component({
  selector: 'app-forecasting-usecase-two',
  templateUrl: './forecasting-usecase-two.component.html',
  styleUrls: ['./forecasting-usecase-two.component.css']
})
export class ForecastingUsecaseTwoComponent implements OnInit {
  buyerChartOptions: any;
  buychart: any;
  categoryOptions: any;
  categorychart : any;
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
  dynamichain = [];
  dynamicPie = [];
  MonthOptions : any;
  colum : any;
  pieOptions : any;
  pievalue : any;
  piOptions : any;
  pi : any;

  bar1 : any;
  bar1Options : any
  dummyArray  = [];
   constructor(private router: Router, private dataservice:DataService) { }


  ngOnInit() {
    this.getFullData();
  }
  updateColumnData(event){
    this.pieChart(this.dynamicPie,event);
    this.chainChart(this.dynamichain,event);
    this.categoryChart(this.dynamicCat,this.dynamicCatOverview,event);
    this.monthChart(this.dynamicMonth,this.dynamicMonthOverview,event);
  }
  updateColumnData2(event){
    this.pieChart(this.dynamicPie,event);
    this.chainChart(this.dynamichain,event);
    this.categoryChart(this.dynamicCat,this.dynamicCatOverview,event);
    this.monthChart(this.dynamicMonth,this.dynamicMonthOverview,event);
  }
  updatepieData(event){
    this.pieChart(this.dynamicPie,event);
    this.chainChart(this.dynamichain,event);
    this.categoryChart(this.dynamicCat,this.dynamicCatOverview,event);
    this.monthChart(this.dynamicMonth,this.dynamicMonthOverview,event);
  }
  updatepieData2(event){
    this.pieChart(this.dynamicPie,event);
    this.chainChart(this.dynamichain,event);
    this.categoryChart(this.dynamicCat,this.dynamicCatOverview,event);
    this.monthChart(this.dynamicMonth,this.dynamicMonthOverview,event);
  }
  df(value){
   return numeral(value).format('$0,0.00');
 }
 selectedCategory(event){
   var element = event.currentTarget.value;
   console.log(element)
   let dataArray : any = [];
   for(let obj of this.dummyArray){
     if(obj['Category'] == element){
       dataArray.push(obj);
     }
   }
   // this.DummyArray = dataArray;
   var data = dataArray;
   data.map(item =>{
      this.categoryArray +=item.Category.length
      this.yearArray +=item.Year.length
      this.cityArray +=item.City.length
      this.chainArray +=item.Chain.length
      this.buyerArray +=item.Buyer.length
      this.monthArray +=item.Month.length
      this. QuarterArray +=item.Quarter.length
 })
 this.getCategoryCount(data);
 this.getBuyerCount(data);
 this.getChainCount(data);
 this.getWeekCount(data);
 }
 selectedCity(event){
   var element = event.currentTarget.value;
   console.log(element)
   let dataArray : any = [];
   for(let obj of this.dummyArray){
     if(obj['City'] == element){
       dataArray.push(obj);
     }
   }
   // this.DummyArray = dataArray;
   var data = dataArray;
   data.map(item =>{
      this.categoryArray +=item.Category.length
      this.yearArray +=item.Year.length
      this.cityArray +=item.City.length
      this.chainArray +=item.Chain.length
      this.buyerArray +=item.Buyer.length
      this.monthArray +=item.Month.length
      this. QuarterArray +=item.Quarter.length
 })
 this.getCategoryCount(data);
 this.getBuyerCount(data);
 this.getChainCount(data);
 this.getWeekCount(data);
 }
 selectedYear(event){
   var element = event.currentTarget.value;
   console.log(element)
   let dataArray : any = [];
   for(let obj of this.dummyArray){
     if(obj['Month'] == element){
       dataArray.push(obj);
     }
   }
   // this.DummyArray = dataArray;
   var data = dataArray;
   data.map(item =>{
      this.categoryArray +=item.Category.length
      this.yearArray +=item.Year.length
      this.cityArray +=item.City.length
      this.chainArray +=item.Chain.length
      this.buyerArray +=item.Buyer.length
      this.monthArray +=item.Month.length
      this. QuarterArray +=item.Quarter.length
 })
 this.getCategoryCount(data);
 this.getBuyerCount(data);
 this.getChainCount(data);
 this.getWeekCount(data);
 }
 selectedChain(event){
   var element = event.currentTarget.value;
   console.log(element)
   let dataArray : any = [];
   for(let obj of this.dummyArray){
     if(obj['Chain'] == element){
       dataArray.push(obj);
     }
   }
   // this.DummyArray = dataArray;
   var data = dataArray;
   data.map(item =>{
      this.categoryArray +=item.Category.length
      this.yearArray +=item.Year.length
      this.cityArray +=item.City.length
      this.chainArray +=item.Chain.length
      this.buyerArray +=item.Buyer.length
      this.monthArray +=item.Month.length
      this. QuarterArray +=item.Quarter.length
 })
 this.getCategoryCount(data);
 this.getBuyerCount(data);
 this.getChainCount(data);
 this.getWeekCount(data);
 }
  getFullData(){
   this.dataservice.getFinancedDataTwo().subscribe(data=>{
      console.log(data);
      this.dummyArray = data
      this.category = _.uniqBy(data,'Category');
      this.Year = _.uniqBy(data,'Month');
      this.city = _.uniqBy(data,'City');
      this.chain = _.uniqBy(data,'Chain');
      data.map(item =>{
         this.categoryArray +=item.Category.length
         this.yearArray +=item.Year.length
         this.cityArray +=item.City.length
         this.chainArray +=item.Chain.length
         this.buyerArray +=item.Buyer.length
         this.monthArray +=item.Month.length
         this. QuarterArray +=item.Quarter.length
     })
      this.getCategoryCount(data);
      this.getBuyerCount(data);
      this.getChainCount(data);
      this.getWeekCount(data);
   })
  }
  getBuyerCount(data) {
   var hash = Object.create(null);
   var result = [];

   data.forEach(function (a) {
       var key = ['Buyer'].map(function (k) { return a[k]; }).join('|');
       if (a.Buyer === undefined || a.Buyer === null) {
           return;
       }
       if (!hash[key]) {
           hash[key] = { count: 0, data: {name:a.Buyer,y:0} };
           result.push(hash[key].data);
       }
       hash[key].data.y += a.TotalSales;
       hash[key].count++;
   });
   result.map(item=>{
   item.y=parseFloat(item.y.toFixed(2));
   })
   this.dynamicPie = result;
   this. pieChart(result,'')
 }
 getChainCount(data) {
   var hash = Object.create(null);
   var result = [];

   data.forEach(function (a) {
       var key = ['Chain'].map(function (k) { return a[k]; }).join('|');
       if (a.Buyer === undefined || a.Buyer === null) {
           return;
       }
       if (!hash[key]) {
           hash[key] = { count: 0, data: {name:a.Chain,y:0} };
           result.push(hash[key].data);
       }
       hash[key].data.y += a.TotalSales;
       hash[key].count++;
   });
   result.map(item=>{
   item.y=parseFloat(item.y.toFixed(2));
   })
   this.dynamichain = result;
   this. chainChart(result,'')
 }
  getCategoryCount(data) {
   var hash = Object.create(null);
   var result = [];

   data.forEach(function (a) {
       var key = ['Category'].map(function (k) { return a[k]; }).join('|');
       if (a.TotalSales === undefined || a.TotalSales === null) {
           return;
       }
       if (!hash[key]) {
           hash[key] = { count: 0, data: {name:a.Category,y:0,z:0} };
           result.push(hash[key].data);
       }
       hash[key].data.y += a.TotalSales;
       hash[key].data.z += a.TotalSalesLY;
       hash[key].data.definition = a.Category;
       hash[key].count++;
   });
   console.log("category",result)
   var names = ['TotalSales','TotalSalesly'];
    var color = ['#118DFF','#000000']
    var Xaxis : any =[];
    var series : any = [];
    var chartInfo : any = [];
    var TotalSales : any = [];
    var TotalSalesly : any = [];
    var totalcases : any = [];
    result.map((item,index)=>{
        TotalSales.push(result[index].y);
        TotalSalesly.push(result[index].z);
        Xaxis.push(result[index].definition);
        totalcases = [TotalSales,TotalSalesly];
      });
      names.map((item,index) => {
        series.push({name: names[index], color: color[index],data:totalcases[index]})
      });
      this.dynamicCat = Xaxis;
      this.dynamicCatOverview = series;
   this.categoryChart(Xaxis,series,'')
 }
 getWeekCount(data) {
   var hash = Object.create(null);
   var result = [];

   data.forEach(function (a) {
       var key = ['Month'].map(function (k) { return a[k]; }).join('|');
       if (a.TotalSales === undefined || a.TotalSales === null) {
           return;
       }
       if (!hash[key]) {
           hash[key] = { count: 0, data: {name:a.Month,y:0,z:0} };
           result.push(hash[key].data);
       }
       hash[key].data.y += a.TotalSales;
       hash[key].data.z += a.TotalSalesLY;
       hash[key].data.definition = a.Month;
       hash[key].count++;
   });
   console.log("category",result)
   var names = ['TotalSales','TotalSalesly'];
    var color = ['#118DFF','#000000']
    var Xaxis : any =[];
    var series : any = [];
    var chartInfo : any = [];
    var TotalSales : any = [];
    var TotalSalesly : any = [];
    var totalcases : any = [];
    result.map((item,index)=>{
        TotalSales.push(result[index].y);
        TotalSalesly.push(result[index].z);
        Xaxis.push(result[index].definition);
        totalcases = [TotalSales,TotalSalesly];
      });
      names.map((item,index) => {
        series.push({name: names[index], color: color[index],data:totalcases[index]})
      });
      this.dynamicMonth = Xaxis;
      this.dynamicMonthOverview = series;
   this.monthChart(Xaxis,series,'')
 }
  pieChart(chartData,name){
    function get_random_color(){
      return '#' + Math.random().toString(16).substring(2,8);
    }
    chartData.forEach(element => {
      element.color = get_random_color();
    });
    var $this = this;
    var tooltipEnabled = true;
    this.pieOptions = {
      chart: {
        type: 'pie',
        backgroundColor:'#f8f8f9',
        options3d: {
            enabled: true,
            alpha: 20,
            beta: 0
        },
        events:{
          load: function(e){
            console.log(e);
            var dataarr = e.target.series[0].data;
              console.log("dataarr",dataarr);
              dataarr.map(item => {
                if(item['name'] == name){
                  item.update({
                    color: 'yellow'
                });
                }else{
                  item.update({
                    color:item.color
                  });
                }
          })
        }
      }
    },
    exporting:{
      enabled: false
    },
    credits:{
      enabled : false
    },
    title: {
        text: null
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            // allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            events: {
              click: function (event) {
                console.log(event)
                $this.updatepieData(event.point.name);
                console.log(event.point.name);
              },
              // mouseOut: function (event) {
              //   $this.setTranslation(this, false);
              // },
              // mouseOver: function (event) {
              //   $this.setTranslation(this, true);
              // }
            }
          }
    },
    series: [{
        type: 'pie',
        name: 'Stock Breakdown',
        data: chartData
    }]
    }
    this.pievalue = new Chart(this.pieOptions);
  }
  categoryChart(Xaxis,series,name){
    var $this = this;
    var tooltipEnabled = true;
   this.bar1Options = {
    chart: {
      type: 'column',
      backgroundColor: "#ededed",
      events: {
        load: function (e) {
          console.log("e",e);
            var dataarr = e.target.series[0].data;
            var dataarr1 = e.target.series[1].data;
            console.log("dataarr",dataarr);
            dataarr.map(item => {
              if(item['category'] == name){
                item.update({
                  color: 'yellow'
              });
              }else{
                item.update({
                  color:null
                });
              }
            });
            dataarr1.map(item => {
              if(item['category'] == name){
                item.update({
                  color: 'yellow'
              });
              }else{
                item.update({
                  color:null
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
    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
          point: {
              events: {
                click: function (event) {
                  console.log(event)
                   $this.updateColumnData(event.point.category);
                  console.log(event.point.category);
                },
              }
          }
      }
  },
    exporting: false,
    series: series,
      
  }
   this.bar1 = new Chart(this.bar1Options);
  }
  monthChart(xAxis,series,name){
    var $this = this;
    var tooltipEnabled = true;
    this.MonthOptions= {
      chart: {
        type: 'column',
        backgroundColor: "#ededed",
        events: {
          load: function (e) {
            console.log("e2154812",e);
              var dataarr = e.target.series[0].data;
              var dataarr1 = e.target.series[1].data;
              console.log("dataarr",dataarr);
              dataarr.map(item => {
                if(item['category'] == name){
                  item.update({
                    color: 'yellow'
                });
                }else{
                  item.update({
                    color:null
                  });
                }
              });
              dataarr1.map(item => {
                if(item['category'] == name){
                  item.update({
                    color: 'yellow'
                });
                }else{
                  item.update({
                    color:null
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
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
            point: {
                events: {
                  click: function (event) {
                    console.log(event)
                     $this.updateColumnData2(event.point.category);
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
  chainChart(chartData, name){
    function get_random_color(){
      return '#' + Math.random().toString(16).substring(2,8);
    }
    chartData.forEach(element => {
      element.color = get_random_color();
    });
    var $this = this;
    var tooltipEnabled = true;
    this.piOptions = {
      chart: {
        type: 'pie',
        backgroundColor:'#f8f8f9',
        options3d: {
            enabled: true,
            alpha: 20,
            beta: 0
        },
        events:{
          load: function(e){
            console.log(e);
            var dataarr = e.target.series[0].data;
              console.log("dataarr",dataarr);
              dataarr.map(item => {
                if(item['name'] == name){
                  item.update({
                    color: 'yellow'
                });
                }else{
                  item.update({
                    color:item.color
                  });
                }
          })
        }
      }
    },
    exporting:{
      enabled: false
    },
    credits:{
      enabled : false
    },
    title: {
        text: null
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            // allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            events: {
              click: function (event) {
                console.log(event)
                $this.updatepieData2(event.point.name);
                console.log(event.point.name);
              },
              // mouseOut: function (event) {
              //   $this.setTranslation(this, false);
              // },
              // mouseOver: function (event) {
              //   $this.setTranslation(this, true);
              // }
            }
          }
    },
    series: [{
        type: 'pie',
        name: 'Stock Breakdown',
        data: chartData
    }]
    }
    this.pi = new Chart(this.piOptions);
  }
}
