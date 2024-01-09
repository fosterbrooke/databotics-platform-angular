import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { DataService } from '../core/data.service';
import _ from 'lodash';
import { chart } from 'highcharts';
const numeral = require('numeral');
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  totalData: any = [];
  dummyArray : any = [];
  source : any = [];
  productionCost : number = 0;
  enegryConsumption : number = 0;
  pieChartOption:any;
  piechart:any;
  columnChartOption:any;
  columnchart:any;
  lineChartOption:any;
  linechart:any;
  barChartOption:any;
  barchart:any;
  dynamicpie =[];
  dynamiccolumn = [];
  dynamiccolumnOverview = [];
  dynamicLine = [];
  dynamicLineOverview = [];
  dynamicBar = [];
  dynamicBarOverview = [];
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.getChartsData();
  }
  updatepieData(event){
    this.barChart(this.dynamicBar,this.dynamicBarOverview,event);
    this.lineChart(this.dynamicLine,this.dynamicLineOverview,event);
    this.columnChart(this.dynamiccolumn,this.dynamiccolumnOverview,event);
    this.pieCharts(this.dynamicpie,event);

  }
  updatecolumnData(event){
    this.barChart(this.dynamicBar,this.dynamicBarOverview,event);
    this.lineChart(this.dynamicLine,this.dynamicLineOverview,event);
    this.columnChart(this.dynamiccolumn,this.dynamiccolumnOverview,event);
    this.pieCharts(this.dynamicpie,event);
  }
  updatecolumnData2(event){
    this.barChart(this.dynamicBar,this.dynamicBarOverview,event);
    this.lineChart(this.dynamicLine,this.dynamicLineOverview,event);
    this.columnChart(this.dynamiccolumn,this.dynamiccolumnOverview,event);
    this.pieCharts(this.dynamicpie,event);
  }
  getChartsData(){
    this.dataService.getEnegryAPi().subscribe(data => {
      console.log(data);
      this.dummyArray = data;
      this.source = _.uniqBy(data,'source');
      data.map(item =>{
        this.productionCost +=item.plants;
        this.enegryConsumption += item.plants*2;
   })
      this.getMPCChart(data);
      this.getEPCChart(data);
      this.getPieChart(data);
      this.getColumnChart(data);
  }, err => {
      console.log("error", err);
  })
  }
  selectedSource(event){
    var element = event.currentTarget.value;
    let dataArray : any = [];
    for(let obj of this.dummyArray){
      if(obj['source'] == element){
        dataArray.push(obj);
      }
    }
    // this.DummyArray = dataArray;
    var data = dataArray;
    data.map(item =>{
      this.productionCost +=item.plants;
        this.enegryConsumption += item.plants*2;
  })
  this.getMPCChart(data);
      this.getEPCChart(data);
      this.getPieChart(data);
      this.getColumnChart(data);
  }
