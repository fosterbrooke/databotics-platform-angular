import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DatabotService } from './../core/databot.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
declare const google: any;
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-fleetmatics',
  templateUrl: './fleetmatics.component.html',
  styleUrls: ['./fleetmatics.component.css']
})
export class FleetmaticsComponent implements OnInit {


  selected: any;
  fleetOverview = true;
  driverProfile: any;
  trackOrder: any;
  custFeed: any;
  tenantOverview: boolean;
  Overview: boolean;
  options: any;
  harshevents: any;
  mileschart: any;
  mapdata: any;
  weekAcceleration: number;
  weekBraking: number;
  todayAcceleration: number;
  todayBraking: number;
  lastDayAcceleration: number;
  lastDayBraking: number;
  todayIdling: number;
  lastDayIdling: number;
  weekIdling: number;
  drivername: any;
  imei: any;
  stoptime: any;
  idlingtime: any;
  trips: any;
  drivetime: number;
  driver: any;
  location: any;
  hourschart: any;
  accOptions: any;
  // private hoursAccChart = new Chart({

  //   chart: {
  //     backgroundColor: '#f9f9f8',
  //     height: 200,
  //     // width: 373,
  //     type: 'column',
  //     style: {
  //       color: 'white',
  //     },
  //   },
  //   legend: {
  //     itemStyle: {
  //       color: 'black'
  //     },
  //     align: 'center',
  //     verticalAlign: 'top',
  //     floating: false,
  //     style: {
  //       color: '#fff'
  //     }
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   title: {
  //     text: null,
  //     style: {
  //       color: '#fff'
  //     }
  //   },
  //   xAxis: {
  //     tickInterval: 1,
  //     // type: 'datetime',
  //     // categories: time,
  //     labels: {
  //       style: {
  //         color: 'fff'
  //       },
  //       format: '{value}',
  //     },
  //   },
  //   yAxis: {
  //     gridLineColor: 'transparent',
  //     labels: {
  //       format: '{value}',
  //       style: {
  //         color: 'fff'
  //       }
  //     },
  //     title: {
  //       text: null,
  //     },
  //   },
  //   series: [
  //   //   {
  //   //   // name: "Speed",
  //   //   // showInLegend: false,
  //   //   // borderColor: null,
  //   //   data: [20],
  //   //   color: '#8ba9ff',
  //   //   pointWidth: 15
  //   // },
  //   {
  //     name: "Acceleration",
  //     // showInLegend: false,
  //     // borderColor: null,
  //     data: [15],
  //     color: '#4f76ad',
  //     pointWidth: 15
  //   }
  //   ],
  //   tooltip: {
  //     valueSuffix: 'Hrs'
  //   }
  // });
  option: any;
  miles: number;
  totaltrips: any;
  unauthorizedMiles: any;
  map: any;
  driverid: any;
  startLat: any;
  startLong: any;
  endLat: any;
  endLong: any;
  searchtodate: any;
  searchfromdate: any;
  hrsAcc: any = [];
  hoursAccChart: any;
  hrsBraking: any = [];
  hrs: any = [];
  getUpdateVehicleInterval: any;
  hoursBrakingChart: any;
  brakingOptions: any;
  highSpeed: number;
  hoursSpeedChart: any;
  speedOptions: any;
  hrsSpeed: any = [];

  driveChart: any;
  driveOptions: any;
  drivemins: any = [];

  idleChart: any;
  idleOptions: any;
  idlemins: any = [];

  stopChart: any;
  stopOptions: any;
  stopmins: any = [];

  mileChart: any;
  mileOptions: any;
  mile: any = [];

  unauthorizedMileChart: any;
  unauthorizedMileOptions: any;
  unauthorizedMile: any = [];

  tripChart: any;
  tripOptions: any;
  trip: any = [];
  behaviourcard: number;
  speedcard: number;
  accelerationScore: number;
  brakingScore: number;
  idleTime: number;
  stopTime: number;
  drivehrs: any = [];
  alertHrs: any = [];
  stopidletime: any = [];
  startmarker: any;
  initInterval: any;
  infowindow: any;
  milesPerDayOptions: any;
  harshEventsOptions: any;

  stopArray: any = [];
  idleArray: any = [];
  tripArray: any = [];
  alertArray: any = [];

  idleKeys: any = [];
  VIN: any;
  locations: any;
  drivetimeDaysFormat: any;
  scoreChart: any;
  scoreChartOptions: any;
  columns: string [];
  stopColumns: string [];
  idleColumns: string [];
  tripColumns: string [];
  stopitemResource: any = new DataTableResource([]);
  idleitemResource: any = new DataTableResource([]);
  tripitemResource: any = new DataTableResource([]);
  alertitemResource: any = new DataTableResource([]);
  itemCount = 0;
  items: any = [];

  stopitemCount = 0;
  stopitems: any = [];

  idleitemCount = 0;
  idleitems: any = [];

  tripitemCount = 0;
  tripitems: any = [];
  param: any = {offset: 0, limit: 25};
  pagelimits = [10, 20, 30];

  username: any;
  idlingtimeDaysFormat: any;
  stoptimeDaysFormat: any;
  alerts: any;
  minimapshow = false;
  idleminimapshow = false;
  idleminimap: any;
  stopminimap: any;
  stopminimapshow = false;

  constructor(public databotService: DatabotService, private route: ActivatedRoute) {
    if (localStorage.getItem('username') == 'melrosepark' || localStorage.getItem('username') == 'Melrosepark') {
      this.tenantOverview = true;
      this.Overview = false;
    } else {
      this.tenantOverview = false;
      this.Overview = true;
    }
    this.username = localStorage.getItem('username');
    this.loadData();
    // this.searchtodate = Date.now();
    // this.searchfromdate = Date.now() - 1000 * 60 * 60 * 24 * 2;
  }

  ngOnInit() {
    const jsonString: string = this.route.snapshot.queryParamMap.get('vehicle');
    const drivername = this.route.snapshot.queryParamMap.get('drivername');
    const location = this.route.snapshot.queryParamMap.get('location');
    const driverid = this.route.snapshot.queryParamMap.get('driverid');
    const searchfromdate = this.route.snapshot.queryParamMap.get('searchfromdate');
    const searchtodate = this.route.snapshot.queryParamMap.get('searchtodate');
    this.selected = 1;
    if (jsonString) {
      this.imei = JSON.parse(jsonString);
      this.drivername = JSON.parse(drivername);
      this.driver = JSON.parse(drivername);
      this.location = JSON.parse(location);
      this.driverid = JSON.parse(driverid);
      this.searchfromdate = parseInt(searchfromdate);
      this.searchtodate = parseInt(searchtodate);
      this.getvehicleAlerts();

      this.getDeviceEvents(this.imei);
      // this.HarshEvents('', '','');
      this.HoursChart('', '', '');
      this.hrsSpeedChart('');
      this.MilesChart('', '', '');

      // this.loadmap();
      // this.loadmapdata();
      this.getIdlingAllDevices();
      this.gettripevent();
      // this.getRoute();
      this.loadVehicle();
      this.getRoute();
      // this.initInterval = setInterval(() => {
      //   this.loadVehicle();
      // }, 30000);
    } else {
      // this.HarshEvents();
      // this.HoursChart();
      // this.Speeding();
      // this.MilesChart();
      // this.loadmapdata();
      // this.getIdlingAllDevices();
      // this.gettripevent();

    }

  }

  setfleetOverview(item: any) {
    this.fleetOverview = true;
    this.driverProfile = false;
    this.trackOrder = false;
    this.custFeed = false;
    this.selected = item;
  }

  setDriver(item: any) {
    this.fleetOverview = false;
    this.driverProfile = true;
    this.trackOrder = false;
    this.custFeed = false;
    this.selected = item;
  }

  setvehicleMetric(item: any) {
    this.fleetOverview = false;
    this.driverProfile = false;
    this.trackOrder = true;
    this.custFeed = false;
    this.selected = item;
  }


  setcustomerFeed(item: any) {
    this.fleetOverview = false;
    this.driverProfile = false;
    this.trackOrder = false;
    this.custFeed = true;
    this.selected = item;
  }


  isActive(item: any) {
    return this.selected === item;
  }

  HarshEvents(acc, braking, speed) {
    var Events = acc + braking + speed;
    var totalevents;
    if(Events == 0) {
       totalevents = '0';
    }else{
      totalevents = Events;
    }
    this.harshEventsOptions = {
      chart: {
        backgroundColor: '#f9f9f8',
        height: 300,
        // width: 373,
        type: 'pie',
        style: {
          color: 'white',

        },
      },
      legend: {
        itemStyle: {
          color: '#8a9089',
          fontSize: 10
        },
        align: 'center',
        // layout: 'vertical',
        verticalAlign: 'bottom',
        floating: false,
        style: {
          color: 'black'
        }
      },

      credits: {
        enabled: false
      },
      title: {
        text: '<p style=" font-size: 20px">' + totalevents + '</p><br>' + '<p>Events</p>',
        align: 'center',
        verticalAlign: 'middle',
        y: 3,
        style: {
          color: 'black',
          fontSize: '12px',
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
            distance: -70,
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          startAngle: -180,
          endAngle: 180,
          center: ['50%', '50%'],
          size: '100%'
        }
      },
      xAxis: {
        tickInterval: 1,
        // type: 'datetime',
        // categories: time,
        labels: {
          style: {
            color: 'fff'
          },
        },
      },
      yAxis: {
        labels: {
          style: {
            color: 'fff'
          }
        },

        title: {
          // text: null,
        },
      },
      series: [{
        type: 'pie',
        showInLegend: true,
        innerSize: '80%',
        borderColor: null,
        // name: ['Acceleration', 'Braking', 'Speed'],
        data: [
          ['Acceleration', acc, 'Acc'],
          ['Braking', braking],
          ['Speed', speed]
        ],
        colors: ['#3d7baa', '#ea1652', 'blue']
      }],
      tooltip: {
        // valueSuffix: '°F'
      }
    };
    this.harshevents = new Chart(this.harshEventsOptions);
  }

  ScoreChart(score, rash) {
    this.scoreChartOptions = {
      chart: {
        backgroundColor: '#f9f9f8',
        height: 250,
        // width: 373,
        type: 'pie',
        style: {
          color: 'white',

        },
      },
      legend: {
        itemStyle: {
          color: 'black'
        },
        align: 'center',
        // layout: 'vertical',
        verticalAlign: 'top',
        floating: false,
        style: {
          color: 'black'
        }
      },

      credits: {
        enabled: false
      },
      title: {
        text: '<p style=" font-size: 20px">' + score + '%</p>' + '<br><p>Score</p>',
        align: 'center',
        verticalAlign: 'middle',
        y: 3,
        style: {
          color: 'black',
          fontSize: '12px',
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
            distance: -70,
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          startAngle: -180,
          endAngle: 180,
          center: ['50%', '50%'],
          size: '100%'
        },
        series: {
          states: {
              hover: {
                  enabled: false
              }
          }
        }
      },
      xAxis: {
        tickInterval: 1,
        // type: 'datetime',
        // categories: time,
        labels: {
          style: {
            color: 'fff'
          },
        },
      },
      yAxis: {
        labels: {
          style: {
            color: 'fff'
          }
        },

        title: {
          // text: null,
        },
      },
      series: [{
        type: 'pie',
        showInLegend: false,
        innerSize: '80%',
        borderColor: null,
        data: [
          ['Score', score],
          ['Rash', rash]
        ],
        colors: ['#3d7baa', '#eaeaea']
      }],
      tooltip: {
        // valueSuffix: '°F'
        enabled: false
      }
    };
    this.scoreChart = new Chart(this.scoreChartOptions);
  }

  HoursChart(drivetime, idletime, stoptime) {
    this.options = {
      chart: {
        backgroundColor: '#f9f9f8',
        height: 300,
        // width: 373,
        type: 'bar',
        style: {
          color: 'white',
        },
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: '#8a9089',
          fontSize: 10
        },
        align: 'center',
        verticalAlign: 'bottom',
        floating: false,
        style: {
          color: 'black'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: null,
        style: {
          color: 'black'
        }
      },
      plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                inside: false
            }
        }
    },
      xAxis: {
        tickInterval: 1,
        // type: 'datetime',
        // categories: time,
        labels: {
          enabled: false,
          style: {
            color: 'black'
          },
          format: '{value}',
        },
      },
      yAxis: {
        gridLineColor: 'transparent',
        labels: {
          format: '{value}',
          style: {
            color: 'gray'
          }
        },
        title: {
          text: null,
        },
      },
      series: [{
        name: "Drive Time",
        showInLegend: true,
        // borderColor: null,
        data: [drivetime],
        color: '#3d7baa',
        pointWidth: 15
      },
      {
        name: "Idle Time",
        showInLegend: true,
        // borderColor: null,
        data: [idletime],
        color: '#ea1652',
        pointWidth: 15
      },
      {
        name: "Stop Time",
        showInLegend: true,
        // borderColor: null,
        data: [stoptime],
        color: '#f7c13b',
        pointWidth: 15
      }
      ],
      tooltip: {
        valueSuffix: 'Mins'
      }
    };
    this.hourschart = new Chart(this.options);
  }

  MilesChart(miles, totaltrips, unauthorizedMiles) {
    this.milesPerDayOptions = {
      chart: {
        backgroundColor: '#f9f9f8',
        height: 300,
        // width: 373,
        type: 'bar',
        style: {
          color: 'white',
        },
      },
      legend: {
        itemStyle: {
          color: '#8a9089',
          fontSize: 10
        },
        align: 'center',
        verticalAlign: 'bottom',
        floating: false,
        style: {
          color: 'black'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: null,
        style: {
          color: 'black'
        }
      },
      plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                inside: false
            }
        }
    },
      xAxis: {
        tickInterval: 1,
        // type: 'datetime',
        // categories: time,
        labels: {
          enabled: false,
          style: {
            color: 'black'
          },
          format: '{value}',
        },
      },
      yAxis: {
        gridLineColor: 'transparent',
        labels: {
          format: '{value}',
          style: {
            color: 'gray'
          }
        },
        title: {
          text: null,
        },
      },
      series: [
        {
          name: "Miles",
          size: 10,
          showInLegend: true,
          borderColor: null,
          data: [miles],
          color: '#3d7baa',
          pointWidth: 15,
          tooltip: {
           valueSuffix: 'Miles'
      }
        },
        {
          name: "Unauthorized Miles",
          size: 10,
          showInLegend: true,
          borderColor: null,
          data: [unauthorizedMiles],
          color: '#ea1652',
          pointWidth: 15,
          tooltip: {
            valueSuffix: 'Miles'
          }
        },
        {
          name: "Total Trips",
          size: 10,
          showInLegend: true,
          borderColor: null,
          data: [totaltrips],
          color: '#f7c13b',
          pointWidth: 15,
          tooltip: {
            valueSuffix: ''
          }
        }
      ],
      
    };
    this.mileschart = new Chart(this.milesPerDayOptions);
  }

  hrsAccChart(hrsAcc) {
    
    this.accOptions = {
      chart: {
        backgroundColor: '#f9f9f8',
        height: 200,
        // width: 373,
        type: 'line',
        style: {
          color: 'white',
        },
      },
      legend: {
        itemStyle: {
          color: 'black'
        },
        align: 'center',
        verticalAlign: 'top',
        floating: false,
        style: {
          color: 'black'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: "Acceleration",
        style: {
          color: 'black'
        }
      },
      xAxis: {
        tickInterval: 1,
        // type: 'datetime',
        // categories: time,
        labels: {
          enabled: true,
          style: {
            color: 'black'
          },
        },
      },
      yAxis: {
        gridLineColor: 'transparent',
        labels: {
          format: '{value}',
          style: {
            color: 'fff'
          }
        },
        title: {
          // text: null,
        },
      },
      series: [{
        name: "Acceleration",
        showInLegend: false,
        // borderColor: null,
        data: [],
        color: '#8ba9ff',
        pointWidth: 15
      }
      ],
      tooltip: {
        valueSuffix: 'Acc'
      }
    };
    this.hoursAccChart = new Chart(this.options);
  }

  hrsBrakingChart(hrsAcc) {
    
    this.brakingOptions = {
      chart: {
        backgroundColor: '#f9f9f8',
        height: 200,
        // width: 373,
        type: 'line',
        style: {
          color: 'white',
        },
      },
      legend: {
        itemStyle: {
          color: 'black'
        },
        align: 'center',
        verticalAlign: 'top',
        floating: false,
        style: {
          color: '#fff'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: "Braking",
        style: {
          color: 'black'
        }
      },
      xAxis: {
        tickInterval: 1,
        // type: 'datetime',
        // categories: time,
        labels: {
          enabled: true,
          style: {
            color: 'black'
          },
        },
      },
      yAxis: {
        gridLineColor: 'transparent',
        labels: {
          format: '{value}',
          style: {
            color: 'fff'
          }
        },
        title: {
          text: null,
        },
      },
      series: [
      {
        name: "Braking",
        showInLegend: false,
        // borderColor: null,
        data: [],
        color: '#8ba9f8',
        pointWidth: 15
      }
      ],
      tooltip: {
        valueSuffix: ''
      }
    };
    this.hoursBrakingChart = new Chart(this.options);
  }

  hrsSpeedChart(hrsAcc) {
    
    this.speedOptions = {
      chart: {
        backgroundColor: '#f9f9f8',
        height: 200,
        // width: 373,
        type: 'line',
        style: {
          color: 'white',
        },
      },
      legend: {
        itemStyle: {
          color: 'black'
        },
        align: 'center',
        verticalAlign: 'top',
        floating: false,
        style: {
          color: '#fff'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: "Speed",
        style: {
          color: 'black'
        }
      },
      xAxis: {
        tickInterval: 1,
        // type: 'datetime',
        // categories: time,
        labels: {
          enabled: true,
          style: {
            color: 'black'
          },
        },
      },
      yAxis: {
        gridLineColor: 'transparent',
        labels: {
          format: '{value}',
          style: {
            color: 'fff'
          }
        },
        title: {
          text: null,
        },
      },
      series: [
      {
        name: "Speeding",
        showInLegend: false,
        // borderColor: null,
        data: [0, 0, 0],
        color: '#8ba9f8',
        pointWidth: 15
      }
      ],
      tooltip: {
        valueSuffix: 'Mph'
      }
    };
    this.hoursSpeedChart = new Chart(this.speedOptions);
  }

  DriveChart(drivemins) {
    this.driveOptions = {
      chart: {
        backgroundColor: '#f9f9f8',
        height: 200,
        // width: 373,
        type: 'line',
        style: {
          color: 'white',
        },
      },
      legend: {
        itemStyle: {
          color: 'black'
        },
        align: 'center',
        verticalAlign: 'top',
        floating: false,
        style: {
          color: '#fff'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Drive Time',
        style: {
          color: 'black'
        }
      },
      xAxis: {
        tickInterval: 1,
        // type: 'datetime',
        // categories: time,
        labels: {
          enabled: true,
          style: {
            color: 'black'
          },
        },
      },
      yAxis: {
        gridLineColor: 'transparent',
        labels: {
          format: '{value}',
          style: {
            color: 'fff'
          }
        },
        title: {
          text: null,
        },
      },
      series: [
      {
        name: "Drive Time",
        showInLegend: false,
        // borderColor: null,
        data: [10, 20 , 5],
        color: '#8ba9f8',
        pointWidth: 15
      }
      ],
      tooltip: {
        valueSuffix: 'Mins'
      }
    };
    this.driveChart = new Chart(this.driveOptions);
  }

  IdleChart() {
    this.idleOptions = {
      chart: {
        backgroundColor: '#f9f9f8',
        height: 200,
        // width: 373,
        type: 'line',
        style: {
          color: 'white',
        },
      },
      legend: {
        itemStyle: {
          color: 'black'
        },
        align: 'center',
        verticalAlign: 'top',
        floating: false,
        style: {
          color: '#fff'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Idle Time',
        style: {
          color: 'black'
        }
      },
      xAxis: {
        tickInterval: 1,
        // type: 'datetime',
        // categories: time,
        labels: {
          enabled: true,
          style: {
            color: 'black'
          },
        },
      },
      yAxis: {
        gridLineColor: 'transparent',
        labels: {
          format: '{value}',
          style: {
            color: 'fff'
          }
        },
        title: {
          text: null,
        },
      },
      series: [
      {
        name: "Idle Time",
        showInLegend: false,
        // borderColor: null,
        data: [10, 20 , 5],
        color: '#8ba9f8',
        pointWidth: 15
      }
      ],
      tooltip: {
        valueSuffix: 'Mins'
      }
    };
    this.idleChart = new Chart(this.idleOptions);
  }
  StopChart() {
    this.stopOptions = {
      chart: {
        backgroundColor: '#f9f9f8',
        height: 200,
        // width: 373,
        type: 'line',
        style: {
          color: 'white',
        },
      },
      legend: {
        itemStyle: {
          color: 'black'
        },
        align: 'center',
        verticalAlign: 'top',
        floating: false,
        style: {
          color: '#fff'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Stop Time',
        style: {
          color: 'black'
        }
      },
      xAxis: {
        tickInterval: 1,
        // type: 'datetime',
        // categories: time,
        labels: {
          enabled: true,
          style: {
            color: 'black'
          },
        },
      },
      yAxis: {
        gridLineColor: 'transparent',
        labels: {
          format: '{value}',
          style: {
            color: 'fff'
          }
        },
        title: {
          text: null,
        },
      },
      series: [
      {
        name: "Stop Time",
        showInLegend: false,
        // borderColor: null,
        data: [10, 20 , 5],
        color: '#8ba9f8',
        pointWidth: 15
      }
      ],
      tooltip: {
        valueSuffix: 'Mins'
      }
    };
    this.stopChart = new Chart(this.stopOptions);
  }

  MileChart() {
    this.mileOptions = {
      chart: {
        backgroundColor: '#f9f9f8',
        height: 200,
        // width: 373,
        type: 'line',
        style: {
          color: 'white',
        },
      },
      legend: {
        itemStyle: {
          color: 'black'
        },
        align: 'center',
        verticalAlign: 'top',
        floating: false,
        style: {
          color: '#fff'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Miles',
        style: {
          color: 'black'
        }
      },
      xAxis: {
        tickInterval: 1,
        // type: 'datetime',
        // categories: time,
        labels: {
          enabled: true,
          style: {
            color: 'black'
          },
        },
      },
      yAxis: {
        gridLineColor: 'transparent',
        labels: {
          format: '{value}',
          style: {
            color: 'fff'
          }
        },
        title: {
          text: null,
        },
      },
      series: [
      {
        name: "Miles",
        showInLegend: false,
        // borderColor: null,
        data: [10, 20 , 5],
        color: '#8ba9f8',
        pointWidth: 15
      }
      ],
      tooltip: {
        valueSuffix: 'Miles'
      }
    };
    this.mileChart = new Chart(this.mileOptions);
  }

  UnauthorizedMileChart() {
    this.unauthorizedMileOptions = {
      chart: {
        backgroundColor: '#f9f9f8',
        height: 200,
        // width: 373,
        type: 'line',
        style: {
          color: 'white',
        },
      },
      legend: {
        itemStyle: {
          color: 'black'
        },
        align: 'center',
        verticalAlign: 'top',
        floating: false,
        style: {
          color: '#fff'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Unauthorized Miles',
        style: {
          color: 'black'
        }
      },
      xAxis: {
        tickInterval: 1,
        // type: 'datetime',
        // categories: time,
        labels: {
          enabled: true,
          style: {
            color: 'black'
          },
        },
      },
      yAxis: {
        gridLineColor: 'transparent',
        labels: {
          format: '{value}',
          style: {
            color: 'fff'
          }
        },
        title: {
          text: null,
        },
      },
      series: [
      {
        name: "Unauthorized Miles",
        showInLegend: false,
        // borderColor: null,
        data: [10, 20 , 5],
        color: '#8ba9f8',
        pointWidth: 15
      }
      ],
      tooltip: {
        valueSuffix: 'Miles'
      }
    };
    this.unauthorizedMileChart = new Chart(this.unauthorizedMileOptions);
  }

  TripChart() {
    this.tripOptions = {
      chart: {
        backgroundColor: '#f9f9f8',
        height: 200,
        // width: 373,
        type: 'line',
        style: {
          color: 'white',
        },
      },
      legend: {
        itemStyle: {
          color: 'black'
        },
        align: 'center',
        verticalAlign: 'top',
        floating: false,
        style: {
          color: '#fff'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Trips',
        style: {
          color: 'black'
        }
      },
      xAxis: {
        tickInterval: 1,
        // type: 'datetime',
        // categories: time,
        labels: {
          enabled: true,
          style: {
            color: 'black'
          },
        },
      },
      yAxis: {
        gridLineColor: 'transparent',
        labels: {
          format: '{value}',
          style: {
            color: 'fff'
          }
        },
        title: {
          text: null,
        },
      },
      series: [
      {
        name: "Trips",
        showInLegend: false,
        // borderColor: null,
        data: [10, 20 , 5],
        color: '#8ba9f8',
        pointWidth: 15
      }
      ],
      tooltip: {
        valueSuffix: 'Miles'
      }
    };
    this.tripChart = new Chart(this.tripOptions);
  }

  getParams() {
    var today = this.searchtodate;
    var yesterday = this.searchfromdate;
    let body = {
      "username":"info@dataagile.com",
      "password":"conquest",
      "fromDate": yesterday,
      "toDate":today
    };
    return body;
  }

  loadVehicle() {
    var body = {
      "username": "info@dataagile.com",
      "password": "conquest"
    }
    this.databotService.getVehicleLocations(this.getParams()).subscribe(res => {
      var data = res['data']['locations'];
      for(let item of data) {
        var icon;
        var size;
        if(item['personName'] == this.driver) {
          this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: new google.maps.LatLng(item.latitude, item.longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false
          });
          if(item['speed'] == '0') {
            icon = '../../assets/truck-stop.png';
            size = new google.maps.Size(15, 15);
          }else{
            icon = '../../assets/truck-dir.png';
            size = new google.maps.Size(15, 15);
          }
          var image = {
            url: icon,
            scaledSize: size,
          };
          // var image = {
          //   url: '../../assets/images/warehouse.png',
          //   scaledSize: new google.maps.Size(50, 50),
          // };
          var startmarker = new google.maps.Marker({
            position: new google.maps.LatLng(item.latitude, item.longitude),
            map: this.map,
            icon:image
          });
        }
      }
      this.UpdateMarker(this.map, startmarker);
      this.initInterval = setInterval(() => {
        this.UpdateMarker(this.map, startmarker);
      }, 10000);
    });
  }

  UpdateMarker(map, startmarker) {
    var $this = this;
    var body = {
      "username": "info@dataagile.com",
      "password": "conquest"
    }
    this.databotService.getVehicleLocations(this.getParams()).subscribe(res => {
      var data = res['data']['locations'];
      for(let item of data) {
        var icon;
        var size;
        var deviceStatus;
        if(item['personName'] == this.driver) {
          if(item['speed'] == '0') {
            icon = '../../assets/truck-stop.png';
            size = new google.maps.Size(15, 15);
          }else{
            icon = '../../assets/truck-dir.png';
            size = new google.maps.Size(15, 15);
          }
          var image = {
            url: icon,
            scaledSize: size,
          };
          var infowindow = new google.maps.InfoWindow();
          var geocoder = new google.maps.Geocoder();
          var latlong = new google.maps.LatLng(item['latitude'], item['longitude']);
          geocoder.geocode({ 'location': latlong }, function (res, status) {
            if (status == 'OK') {
              var currentLocation = res[0].formatted_address;
              // console.log(currentLocation);
              $this.location = currentLocation;
            }
          });
          if(!item['battery']) {
            deviceStatus = 'Disconnected';
          }else{
            deviceStatus = 'Connected';
          }
          // this.showVehicle(item,map);
          // map.setCenter(new google.maps.LatLng(item.latitude, item.longitude));
          startmarker.setPosition(new google.maps.LatLng(item.latitude, item.longitude));
          startmarker.setIcon(image);
          startmarker.addListener('mouseover', function () {
            infowindow = new google.maps.InfoWindow({
                // content:'<b><p style="color:#0472b0;text-weight:bold">' + 'Driver Name:' + item['personName'] + '</p></b>'
                // +'<b><p style="color:#0472b0;text-weight:bold">' + 'Fuel:' + item['fuelLevel'] + '</p></b>'
                // +'<b><p style="color:#0472b0;text-weight:bold">' + 'Battery:' + item['battery'] + '</p></b>'
                // +'<b><p style="color:#0472b0;text-weight:bold">' + 'Speed:' + item['speed'] + '</p></b>'

                // tslint:disable-next-line: max-line-length
                content:'<b ><p style="color:white; background:black;text-weight:bold; padding:5px;">' + 'Driver Name&nbsp;:&nbsp;' + item['personName'] + '</p></b>'
                // tslint:disable-next-line: max-line-length
                +'<b style="display:inline-block;"><p style="color:black;text-weight:bold; ">' + ' <img src="../assets/fuel.jpg" style="width: 22px;"> Fuel&nbsp;&nbsp:&nbsp;' + item['fuelLevel'] + '</p></b>'
                // tslint:disable-next-line: max-line-length
                +'<b style="display:inline-block;"><p style="color:black;text-weight:bold; margin-left:30px;">' + ' <i class="fa fa-battery-quarter" aria-hidden="true"></i> Battery&nbsp;:&nbsp;' + item['battery'] + '</p></b>'
                // tslint:disable-next-line: max-line-length
                +'<b style="display:inline-block;"><p style="color:black;text-weight:bold; margin-left:30px;">' + ' <img src="../assets/speed.jpg">Speed&nbsp;:&nbsp;' + item['speed'] + '</p></b><br>'
                // tslint:disable-next-line: max-line-length
                +'<b style=""><p style="color:black;float:left;margin-left: 6px;font-family: sans-serif;">' + '<img src="../assets/odometer.png" style="width:18px">&nbsp;Odo&nbsp;:&nbsp;' + item['virtualOdo'] + '</p></b>'
                // tslint:disable-next-line: max-line-length
                +'<b style="display:inline-block; float:right;font-family: sans-serif;margin-right: 19px;"><p style="color:black;text-weight:bold;">' + '<img src="../assets/battery.png" style="width:16px"> Device Status&nbsp;:&nbsp;' + deviceStatus + '</p></b>'
            });
            infowindow.open(map, startmarker);
          });
          startmarker.addListener('mouseout', function() {
            infowindow.close(map, startmarker);
          });
          google.maps.event.addListener(map, "click", function(event) {
            infowindow.close(map, startmarker);
        });
        }
      }
    });
  }

  getvehicleAlerts() {
    this.highSpeed = 0;
    this.hrsSpeed = [];
    this.alerts = 0;
    this.databotService.getVehicleAlerts(this.getParams()).subscribe(data => {
      for(let item of data['data']['alerts']) {
        if(item['deviceNumber'] == this.imei) {
             this.alerts = this.alerts + 1;
             this.VIN = item['vin'];
             let alerttime = moment(item['alertDateTime']).format('YYYY-MM-DD  hh:mm:ss A');
             this.alertArray.push({'Device Serial Number': item['deviceSerialNumber'], 'Device Type': item['deviceTypeDescription'], 'Alert': item['alertShortDesc'], 'Alert Description': item['alertDesc'], 'Alert Time': alerttime});
             this.columns = Object.keys(this.alertArray[0]);
             // this.columns.splice(0, 1);
             this.alertitemResource = new DataTableResource(this.alertArray);
             this.alertitemResource.count().then((count: any) => this.itemCount = count);
             this.reloadItems(this.param);
            if (item['alertCode'] == 'HIGH_SPEED') {
              this.hrsSpeedChart(this.hrsSpeed);
              this.highSpeed = this.highSpeed + 1;
              let highspeed = 1;
              let alertHrs = moment(item['alertDateTime']).format('H:mm:ss');
              this.alertHrs.push(alertHrs);
              this.hrsSpeed.push(highspeed);
            }
        }
      }
      let speed = this.hrsSpeed;
      let alerthrs = this.alertHrs;
      this.HarshEvents('','',this.highSpeed);
      this.speedOptions.xAxis.categories = alerthrs;
      this.speedOptions.series[0].data = speed;
      this.hoursSpeedChart = new Chart(this.speedOptions);
    });
  }

  getIdlingAllDevices() {
    var today = Date.now();
    var yesterday = Date.now() - 1000 * 60 * 60 * 24 * 6;   // current date's milliseconds - 1,000 ms * 60 s * 60 mins * 24 hrs * (# of days beyond one to go back)
    var yest = new Date(yesterday);
    let body = {
      "username": "info@dataagile.com",
      "password": "conquest",
      "fromDate": this.searchfromdate,
      "toDate": this.searchtodate
    }
    this.databotService.getVehicleStops(body).subscribe(res => {
      var stops = res['data']['stops'];
      this.getIdlingEvents(stops);
    });
  }

  vehicleDDChange(event) {
    //  let data = [50];
    //   this.options.series[0].data = data;
    //   this.hourschart = new Chart(this.options);
    // this.hourschart.addPoint(100);
    this.imei = event.currentTarget.value;
    this.getDeviceEvents(this.imei);
    this.gettripevent();
    clearInterval(this.getUpdateVehicleInterval);
  }

  loadData() {
    // this.getDeviceEvents(this.imei);
    // this.gettripevent();var body = {
    var body = { "username": "info@dataagile.com",
      "password": "conquest"
    }
    this.databotService.getVehicleLocations(this.getParams()).subscribe(data =>{
      var mapdata = data['data']['locations'];
      console.log(mapdata);
      let vehicles = [];
      for (let item of mapdata) {
        if(this.username == 'melrosepark') {
           if(item['fleetId'] == 129900) {
              vehicles.push(item);
              this.mapdata = vehicles;
           }
        }else {
          // console.log('insie else');
          this.mapdata = mapdata;
        }
      }
    });
  }

  getDeviceEvents(number) {
    this.hrs = [];
    this.hrsAcc = [];
    this.hrsBraking = [];
    var $this = this;
    $this.todayAcceleration = 0;
    $this.todayBraking = 0;
    var today = Date.now();
    var yesterday = Date.now() - 1000 * 60 * 60 * 24 * 2;
    var yest = new Date(yesterday);
    let body = {
      "username": "info@dataagile.com",
      "password": "conquest",
      "imei": this.imei,
      "fromDate": this.searchfromdate,
      "toDate": this.searchtodate
    }
    this.databotService.getVehicleHistory(body).subscribe(result => {
      var positions = result['data']['positions'];
      var stops = result['data']['stops'];
      // this.driver = result['data']['positions'][0]['personName'];
      // this.gettripevent();
      this.getIdlingEvents(stops);
      // this.loadmapdata();
      this.loadVehicle();
      this.getRoute();
      // this.getvehicleAlerts();
      for (let item of positions) {
        let today = moment(Date.now()).format('MMM DD, YYYY');
        let todayfromdata = moment(item['date']).format('MMM DD, YYYY');
        var dateString = moment().subtract(1, 'days').toString();
        var dateObj = new Date(dateString);
        var momentObj = moment(dateObj);
        var momentString = momentObj.format('MMM DD, YYYY');
        this.hrsAccChart(this.hrsAcc);
        this.hrsBrakingChart(this.hrsBraking);
        if (item['behaviorCd'] == 'HAC') {
          let acceleration = 1;
          let hoursAccTrack = moment(item['date']).format('H:mm:ss');
          $this.todayAcceleration = $this.todayAcceleration + 1;
          this.hrsAcc.push(acceleration);
          this.hrs.push(hoursAccTrack);
          // this.hrsAccChart(this.hrsAcc);
        }
        if (item['behaviorCd'] == 'HBR') {
          let braking = 1;
          $this.todayBraking = $this.todayBraking + 1;
          this.hrsBraking.push(braking);
          let hoursAccTrack = moment(item['date']).format('H:mm:ss');
          this.hrs.push(hoursAccTrack);
          // this.hrsBrakingChart(this.hrsBraking);

        }
      }
      this.Acceleration(this.todayAcceleration);
      this.Braking(this.todayBraking);
      let accelerationData = this.hrsAcc;
      let brakingData = this.hrsBraking;
      let hrs = this.hrs;
      if (this.accOptions) {
        this.accOptions.xAxis.categories = hrs;
        this.accOptions.title.text = 'Acceleration';
        this.accOptions.series[0].data = accelerationData;
        this.hoursAccChart = new Chart(this.accOptions);
      }
      if (this.brakingOptions) {
        this.brakingOptions.xAxis.categories = hrs;
        this.brakingOptions.series[0].data = brakingData;
        this.hoursBrakingChart = new Chart(this.brakingOptions);
      }
      
      // this.options.series[0].data = data;
      // this.hoursAccChart = new Chart(this.options);
      // this.harshEventsOptions.title.text = 'Harsh Events';
      // this.harshevents = new Chart(this.harshEventsOptions);
      this.HarshEvents(this.todayAcceleration, this.todayBraking, this.highSpeed);
      let score = (this.todayAcceleration+this.todayBraking+this.highSpeed);
      this.behaviourCard(score);
      this.speedCard(this.highSpeed);
    });
  }
  behaviourCard(score) {
      if(score == 0) {
        this.behaviourcard = 100;
        this.ScoreChart(100, 0);
      }
      if(score >= 1 && score <= 5) {
        this.behaviourcard = 80;
        this.ScoreChart(80, 20);
      } if(score >= 6 && score <= 10) {
        this.behaviourcard = 60;
        this.ScoreChart(60, 40);
      } if(score >= 11 && score <= 15) {
        this.behaviourcard = 40;
        this.ScoreChart(40, 60);
      } if(score >= 16 && score <= 20) {
        this.behaviourcard = 20;
        this.ScoreChart(20, 80);
      }else{
        this.ScoreChart(10, 90);
      }
  }
  speedCard(speed) {
    if(speed == 0) {
      this.speedcard = 100;
    }
    if(speed >= 1 && speed <= 5) {
      this.speedcard = 80;
    } if(speed >= 6 && speed <= 10) {
      this.speedcard = 60;
    } if(speed >= 11 && speed <= 15) {
      this.speedcard = 40;
    } if(speed >= 16 && speed <= 20) {
      this.speedcard = 20;
    }
}
Acceleration(acc) {
  if(acc == 0) {
    this.accelerationScore = 100;
  }
  if(acc >= 1 && acc <= 5) {
    this.accelerationScore = 80;
  } if(acc >= 6 && acc <= 10) {
    this.accelerationScore = 60;
  } if(acc >= 11 && acc <= 15) {
    this.accelerationScore = 40;
  } if(acc >= 16 && acc <= 20) {
    this.accelerationScore = 20;
  }
}
Braking(acc) {
  if(acc == 0) {
    this.brakingScore = 100;
  }
  if(acc >= 1 && acc <= 5) {
    this.brakingScore = 80;
  } if(acc >= 6 && acc <= 10) {
    this.brakingScore = 60;
  } if(acc >= 11 && acc <= 15) {
    this.brakingScore = 40;
  } if(acc >= 16 && acc <= 20) {
    this.brakingScore = 20;
  }
}
Idle(acc) {
  if(acc == 0) {
    this.idleTime = 100;
  }
  if(acc >= 1 && acc <= 5) {
    this.idleTime = 80;
  } if(acc >= 6 && acc <= 10) {
    this.idleTime = 60;
  } if(acc >= 11 && acc <= 15) {
    this.idleTime = 40;
  } if(acc >= 16 && acc <= 20) {
    this.idleTime = 20;
  }
}
Stop(acc) {
  if(acc == 0) {
    this.stopTime = 100;
  }
  if(acc >= 1 && acc <= 5) {
    this.stopTime = 80;
  } if(acc >= 6 && acc <= 10) {
    this.stopTime = 60;
  } if(acc >= 11 && acc <= 15) {
    this.stopTime = 40;
  } if(acc >= 16 && acc <= 20) {
    this.stopTime = 20;
  }
}
  /**Get engine idling events */
  getIdlingEvents(stops) {
    let $this = this;
    $this.todayIdling = 0;
    $this.lastDayIdling = 0;
    $this.weekIdling = 0;
    $this.stoptime = 0
    $this.idlingtime = 0;
    this.stopmins = [];
    this.idlemins = [];
    this.idleArray = [];
    this.stopArray = [];
    // tslint:disable-next-line: forin
    for (var item in stops) {
      let today = moment(Date.now()).format('MMM DD, YYYY');
      let todayfromdata = moment(stops[item]['beginDate']).format('MMM DD, YYYY');
      let endfromdate = moment(stops[item]['endDate']).format('MMM DD, YYYY');
      var dateString = moment().subtract(1, 'days').toString();
      var dateObj = new Date(dateString);
      var momentObj = moment(dateObj);
      var momentString = momentObj.format('MMM DD, YYYY');
      if (stops[item]['deviceNbr'] == this.imei && (stops[item]['stopType'] == 'Engine Off')) {
        $this.stoptime = $this.stoptime + stops[item]['duration'];
        let duration = stops[item]['duration'];
        let stoptime = moment(stops[item]['beginDate']).format('hh:mm:ss');
        let tripId = stops[item]['id'];
        let tripStart = moment(stops[item]['beginDate']).format('YYYY-MM-DD hh:mm:ss A');
        let tripEnd = moment(stops[item]['endDate']).format('YYYY-MM-DD hh:mm:ss A');
        let location = stops[item]['street'] + ',' + stops[item]['city'] + ',' + stops[item]['stateCode'] + ',' + stops[item]['countryCode'] + ',' + stops[item]['postalCode'] ;
        let stoptype = stops[item]['stopType'];
        this.stopArray.push({'Trip Start': tripStart, 'Trip End': tripEnd,'Duration (Mins)': duration, 'Location': location, 'Stop Type': stoptype});
        this.stopidletime.push(stoptime);
        this.stopmins.push(stops[item]['duration']);
        this.StopChart();

        this.stopColumns = Object.keys(this.stopArray[0]);
        // this.columns.splice(0, 1);
        this.stopitemResource = new DataTableResource(this.stopArray);
        this.stopitemResource.count().then((count: any) => this.stopitemCount = count);
        this.stopreloadItems(this.param);
      }
      if (stops[item]['deviceNbr'] == this.imei && (stops[item]['stopType'] == 'Idling')) {
        $this.idlingtime = $this.idlingtime + stops[item]['duration'];
        this.idlemins.push(stops[item]['duration']);
        let duration = stops[item]['duration'];
        let tripId = stops[item]['id'];
        let tripStart = moment(stops[item]['beginDate']).format('YYYY-MM-DD  hh:mm:ss A');
        let tripEnd = moment(stops[item]['endDate']).format('YYYY-MM-DD hh:mm:ss A');
        let location = stops[item]['street'] + ',' + stops[item]['city'] + ',' + stops[item]['stateCode'] + ',' + stops[item]['countryCode'] + ',' + stops[item]['postalCode'] ;
        let stoptype = stops[item]['stopType'];
        this.idleArray.push({'Trip Start': tripStart, 'Trip End': tripEnd, 'Duration (Mins)': duration, 'Location': location, 'Stop Type': stoptype});
        this.IdleChart();

        this.idleColumns = Object.keys(this.idleArray[0]);
        // this.columns.splice(0, 1);
        this.idleitemResource = new DataTableResource(this.idleArray);
        this.idleitemResource.count().then((count: any) => this.idleitemCount = count);
        this.idlereloadItems(this.param);
      }
    }
    let stopintime = this.stopidletime;
    this.stoptimeDaysFormat = this.convertoDays(this.stoptime);
    this.idlingtimeDaysFormat = this.convertoDays(this.idlingtime);
    this.HoursChart(this.drivetime, this.idlingtime, this.stoptime);
    this.Idle(this.idlingtime);
    this.Stop(this.stoptime);
    let idlemins = this.idlemins;
    let stopmins = this.stopmins;
    if(this.idleOptions) {
      this.idleOptions.xAxis.categories = stopintime;
      this.idleOptions.series[0].data = idlemins;
      this.idleChart = new Chart(this.idleOptions);
    }
    if(this.stopOptions) {
      this.stopOptions.xAxis.categories = stopintime;
      this.stopOptions.series[0].data = stopmins;
      this.stopChart = new Chart(this.stopOptions);
    }
  }

  gettripevent() {
    var today = Date.now();
    var yesterday = Date.now() - 1000 * 60 * 60 * 24 * 2;
    let body = {
      "username": "info@dataagile.com",
      "password": "conquest",
      "fromDate": this.searchfromdate,
      "toDate": this.searchtodate
    }
    this.databotService.getVehicleTrips(body).subscribe(result => {
      this.trips = result['data']['trips'];
      console.log(this.trips);
      this.getTotalDriveTime(this.trips);
    });
  }

  getTotalDriveTime(trips) {
    var $this = this;
    this.drivetime = 0;
    this.miles = 0;
    this.totaltrips = 0;
    this.unauthorizedMiles = 0;
    this.drivemins = [];
    this.mile = [];
    this.unauthorizedMile = [];
    this.trip = [];
    this.tripArray = [];
    for (let item of trips) {
      this.DriveChart('');
      this.MileChart();
      this.UnauthorizedMileChart();
      this.TripChart();
      if (item['driverName'] == this.driver) {
        // this.DriveChart('');
        // this.MileChart();
        // this.UnauthorizedMileChart();
        // this.TripChart();
        this.miles = this.miles + item['authorizedMiles'];
        this.unauthorizedMiles = this.unauthorizedMiles + item['unauthorizedMiles'];
        $this.drivetime = $this.drivetime + item['durationMinutes'];
        this.totaltrips = this.totaltrips + 1;
        this.startLat = item['startLatitude'];
        this.startLong = item['startLongitude'];
        this.endLat = item['endLatitude'];
        this.endLong = item['endLongitude'];
        let hoursTrack = moment(item['startDateTime']).format('hh:mm:ss');
        let startTime =  moment(item['startDateTime']).format('YYYY-MM-DD hh:mm:ss A');
        let endTime = moment(item['endDateTime']).format('YYYY-MM-DD hh:mm:ss A');
        this.drivehrs.push(hoursTrack);
        this.drivemins.push(item['durationMinutes']);
        this.mile.push(item['authorizedMiles']);
        this.unauthorizedMile.push(item['unauthorizedMiles']);
        this.trip.push(this.totaltrips);
        this.tripArray.push({'Start Time': startTime,'End Time': endTime, 'Start Address': item['startAddress'],  'End Address': item['endAddress'], 'Duration(Mins)': item['durationMinutes'], 'Authorized Miles': item['authorizedMiles'], 'Total Miles': item['distanceMiles']});
        
        this.tripColumns = Object.keys(this.tripArray[0]);
        // this.columns.splice(0, 1);
        this.tripitemResource = new DataTableResource(this.tripArray);
        this.tripitemResource.count().then((count: any) => this.tripitemCount = count);
        this.tripreloadItems(this.param);
      }
    }
    this.drivetimeDaysFormat = this.convertoDays(this.drivetime);
    // this.driveOptions.xAxis.categories = drivetime;
    let drivemins = this.drivemins;
    let mile = this.mile;
    let unauthorizedMile = this.unauthorizedMile;
    let trip = this.trip;
    let drivehrs = this.drivehrs;
    if(this.driveOptions) {
      this.driveOptions.xAxis.categories = drivehrs;
      this.driveOptions.series[0].data = drivemins;
      this.driveChart = new Chart(this.driveOptions);
    }
    if(this.mileOptions) {
      this.mileOptions.xAxis.categories = drivehrs;
      // this.mileOptions.title.text = 'Miles Per Day';
      this.mileOptions.series[0].data = mile;
      this.mileChart = new Chart(this.mileOptions);
    }
    if(this.unauthorizedMileOptions) {
      this.unauthorizedMileOptions.xAxis.categories = drivehrs;
      this.unauthorizedMileOptions.series[0].data = unauthorizedMile;
      this.unauthorizedMileChart = new Chart(this.unauthorizedMileOptions);
    }
    if(this.tripOptions) {
      this.tripOptions.xAxis.categories = drivehrs;
      this.tripOptions.series[0].data = trip;
      this.tripChart = new Chart(this.tripOptions);
    }
    // this.milesPerDayOptions.title.text = 'Miles Per Day';
    // this.milesPerDayOptions.series[0].data = mile;
    this.mileschart = new Chart(this.milesPerDayOptions);
    this.HoursChart(this.drivetime, this.idlingtime, this.stoptime);
    this.MilesChart(this.miles, this.totaltrips, this.unauthorizedMiles);
    //  this.updateHarshEventsChart();
  }

  getRoute() {
    this.databotService.getVehicleRouteLocations(this.getParams(), this.imei).subscribe(data => {
        this.locations = data['data']['locations'];
        this.driver = this.locations[0]['personName'];
        // this.loadRoute(this.locations);
        // this.loadRoute();
    });
  }

  getRouteMap() {
    this.loadRoute();
  }

  loadRoute() {
    var lat_lng = new Array();
    var $this = this;
    var routes = [];
    for(let item of this.locations) {
      var lat = item['latitude'];
      var long = item['longitude'];
      routes.push({lat: lat, lng: long});
    }
    var myLatlng = new google.maps.LatLng(lat, long);
    var centerLatlng = new google.maps.LatLng(routes[Math.round(this.locations.length/2)]);
      
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: centerLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      });
      var flightPath = new google.maps.Polyline({
        path: routes,
        geodesic: true,
        strokeColor: 'green',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
    
      flightPath.setMap(map);
      // bounds.extend(myLatlng);
      // bounds.extend(marker.position);
    // lat_lng.push(myLatlng);
    // var infowindow = new google.maps.InfoWindow();
    // var startmarker;
    // var endmarker;
    // var i;
    // var image = {
    //   url: '../../assets/images/warehouse.png',
    //   scaledSize: new google.maps.Size(50, 50),
    // };
    // // startmarker = new google.maps.Marker({
    // //   position: new google.maps.LatLng(lat, long),
    // //   map: map,
    // //   icon:image
    // // });
    // // endmarker = new google.maps.Marker({
    // //   position: new google.maps.LatLng(this.endLat, this.endLong),
    // //   map: map,
    // //   icon:image
    // // });
    // }
    // // map.fitBounds(bounds);
    // var service = new google.maps.DirectionsService();
    // var delayFactor = 0;

    // function m_get_directions_route(request, latlong) {
    //   service.route(request, function (result, status) {
    //     if (status === google.maps.DirectionsStatus.OK) {
    //       //Process you route here
    //       var bounds = new google.maps.LatLngBounds();
    //       var lineSymbol = {
    //         path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    //       };
    //       var polylineoptns = {
    //         strokeOpacity: 0.8,
    //         strokeWeight: 3,
    //         strokeColor: 'green',
    //         // icons: [{
    //         //    icon: lineSymbol
    //         // }],
    //         map: map,
    //       };

    //       var path = new google.maps.MVCArray();
    //       var poly = new google.maps.Polyline(polylineoptns);
    //       poly.setPath(path);
    //       // bounds.extend(path);
    //       for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
    //         path.push(result.routes[0].overview_path[i]);
    //         bounds = result.routes[0].bounds;
    //         // marker.setPosition(result.routes[0].overview_path[i]);
    //       }
    //       map.fitBounds(bounds);
    //       var zoom = map.getZoom();
    //       map.setZoom(zoom > 10 ? 13 : zoom);
    //     }
    //     // else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
    //     //   // delayFactor++;
    //     //   // setTimeout(function () {
    //     //   //   m_get_directions_route(request, latlong);
    //     //   // }, delayFactor * 1000);
    //     // } 
    //     else {
    //       //console.log("Route: " + status);
    //     }
    //   });
    // }


    // for (i = 0; i < lat_lng.length; i++) {
    //   if ((i + 1) < lat_lng.length) {
    //     var src = lat_lng[i];
    //     var des = lat_lng[i + 1];
    //     var request = {
    //       origin: src,
    //       destination: des,
    //       travelMode: google.maps.DirectionsTravelMode.DRIVING
    //     };
    //     m_get_directions_route(request, lat_lng);
    //   }
    // }
  }

  convertoDays(input) {

    // set minutes to seconds
    var seconds = input * 60

    // calculate (and subtract) whole days
    var days = Math.floor(seconds / 86400);
    seconds -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(seconds / 3600) % 24;
    seconds -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(seconds / 60) % 60;

    let drivetimeDaysFormat =  days + 'd ' + hours + 'h ' + minutes + 'm ';
    // console.log('str:', this.drivetimeDaysFormat);
    return drivetimeDaysFormat;
  }

  reloadItems(params: any) {
    this.alertitemResource.query(params).then((items: any) => this.items = items);
  }

  stopreloadItems(params: any) {
    this.stopitemResource.query(params).then((items: any) => this.stopitems = items);
  }
  idlereloadItems(params: any) {
    this.idleitemResource.query(params).then((items: any) => this.idleitems = items);
  }
  tripreloadItems(params: any) {
    this.tripitemResource.query(params).then((items: any) => this.tripitems = items);
  }

  close() {
    this.minimapshow = false;
    this.idleminimapshow = false;
    this.stopminimapshow = false;
  }

  rowDTClick(event) {
    this.minimapshow = true;
    var locArray = [];
    var startloc = event.row.item['Start Address'];
    var endloc = event.row.item['End Address'];
     locArray.push(startloc, endloc);
     var geocoder = new google.maps.Geocoder();
     var startlatitude;
     var startlongitude;
     var mapOptions;
     var map;
     
       geocoder.geocode({ 'address': startloc}, function (res, status) {
        if (status == 'OK') {
          startlatitude =  res[0].geometry.location.lat();
          startlongitude = res[0].geometry.location.lng();
          var latLng = new google.maps.LatLng(startlatitude, startlongitude);
          mapOptions = {
            center: new google.maps.LatLng(startlatitude, startlongitude),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("minimap"),
        mapOptions);
        for(let item of locArray) {
          geocoder.geocode({ 'address': item}, function (res, status) {
            if (status == 'OK') {
              startlatitude =  res[0].geometry.location.lat();
              startlongitude = res[0].geometry.location.lng();
              var startmarker = new google.maps.Marker({
                position: new google.maps.LatLng(startlatitude, startlongitude),
                map: map,
                // title: data[i].title
              });
            }
          });
        }
        }
      });
     
  }

  rowIdleClick(event) {
    this.idleminimapshow = true;
    var loc = event.row.item['Location'];
    var geocoder = new google.maps.Geocoder();
     var startlatitude;
     var startlongitude;
     var mapOptions;
     var map;
     geocoder.geocode({ 'address': loc}, function (res, status) {
      if (status == 'OK') {
        startlatitude =  res[0].geometry.location.lat();
        startlongitude = res[0].geometry.location.lng();
        var latLng = new google.maps.LatLng(startlatitude, startlongitude);
        mapOptions = {
          center: new google.maps.LatLng(startlatitude, startlongitude),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("idleminimap"),
      mapOptions);
      var startmarker = new google.maps.Marker({
        position: new google.maps.LatLng(startlatitude, startlongitude),
        map: map,
        // title: data[i].title
      });
      }
    });
  }

  rowStopClick(event) {
    this.stopminimapshow = true;
    var loc = event.row.item['Location'];
    var geocoder = new google.maps.Geocoder();
     var startlatitude;
     var startlongitude;
     var mapOptions;
     var map;
     geocoder.geocode({ 'address': loc}, function (res, status) {
      if (status == 'OK') {
        startlatitude =  res[0].geometry.location.lat();
        startlongitude = res[0].geometry.location.lng();
        var latLng = new google.maps.LatLng(startlatitude, startlongitude);
        mapOptions = {
          center: new google.maps.LatLng(startlatitude, startlongitude),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("stopminimap"),
      mapOptions);
      var startmarker = new google.maps.Marker({
        position: new google.maps.LatLng(startlatitude, startlongitude),
        map: map,
        // title: data[i].title
      });
      }
    });
  }


}
