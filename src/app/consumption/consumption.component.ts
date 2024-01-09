import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { DataService } from '../core/data.service';
import { MapChart } from 'angular-highcharts';
const Uganda = require('@highcharts/map-collection/countries/us/us-all.geo.json');
@Component({
    selector: 'app-consumption',
    templateUrl: './consumption.component.html',
    styleUrls: ['./consumption.component.css']
})
export class ConsumptionComponent implements OnInit {
    piechart: any;
    pieChartOptions: any;
    electricity: any;
    electricityOptions: any;
    barchart: any;
    barChartOptions: any
    mapchart: any;
    mapChartOptions: any;
    totalData: any = [];
    mapoptions: any;
    chartname: any;
    worldminColor: any;
    worldmaxColor: any;
    PieChartDataSeries:any=[];
    primeChartDataSeries:any=[];
    sourceChartDataOverview:any=[];
    sourceChartDataSeries:any=[];
    constructor(private router: Router, private dataService: DataService) { }

    ngOnInit() {
        this.getFullData();
        this.worldminColor =  '#91c1ed';
        this.worldmaxColor = '#118DFF';
    }
    updateBarData(event){
        this.electricityChart(this.PieChartDataSeries,event);
        this.primeChart(this.primeChartDataSeries,event);
        this.sourceChart(this.sourceChartDataOverview,this.sourceChartDataSeries,event);
    }
    updatePieChartData(event){
        this.electricityChart(this.PieChartDataSeries,event);
        this.primeChart(this.primeChartDataSeries,event);
        this.sourceChart(this.sourceChartDataOverview,this.sourceChartDataSeries,event);
    }
    updatePieChart2Data(event){
        this.electricityChart(this.PieChartDataSeries,event);
        this.primeChart(this.primeChartDataSeries,event);
        this.sourceChart(this.sourceChartDataOverview,this.sourceChartDataSeries,event);
    }
    getFullData() {
        this.dataService.getEnegryAPi().subscribe(data => {
            console.log(data);
            this.getElectricityCount(data);
            this.getPrimeCount(data);
            this.getSourceCount(data);
            this.filterDeaths(data);
        }, err => {
            console.log("error", err);
        })
    }
    getElectricityCount(data) {
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
        console.log(result)
        result.map(item => {
            item.y = parseFloat(item.y.toFixed(2));
        })
        this.PieChartDataSeries = result;
        this.electricityChart(result, '');
        console.log("ele",this.PieChartDataSeries)
    }
    getPrimeCount(data) {
        var hash = Object.create(null);
        var result = [];

        data.forEach(function (a) {
            var key = ['description'].map(function (k) { return a[k]; }).join('|');
            if (a.plants === undefined || a.plants === null) {
                return;
            }
            if (!hash[key]) {
                hash[key] = { count: 0, data: { name: a.description, y: 0 } };
                result.push(hash[key].data);
            }
            hash[key].data.y += a.plants;
            hash[key].count++;
        });
        this.totalData = result;
        console.log(result)
        result.map(item => {
            item.y = parseFloat(item.y.toFixed(2));
        })
        this.primeChartDataSeries = result;
        this.primeChart(result,'');
        console.log("pri",this.primeChartDataSeries)
    }
    getSourceCount(data) {
        var hash = Object.create(null);
        var result = [];

        data.forEach(function (a) {
            var key = ['source'].map(function (k) { return a[k]; }).join('|');
            if (a.plants === undefined || a.plants === null) {
                return;
            }
            if (!hash[key]) {
                hash[key] = { count: 0, data: { name: a.source, y: 0 } };
                result.push(hash[key].data);
            }
            hash[key].data.y += a.plants;
            hash[key].data.definition = a.source;
            hash[key].count++;
        });
        var names = ['source'];
        var color = ['#118DFF']
        var Xaxis: any = [];
        this.totalData = result;
        console.log(result)
        result.map((item, index) => {
            item.y = parseFloat(item.y.toFixed(2));
            Xaxis.push(result[index].definition);
        })
        this.sourceChartDataOverview = Xaxis;
        this.sourceChartDataSeries = result;
        this.sourceChart(Xaxis, result,'');
        console.log("data",this.sourceChartDataOverview,this.sourceChartDataSeries)
    }
    filterDeaths(filter) {
        var hash = Object.create(null);
        var result = [];

        filter.forEach(function (a) {
            var key = ['statecode'].map(function (k) { return a[k]; }).join('|');
            if (a.plants === undefined || a.plants === null) {
                return;
            }
            if (!hash[key]) {
                hash[key] = { count: 0, data: { "value": 0, "code": a.statecode } };
                result.push(hash[key].data);
            }
            hash[key].data.value += a.plants;
            hash[key].count++;
        });
        this.loadMapChart(result);
        console.log("map", result)
    }
    loadMapChart(result) {
        var $this = this;
        this.mapoptions = {

            chart: {
                map: Uganda,
                backgroundColor: '#ededed'
            },

            title: {
                text: this.chartname
            },

            exporting: {
                sourceWidth: 600,
                sourceHeight: 500,
                enabled: false
            },
            credits: {
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
                minColor: this.worldminColor,
                maxColor: this.worldmaxColor,
                // stops: [
                //     [0, '#EFEFFF'],
                //     [0.67, '#4444FF'],
                //     [1, '#000022']
                // ]
            },
            plotOptions: {
                series: {
                    // events: {
                    //     click: function (e) {
                    //         var text =  '<b>' + this.name + '</b>'+
                    //                 '<br><b>State:</b> ' + e.point.name +
                    //                 '<br><b>Count:</b> ' + e.point.value;
                    //         $this.getClickedData(e.point.code);
                    //         if (!this.chart.clickLabel) {
                    //           this.chart.clickLabel = this.chart.renderer.label(text, 0, 250)
                    //               .css({
                    //                   width: '200px'
                    //               })
                    //               .add();
                    //         } else {
                    //             this.chart.clickLabel.attr({
                    //                 text: text
                    //             });
                    //         }
                    //     }
                    // }
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
                name: 'States',
                tooltip: {
                    pointFormat: '{point.name}: {point.value}'
                }
            }]
        };
        this.mapchart = new MapChart(this.mapoptions);
    }

