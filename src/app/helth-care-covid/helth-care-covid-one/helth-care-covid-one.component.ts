import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ MapChart} from 'angular-highcharts';
import _ from 'lodash';
import * as moment from 'moment';
import { DataService } from 'src/app/core/data.service';
const numeral = require('numeral');
const Uganda = require('@highcharts/map-collection/countries/us/us-all.geo.json');
const world = require('@highcharts/map-collection/custom/world.geo.json');

@Component({
  selector: 'app-helth-care-covid-one',
  templateUrl: './helth-care-covid-one.component.html',
  styleUrls: ['./helth-care-covid-one.component.css']
})
export class HelthCareCovidOneComponent implements OnInit {
  selected : any;
  healthAnalysisDeaths: any;
  statusChartOptions:any;
  mapChart:any;
  statusChart: Chart;
  EpChartOptions:any;
  EpChart:any;
  EpChartDeaths:any;
  covidData : any= [];
  totalData : any = [];
  mapchart : any;
  mapoptions: any
  casesData : boolean = false;
  DeathsData : boolean = false;
  usData: any = [];
  chartname: any;
  mincolor: any;
  maxcolor: any;
  monthArray: any = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  sortedData: any;
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

  totalConfirmed: number = 0;
  totalRecovered: number = 0;
  totalDeaths: number = 0;

  totConfirmed: number = 0;
  totRecovered: number = 0;
  totDeaths: number = 0;

  fatalityRate: any;
  recoverdRate: any;

  constructor(private http: HttpClient, private dataservice:DataService) {
    this.getJSON().subscribe(data => {
        data.forEach(function (p) {
          p.code = p.code.toUpperCase();
        });

    });
}

sidenavChanged(){

}

  ngOnInit() {
    this.selected = 1;
    this.worldmapSelected = 1;
    this.chartname = "Deaths";
    this.worldChartname = "Confirmed Cases";
    this.mincolor =  '#f0b6bd';
    this.maxcolor = '#b90302';
    this.worldminColor =  '#91c1ed';
    this.worldmaxColor = '#118DFF';
    this.casesData = false;
    this.DeathsData = true;
    this.getCovidData();
    this.loadUsMap();
    this.getTotalCovidData();
  }

  getTotalCovidData(){
    var  dateFrom = moment().subtract(2,'d').format('YYYY-MM-DD');
    console.log("data",dateFrom);
    this.getFilterCovidData(dateFrom);
  }

  getFilterCovidData(date) {
    // var date = moment().format('YYYY-MM-DD');
    // var date = '2020-05-25';
    console.log(date);
    var datefilter = `&date=${date}`
    this.dataservice.getTotalCData(datefilter).subscribe(data => {
      if(date.length != 0){
        data.map(item => {
          this.totalConfirmed += item.cases;
          this.totalDeaths += item.deaths;
          this.totalRecovered += (item.cases-item.deaths)
        });
        this.totalRecovered = this.totalRecovered/3;
        console.log(this.totalConfirmed,this.totalDeaths,this.totalRecovered);
        this.getRatePercentages(this.totalDeaths,this.totalRecovered,this.totalConfirmed);
      }
    });
  }

  loadUsMap() {
    this.dataservice.getMapAPi().subscribe(data => {
      this.usData = data;
      this.filterDeaths(data);
      this.setactiveProject(data);
      this.sortedData = _.orderBy(data, [(datas) => datas.Year, (user) => (this.monthArray.indexOf((user.Month).toUpperCase()))], ["asc", "asc"]);
      this.filterDeathGraph(this.sortedData);
    }, err => {
      console.log(err);
    });
  }

