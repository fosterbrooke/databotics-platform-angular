import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ MapChart} from 'angular-highcharts';
import _ from 'lodash';
import * as moment from 'moment';
import { DataService } from 'src/app/core/data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
const numeral = require('numeral');
const Uganda = require('@highcharts/map-collection/countries/us/us-all.geo.json');
const world = require('@highcharts/map-collection/custom/world.geo.json');
import * as Highcharts from 'highcharts';
import { dateFormat } from 'highcharts';

@Component({
  selector: 'app-health-covid',
  templateUrl: './health-covid.component.html',
  styleUrls: ['./health-covid.component.css']
})
export class HealthCovidComponent implements OnInit {
pieChartOptions:any;
Piechart:any;
lineChartOptions:any;
linechart:any;
areaChartOptions:any;
areachart:any;
columnChartOptions:any;
columnchart:any;
chartname: any;
  mincolor: any;
  maxcolor: any;
  mapoptions: any;
  mapchart: any;
  usData: any = [];
  monthArray: any = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  sortedData: any;
  casesData : boolean = false;
  DeathsData : boolean = false;
  recoveredData : boolean = false;
  totalData : any = [];
  totConfirmed: number = 0;
  totRecovered: number = 0;
  totDeaths: number = 0;
  selected : any;
  showBack: boolean = false;
  stateSelected:any;
  countryMap: boolean = true;
  worldmap:any;
  worldmapoptions: any;
  worldmapSelected: any;
  worldminColor:any;
  worldmaxColor:any;
  worldChartname: any;
  selectedCountry: any = 'us';

  confirmRate: any;
  deathRate: any;
  recoverdRate: any;
  totalConfirmed: number = 0;
  totalRecovered: number = 0;
  totalDeaths: number = 0;

  death:any;
  confirm:any;
  name: any;
  value: any;
  currentDate:any
  constructor(private http: HttpClient, private router: Router,  private dataservice: DataService) { 
    this.getJSON().subscribe(data => {
      data.forEach(function (p) {
        p.code = p.code.toUpperCase();
      });

  });
  }

  ngOnInit() {
    this.selected = 1;
    this.worldmapSelected = 1;
    this.chartname = "Deaths";
    this.worldChartname = "Confirmed Cases";
    this.mincolor =  '#ec7f7e';
    this.maxcolor = '#f54847';
    this.worldminColor =  '#91c1ed';
    this.worldmaxColor = '#118DFF';
    this.casesData = true;
    this.DeathsData = false;
    this.recoveredData = false;
    this.loadUsMap();
    this.getCovidData();
    this.getdate();
  }
  
  getdate(){
    var date = moment(new Date()).format("DD-MM-YYYY")
    this.currentDate=date
    console.log(date);
  }
  df(value){
    return numeral(value).format('$0,0.00');
  }

  cf(value){
    return numeral(value).format('0,0');
  }