    electricityChart(chartData,name) {
        function get_random_color(){
            return '#' + Math.random().toString(16).substring(2,8);
          }
          chartData.forEach(element => {
            element.color = get_random_color();
          });
        var $this = this;
        var tooltipEnabled = true;
        this.electricityOptions = {
            chart: {
                type: 'pie',
                backgroundColor:'#ededed',
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
                    innerSize:150,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    },
                    events: {
                      click: function (event) {
                        console.log(event)
                        $this.updatePieChart2Data(event.point.name);
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
                name: 'Browers',
                data: chartData
            }]
            }
        this.electricity = new Chart(this.electricityOptions)
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
    sourceChart(Xaxis, chartData,name) {
        console.log("source chart")
        var $this = this;
        this.barChartOptions = {
            chart: {
                type: 'bar',
                backgroundColor: '#ededed',
                events: {
                    load: function (e) {
                      console.log("bar",e);
                        var dataarr = e.point.data;
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
                },
            },
            title: {
                text: null
            },
            xAxis: {
                categories: Xaxis,
                title: {
                    text: null
                },
            },
            yAxis: {
                min: null,
                title: false,
                labels: {
                    overflow: 'justify'
                }
            },
            exporting: null,
            credits: {
                enabled: false
            },
            legend: false,
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                series: {
                    point: {
                        events: {
                          click: function (event) {
                            console.log(event)
                             $this.updateBarData(event.point.name);
                            // tooltipEnabled = tooltipEnabled ? false : true;
                            console.log(event.point.name);
                          },
                        }
                    }
                },
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                },
            },
            series: [{
                name: 'Year 1800',
                data: chartData
            }]
        }
        this.barchart = new Chart(this.barChartOptions)
    }
    primeChart(chartData,name) {
        function get_random_color(){
            return '#' + Math.random().toString(16).substring(2,8);
          }
          chartData.forEach(element => {
            element.color = get_random_color();
          });
        var $this = this;
        var tooltipEnabled = true;
        this.pieChartOptions = {
            chart: {
                type: 'pie',
                backgroundColor:'#ededed',
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
                    innerSize:150,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    },
                    events: {
                      click: function (event) {
                        console.log(event)
                        $this.updatePieChartData(event.point.name);
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
                name: 'Browers',
                data: chartData
            }]
            }
        this.piechart = new Chart(this.pieChartOptions)
    }
}