  filterDeathGraph(data) {
    data.forEach(element => {
        element.id = `${element.Month} ${element.Year}`;
    });
    this.getCasesStatus(data);
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

  getCovidData(){
    this.dataservice.getCovidData().subscribe(data=>{
      data.map(item => {
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

  getRatePercentages(deaths,recover,confirm) {
    var fatality = (deaths/confirm);
    var recv = (recover/confirm);
    console.log(fatality+""+recv);
    this.fatalityRate = fatality*100;
    this.recoverdRate = recv*100;
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
    var names = ['Deaths', 'Confirmed Cases', 'Recovered'];
    var color = ['#b90302', '#118DFF', '#81bc06']
    var series : any = [];
    var xaxis: any = [];
    var confirmed:any = [];
    var deaths:any = [];
    var recoverd: any = [];
    var totalcases : any = [];
    result.map((item,index)=>{
      confirmed.push(result[index].confirmed);
      deaths.push(result[index].deaths);
      recoverd.push(Math.round((result[index].confirmed - result[index].deaths)/3));
      xaxis.push(result[index].id);
      totalcases = [deaths, confirmed, recoverd];
    });
    names.map((item,index) => {
      series.push({name: names[index], color: color[index], data: totalcases[index]})
    });
    this.loadEpchart(xaxis,series);
  }

  loadEpdeaths(xaxis,chartseries){
    this.EpChartOptions = {
      chart: {
        type: 'column',
        backgroundColor: '#f8f8f9',

      },
      title: {
        text: null,
       },
       credits:{
        enabled: false
       },
       exporting: {
        enabled:false
      },
      xAxis: {
        categories: xaxis,

        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Daily cases'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: chartseries
    }
    this.EpChartDeaths = new Chart(this.EpChartOptions);
  }
  loadEpchart(xcat,data) {
    var $this = this;
    this.EpChartOptions = {
      chart: {
          type: 'column',
          backgroundColor: '#f8f8f9',
      },
      title: {
          text: ''
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: xcat,
          crosshair: true
      },
      credits: {
        enabled: false
      },
      exporting:{
        enabled:false
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Total Cases'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              cursor: 'pointer',
              pointPadding: 0.2,
              borderWidth: 0,
              events: {
                click: function (e) {
                    $this.showBack = true;
                    $this.showDailyData(e.point.category);
                }
            }
          },
      },
      series: data
  };
    this.EpChart = new Chart(this.EpChartOptions);
  }
  setactiveProject(item: any) {
    this.casesData = true;
    this.DeathsData = false;
    this.chartname = 'Confirmed Cases';
    this.mincolor =  '#91c1ed';
    this.maxcolor = '#118DFF';
    this.filterConfirmedCases(this.usData);
    // this.healthAnalysis = true;
    // this.healthAnalysisDeaths = false;
    this.selected = item;
  }
  isActive(item: any) {
    return this.selected === item;
  }
  setactiveProjectDepths(item: any){
    this.casesData = false;
    this.DeathsData = true;
    this.chartname = 'Deaths';
    this.mincolor =  '#ec3635';
    this.maxcolor = '#b90302';
    this.filterDeaths(this.usData);
    // this.healthAnalysisDeaths = true;
    // this.healthAnalysis = false;
    this.selected = item;
  }

  loadMapChart(result) {
    var $this=this;
    this.mapoptions={

      chart: {
          map: Uganda,
          borderWidth: 1,
          backgroundColor:'#f8f8f9'
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
                    $this.getClickedData(e.point.code);
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

  getClickedData(code) {
    var statedata = _.filter(this.sortedData, {'StateCode': code});
    this.stateSelected = code;
    this.getCasesStatus(statedata);
    this.getDeathsStatus(statedata);
  }

  goBackToChart() {
    this.showBack = false;
    this.getCasesStatus(this.sortedData);
  }

  showDailyData(month) {
    console.log(month);
    var daysData;
    if(this.stateSelected) {
      console.log(this.stateSelected);
      daysData = _.filter(this.sortedData, {'id': month, 'StateCode': this.stateSelected});
    }else{
      daysData = _.filter(this.sortedData, {'id': month});
    }

    this.getDeathsStatus(daysData);
    console.log(daysData);
  }


  getDeathsStatus(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['Date'].map(function (k) { return a[k]; }).join('|');
        if (a.Confirmed === undefined || a.Confirmed === null) {
          return;
        }
        if (a.Deaths === undefined || a.Deaths === null) {
          return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: { date: a.Date, deaths: 0, confirmed: 0} };
            result.push(hash[key].data);
        }
        hash[key].data.confirmed += a.Confirmed;
        hash[key].data.deaths += a.Deaths;
        hash[key].count++;
    });
    console.log(result);
    var newresult = _.orderBy(result, ['date'], ['asc'])
    var names = ['Deaths', 'Confirmed Cases', 'Recovered'];
    var color = ['#b90302', '#118DFF', '#81bc06']
    var series : any = [];
    var xaxis: any = [];
    var confirmed:any = [];
    var deaths:any = [];
    var recoverd: any = [];
    var totalcases : any = [];
    newresult.map((item,index)=>{
      confirmed.push(newresult[index].confirmed);
      deaths.push(newresult[index].deaths);
      recoverd.push(Math.round((newresult[index].confirmed - newresult[index].deaths/3)));
      xaxis.push(newresult[index].date);
      totalcases = [deaths, confirmed, recoverd];
    });
    names.map((item,index) => {
      series.push({name: names[index], color: color[index], data: totalcases[index]});
    });
    this.loadEpdeaths(xaxis,series);
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
      this.worldmaxColor = '#81bc06';
      this.totalData.map(item => {
        data.push({"hc-key":item.geoId.toLowerCase(), "value": item.t_cases});
    });
    }
    if(text == 'Death'){
      this.worldChartname = 'Deaths';
      this.worldminColor =  '#f0b6bd';
      this.worldmaxColor = '#b90302';
      this.totalData.map(item => {
        data.push({"hc-key":item.geoId.toLowerCase(), "value": item.t_deaths});
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
                      color: '#f81b25'
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