  pf(value){
    return numeral(value).format('0.00');
  }
  loadUsMap() {
    this.dataservice.getMapAPi().subscribe(data => {
      console.log("map",data);
      this.usData = data;
      this.filterDeaths(data);
      this.setactiveProject(data);
      this.filterRecoveredCases(data);
      this.sortedData = _.orderBy(data, [(datas) => datas.Year, (user) => (this.monthArray.indexOf((user.Month).toUpperCase()))], ["asc", "asc"]);
      this.filterDeathGraph(this.sortedData);
    }, err => {
      console.log(err);
    });
  }
  getCovidData(){
    this.dataservice.getCovidData().subscribe(data=>{
      console.log("covid",data);
      data.map(item => {
        // item.countries= parseInt(item.countries)
        item.t_cases = parseInt(item.t_cases);
        item.t_deaths = parseInt(item.t_deaths);
      });
      data.map(item => {
          if (item.t_cases != null) {
            this.totConfirmed += item.t_cases;
          }
        })
        data.map(item => {
          if (item.t_deaths != null) {
            this.totDeaths += parseInt(item.t_deaths);
          }
        })
        data.map(item => {
          if (item.t_recoveries/3 != null) {
            this.totRecovered += item.t_recoveries/3;
          }
        })
      this.totalData = _.orderBy(data, ['t_cases'], ['desc']);
      console.log("this.totalData",this.totalData)
    });
    
  }
  filterDeathGraph(data) {
    data.forEach(element => {
        element.id = `${element.Month} ${element.Year}`;
    });
    this.getCasesStatus(data);
    this.getareachart(data);
    this.getlinechart(data);
    this.getpiechart(data);
  }
  setactiveProject(item: any) {
    this.casesData = true;
    this.DeathsData = false;
    this.recoveredData = false;
    this.chartname = 'Confirmed Cases';
    this.mincolor =  '#91c1ed';
    this.maxcolor = '#1185de';
    this.filterConfirmedCases(this.usData);
    this.selected = item;
  }
  filterConfirmedCases(filter){
    var hash = Object.create(null);
    var result = [];

    filter.forEach(function (a) {
        var key = ['StateCode'].map(function (k) { return a[k]; }).join('|');
        if (a.Confirmed === undefined || a.Confirmed === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: { "value": 0 ,"code": a.StateCode } };
            result.push(hash[key].data);
        }
        hash[key].data.value += a.Confirmed;
        hash[key].count++;
    });
    this.loadMapChart(result);
  }
  setactiveProjectDepths(item: any){
    this.casesData = false;
    this.DeathsData = true;
    this.recoveredData = false;
    this.chartname = 'Deaths';
    this.mincolor =  '#ec7f7e';
    this.maxcolor = '#f54847';
    this.filterDeaths(this.usData);
    this.selected = item;
  }
  filterDeaths(filter){
    var hash = Object.create(null);
    var result = [];
  
    filter.forEach(function (a) {
        var key = ['StateCode'].map(function (k) { return a[k]; }).join('|');
        if (a.Deaths === undefined || a.Deaths === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: { "value": 0 ,"code": a.StateCode } };
            result.push(hash[key].data);
        }
        hash[key].data.value += a.Deaths;
        hash[key].count++;
    });
    this.loadMapChart(result);
  }
  setactiveProjectRecovered(item: any) {
    this.casesData = false;
    this.DeathsData = false;
    this.recoveredData = true;
    this.chartname = 'Recovered Cases';
    this.mincolor =  'green';
    this.maxcolor = '#66ee66';
    this.filterRecoveredCases(this.usData);
    this.selected = item;
  }
  filterRecoveredCases(filter){
    var hash = Object.create(null);
    var result = [];
  // console.log("recover",filter);
    filter.forEach(function (a) {
        var key = ['StateCode'].map(function (k) { return a[k]; }).join('|');
        if (a.Casefatalityrate === undefined || a.Casefatalityrate === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: { "value": 0 ,"code": a.StateCode } };
            result.push(hash[key].data);
        }
        hash[key].data.value += a.Casefatalityrate;
        hash[key].count++;
    });
    this.loadMapChart(result);
  // console.log("recover",result);
}
  getpiechart(data){
    console.log(data);
    var hash = Object.create(null);
    var result = [];
    data.forEach(function (a) {
      var key = ['id'].map(function (k) { return a[k]; }).join('|');
      if (a.Confirmed === undefined || a.Confirmed === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.id, y: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.y += parseInt(a.Confirmed);
      hash[key].count++;
    });
    result.map(item => {
      item.y = parseInt(item.y.toFixed(2));
    })
    this.pieChart(result);
  }
  getCasesStatus(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['id'].map(function (k) { return a[k]; }).join('|');
        if (a.Confirmed === undefined || a.Confirmed === null) {
            return;
        }
        if (a.Deaths === undefined || a.Deaths === null) {
          return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: { id: a.id, deaths: 0, confirmed: 0} };
            result.push(hash[key].data);
        }
        hash[key].data.confirmed += a.Confirmed;
        hash[key].data.deaths += a.Deaths;
        hash[key].count++;
    });
    var names = ['Deaths', 'Confirmed Cases'];
    var color = ['#b90302', '#118DFF']
    var series : any = [];
    var xaxis: any = [];
    var confirmed:any = [];
    var deaths:any = [];
    var totalcases : any = [];
    result.map((item,index)=>{
      confirmed.push(result[index].confirmed);
      deaths.push(result[index].deaths);
      xaxis.push(result[index].id);
      totalcases = [deaths];
    });
    names.map((item,index) => {
      series.push({data:deaths})
    });
    this.death = deaths;
    this.confirm = confirmed;
    this.columnChart(xaxis,deaths,confirmed);
  }
  getareachart(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['id'].map(function (k) { return a[k]; }).join('|');
      if (a.Deaths === undefined || a.Deaths === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.id, x: 0, y: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.x += a.Deaths;
      hash[key].data.y += a.Confirmed;
      hash[key].data.definition = a.month;
      hash[key].count++;
    });
    var names = ['Deaths', 'Confirmed Cases'];
    var color = ['#1769a3', '#ff6b1b'];
    var Xaxis: any = [];
    var series: any = [];
    var Deaths: any = [];
    var Confirmed: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      Deaths.push(result[index].x);
      Confirmed.push(result[index].y);
      Xaxis.push(result[index].definition);
      totalcases = [Deaths, Confirmed];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] })
    });
    console.log(series);
    this.areaChart(Xaxis, series);
  }
  getlinechart(data){
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['id'].map(function (k) { return a[k]; }).join('|');
        if (a.Confirmed === undefined || a.Confirmed === null) {
            return;
        }
        if (a.Deaths === undefined || a.Deaths === null) {
          return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: { id: a.id, deaths: 0, confirmed: 0} };
            result.push(hash[key].data);
        }
        hash[key].data.deaths += a.Deaths;
        hash[key].data.confirmed += a.Confirmed;
        hash[key].count++;
    });
    var names = ['Deaths', 'Confirmed Cases'];
    var color = ['#1769a3', '#ff6b1b']
    var series : any = [];
    var xaxis: any = [];
    var confirmed:any = [];
    var deaths:any = [];
    var totalcases : any = [];
    result.map((item,index)=>{
      confirmed.push(result[index].confirmed);
      deaths.push(result[index].deaths);
      xaxis.push(result[index].id);
      totalcases = [deaths,confirmed];
    });
    names.map((item,index) => {
      series.push({name: names[index], color: color[index], data: totalcases[index]})
    });
    this.lineChart(xaxis,series);
  }
  pieChart(series) {
    var $this = this;
    var tooltipEnabled = true;
    this.pieChartOptions = {
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        options3d: {
          enabled: true,
          alpha: 25,
          beta: 0
        },
        backgroundColor: '#ffffff',
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
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
          colors: ['#1769a3', '#d74550', '#03cb44', '#a42cee','#ffac4e', '#1aa8a9','#754ec3','#ff6b1b','#118dff','#6c007a','#e044a7','#EC2500'],
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 45,
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          },
          // events: {
          //   click: function (event) {
          //     let sliced: boolean;
          //     sliced = event.point.options.sliced
          //     console.log(sliced)
          //     $this.updatebuyerChartData(event.point.name,sliced);
          //   },
          // }
        }
      },
      series: [
        {
          type: "pie",
          name: "Browser share",
          innerSize: '50%',
          data: series,
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
        }
      ]
    }
    this.Piechart = new Chart(this.pieChartOptions);
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
  lineChart(xaxis,series) {
    var $this = this;
    var tooltipEnabled = true;
    this.lineChartOptions = {
      chart: {
        type: 'line',
        backgroundColor: ' #ffffff',
        // height:370,
      },
      title: {
        text: null,

      },
      xAxis: {
        categories:xaxis
      },
      yAxis: {
        title: {
          text: null
        }
      },
      exporting: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      tooltip: {
        enabled: true,
      },
      plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },
      series:series
      //  [{
      //   data:series
      // }]
      // [{
      //     name: 'May-2020',
      //     color:  '#1769a3',
      //     data: [49.9, 71.5, 106.4, 129.2,42.4, 33.2, 34.5, 39.7,48.9, 38.8, 39.3, 41.4]
  
      //   }, {
      //     name: 'Apr-2020',
      //     color: '#ff6b1b',
      //     data: [48.9, 38.8, 39.3, 41.4,49.9, 71.5, 106.4, 129.2,42.4, 33.2, 34.5, 39.7]
  
      //   }, {
      //     name: 'Mar-2020',
      //     color: '#03cb44',
      //     data: [42.4, 33.2, 34.5, 39.7,48.9, 38.8, 39.3, 41.4,49.9, 71.5, 106.4, 129.2]
  
      //   }]

    }
    this.linechart = new Chart(this.lineChartOptions);
  }
  areaChart(xaxis,series){
    var $this = this;
    var tooltipEnabled = true;
    this.areaChartOptions = {
      chart: {
        type: 'area',
        backgroundColor: ' #ffffff',
        // height:370,
      },
      title: {
        text: null,

      },
      xAxis: {
        categories:xaxis
      },
      yAxis: {
        title: {
          text: null
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      tooltip: {
        enabled: true,
      },
      plotOptions: {
        area: {
            pointStart: 1940,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
      exporting: false,
      series: series
      // [{
      //   data:series
      // }]
      // [{
      //     name: 'May-2020',
      //     color:  '#1769a3',
      //     data: [49.9, 71.5, 106.4, 129.2,42.4, 33.2, 34.5, 39.7,48.9, 38.8, 39.3, 41.4]
  
      //   }, {
      //     name: 'Apr-2020',
      //     color: '#ff6b1b',
      //     data: [48.9, 38.8, 39.3, 41.4,49.9, 71.5, 106.4, 129.2,42.4, 33.2, 34.5, 39.7]
  
      //   }]

    }
    this.areachart = new Chart(this.areaChartOptions);
  }
  columnChart(xaxis,deaths,confirmed){
    var $this = this;
    var tooltipEnabled = true;
    this.columnChartOptions = {
      chart: {
        zoomType: 'xy',
        backgroundColor: ' #ffffff',
        // height:370,
      },
      title: {
        text: null,

      },
      xAxis: {
        categories: xaxis,
        crosshair: true
      },
      yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}°C',
        },
        title: {
            text: 'Temperature',
        }
    }, { // Secondary yAxis
        title: {
            text: 'Rainfall',
        },
        labels: {
            format: '{value} mm',
        },
        opposite: true
    }],
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      tooltip: {
        enabled: true,
      },
      exporting: false,
      series:
       [{
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        data: deaths,
        tooltip: {
            valueSuffix: ' mm'
        }

    }, {
        name: 'Temperature',
        type: 'spline',
        data: confirmed,
        tooltip: {
            valueSuffix: '°C'
        }
    }]
    }
    this.columnchart = new Chart(this.columnChartOptions);
  }
  loadMapChart(result) {
    var $this=this;
    this.mapoptions={

      chart: {
          map: Uganda,
          borderWidth: 1,
          backgroundColor:'#ffffff'
      },

      title: {
          text: this.chartname
      },

      exporting: {
          sourceWidth: 600,
          sourceHeight: 500,
          enabled:false
      },
      credits:{
        enabled: false
      },

      legend: {
          enabled: false,
          layout: 'horizontal',
          borderWidth: 0,
          backgroundColor: 'rgba(255,255,255,0.85)',
          floating: true,
          verticalAlign: 'top',
          y: 25
      },

      mapNavigation: {
          enabled: true
      },

      colorAxis: {
          // min: 1,
          // type: 'logarithmic',
          minColor: this.mincolor,
          maxColor: this.maxcolor,
          // stops: [
          //     [0, '#EFEFFF'],
          //     [0.67, '#4444FF'],
          //     [1, '#000022']
          // ]
      },
      plotOptions: {
        series: {
            events: {
                click: function (e) {
                    var text =  '<b>' + this.name + '</b>'+
                            '<br><b>State:</b> ' + e.point.name +
                            '<br><b>Count:</b> ' + e.point.value;
                    // $this.getClickedData(e.point.code);
                    if (!this.chart.clickLabel) {
                      this.chart.clickLabel = this.chart.renderer.label(text, 0, 250)
                          .css({
                              width: '200px'
                          })
                          .add();
                    } else {
                        this.chart.clickLabel.attr({
                            text: text
                        });
                    }
                }
            }
        }
      },

      series: [{
          animation: {
              duration: 1000
          },
          data: result,
          joinBy: ['postal-code', 'code'],
          dataLabels: {
              enabled: true,
              color: '#FFFFFF',
              format: '{point.name}'
          },
          name: this.chartname,
          tooltip: {
              pointFormat: '{point.name}: {point.value}'
          }
      }]
  };
    this.mapchart= new MapChart(this.mapoptions);
  }
  public getJSON(): Observable<any> {
    return this.http.get("https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/us-population-density.json");
}
isActive(item: any) {
  return this.selected === item;
}
isWorldActive(item) {
  console.log("item",item)
  return this.worldmapSelected === item;
}

