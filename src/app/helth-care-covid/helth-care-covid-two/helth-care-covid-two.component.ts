import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DataService } from 'src/app/core/data.service';
import _ from 'lodash';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';


@Component({
  selector: 'app-helth-care-covid-two',
  templateUrl: './helth-care-covid-two.component.html',
  styleUrls: ['./helth-care-covid-two.component.css']
})
export class HelthCareCovidTwoComponent implements OnInit {
  header=["ExpenseType","AgencyName","CostCenter","FiscalYear","FundDescription","Grant","Order","Posting","ExpenseDescription","AmountSpent"];
  FunctionalAreas=["All","Human resource management","MARKETING/PROMOTION","PRODUCTION"]
  AllAgencies=["All","Human resource management","MARKETING/PROMOTION","PRODUCTION"]
  amountFuncOptions:any;
  amountSpentFunc:any;
  ExpenseDescriptionOptions:any;
  ExpenseType:any;
  amountExpenseOptions:any;
  ExpenseDescription:any;
  totalData : any = [];
  mainData : any = [];
  DummyArray : any = [];
  Agency : any = [];
  Area : any = [];
  dynamicExpence = [];
  dynamicExpenceDescOverview = [];
  dynamicExpenceDesc = [];
  areaDynamic = [];
  areaDynamicOverview = [];
  dynamicExpenceData = [];
  dynamicExpenceOverview = [];
  expence : any;
  expensesOptions : any;
  fromDate : string | Date;
  toDate : string | Date;
  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;
  treemapColors: any = [{
    color: "#EC2500",
    backgroundColor: "#EC2500",
  },
  {
    color: "#d74550",
    backgroundColor: "#EC2500",
  },
  {
    color: "#118dff",
    backgroundColor: "#EC2500",
  },
  {
    color: "#6c007a",
    backgroundColor: "#EC2500",
  },
  {
    color: "#e044a7",
    backgroundColor: "#EC2500",
  },
  {
    color: "#754ec3",
    backgroundColor: "#EC2500",
  },
  {
    color: "#13239d",
    backgroundColor: "#EC2500",
  },{
    color: "#e56c37",
    backgroundColor: "#EC2500",
  }];
  name: any;
  value: any;
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.getFullData();
  }
  // updatePieData(event){
  //   this.ExpenseTypeChart(this.dynamicExpence,event);
  //   this.ExpenceDescriptionChart(this.dynamicExpenceDesc,this.dynamicExpenceDescOverview,event);
  //   this.expenseschart(this.dynamicExpence,this.dynamicExpenceOverview,event);
  // }
  updatecolumnData(event){
    this.ExpenceDescriptionChart(this.dynamicExpenceDesc,this.dynamicExpenceDescOverview,event);
    this.expenseschart(this.dynamicExpence,this.dynamicExpenceOverview,event);
    // this.ExpenseTypeChart(this.dynamicExpence,event);
  }
  updatecolumnData2(event){
    this.ExpenceDescriptionChart(this.dynamicExpenceDesc,this.dynamicExpenceDescOverview,event);
    this.expenseschart(this.dynamicExpence,this.dynamicExpenceOverview,event);
    // this.ExpenseTypeChart(this.dynamicExpence,event);
  }
  fromdate(event){
    this.fromDate =event.target.value;
  }
  getExpenceCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['functionalArea'].map(function (k) { return a[k]; }).join('|');
        if (a.amountSpent === undefined || a.amountSpent === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: {x:a.expenseType,y : a.functionalArea,z:0,c:0} };
            result.push(hash[key].data);
        }
        hash[key].data.z += a.amountSpent;
        hash[key].data.c += a.amountSpent;
        hash[key].data.definition = a.functionalArea;
        // hash[key].data.datanames = a.fundDescription;
        hash[key].count++;
    });
    var names = ['expenseType','fundDescription'];
    var color = ['#118DFF','#C25763']
    var Xaxis : any =[];
    var Yaxis : any =[];
    var series : any = [];
    var TotalSales : any = [];
    var TotalSalesly : any = [];
    var totalcases : any = [];
    result.map((item,index)=>{
        TotalSales.push(result[index].z);
        TotalSalesly.push(result[index].c);
        Xaxis.push(result[index].definition);
        // Yaxis.push(result[index].datanames);
        totalcases = [TotalSales,TotalSalesly];
      });
      names.map((item,index) => {
        series.push({name: names[index], color: color[index], data: totalcases[index]})
      });
      console.log("expence",series);
      this.dynamicExpence = Xaxis;
      this.dynamicExpenceOverview = series;
      this.expenseschart(Xaxis,series,'');
  }
  endDate(event){
    this.toDate = event.target.value;
    var filterArray = [];
    for(let obj of this.DummyArray){
      if(moment(obj.postingDate).isBetween(this.fromDate, this.toDate, undefined, '[]')){
        filterArray.push(obj);
      }
    }
    this.mainData = filterArray;
    this.getExpenceTypetCount(this.mainData);
    this.getExpenceDescriptionCount(this.mainData);
    this.getExpenceCount(this.mainData);
  }
  selectedAgency(event){
    var element = event.currentTarget.value;
    var filter = `&ProviderState=${element}`;
    if (element == "ALL") {
      this.dataService.getCovidsAPi().subscribe(data=>{
        this.Agency = _.uniqBy(data,'agency');
        this.Area = _.uniqBy(data,'functionalArea');
        this.mainData = data;
        this.DummyArray = data;
        this.getExpenceTypetCount(data);
        this.getExpenceDescriptionCount(data);
        this.getExpenceCount(data);
      },err=>{
        console.log("error",err);
      })
    }else{
      let dataArray : any = [];
      for(let obj of this.DummyArray){
        if(obj['agency'] == element){
          dataArray.push(obj);
        }
      }
      var data = dataArray;
      this.getExpenceTypetCount(data);
      this.getExpenceDescriptionCount(data);
      this.getExpenceCount(data);
      this.mainData = data;
    }
  }
  selectedArea(event){
    var element = event.currentTarget.value;
    var filter = `&ProviderState=${element}`;
    if (element == "ALL") {
      this.dataService.getCovidsAPi().subscribe(data=>{
        this.Agency = _.uniqBy(data,'agency');
        this.Area = _.uniqBy(data,'functionalArea');
        this.mainData = data;
        this.DummyArray = data;
        this.getExpenceTypetCount(data);
        this.getExpenceDescriptionCount(data);
        this.getExpenceCount(data);
      },err=>{
        console.log("error",err);
      })
    }else{
      let dataArray : any = [];
      for(let obj of this.DummyArray){
        if(obj['functionalArea'] == element){
          dataArray.push(obj);
        }
      }
      var data = dataArray;
      this.getExpenceTypetCount(data);
      this.getExpenceDescriptionCount(data);
      this.getExpenceCount(data);
      this.mainData = data;
    }
  }
  getFullData(){
    this.dataService.getCovidsAPi().subscribe(data=>{
      this.Agency = _.uniqBy(data,'agency');
      this.Area = _.uniqBy(data,'functionalArea');
      this.mainData = data;
      this.DummyArray = data;
      this.getExpenceTypetCount(data);
      this.getExpenceDescriptionCount(data);
      this.getExpenceCount(data);
    },err=>{
      console.log("error",err);
    })
  }
  getExpenceTypetCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['expenseType'].map(function (k) { return a[k]; }).join('|');
        if (a.amountSpent === undefined || a.amountSpent === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: {name:a.expenseType,y:0} };
            result.push(hash[key].data);
        }
        hash[key].data.y += a.amountSpent;
        hash[key].count++;
    });
    this.totalData = result;
    result.map(item=>{
    item.y=parseFloat(item.y.toFixed(2));
    })
    this.dynamicExpence = result;
    this.ExpenseTypeChart(result,'')
  }
  getExpenceDescriptionCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['expenseDescription'].map(function (k) { return a[k]; }).join('|');
        if (a.amountSpent === undefined || a.amountSpent === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: {name:a.expenseDescription,y:0} };
            result.push(hash[key].data);
        }
        hash[key].data.y += a.amountSpent;
        hash[key].data.definition = a.expenseDescription;
        hash[key].count++;
    });
        var names = ['expenseDescription',];
       
        var Xaxis : any =[];
        var Yaxis : any =[];
        var series : any = [];
        var TotalSales : any = [];
        var totalcases : any = [];
        result.map((item,index)=>{
            TotalSales.push(result[index].definition,result[index].y);
            Xaxis.push(result[index].definition);
            totalcases = [TotalSales];
          });
          this.dynamicExpenceDesc = Xaxis;
          this.dynamicExpenceDescOverview = result;
          this.ExpenceDescriptionChart(Xaxis,result,'');
  }
  // getDisChargeCoveredCharges(data) {
  //   var hash = Object.create(null);
  //   var result = [];
  //     data.forEach(function (a) {
  //       var key = ['functionalArea'].map(function (k) { return a[k]; }).join('|');
  //       if (a.amountSpent === undefined || a.amountSpent === null) {
  //           return;
  //       }
  //       if (!hash[key]) {
  //           hash[key] = { count: 0, data: {name:a.functionalArea,y:0,z:0} };
  //           result.push(hash[key].data);
  //       }
  //       hash[key].data.y += a.amountSpent;
  //       hash[key].data.z += a.amountSpent;
  //       hash[key].data.definition = a.functionalArea;
  //       hash[key].count++;
  //   });
  //   var names = ['expenseType','FunctionalArea'];
  //   var color = ['#118DFF','#C25763']
  //   var Xaxis : any =[];
  //   var Yaxis : any =[];
  //   var series : any = [];
  //   var TotalSales : any = [];
  //   var TotalSalesly : any = [];
  //   var totalcases : any = [];
  //   result.map((item,index)=>{
  //       TotalSales.push(result[index].y);
  //       TotalSalesly.push(result[index].z);
  //       Xaxis.push(result[index].definition);
  //       // Yaxis.push(result[index].datanames);
  //       totalcases = [TotalSales,TotalSalesly];
  //     });
  //     names.map((item,index) => {
  //       series.push({name: names[index], color: color[index], data: totalcases[index]})
  //     });
  //     console.log("tree", series)
  //     this.areaDynamic = Xaxis;
  //     this.areaDynamicOverview = series;
  //     this.AreaDescriptionChart(series,Xaxis);
  // }
