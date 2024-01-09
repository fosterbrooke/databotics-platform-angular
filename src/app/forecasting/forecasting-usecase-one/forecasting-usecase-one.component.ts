import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import _ from 'lodash';
import { DataService } from 'src/app/core/data.service';
const numeral = require('numeral');

@Component({
  selector: 'app-forecasting-usecase-one',
  templateUrl: './forecasting-usecase-one.component.html',
  styleUrls: ['./forecasting-usecase-one.component.css']
})
export class ForecastingUsecaseOneComponent implements OnInit {
  categoryOptions: any;
  categorychart : any;
  buyerChartOptions : any;
  buychart : any;
  treemap : any;
  treechartOptions : any;
  CategoryArray: any = [];
  totalData : any = [];
  Months : any = [];
  dummyArray : any = [];
  dynamicbuy = [];
 categoryData = [];
 series = [];
 categoryOverview = [];
  cityArray : number = 0;
  chainArray : number = 0;
  buyerArray : number = 0;
  QuarterArray : number = 0;
  constructor(private router: Router, private dataService:DataService) { }
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

  ngOnInit() {
    this.getFullData();
  }
  updateChartData(event){
    this.buyerChart(this.dynamicbuy,event);
    this.categoryChart(this.categoryData,this.categoryOverview,event);
    this.treeMap(this.series);
  }
  updateColumnData(event){
    this.categoryChart(this.categoryData,this.categoryOverview,event);
    this.buyerChart(this.dynamicbuy,event);
    this.treeMap(this.series);
  }
  df(value){
    return numeral(value).format('$0,0.0');
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
      this.cityArray +=item.City.length
      this.chainArray +=item.Chain.length
      this.buyerArray +=item.Buyer.length
      this. QuarterArray +=item.Quarter.length
  })
    console.log(data)
    this.getBuyerCount(data);
    this.getCategoryCount(data);
    this.getAvgCoveredCharges(data);
  }
  selectedMonth(event){
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
      this.cityArray +=item.City.length
      this.chainArray +=item.Chain.length
      this.buyerArray +=item.Buyer.length
      this. QuarterArray +=item.Quarter.length
  })
    console.log(data)
    this.getBuyerCount(data);
    this.getCategoryCount(data);
    this.getAvgCoveredCharges(data);
  }
  getFullData(){
      this.dataService.getFinancedDataTwo().subscribe(data=>{
        console.log(data);
        this.dummyArray = data;
        this.CategoryArray = _.uniqBy(data,'Category');
        this.Months = _.uniqBy(data,'Month').reverse();
        this.getCategoryCount(data);
        this.getAvgCoveredCharges(data);
        this.getBuyerCount(data);
        data.map(item =>{
          this.cityArray +=item.City.length
          this.chainArray +=item.Chain.length
          this.buyerArray +=item.Buyer.length
          this. QuarterArray +=item.Quarter.length
      })

      },err=>{
          console.log("error",err);
      })
  }
  getBuyerCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['Chain'].map(function (k) { return a[k]; }).join('|');
        if (a.Chain === undefined || a.Chain === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: {name:a.Chain,y:0} };
            result.push(hash[key].data);
        }
        hash[key].data.y += a.TotalSales;
        hash[key].count++;
    });
    this.totalData = result;
    console.log("piechart",result)
    result.map(item=>{
    item.y=parseFloat(item.y.toFixed(2));
    })
    this.dynamicbuy = result;
    this.buyerChart(result,'')
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
            hash[key] = { count: 0, data: {name:a.Category,TotalSales:0,TotalSalesLY:0} };
            result.push(hash[key].data);
        }
        hash[key].data.TotalSales += a.TotalSales;
        hash[key].data.TotalSalesLY += a.TotalSalesLY;
        hash[key].data.definition = a.Category;
        hash[key].count++;
    });
    var names = ['TotalSales', 'TotalSalesLY'];
    var color = ['#118DFF', '#C25763']
    var Xaxis : any =[];
    var series : any = [];
    var TotalSales : any = [];
    var TotalSalesly : any = [];
    var totalcases : any = [];
    result.map((item,index)=>{
        TotalSales.push(result[index].TotalSales);
        TotalSalesly.push(result[index].TotalSalesLY);
        Xaxis.push(result[index].definition);
        totalcases = [TotalSales, TotalSalesly];
      });
      names.map((item,index) => {
        series.push({name: names[index], color: color[index], data: totalcases[index]})
      });
      console.log(series);
      this.categoryData = Xaxis;
      this.categoryOverview = series;
      this.categoryChart(Xaxis,series,'');
  }
  getAvgCoveredCharges(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['Buyer'].map(function (k) { return a[k]; }).join('|');
        if (a.TotalSales === undefined || a.TotalSales === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: { name: a.Buyer , value: 0 } };
            result.push(hash[key].data);
        }
        hash[key].data.value += a.TotalSales;
        hash[key].count++;
    });
    Object.keys(hash).forEach(function (k) {
        hash[k].data.value = hash[k].data.value / hash[k].count;
    });
    var series = [];
    result.map((item, index)=> {
        series.push({name: item.name, value: item.value, color: this.treemapColors[index].color, backgroundColor: this.treemapColors[index].backgroundColor});
    });
    this.series = series;
    this.treeMap(series);
  }
  categoryChart(Xaxis,series,name){
    var $this = this;
    var tooltipEnabled = true;
    this.categoryOptions= {
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
  this.categorychart = new Chart(this.categoryOptions);
  }
  buyerChart(chartData,name){
    function get_random_color(){
      return '#' + Math.random().toString(16).substring(2,8);
    }
    chartData.forEach(element => {
      element.color = get_random_color();
    });
    // Create the chart
var $this = this;
var tooltipEnabled = true;
this.buyerChartOptions = {
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
            $this.updateChartData(event.point.name);
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
    name: 'Buyer',
    data: chartData
}]
}
this.buychart = new Chart(this.buyerChartOptions)
  }
  treeMap(series){
      this.treechartOptions = {
          chart:{
            backgroundColor:'#ededed',
            title:null
          },
          exporting:null,
        series: [{
            type: "treemap",
            layoutAlgorithm: 'stripes',
            alternateStartingDirection: true,
            levels: [{
                level: 1,
                layoutAlgorithm: 'sliceAndDice',
                dataLabels: {
                    enabled: true,
                    align: 'left',
                    verticalAlign: 'top',
                    style: {
                        fontSize: '15px',
                        fontWeight: 'bold'
                    }
                }
            }],
            data:series,
       
    }],
    title: {
        text: null,
    },
    credits:{
        enabled:false
    },
}
    this.treemap = new Chart(this.treechartOptions)
  }

}