setCasesWorld(item, text){
  this.worldmapSelected = item;
  var data = [];
  if(text == 'Confirm'){
    this.worldChartname = 'Confirmed Cases';
    this.worldminColor =  '#91c1ed';
    this.worldmaxColor = '#1185de';
    this.totalData.map(item => {
      data.push({"hc-key":item.geoId.toLowerCase(), "value": item.t_cases});
  });
  }
  if(text == 'Death'){
    this.worldChartname = 'Deaths';
    this.worldminColor =  '#ec7f7e';
    this.worldmaxColor = '#f54847';
    this.totalData.map(item => {
      data.push({"hc-key":item.geoId.toLowerCase(), "value": item.t_deaths});
  });
  }
  if(text == 'Recovered'){
    this.worldChartname = 'Recovered Cases';
    this.worldminColor =  'green';
    this.worldmaxColor = '#66ee66';
    this.totalData.map(item => {
      data.push({"hc-key":item.geoId.toLowerCase(), "value": item.t_recoveries});
  });
  }
  this.loadWorldMap(data, this.selectedCountry);
}

openWorldMap(item){
  console.log(item);
  this.selectedCountry = item.geoId.toLowerCase();
  if(item.geoId == "US") {
    this.countryMap = true;
  }else{
    // this.getCasesStatus(this.sortedData);
    this.countryMap = false;
    var data = [];
    this.totalData.map(item => {
        data.push({"hc-key":item.geoId.toLowerCase(), "value": item.t_deaths});
    });
    this.loadWorldMap(data,this.selectedCountry);
  }
}

loadWorldMap(data, selectedcountry) {
    this.worldmapoptions = {
      chart: {
        map: world,
        borderWidth: 1,
        backgroundColor:'#ffffff',
        events: {
          load: function (e) {
              var dataarr = e.target.series[0].points;
              dataarr.map(item => {
                if(item['hc-key'] == selectedcountry){
                  item.update({
                    color: '#20283d'
                });
                }
              });
          }
      }
      },

      title : {
          text : this.worldChartname
      },

      mapNavigation: {
          enabled: true,
          buttonOptions: {
              verticalAlign: 'bottom'
          }
      },
      credits: {
        enabled: false
      },

      exporting: {
        enabled:false
      },
      legend: {
        enabled: false
      },

      colorAxis: {
          min: 0,
          minColor: this.worldminColor,
          maxColor: this.worldmaxColor,
      },

      series : [{
          data : data,
          joinBy: 'hc-key',
          name: this.worldChartname,
          states: {
              hover: {
                  color: this.worldmaxColor
              }
          },
          dataLabels: {
              enabled: true,
              format: '{point.name}'
          }
      }]
  };

  this.worldmap = new MapChart(this.worldmapoptions);
}
}