ExpenseTypeChart(chartData,name):any{
  var $this = this;
  var tooltipEnabled = true;
  this.amountExpenseOptions ={
    chart: {
      type: 'pie',
      backgroundColor:'#ededed',
      options3d: {
          enabled: true,
          alpha: 25,
          beta: 0
      },
      events:{
        load: function(e){
          var dataarr = e.target.series[0].data;
            dataarr.map(item => {
              if(item['name'] == name){
                item.update({
                  color: '#000000'
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
        colors: ['#118DFF', '#ff6b1b'],
        allowPointSelect: true,
        cursor: 'pointer',
          depth: 35,
          dataLabels: {
              enabled: true,
              format: '{point.name}'
          },
          series: {
            point: {
                // events: {
                //   click: function (event) {
                //     console.log(event)
                //      $this.updatePieData(event.point.name);
                //     console.log(event.point.category);
                //   },
                // }
            }
        }
        }
  },
  series: [{
      type: 'pie',
      name: 'Stock Breakdown',
      data: chartData,
      point: {
        events: {
          mouseOver: function (event) {
            $this.name = event.target.name;
            $this.value = event.target.y;
            $this.setTranslation(this, true);
          },
          mouseOut: function () {
            $this.setTranslation(this, false);
          },
        }
      }
  }]
  }
this.ExpenseType = new Chart(this.amountExpenseOptions);
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
 expenseschart(Xaxis,series,name){
  var $this = this;
  var tooltipEnabled = true;
  this.expensesOptions = {
    chart: {
      type: 'column',
      backgroundColor : '#ededed',
      events: {
          // load: function (e) {
          //   console.log("e",e);
          //     var dataarr = e.target.series[0].data;
          //     var dataarr1 = e.target.series[1].data;
          //     console.log("dataarr",dataarr);
          //     dataarr.map(item => {
          //       if(item['category'] == name){
          //         item.update({
          //           color: '#000000'
          //       });
          //       }else{
          //         item.update({
          //           color:null
          //         });
          //       }
          //     });
          //     dataarr1.map(item => {
          //         if(item['category'] == name){
          //           item.update({
          //             color: '#000000'
          //         });
          //         }else{
          //           item.update({
          //             color:null
          //           });
          //         }
          //       });
          // }
      }
  },
  title: {
      text: null
  },
  credits : {
    enabled : false
  },
  exporting : {
    enabled : false
  },
  xAxis: {
      categories: Xaxis
  },
  yAxis: {
      categories:null
  },
  legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false,
      enabled: false
  },
  tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
  },
  plotOptions: {
      column: {
          stacking: 'normal',
          dataLabels: {
              enabled: true
          }
      },
      series: {
          point: {
              events: {
                click: function (event) {
                  console.log(event)
                   $this.updatecolumnData2(event.point.name);
                  console.log(event.point.category);
                },
              }
          }
      }
  },
  series:series,
  //  [{
  //     name: 'John',
  //     data: [5, 3, 4, 7, 2]
  // }, {
  //     name: 'Jane',
  //     data: [2, 2, 3, 2, 1]
  // }, {
  //     name: 'Joe',
  //     data: [3, 4, 4, 2, 5]
  // }]
  }
  this.expence = new Chart(this.expensesOptions);
}

  ExpenceDescriptionChart(Xaxis,chartData,name):any{
    var $this = this;
    var tooltipEnabled = true;
    this.ExpenseDescriptionOptions= {
      chart: {
        type: 'column',
        backgroundColor:'#ededed',
        events:{
        //   load: function(e){
        //     var dataarr = e.target.series[0].data;
        //       dataarr.map(item => {
        //         if(item['name'] == name){
        //           item.update({
        //             color: '#000000'
        //         });
        //         }else{
        //           item.update({
        //             color:null
        //           });
        //         }
        //   })
        // }
      }
      },
      title: {
        text: null
      },
      
      xAxis: {
        categories: Xaxis
    },
      yAxis: {
        min: 0,
        title: {
          text: null
        }
      },
      credits:{
        enabled : false
      },
      exporting:{
        enabled:false
      },
      plotOptions: {
        series: {
            point: {
                events: {
                  click: function (event) {
                     $this.updatecolumnData(event.point.category);
                  },
                }
            }
        }
    },
      legend: {
        enabled: false
      },

      // tooltip: {
      //   pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
      // },
      series: [{
        name: 'Description',
        data: chartData,
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }]}
    this.ExpenseDescription = new Chart(this.ExpenseDescriptionOptions);
  }
  tabledata=[
  
    {
      "ExpenseType":"Personel",
      "AgencyName":"Fire ems department",
      "CostCenter":"Not Assigned",
      "FiscalYear":"2020",
      "FundDescription":"general",
      "Grant":"not Relevent",
      "Order":"600629",
      "Posting":"Sat Apr 11 2020 00:00:00 GMT+0530 (India Standard Time)",
      "ExpenseDescription":"Part Time Temporary Limit",
      "AmountSpent":"$1500"
    },
    {
      "ExpenseType":"Personel",
      "AgencyName":"Fire ems department",
      "CostCenter":"Not Assigned",
      "FiscalYear":"2020",
      "FundDescription":"general",
      "Grant":"not Relevent",
      "Order":"600629",
      "Posting":"Sat Apr 11 2020 00:00:00 GMT+0530 (India Standard Time)",
      "ExpenseDescription":"Part Time Temporary Limit",
      "AmountSpent":"$1500"
    },

    {
      "ExpenseType":"Personel",
      "AgencyName":"Fire ems department",
      "CostCenter":"Not Assigned",
      "FiscalYear":"2020",
      "FundDescription":"general",
      "Grant":"not Relevent",
      "Order":"600629",
      "Posting":"Sat Apr 11 2020 00:00:00 GMT+0530 (India Standard Time)",
      "ExpenseDescription":"Part Time Temporary Limit",
      "AmountSpent":"$1500"
    },{
      "ExpenseType":"Personel",
      "AgencyName":"Fire ems department",
      "CostCenter":"Not Assigned",
      "FiscalYear":"2020",
      "FundDescription":"general",
      "Grant":"not Relevent",
      "Order":"600629",
      "Posting":"Sat Apr 11 2020 00:00:00 GMT+0530 (India Standard Time)",
      "ExpenseDescription":"Part Time Temporary Limit",
      "AmountSpent":"$1500"
    },{
      "ExpenseType":"Personel",
      "AgencyName":"Fire ems department",
      "CostCenter":"Not Assigned",
      "FiscalYear":"2020",
      "FundDescription":"general",
      "Grant":"not Relevent",
      "Order":"600629",
      "Posting":"Sat Apr 11 2020 00:00:00 GMT+0530 (India Standard Time)",
      "ExpenseDescription":"Part Time Temporary Limit",
      "AmountSpent":"$1500"
    },{
      "ExpenseType":"Personel",
      "AgencyName":"Fire ems department",
      "CostCenter":"Not Assigned",
      "FiscalYear":"2020",
      "FundDescription":"general",
      "Grant":"not Relevent",
      "Order":"600629",
      "Posting":"Sat Apr 11 2020 00:00:00 GMT+0530 (India Standard Time)",
      "ExpenseDescription":"Part Time Temporary Limit",
      "AmountSpent":"$1500"
    },{
      "ExpenseType":"Personel",
      "AgencyName":"Fire ems department",
      "CostCenter":"Not Assigned",
      "FiscalYear":"2020",
      "FundDescription":"general",
      "Grant":"not Relevent",
      "Order":"600629",
      "Posting":"Sat Apr 11 2020 00:00:00 GMT+0530 (India Standard Time)",
      "ExpenseDescription":"Part Time Temporary Limit",
      "AmountSpent":"$1500"
    }

  ];
}
