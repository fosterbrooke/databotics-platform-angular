import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { Chart } from 'angular-highcharts';
import { Chain, analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { Router, ActivatedRoute } from '@angular/router';
declare const google: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    driverperformancechart: any;
    jsondata: any = []
    categories: any
    name: any
    driverevent: any;
    drivertotalevents: any;
    driverperformance: any;
    drivercountevent: any;
    drivercount: any;
    driverRating: any;
    driverName: any;
    categoryone: any = [];
    categorytwo: any = [];
    categorythree: any = [];
    categoryfour: any = [];
    categoryfive: any = [];
    categorysix: any = [];
    categoryseven: any = [];
    categoryeight: any = [];
    fiveratingdriver: any = [];
    options: any;

    driverninetohundred: any;
    title: any;
    lastdayevent: any;
    thisweekevent: any;
    lastmonthavgevent: any;
    threshold: any;
    todayevent: any;
    eventcategory:any;
    driverCount:any;
    chartSpeed: any;
    chartSpeed1: any;
    chartSpeed2: any;
    map: any;
    @Output() sideNav = new EventEmitter();
    constructor(public http: HttpClient, public router: Router, public route: ActivatedRoute) {
      var heading = this.route.snapshot.queryParamMap.get('title');
      if(heading == null || heading == ""){
        localStorage.setItem('title',"Driver Behavior");
      }else{
        localStorage.setItem("title",heading);
      }

      if (localStorage.getItem('title') == "" || localStorage.getItem('title') == null || localStorage.getItem('title') == undefined) {
        this.title = '';
      } else {
        this.title = localStorage.getItem('title');
      }

    }

    ngOnDestroy(){
      localStorage.removeItem("title");
    }

    ngOnInit() {
        this.http.get('../../assets/data/driver.json').subscribe(data => {
            this.jsondata = data;
            for (var i = 0; i < this.jsondata.length; i++) {
                if (this.jsondata[i].Category == "91-100") {
                    this.categoryone.push({ name: this.jsondata[i].Name, y: this.jsondata[i].Peroformance })
                }
                else if (this.jsondata[i].Category == "81-90") {
                    this.categorytwo.push({ name: this.jsondata[i].Name, y: this.jsondata[i].Peroformance })
                }
                else if (this.jsondata[i].Category == "71-80") {
                    this.categorythree.push({ name: this.jsondata[i].Name, y: this.jsondata[i].Peroformance })
                }
                else if (this.jsondata[i].Category == "61-70") {
                    this.categoryfour.push({ name: this.jsondata[i].Name, y: this.jsondata[i].Peroformance })
                }
                else if (this.jsondata[i].Category == "51-60") {
                    this.categoryfive.push({ name: this.jsondata[i].Name, y: this.jsondata[i].Peroformance })
                }
                else if (this.jsondata[i].Category == "41-50") {
                    this.categorysix.push({ name: this.jsondata[i].Name, y: this.jsondata[i].Peroformance })
                }
                else if (this.jsondata[i].Category == "31-40") {
                    this.categoryseven.push({ name: this.jsondata[i].Name, y: this.jsondata[i].Peroformance })
                }
                else if (this.jsondata[i].Category == "21-30") {
                    this.categoryeight.push({ name: this.jsondata[i].Name, y: this.jsondata[i].Peroformance })
                }


            }

            this.driverPerformanceChart(this.categoryone, this.categorytwo, this.categorythree, this.categoryfour, this.categoryfive,
                this.categorysix, this.categoryseven, this.categoryeight)

        })

        this.mapLocation();
        this.getDriverEvents();
        this.gaugeChart();
        this.gaugeChart1();
        this.gaugeChart2();

    }
    mapLocation(){
        this.http.get('../../assets/data/fleetLocation.json').subscribe(data => {
            var mapdata = data;
            this.loadmap(mapdata)
        });
    }

    loadmap(mapdata){
            //console.log(mapdata);
        var $this = this;
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: new google.maps.LatLng(34.051, -86.045),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          streetViewControl: false
        });
    
        var infowindow = new google.maps.InfoWindow();
        var marker;
        var i;
        var image = {
          url: '../../assets/images/warehouse.png',
          scaledSize: new google.maps.Size(50, 50),
        };
    
        for (i = 0; i < mapdata.length; i++) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(mapdata[i].Latitude, mapdata[i].Longitude),
            map: this.map,
            icon:image
          });
          attachSecretMessage(marker,  mapdata[i].Latitude, mapdata[i].Longitude);
        }
    
        function attachSecretMessage(marker, lat, long) {
          var geocoder = new google.maps.Geocoder();
          marker.addListener('click', function () {
            var latlong1 = new google.maps.LatLng(lat, long);
            geocoder.geocode({ 'location': latlong1 }, function (res, status) {
              if (status == 'OK') {
    
                var currentLocation = res[0].address_components[2].long_name;
                // $this.city = currentLocation;
                // $this.state = res[0].address_components[4].long_name;
                // $this.country = res[0].address_components[5].long_name;
    
                // $this.esttime = est;
                infowindow = new google.maps.InfoWindow({
                  content: '<b><p style="color:blue;text-weight:bold">' + currentLocation + '</p></b>'
             
                });
             
                // alert(this.warehousename)
                infowindow.open(this.map, marker);
    
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
              marker.addListener('mouseout', function() {
                infowindow.close(marker.get('map'), marker);
              });
            });
          });
    
    
          marker.addListener('dblclick', function (mouseEvent) {
            // alert('Right click triggered');
            // this.map.setCenter(this.position);
            $(".modal-header .modal-title").text(this.title);
            //  $(".modal-body #modalLatLng").text(this.position);
            $('#myModal').modal('show');
    
    
          });
        }
    
    
    }

    driverPerformanceChart(categoryone, categorytwo, categorythree, categoryfour, categoryfive, categorysix, categoryseven, categoryeight) {
        var UNDEFINED;
        var previousPoint = null;
        var $this = this;
        this.options = {
            chart: {
                type: 'column',
                height: 300,
                events: {
                    drillup: function (e) {
                        $this.getDriverEvents();
                    },
                    drilldown: function (e) {
                        $this.getCategoryEvents(e.seriesOptions.name,e.seriesOptions.data.length);
                    }

                }

            },
            // title: {
            //   text: 'Driver Daily Performance'
            // },

            xAxis: {
                type: 'category',
                min: 0,
                max: 7,
                scrollbar: {
                    enabled: true
                },
                color: "#FFFFFF"

            },
            title: {
                text: ''

            },

            yAxis: {
                title: { text: '' },
                gridLineColor: 'transparent',
                labels: {
                    enabled: false
                },


            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'

                     },
                    point: {
                        events: {
                            click: function (): any {
                                if (this.x != UNDEFINED) {
                                    $this.getDriver(this.name);
                                    console.log(this);
                                    //   $this.router.navigate(['./driver-overview']);
                                    for (var i = 0; i < this.series.data.length; i++) {
                                        this.series.data[i].update({ color: '#5871b2' }, true, false);
                                    }
                                      this.update({ color: '#1c2337' }, true, false);
                                      //   $this.router.navigate(['./driver-overview']);

                                }

                            },


                        }
                    }
                }
            },


            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            "series": [
                {
                    "name": "Driver",

                    "data": [
                        {
                            "name": "91-100",
                            "y": 18,
                            "drilldown": "91-100",
                            color: "#5871b2"
                        },
                        {
                            "name": "81-90",
                            "y": 187,
                            "drilldown": "81-90",
                            color: "#5871b2"
                        },
                        {
                            "name": "71-80",
                            "y": 158,
                            "drilldown": "71-80",
                            color: "#5871b2"
                        },
                        {
                            "name": "61-70",
                            "y": 243,
                            "drilldown": "61-70",
                            color: "#5871b2"
                        },
                        {
                            "name": "51-60",
                            "y": 218,
                            "drilldown": "51-60",
                            color: "#5871b2"
                        },
                        {
                            "name": "41-50",
                            "y": 126,
                            "drilldown": "41-50",
                            color: "#5871b2"
                        },
                        {
                            "name": "31-40",
                            "y": 47,
                            "drilldown": "31-40",
                            color: "#5871b2"
                        },
                        {
                            "name": "21-30",
                            "y": 3,
                            "drilldown": "21-30",
                            color: "#5871b2"
                        },
                    ]
                }
            ],
            "drilldown": {
                "series": [
                    {
                        "name": "91-100",
                        "id": "91-100",
                        "data": categoryone,
                        color: "#5871b2",


                    },
                    {
                        "name": "81-90",
                        "id": "81-90",
                        "data": categorytwo,
                        color: "#5871b2"

                    },
                    {
                        "name": "71-80",
                        "id": "71-80",
                        "data": categorythree,
                        color: "#5871b2"
                    },
                    {
                        "name": "61-70",
                        "id": "61-70",
                        "data": categoryfour,
                        color: "#5871b2"
                    },
                    {
                        "name": "51-60",
                        "id": "51-60",
                        "data": categoryfive,
                        color: "#5871b2"
                    },
                    {
                        "name": "41-50",
                        "id": "41-50",
                        "data": categorysix,
                        color: "#5871b2"
                    },
                    {
                        "name": "31-40",
                        "id": "31-40",
                        "data": categoryseven,
                        color: "#5871b2"
                    },
                    {
                        "name": "21-30",
                        "id": "21-30",
                        "data": categoryeight,
                        color: "#5871b2"
                    },
                ]
            }

        }
        this.driverperformancechart = new Chart(this.options);

    }

    getDriverEvents() {
        this.http.get('../../assets/data/driverevent.json').subscribe(data => {
            this.driverevent = data;
            this.drivertotalevents = this.driverevent[0];
            this.lastdayevent = this.drivertotalevents['Last Day'] / 1000;
            this.thisweekevent = this.drivertotalevents['This Week'] / 1000;
            this.lastmonthavgevent = this.drivertotalevents['Last Month Average'] / 1000;
            this.threshold = this.drivertotalevents['Threshold'];
            this.todayevent = this.drivertotalevents['Today'] / 1000;
        })
    }

    getCategoryEvents(category,avg) {
        var index :any
        this.lastdayevent = 0;
        this.thisweekevent =0;
        this.lastmonthavgevent=0;
        this.thisweekevent =0;
        this.todayevent =0;
        for(index in this.driverevent){
            if(this.driverevent[index].Category == category){
                this.lastdayevent += this.driverevent[index]['Last Day']/avg;
                this.thisweekevent += this.driverevent[index]['This Week']/avg;
                this.lastmonthavgevent += this.driverevent[index]['Last Month Average']/avg;
                this.threshold = this.driverevent[index]['Threshold'];
                this.todayevent += this.driverevent[index]['Today']/avg;
           }
        }
    }


    getDriver(driverName: string) {
        this.getDriverCount(driverName)
        var index :any;
        for(index in this.driverevent){
            if( this.driverevent[index].Name === driverName){
            this.lastdayevent = this.driverevent[index]['Last Day'];
            this.thisweekevent = this.driverevent[index]['This Week'] ;
            this.lastmonthavgevent = this.driverevent[index]['Last Month Average'];
            this.threshold = this.driverevent[index]['Threshold'];
            this.todayevent = this.driverevent[index]['Today'];
            }
        }
    }


    getDriverCount(driverName) {
        var index :any;
         this.http.get('../../assets/data/driverinfo.json').subscribe(data => {
            this.driverRating = data
            for(index in this.driverRating){
                if (this.driverRating[index].Name == driverName ) {
                    this.driverRating = this.driverRating[index].Rating
                }
            }
        })
    }
    
    //output sidebar active
        sidenavChanged() {
            this.sideNav.emit('open');
        }

    //dummy gauge chart
    gaugeChart(){
        var $this = this;
        this.options = {
          chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            // spacing: [0, 0, 0, 0],
            backgroundColor: null,
            height: 200
          },
          credits: {
            enabled: false
          },
    
          title: {
            text: ''
          },
    
          pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, '#FFF'],
                  [1, '#333']
                ]
              },
              borderWidth: 0,
              outerRadius: '109%'
            }, {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, '#333'],
                  [1, '#FFF']
                ]
              },
              borderWidth: 1,
              outerRadius: '107%'
            }, {
              // default background
            }, {
              backgroundColor: '#DDD',
              borderWidth: 0,
              outerRadius: '105%',
              innerRadius: '103%'
            }]
          },
    
          // the value axis
          yAxis: {
            min: 0,
            max: 180,
    
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',
    
            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
              step: 2,
              rotation: 'auto'
            },
            title: {
              text: 'mpg'
            },
            plotBands: [{
              from: 0,
              to: 40,
              color: '#55BF3B' // red
            }, {
              from: 40,
              to: 120,
              color: '#DDDF0D' // yellow
            }, {
              from: 120,
              to: 200,
              color: '#DF5353' // green
            }]
          },
    
          series: [{
            name: 'Speed',
            data: [60]
          }]
    
        };
        this.chartSpeed = new Chart(this.options);
        setInterval(function () {
          // Speed
          var point,
            newVal,
            inc;
    
          if ($this.chartSpeed) {
            point = $this.chartSpeed.ref.series[0].points[0];
            inc = Math.round((Math.random() - 0.5) * 100);
            newVal = point.y + inc;
    
            if (newVal < 0 || newVal > 160) {
              newVal = point.y - inc;
            }
            point.update(newVal);
          }
    
          
        }, 2000);
    }

     //dummy gauge chart
     gaugeChart1(){
        var $this = this;
        this.options = {
          chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            // spacing: [0, 0, 0, 0],
            backgroundColor: null,
            height: 200
          },
          credits: {
            enabled: false
          },
    
          title: {
            text: ''
          },
    
          pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, '#FFF'],
                  [1, '#333']
                ]
              },
              borderWidth: 0,
              outerRadius: '109%'
            }, {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, '#333'],
                  [1, '#FFF']
                ]
              },
              borderWidth: 1,
              outerRadius: '107%'
            }, {
              // default background
            }, {
              backgroundColor: '#DDD',
              borderWidth: 0,
              outerRadius: '105%',
              innerRadius: '103%'
            }]
          },
    
          // the value axis
          yAxis: {
            min: 0,
            max: 180,
    
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',
    
            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
              step: 2,
              rotation: 'auto'
            },
            title: {
              text: 'Days'
            },
            plotBands: [{
              from: 0,
              to: 40,
              color: '#55BF3B' // red
            }, {
              from: 40,
              to: 120,
              color: '#DDDF0D' // yellow
            }, {
              from: 120,
              to: 200,
              color: '#DF5353' // green
            }]
          },
    
          series: [{
            name: 'Speed',
            data: [60]
          }]
    
        };
        this.chartSpeed1 = new Chart(this.options);
        setInterval(function () {
          // Speed
          var point,
            newVal,
            inc;
    
          if ($this.chartSpeed1) {
            point = $this.chartSpeed1.ref.series[0].points[0];
            inc = Math.round((Math.random() - 0.5) * 100);
            newVal = point.y + inc;
    
            if (newVal < 0 || newVal > 160) {
              newVal = point.y - inc;
            }
    
            point.update(newVal);
          }
    
          
        }, 2000);
    }

    //dummy gauge chart
    gaugeChart2(){
        var $this = this;
        this.options = {
          chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            // spacing: [0, 0, 0, 0],
            backgroundColor: null,
            height: 200
          },
          credits: {
            enabled: false
          },
    
          title: {
            text: ''
          },
    
          pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, '#FFF'],
                  [1, '#333']
                ]
              },
              borderWidth: 0,
              outerRadius: '109%'
            }, {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0, '#333'],
                  [1, '#FFF']
                ]
              },
              borderWidth: 1,
              outerRadius: '107%'
            }, {
              // default background
            }, {
              backgroundColor: '#DDD',
              borderWidth: 0,
              outerRadius: '105%',
              innerRadius: '103%'
            }]
          },
    
          // the value axis
          yAxis: {
            min: 0,
            max: 180,
    
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',
    
            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
              step: 2,
              rotation: 'auto'
            },
            title: {
              text: 'mph'
            },
            plotBands: [{
              from: 0,
              to: 40,
              color: '#55BF3B' // red
            }, {
              from: 40,
              to: 120,
              color: '#DDDF0D' // yellow
            }, {
              from: 120,
              to: 200,
              color: '#DF5353' // green
            }]
          },
    
          series: [{
            name: 'Speed',
            data: [60]
          }]
    
        };
        this.chartSpeed2 = new Chart(this.options);
        setInterval(function () {
          // Speed
          var point,
            newVal,
            inc;
    
          if ($this.chartSpeed2) {
            point = $this.chartSpeed2.ref.series[0].points[0];
            inc = Math.round((Math.random() - 0.5) * 100);
            newVal = point.y + inc;
    
            if (newVal < 0 || newVal > 160) {
              newVal = point.y - inc;
            }
    
            point.update(newVal);
          }
    
          
        }, 2000);
    }

    
}