getPieChart(data){
  var hash = Object.create(null);
  var result = [];

  data.forEach(function (a) {
      var key = ['category'].map(function (k) { return a[k]; }).join('|');
      if (a.plants === undefined || a.plants === null) {
          return;
      }
      if (!hash[key]) {
          hash[key] = { count: 0, data: { name: a.category, y: 0 } };
          result.push(hash[key].data);
      }
      hash[key].data.y += a.plants;
      hash[key].count++;
  });
  this.totalData = result;
  result.map(item => {
      item.y = parseFloat(item.y.toFixed(2));
  })
  this.dynamicpie = result;
  this.pieCharts(result,'')
}
getColumnChart(data){
  var hash = Object.create(null);
      var result = [];
  
      data.forEach(function (a) {
          var key = ['category'].map(function (k) { return a[k]; }).join('|');
          if (a.plants === undefined || a.plants === null) {
              return;
          }
          if (!hash[key]) {
              hash[key] = { count: 0, data: {name:a.category,plants:0,id:0} };
              result.push(hash[key].data);
          }
          hash[key].data.plants += a.plants;
          hash[key].data.state += a.id;
          hash[key].data.definition = a.category;
          hash[key].count++;
      });
      var names = ['plants', 'source'];
      var color = ['#118DFF', '#C25763']
      var Xaxis : any =[];
      var series : any = [];
      var plants : any = [];
      var id : any = [];
      var totalcases : any = [];
      result.map((item,index)=>{
        plants.push(result[index].plants);
        id.push(result[index].id);
          Xaxis.push(result[index].definition);
          totalcases = [plants, id];
        });
        names.map((item,index) => {
          series.push({name: names[index], color: color[index], data: totalcases[index]})
        });
        this.dynamiccolumn = Xaxis;
        this.dynamiccolumnOverview = series;
        this.columnChart(Xaxis,series,'');
}
getEPCChart(data){
  var hash = Object.create(null);
      var result = [];
  
      data.forEach(function (a) {
          var key = ['source'].map(function (k) { return a[k]; }).join('|');
          if (a.plants === undefined || a.plants === null) {
              return;
          }
          if (!hash[key]) {
              hash[key] = { count: 0, data: {name:a.source,plants:0,id:0} };
              result.push(hash[key].data);
          }
          hash[key].data.plants += a.plants;
          hash[key].data.id += a.plants*2;
          hash[key].data.definition = a.source;
          hash[key].count++;
      });
      var names = ['plants'];
      var color = ['#118DFF']
      var Xaxis : any =[];
      var series : any = [];
      var plants : any = [];
      var id : any = [];
      var totalcases : any = [];
      var totalcases2 : any = [];
      result.map((item,index)=>{
        plants.push(result[index].plants);
        id.push(result[index].id);
          Xaxis.push(result[index].definition);
          totalcases = [plants];
          totalcases2 = [id];
        });
        names.map((item,index) => {
          series.push({name: names[index], color: color[index], data: totalcases[index]},{name:'souece', color: '#C25763', data: totalcases2[index]})
        });
        this.dynamicLine = Xaxis;
        this.dynamicLineOverview = series;
        this.lineChart(Xaxis,series,'');
}
getMPCChart(data){
  var hash = Object.create(null);
      var result = [];
  
      data.forEach(function (a) {
          var key = ['source'].map(function (k) { return a[k]; }).join('|');
          if (a.plants === undefined || a.plants === null) {
              return;
          }
          if (!hash[key]) {
              hash[key] = { count: 0, data: {name:a.source,plants:0,id:0,y:0} };
              result.push(hash[key].data);
          }
          hash[key].data.plants += a.plants;
          hash[key].data.id += a.plants*2;
          hash[key].data.y += a.plants*5;
          hash[key].data.definition = a.source;
          hash[key].count++;
      });
      var names = ['plants'];
      var color = ['#118DFF']
      var Xaxis : any =[];
      var series : any = [];
      var plants : any = [];
      var id : any = [];
      var y : any = [];
      var totalcases : any = [];
      var totalcases2 : any = [];
      var totalcases3 : any = [];
      result.map((item,index)=>{
        plants.push(result[index].plants);
        id.push(result[index].id);
        y.push(result[index].y);
          Xaxis.push(result[index].definition);
          totalcases = [plants];
          totalcases2 = [id];
          totalcases3 = [y];
        });
        names.map((item,index) => {
          series.push({name: names[index], color: color[index], data: totalcases[index]},{name:'Category', color:'#000000', data: totalcases2[index]},{name:'Source', color:'#C25763', data: totalcases3[index]})
        });
        this.dynamicBar = Xaxis;
        this.dynamicBarOverview = series;
        this.barChart(Xaxis,series,'');
}
getLineChart(data){

}
getStacking(data){

}
 pieCharts(chartData,name) {
  function get_random_color(){
    return '#' + Math.random().toString(16).substring(2,8);
  }
  chartData.forEach(element => {
    element.color = get_random_color();
  });
   var $this = this;
    this.pieChartOption = {
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
    this.piechart = new Chart(this.pieChartOption);
 }
 columnChart(Xaxis,series,name){
   var $this = this;
  this.columnChartOption = {
    chart: {
      type: 'column',
      backgroundColor: "#ededed",
      events: {
        load: function (e) {
          console.log("e",e);
            var dataarr = e.target.series[0].data;
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
                   $this.updatecolumnData(event.point.category);
                  console.log(event.point.category);
                },
              }
          }
      }
  },
    exporting: false,
    series: series,
      
  }
   this.columnchart=new Chart(this.columnChartOption);
}
lineChart(Xaxis,series,name){
  this.lineChartOption = {
    chart: {
     plotBorderWidth: null,
     plotShadow: false,
      backgroundColor: '#ededed'
  },
  title: {
     text:null
  },
  exporting:{
    enabled: false
  },
  credits: {
    enabled: false
 },
    xAxis: {
      categories: Xaxis,
      crosshair: true
  },
  series: series,
  }
  this.linechart= new Chart(this.lineChartOption);
}
barChart(xAxis,series,name){
  var $this = this
  this.barChartOption = {
    chart: {
      type: 'column',
      backgroundColor: "#ededed",
      events: {
        load: function (e) {
          console.log("e24512",e);
            var dataarr = e.target.series[0].data;
            var dataarr1 = e.target.series[1].data;
            var dataarr2 = e.target.series[2].data;
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
            dataarr2.map(item => {
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
                   $this.updatecolumnData2(event.point.category);
                  console.log(event.point.category);
                },
              }
          }
      }
  },
    exporting: false,
    series: series,
      
  }
 this.barchart = new Chart(this.barChartOption);
}
}
