import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DataService } from 'src/app/core/data.service';
import _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-helth-care-covid-three',
  templateUrl: './helth-care-covid-three.component.html',
  styleUrls: ['./helth-care-covid-three.component.css']
})
export class HelthCareCovidThreeComponent implements OnInit {

  agency : any;
  agencyOptions : any;

  posting : any;
  postingOptions : any;

  expence : any;
  expensesOptions : any;

  spent : any;
  spentOptions : any;

  totalData : any = [];
  dummyArray : any = [];
  totalsalesArray : any = [];

  dynamicAgency = [];
  spentDynamic = [];
  covidData : any = [];
  dynamicPostingOverview = [];
  dynamicPoting = [];
  dynamicExpence = [];
   dynamicExpenceData  = [];
  dynamicExpenceOverview  = [];
  fromDate : string | Date;
  toDate : string | Date;
  name: any;
  value: any;
  constructor(private DataService:DataService) { }

  ngOnInit() {
    this.getallData();
  }
  updatePieData(event){
      this.agencyChart(this.dynamicAgency,event);
      this.spentchart(this.spentDynamic);
      this.postingchart(this.dynamicPoting,this.dynamicPostingOverview);
      this.expenseschart(this.dynamicExpence,this.dynamicExpenceData,this.dynamicExpenceOverview,event);
  }
  updatecolumnData(event){
    this.agencyChart(this.dynamicAgency,event);
    this.spentchart(this.spentDynamic);
    this.postingchart(this.dynamicPoting,this.dynamicPostingOverview);
    this.expenseschart(this.dynamicExpence,this.dynamicExpenceData,this.dynamicExpenceOverview,event);
  }
  getallData(){
    this.DataService.getCovidsAPi().subscribe(data=>{
        this.covidData = _.uniqBy(data,'agency');
        this.dummyArray = _.uniqBy(data,'agency');
        console.log(data);
        this.getSpentCount(data);
        this.getAgencyCount(data)
        this.getPostingCount(data);
        this.getExpenceCount(data);
    },err=>{
        console.log("error",err);
    })
  }
  fromdate(event){
    this.fromDate =event.target.value;
  }
  endDate(event){
    this.toDate = event.target.value;
    var filterArray = [];
    for(let obj of this.dummyArray){
      if(moment(obj.postingDate).isBetween(this.fromDate, this.toDate, undefined, '[]')){
        filterArray.push(obj);
      }
    }
    this.covidData = filterArray;
    console.log("date",filterArray);
    this.getSpentCount(this.covidData);
    this.getAgencyCount(this.covidData);
    this.getPostingCount(this.covidData);
    this.getExpenceCount(this.covidData);
  }
  selectedState(event){
    var element = event.currentTarget.value;
    if (element == "ALL") {
        this.DataService.getCovidsAPi().subscribe(data => {
            console.log(data);
            this.dummyArray = data;
            console.log(_.meanBy(data, function(o) { return o.TotalSales; }));
            data.map(item =>{
                this.totalsalesArray += item.TotalSales;
            })
            console.log(this.totalsalesArray)
            this.getSpentCount(data);
            this.getAgencyCount(data)
            this.getPostingCount(data);
            this.getExpenceCount(data);
        }, err => {
            console.log("error", err);
        })
    }
    console.log(element);
    let dataArray : any = [];
    for(let obj of this.dummyArray){
      if(obj['agency'] == element){
        dataArray.push(obj);
      }
    }
    // this.DummyArray = dataArray;
    var data = dataArray;
    console.log("data",data)
    this.getSpentCount(data);
    this.getAgencyCount(data)
    this.getPostingCount(data);
    this.getExpenceCount(data);
}
  getSpentCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['amountSpent'].map(function (k) { return a[k]; }).join('|');
        if (a.amountSpent === undefined || a.amountSpent === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: {name:a.amountSpent,y:0} };
            result.push(hash[key].data);
        }
        hash[key].data.y += a.amountSpent;
        hash[key].count++;
    });
    this.totalData = result;
    console.log("spent",result)
    result.map(item=>{
    item.y=parseFloat(item.y.toFixed(2));
    })
    this.spentDynamic = result;
    this.spentchart(result)
  }
  getAgencyCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['agency'].map(function (k) { return a[k]; }).join('|');
        if (a.amountSpent === undefined || a.amountSpent === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: {name:a.agency,y:0} };
            result.push(hash[key].data);
        }
        hash[key].data.y += a.amountSpent;
        hash[key].count++;
    });
    this.totalData = result;
    console.log("piechart",result)
    result.map(item=>{
    item.y=parseFloat(item.y.toFixed(2));
    })
    this.dynamicAgency = result;
    this.agencyChart(result,'')
  }
  getPostingCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['postingDate'].map(function (k) { return a[k]; }).join('|');
        if (a.amountSpent === undefined || a.amountSpent === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: {name:a.postingDate,y:0} };
            result.push(hash[key].data);
        }
        hash[key].data.y += a.amountSpent;
        hash[key].data.definition = a.postingDate;
        hash[key].count++;
    });
        var names = ['expenseType',];
        var color = ['#118DFF',]
        var Xaxis : any =[];
        var Yaxis : any =[];
        var series : any = [];
        var TotalSales : any = [];
        var totalcases : any = [];
        console.log(result)
        result.map((item,index)=>{
            TotalSales.push(result[index].y);
            Xaxis.push(result[index].definition);
            totalcases = [TotalSales];
          });
          names.map((item,index) => {
            series.push({name: names[index], color: color[index], data: totalcases[index]})
          });
          console.log("series",series);
          this.dynamicPoting = Xaxis;
          this.dynamicPostingOverview = series;
          this.postingchart(Xaxis,series);
  }
  getExpenceCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['expenseType','fundDescription'].map(function (k) { return a[k]; }).join('|');
        if (a.amountSpent === undefined || a.amountSpent === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: {x:a.expenseType,y : a.fundDescription,z:0,c:0} };
            result.push(hash[key].data);
        }
        hash[key].data.z += a.amountSpent;
        hash[key].data.c += a.amountSpent;
        hash[key].data.definition = a.expenseType;
        hash[key].data.datanames = a.fundDescription;
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
        Yaxis.push(result[index].datanames);
        totalcases = [TotalSales,TotalSalesly];
      });
      names.map((item,index) => {
        series.push({name: names[index], color: color[index], data: totalcases[index]})
      });
      console.log("expence",series);
      this.dynamicExpence = Xaxis;
      this.dynamicExpenceData = Yaxis;
      this.dynamicExpenceOverview = series;
      this.expenseschart(Xaxis,Yaxis,series,'');
  }
  agencyChart(chartData,name){
    // function get_random_color(){
    //     return '#' + Math.random().toString(16).substring(2,8);
    //   }
    //   chartData.forEach(element => {
    //     element.color = get_random_color();
    //   });
    var $this = this;
    var tooltipEnabled = true;
      this.agencyOptions = {
        chart: {
            type: 'pie',
            backgroundColor:'#ededed',
            events:{
              //   load: function(e){
              //     console.log(e);
              //     var dataarr = e.target.series[0].data;
              //       console.log("dataarr",dataarr);
              //       dataarr.map(item => {
              //         if(item['name'] == name){
              //           item.update({
              //             color: '#000000'
              //         });
              //         }else{
              //           item.update({
              //             color:item.color
              //           });
              //         }
              //   })
              // }
            },
            options3d: {
                enabled: true,
                alpha: 25,
                beta: 0
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
                  $this.updatePieData(event.point.name);
                  console.log(event.point.name);
                },
                // mouseOut: function (event) {
                //   $this.setTranslation(this, false);
                // },
                // mouseOver: function (event) {
                //   $this.setTranslation(this, true);
                // }
              }
              },
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
    this.agency = new Chart(this.agencyOptions);
  }
  setTranslation(p, slice){
    p.sliced = slice;
    if(p.sliced){
        p.graphic.animate(p.slicedTranslation);
    } else {
        p.graphic.animate({
            translateX: 0,
            translateY: 0
        });
    }

  }
  postingchart(Xaxis,chartData){
    var $this = this;
    var tooltipEnabled = true;
    this.postingOptions ={
      chart: {
        type: 'area',
        backgroundColor:'#ededed',
    },
    title: {
        text: null
    },
    credits:{
      enabled: false
    },
    exporting:{
      enabled : false
    },
    legend: {
    },
    xAxis: {
        categories: Xaxis
    },
    yAxis: {
        title: {
            text: null
        }
    },
    plotOptions: {
        area: {
            fillOpacity: 0.5
        }
        },
    series: chartData
    // [{
    //     name: 'John',
    //     data: [0, 1, 4, 4, 5, 2, 3, 7]
    // }]
    }
    this.posting = new Chart(this.postingOptions);
  }
  expenseschart(Xaxis,Yaxis,series,name){
    var $this = this;
    var tooltipEnabled = true;
    this.expensesOptions = {
      chart: {
        type: 'column',
        backgroundColor : '#ededed',
        events: {
            load: function (e) {
              console.log("e",e);
                var dataarr = e.target.series[0].data;
                var dataarr1 = e.target.series[1].data;
                console.log("dataarr",dataarr);
                dataarr.map(item => {
                  if(item['category'] == name){
                    item.update({
                      color: '#000000'
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
                        color: '#000000'
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
        categories:Yaxis
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
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
                     $this.updatecolumnData(event.point.category);
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

  spentchart(chartData){
    var $this = this;
    var tooltipEnabled = true;
    this.spentOptions = {

        chart: {
            type: 'solidgauge',
            backgroundColor:'#ededed',
        },
    
        title: null,
    
        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
    
        exporting: {
            enabled: false
        },
    
        tooltip: {
            enabled: false
        },
    
        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },
    
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            },
        },

credits: {
    enabled: false
},

series: [{
    name: 'Speed',
    data:chartData,
    dataLabels: {
        format:
            '<div style="text-align:center">' +
            '<span style="font-size:25px;opacity:0.9;margin-top:20px">$</span><br/>' +
            '<span style="font-size:25px;margin-top:20px">{y}</span>'+
            '</div>'
    },
    tooltip: {
        valueSuffix: ' km/h'
    }
}],
}
  this.spent = new Chart(this.spentOptions);
}
}
