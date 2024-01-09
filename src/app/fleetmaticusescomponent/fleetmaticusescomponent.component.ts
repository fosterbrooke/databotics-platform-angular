import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { DatabotService } from './../core/databot.service';
import { OnDestroy, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { Chain, analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { Router, ActivatedRoute } from '@angular/router';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';
import * as moment from 'moment';
declare const google: any;
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
var schedule = require('node-schedule');
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-fleetmaticusescomponent',
  templateUrl: './fleetmaticusescomponent.component.html',
  styleUrls: ['./fleetmaticusescomponent.component.css']
})
export class FleetmaticusescomponentComponent implements OnInit, OnDestroy {

  selected: any;
  fleetOverview = true;
  driverProfile: any;
  trackOrder: any;
  custFeed: any;
  tenantOverview: boolean;
  Overview: boolean;
  options: any;
  harshEventsOptions : any;
  milesPerDayOptions : any;
  harshevents: any;
  hourschart: any;
  speedingchart: any;
  mileschart: any;
  mapdata: any = [];
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
  stoptime: number;
  idlingtime: any;
  trips: any;
  drivetime: number;
  miles: any;
  totaltrips: any;
  unauthorizedMiles: any;

  map: any;
  initmap: any;
  distance: number;
  harshbraking: number = 0;
  highspeed: number = 0;
  rapidacceleration: number = 0;
  fromdate: any;
  todate: any;
  searchtodate: number;
  searchfromdate: number;
  initInterval: any;
  searchInterval: any;
  today: any;
  inittodate: any;
  initfromdate: any;
  marker: any ;
  drivetimeDaysFormat: any;
  username: any;
  totalTrucks: any;
  vehicleTrackerInfo: any = [];
  stompClient: any;
  WEBSOCKET_URL: any = 'http://192.168.99.1:6060/linxuplocation/';
  gmarkers: any = [];
  vehicleinfo: any = [];
  totalalertTypes: any = [];
  alertTypes: any;
  signalmodemalert: any = 0;
  checkValue: number = 0;
  totalDrivers: any = [];
  trucksInfo: any = [];
  DTArray: any = [];
  idleArray: any = [];

  columns: string [];
  itemResource: any = new DataTableResource([]);
  itemCount = 0;
  items: any = [];
  param: any = {offset: 0, limit: 25};

  DTcolumns: string [];
  DTitemResource: any = new DataTableResource([]);
  DTitemCount = 0;
  DTitems: any = [];
  DTparam: any = {offset: 0, limit: 25};
  pagelimits = [10, 20, 30];

  Idlecolumns: string [];
  IdleitemResource: any = new DataTableResource([]);
  IdleitemCount = 0;
  Idleitems: any = [];
  Idleparam: any = {offset: 0, limit: 100};

  speedArray: any = [];
  speedcolumns: string [];
  speeditemResource: any = new DataTableResource([]);
  speeditemCount = 0;
  speeditems: any = [];
  speedparam: any = {offset: 0, limit: 25};

  HBArray: any = [];
  HBcolumns: string [];
  HBitemResource: any = new DataTableResource([]);
  HBitemCount = 0;
  HBitems: any = [];
  HBparam: any = {offset: 0, limit: 25};

  ACCArray: any = [];
  ACCcolumns: string [];
  ACCitemResource: any = new DataTableResource([]);
  ACCitemCount = 0;
  ACCitems: any = [];
  ACCparam: any = {offset: 0, limit: 25};

  flaskinfo: any;
  showmap: boolean;
  locationData_: any;

  onTripTrucksArray: any = [];
  onTripTrucks: any;
  minimapshow = false;
  currentlocation: any;
  truckmapshow = false;
  metadata: any;

  vehicleData: any= [];
  constructor(public databotService: DatabotService, private router: Router) {
    let searchtodate = Date.now();
    let todateStamp = new Date(searchtodate).getTime();
    this.searchtodate = todateStamp;
    this.searchfromdate = Date.now() - 1000 * 60 * 60 * 24 * 1;
    this.loadVehicles(this.searchfromdate, this.searchtodate);
    // this.fetchAllData();
    this.username = localStorage.getItem('username');
    if(this.username == 'melrosepark') {
       this.databotService.getMelroseInfo().subscribe(data => {
        //  console.log(data);
         this.flaskinfo = data;
       });
       this.getidleArrayMelInfo();
       this.getAlertMelInfo();
    } else {
      this.getidleArrayInfo();
      this.getAlertInfo();
      this.databotService.getAllInfo().subscribe(data => {
        // console.log(data);
        this.flaskinfo = data;
      });
      
    }
    this.showmap = false;
  }

  ngOnInit() {
    this.today = Date.now();
    var timestamp = new Date(this.today).getTime();
    var todate = new Date(timestamp).getDate();
    var fromdate = todate - 1;
    var tomonth = new Date(timestamp).getMonth() + 1;
    var toyear = new Date(timestamp).getFullYear();
    var original_date = tomonth + '/' + todate + '/' + toyear;
    var previousdate = tomonth + '/' + fromdate + '/' + toyear;
    this.todate = original_date;
    this.fromdate = previousdate;
    this.selected = 1;
    // this.initializeWebSocketConnection();
    // this.getvehicleinfo();
    // this.livePushData();
    // this.getTotalAlerts();
    // this.gettripevent();
    // this.getIdlingAllDevices();
    // this.initInterval = setInterval(() => {
    //   this.fetchAllData();
    // }, 5000);
    this.updatemarkersdata(this.searchfromdate, this.searchtodate);
    setInterval(() => {
        this.updatemarkersdata(this.searchfromdate, this.searchtodate);
      }, 10000);
    this.getIdleInfoData();
    this.getMilesInfo();
    this.HarshEvents('','','');
    this.MilesChart('', '', '');
    this.HoursChart('', '', '');
    this.loadData();
      // setInterval(() => {
      //   this.checkSignalModemAlert();
      // }, 10000);

  }

  livePushData() {
    // const socket = new SockJS('http://192.168.5.103:6060/linxuplocation');
    // this.stompClient = Stomp.over(socket);
 
    // const _this = this;
    // this.stompClient.connect({}, function (frame) {
    //   // _this.setConnected(true);
    //   // console.log('Connected: ' + frame);
 
    //   _this.stompClient.subscribe('/location/databot', function (data) {
    //     // console.log(data.body);
    //   });
    // });

  }


  getvehicleinfo() {
    this.databotService.getLocationInfo().subscribe(data => {
      // console.log(data);
    });
  }

  initializeWebSocketConnection() {
    // let ws = new SockJS('http://192.168.5.103:6060/linxuplocation');
    // this.stompClient = Stomp.over(ws);
    // let that = this;
    // this.stompClient.connect({}, (frame: any) => {
    //   that.stompClient.subscribe('/location/databot', (scoredata) => {
    //     const scoreJson = JSON.parse(scoredata.body);
    //     console.log(scoreJson);
    //   });
    // });
  }

  fetchAllData() {
    this.inittodate = Date.now();
    this.initfromdate = Date.now() - 1000 * 60 * 60 * 24 * 1;
    this.getIdlingAllDevices();
    this.gettripevent();
    this.getAlerts();
    // this.loadVehicles(this.searchfromdate, this.searchtodate);
    // this.loadmap(this.searchfromdate, this.searchtodate);
    //this.getvehicleLocations();
  }
  ngOnDestroy() {
    clearInterval(this.searchInterval);
    clearInterval(this.initInterval);
  }
  loadData() {
    // this.getDeviceEvents(this.imei);
    // this.gettripevent();var body = {
    var body = { "username": "info@dataagile.com",
      "password": "conquest"
    }
    this.databotService.getVehicleLocations(this.getParams()).subscribe(data =>{
      var dropdowndata = data['data']['locations'];
      console.log(dropdowndata);
      let vehicles = [];
      for (let item of dropdowndata) {
        if(this.username == 'melrosepark') {
           if(item['fleetId'] == 129900) {
              vehicles.push(item);
              this.vehicleData = vehicles;
           }
        }else {
          // console.log('insie else');
          this.vehicleData = dropdowndata;
        }
      }
    });
  }
  
  loadVehicles(fromDate, toDate) {
    var body = {
      "username": "info@dataagile.com",
      "password": "conquest"
    }
    this.databotService.getVehicleLocations(body).subscribe(res => {
      var data = res['data']['locations'];
      var mapdata = data;
      this.mapdata = data;
      this.loadmap();

      // var $this = this;
      // this.totalTrucks = 0;
      // var infowindow = new google.maps.InfoWindow();
      // var geocoder = new google.maps.Geocoder();
      // let payload: { queryParams: { vehicle: string, drivername: string, location: string, driverid: string, searchfromdate: number, searchtodate: number } };
      // this.map = new google.maps.Map(document.getElementById('map'), {
      //   zoom: 12,
      //   center: new google.maps.LatLng(this.mapdata[4]['latitude'], this.mapdata[4]['longitude']),
      //   mapTypeId: google.maps.MapTypeId.ROADMAP,
      //   mapTypeControl: false,
      //   streetViewControl: false
      // });
      // for(let item of this.mapdata) {
      //   var marker;
      //   var icon;
      //   var size;
        
      //   if(this.username == 'melrosepark') {
      //     if(item['fleetId'] == 129900) {
      //       if(item['speed'] == '0') {
      //         icon = '../../assets/truck-stop.png';
      //         size = new google.maps.Size(15, 15);
      //       }else{
      //         icon = '../../assets/truck-dir.png';
      //         size = new google.maps.Size(15, 15);
      //       }
      //       var image = {
      //         url: icon,
      //         scaledSize: size,
      //         rotation: [90]
      //       };
      //       this.totalTrucks = this.totalTrucks + 1;
      //       this.marker = new google.maps.Marker({
      //         position: new google.maps.LatLng(item['latitude'], item['longitude']),
      //         map: this.map,
      //         icon: image
      //       });
      //       var latlong1 = new google.maps.LatLng(item['latitude'], item['longitude']);
      //       attachMessage(this.map, this.marker, latlong1, item['personName'], item['fuelLevel'], item['battery'], item['speed'], item['imei'], item['driverId'], item['virtualOdo']);  
      //     }
      //   }else{
      //     if(item['speed'] == '0') {
      //       icon = '../../assets/truck-stop.png';
      //       size = new google.maps.Size(15, 15);
      //     }else{
      //       icon = '../../assets/truck-dir.png';
      //       size = new google.maps.Size(15, 15);
      //     }
      //     var image = {
      //       url: icon,
      //       scaledSize: size,
      //       rotation: [90]
      //     };
      //     this.totalTrucks = this.totalTrucks + 1;
      //     this.marker = new google.maps.Marker({
      //       position: new google.maps.LatLng(item['latitude'], item['longitude']),
      //       map: this.map,
      //       icon: image
      //     });
      //     var latlong1 = new google.maps.LatLng(item['latitude'], item['longitude']);
      //     attachMessage(this.map, this.marker, latlong1, item['personName'], item['fuelLevel'], item['battery'], item['speed'], item['imei'], item['driverId'], item['virtualOdo']);
      //     // this.showLocations(item, map, fromDate, toDate);
      //   }
      //   }
      // function attachMessage(map, marker, latlong, person, fuel, battery, speed, devicenumber, driverid, odo) {
      //   marker.addListener('mouseover', function () {
      //     geocoder.geocode({ 'location': latlong }, function (res, status) {
      //   if (status == 'OK') {
      //     var runningStatus;
      //     var deviceStatus;
      //     var currentLocation = res[0].address_components[2].long_name;
      //     if(speed == '0') {
      //       runningStatus = 'Stopped';
      //     }else{
      //       runningStatus = 'Running';
      //     }
      //     if(!battery) {
      //       deviceStatus = 'Disconnected';
      //     }else{
      //       deviceStatus = 'Connected';
      //     }

      //    infowindow = new google.maps.InfoWindow({
      //     // tslint:disable-next-line: max-line-length
      //     content:'<div class="row" style="margin:0px"><div div class="row" style="margin:0px;background:black;width:360px"><div class="col-md-7" style="padding:0px"><span style="color:white;font-family: sans-serif; background:black;text-weight:bold;">' + '<i class="fa fa-map-marker" aria-hidden="true"></i> Current Location:' + currentLocation + '</span></div>'
      //     // tslint:disable-next-line: max-line-length
      //     +'<div class="col-md-5" style="padding:0px;"><span style="color:white; background:black;text-weight:bold;font-family: sans-serif;">' + 'Driver Name:' + person + '</span></div></div><br>'
      //     // tslint:disable-next-line: max-line-length
      //     +'<div class="row" style="margin:0px"><div class="col-md-4" style="padding:0px"><b style=""><span style="color:black;float:left;font-family: sans-serif;">' + '<img src="../assets/fuel.jpg" style="width: 22px;">&nbsp;&nbsp;Fuel&nbsp;:&nbsp;' + fuel + '</span></b></div>'
      //     // tslint:disable-next-line: max-line-length
      //     +'<div class="col-md-4" style="padding:0px"><b style="display:inline-block;" ><span style="color:black;text-weight:bold;font-family: sans-serif;">' + '<i class="fa fa-battery-quarter" aria-hidden="true"></i> Battery&nbsp;:&nbsp;' + battery +'V'+ '</span></b></div>'
      //     // tslint:disable-next-line: max-line-length
      //     +'<div class="col-md-4" style="padding:0px"><b style="display:inline-block; float:right;font-family: sans-serif;"><span style="color:black;text-weight:bold">' + '<img src="../assets/speed.jpg"> Speed&nbsp;:&nbsp;' + speed +'mph'+ '</span></b>' + '</div></div>'
      //     // tslint:disable-next-line: max-line-length
      //     +'<div class="row" style="margin:0px"><div class="col-md-4" style="padding:0px"><b style=""><span style="color:black;float:left;font-family: sans-serif;">' + '<img src="../assets/odometer.png" style="width:18px">&nbsp;Odo&nbsp;:&nbsp;' + odo + '</span></b></div>'
      //     // tslint:disable-next-line: max-line-length
      //     +'<div class="col-md-8" style="padding:0px;margin-left: -50px;"><b style="display:inline-block; float:right;font-family: sans-serif;"><span style="color:black;text-weight:bold;">' + '<img src="../assets/battery.png" style="width:16px"> Device Status&nbsp;:&nbsp;' + deviceStatus + '</span></b></div></div></div>'
      //     });
      //     // console.log(infowindow);
      //     infowindow.open(map, marker);
      //    }
      //     });

      //   });
      //   marker.addListener('mouseout', function() {
      //     infowindow.close(map, marker);
      //   });
      //   marker.addListener(map, "click", function(event) {
      //     infowindow.close(map, marker);
      //   });
      //   marker.addListener('click', function () {
      //     // var latlong1 = new google.maps.LatLng(lat, long);
      //     geocoder.geocode({ 'location': latlong }, function (res, status) {
      //       if (status == 'OK') {
      //         // var currentLocation = res[0].address_components[0].long_name + ',' + res[0].address_components[1].short_name + ',' + res[0].address_components[6].long_name;
      //         var currentLocation = res[0].formatted_address;
      //         payload = {
      //           queryParams: {
      //             vehicle: JSON.stringify(devicenumber),
      //             drivername: JSON.stringify(person),
      //             location: JSON.stringify(currentLocation),
      //             driverid: JSON.stringify(driverid),
      //             searchfromdate: fromDate,
      //             searchtodate: toDate
      //           }
      //         };
      //         // console.log(payload);
      //         $this.router.navigate(['/fleetmatics'], payload);
      //         // alert(this.warehousename)
      //         // infowindow.open(this.map, marker);
    
      //       } else {
      //         // alert('Geocode was not successful for the following reason: ' + status);
      //       }
      //     });
      //   });
      // }
      // this.UpdateMarker(this.map, this.marker, infowindow);
      // setInterval(() => {
      //   this.UpdateMarker(this.map, this.marker, infowindow);
      // }, 5000);
    });
  }

  loadmap() {
    var mapOptions = {
      center: new google.maps.LatLng(this.mapdata[5].latitude, this.mapdata[5].longitude),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map = new google.maps.Map(document.getElementById("map"),
  mapOptions);

  // add the markers to the map if they have been loaded already.
  if (this.gmarkers.length > 0) {
      for (var i = 0; i < this.gmarkers.length; i++) {
          this.gmarkers[i].setMap(this.map);
      }
  }
  }

  highSpeedData(positions,highspeed){
    var $this = this;
    $this.todayAcceleration = 0;
    $this.todayBraking = 0;
    for (let item of positions) {
      let today = moment(Date.now()).format('MMM DD, YYYY');
      let todayfromdata = moment(item['date']).format('MMM DD, YYYY');
      var dateString = moment().subtract(1, 'days').toString();
      var dateObj = new Date(dateString);
      var momentObj = moment(dateObj);
      var momentString = momentObj.format('MMM DD, YYYY');
      // this.hrsAccChart(this.hrsAcc);
      // this.hrsBrakingChart(this.hrsBraking);
      if (item['behaviorCd'] == 'HAC') {
        let acceleration = 1;
        let hoursAccTrack = moment(item['date']).format('H:mm:ss');
        $this.todayAcceleration = $this.todayAcceleration + 1;
        // this.hrsAcc.push(acceleration);
        // this.hrs.push(hoursAccTrack);
        // this.hrsAccChart(this.hrsAcc);
      }
      if (item['behaviorCd'] == 'HBR') {
        let braking = 1;
        $this.todayBraking = $this.todayBraking + 1;
        // this.hrsBraking.push(braking);
        let hoursAccTrack = moment(item['date']).format('H:mm:ss');
        // this.hrs.push(hoursAccTrack);
        // this.hrsBrakingChart(this.hrsBraking);

      }
    }
    console.log("highspeed",this.todayAcceleration,this.todayBraking,highspeed);
    this.HarshEvents(this.todayAcceleration, this.todayBraking, highspeed);
    
  }
  events(positions){
    this.getIdlingAllDevices();
    let harshbraking = 0;
    let highspeed = 0;
    let acceleration = 0;
    this.databotService.getVehicleAlerts(this.getParams()).subscribe(data => {
      for (let item of data['data']['alerts']) {
        // console.log(item['alertCode']);
        if (item['alertCode'] == 'HIGH_SPEED') {
          highspeed = highspeed + 1;
          // console.log(this.harshbraking);
        }
      }
      this.highspeed = highspeed;
      this.highSpeedData(positions,this.highspeed);
    });
   
  }
  updatemarkersdata(fromdate, todate) {
    this.vehicleinfo = [];
    var body = {
      "username": "info@dataagile.com",
      "password": "conquest"
    }
    this.databotService.getVehicleLocations(body).subscribe(res => {
      var data = res['data']['locations'];
      console.log("data",data);
      this.events(data);
      var mapdata = data;
      this.mapdata = data;
      this.totalTrucks = 0;
      if(this.username == 'melrosepark') {
            // if(item['fleetId'] == 129900) {}
            for(let item of this.mapdata) {
                 if(item['fleetId'] == 129900) {
                   this.totalTrucks = this.totalTrucks + 1;
                   this.vehicleinfo.push(item);
                 }else {

                 }
            }
            this.updatemarkers(fromdate, todate);
      }else {
        for (let item of this.mapdata) {
          this.totalTrucks = this.totalTrucks + 1;
          this.vehicleinfo.push(item);
        }
        this.updatemarkers(fromdate, todate);
      }
      this.vehicleTracker();
      this.trucksinfo()
      this.onTripTrucksInfo(fromdate, todate);
    });
  }

  HarshEvents(acc, braking, speed) {
    console.log("acc",acc);
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

  updatemarkers(fromdate, todate) {
    var bounds = new google.maps.LatLngBounds();
    var geocoder = new google.maps.Geocoder();
    var icon;
    var size;
    var currentLocation;
    var $this = this;
    let payload: { queryParams: { vehicle: string, drivername: string, location: string, driverid: string, searchfromdate: number, searchtodate: number } };
    // delete all existing markers first
    for (var i = 0; i < this.gmarkers.length; i++) {
        this.gmarkers[i].setMap(null);
    }
    this.gmarkers = [];

    // add new markers from the JSON data
    for (var i = 0;  i < this.vehicleinfo.length; i++) {
       var latLng = new google.maps.LatLng(this.vehicleinfo[i].latitude, this.vehicleinfo[i].longitude);
        bounds.extend(latLng);
        if(this.vehicleinfo[i]['speed'] == '0') {
                  icon = '../../assets/truck-stop.png';
                  size = new google.maps.Size(15, 15);
                }else{
                   if(this.vehicleinfo[i].heading == 'N') {
                    icon = '../../assets/up.png';
                    size = new google.maps.Size(15, 15);
                   }else if(this.vehicleinfo[i].heading == 'S') {
                    icon = '../../assets/down.png';
                    size = new google.maps.Size(15, 15);
                   }else if(this.vehicleinfo[i].heading == 'E' || this.vehicleinfo[i].heading == 'NE' || this.vehicleinfo[i].heading == 'SE') {
                    icon = '../../assets/right.png';
                    size = new google.maps.Size(15, 15);
                   }else if(this.vehicleinfo[i].heading == 'W' || this.vehicleinfo[i].heading == 'NW' || this.vehicleinfo[i].heading == 'SW') {
                    icon = '../../assets/left.png';
                    size = new google.maps.Size(15, 15);
                  }
                }
                var image = {
                  url: icon,
                  scaledSize: size,
                  rotation: [90]
                };
        var marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            icon: image
            // title: data[i].title
        });
        var infoWindow = new google.maps.InfoWindow();
        (function (marker, data) {
          var runningStatus;
          var deviceStatus;
          // var currentLocation = res[0].address_components[2].long_name;
          if(data.speed == '0') {
            runningStatus = 'Stopped';
          }else{
            runningStatus = 'Running';
          }
          if(!data.battery) {
            deviceStatus = 'Disconnected';
          }else{
            deviceStatus = 'Connected';
          }
            google.maps.event.addListener(marker, "mouseover", function (e) {
              var latlong = new google.maps.LatLng(data.latitude, data.longitude);
              var currentlocation;
              geocoder.geocode({ 'location': latlong }, function (res, status) {
                  if (status == 'OK') {
                    currentlocation = res[0].address_components[2].long_name;
                  }
              
               infoWindow.setContent('<div class="row" style="margin:0px"><div div class="row" style="margin:0px;background:black;width:360px"><div class="col-md-7" style="padding:0px"><span style="color:white;font-family: sans-serif; background:black;text-weight:bold;">' + '<i class="fa fa-map-marker" aria-hidden="true"></i> Current Location:' + currentlocation + '</span></div>'
                // tslint:disable-next-line: max-line-length
                +'<div class="col-md-5" style="padding:0px;"><span style="color:white; background:black;text-weight:bold;font-family: sans-serif;">' + 'Driver Name:' + data['personName'] + '</span></div></div><br>'
                // tslint:disable-next-line: max-line-length
                +'<div class="row" style="margin:0px"><div class="col-md-4" style="padding:0px"><b style=""><span style="color:black;float:left;font-family: sans-serif;">' + '<img src="../assets/fuel.jpg" style="width: 22px;">&nbsp;&nbsp;Fuel&nbsp;:&nbsp;' + data['fuelLevel'] + '</span></b></div>'
                // tslint:disable-next-line: max-line-length
                +'<div class="col-md-4" style="padding:0px"><b style="display:inline-block;" ><span style="color:black;text-weight:bold;font-family: sans-serif;">' + '<i class="fa fa-battery-quarter" aria-hidden="true"></i> Battery&nbsp;:&nbsp;' + data['battery'] +'V'+ '</span></b></div>'
                // tslint:disable-next-line: max-line-length
                +'<div class="col-md-4" style="padding:0px"><b style="display:inline-block; float:right;font-family: sans-serif;"><span style="color:black;text-weight:bold">' + '<img src="../assets/speed.jpg"> Speed&nbsp;:&nbsp;' + data['speed'] +'mph'+ '</span></b>' + '</div></div>'
                // tslint:disable-next-line: max-line-length
                +'<div class="row" style="margin:0px"><div class="col-md-4" style="padding:0px"><b style=""><span style="color:black;float:left;font-family: sans-serif;">' + '<img src="../assets/odometer.png" style="width:18px">&nbsp;Odo&nbsp;:&nbsp;' + Math.round(data['virtualOdo']) + '</span></b></div>'
                // tslint:disable-next-line: max-line-length
                +'<div class="col-md-8" style="padding:0px;margin-left: -50px;"><b style="display:inline-block; float:right;font-family: sans-serif;"><span style="color:black;text-weight:bold;">' + '<img src="../assets/battery.png" style="width:16px"> Device Status&nbsp;:&nbsp;' + deviceStatus + '</span></b></div></div></div>');
            infoWindow.open(this.map, marker);
            });
          });

          google.maps.event.addListener(marker, "mouseout", function () {
            infoWindow.close(this.map, marker);
          });

            google.maps.event.addListener(marker, "click", function () {
              var latlng = new google.maps.LatLng(data.latitude, data.longitude);
              var currentlocation;
              geocoder.geocode({ 'location': latlng }, function (res, status) {
                if (status == 'OK') {
                  // var currentLocation = res[0].address_components[0].long_name + ',' + res[0].address_components[1].short_name + ',' + res[0].address_components[6].long_name;
                  currentlocation = res[0].formatted_address;
                  payload = {
                    queryParams: {
                      vehicle: JSON.stringify(data.imei),
                      drivername: JSON.stringify(data.personName),
                      location: JSON.stringify(currentlocation),
                      driverid: JSON.stringify(data.driverId),
                      searchfromdate: fromdate,
                      searchtodate: todate
                    }
                  };
                  console.log(payload);
                  $this.router.navigate(['/fleetmatics'], payload);
                  // alert(this.warehousename)
                  // infowindow.open(this.map, marker);
        
                } else {
                  // alert('Geocode was not successful for the following reason: ' + status);
                }
              });
            });
        })(marker, this.vehicleinfo[i]);

        
        this.gmarkers.push(marker);
    }

  }


  vehicleTracker() {
    this.vehicleTrackerInfo = [];
    this.trucksInfo = [];
    for(let item of this.mapdata) {
      var icon;
      var status;
      if(this.username == 'melrosepark') {
        if(item['fleetId'] == 129900) {
          if(item['speed'] == '0') {
            status = 'Stopped';
            icon = '../../assets/truck-stop.png';
          }else{
            status = 'Running';
            icon = '../../assets/truck-dir.png';
          }
            this.vehicleTrackerInfo.push({'Driver': item['personName'], 'VIN': item['vin'], 'Speed': item['speed'] ,'Status': status, 'icon': icon, 'IMEI': item['imei'], 'lat': item['latitude'], 'long': item['longitude'], 'DriverId': item['driverId'], 'fromdate': this.searchfromdate, 'todate': this.searchtodate});
            // this.trucksInfo.push({'VIN': item['vin'], 'Driver Name': item['personName'],'Status': status});
            // console.log(this.trucksInfo);
            // this.trucksInfo.push({'VIN': item['vin'], 'Driver Name': item['personName'],'Status': status});
           
            
        }
      }else {
        if(item['speed'] == '0') {
          status = 'Stopped';
          icon = '../../assets/truck-stop.png';
        }else{
          status = 'Running';
          icon = '../../assets/truck-dir.png';
        }
          this.vehicleTrackerInfo.push({'Driver': item['personName'], 'VIN': item['vin'], 'Speed': item['speed'] ,'Status': status, 'icon': icon, 'IMEI': item['imei'], 'lat': item['latitude'], 'long': item['longitude'], 'DriverId': item['driverId'], 'fromdate': this.searchfromdate, 'todate': this.searchtodate});
          // this.trucksInfo.push({'VIN': item['vin'], 'Driver Name': item['personName'],'Status': status});
        }
     }
//      this.columns = Object.keys(this.trucksInfo[0]);
//  // this.columns.splice(0, 1);
//  this.itemResource = new DataTableResource(this.trucksInfo);
//  this.itemResource.count().then((count: any) => this.itemCount = count);
//  this.reloadItems(this.param);
     
  }

  trucksinfo() {
    
    var geocoder = new google.maps.Geocoder();
    var $this = this;
    $this.trucksInfo = [];
    for(let item of this.mapdata) {
      var icon;
      var status;
      if(this.username == 'melrosepark') {
        if(item['fleetId'] == 129900) {
          if(item['speed'] == '0') {
            status = 'Stopped';
            icon = '../../assets/truck-stop.png';
          }else{
            status = 'Running';
            icon = '../../assets/truck-dir.png';
          }
          // var currentlocation;
          // var latlong = new google.maps.LatLng(item.latitude, item.longitude);
          // geocoder.geocode({ 'location': latlong }, function (res, status) {
          //     if (status == 'OK') {
          //       currentlocation = res[0].address_components[2].long_name;
          //       $this.currentlocation = currentlocation;
          //       console.log($this.currentlocation);
                
          //     }
          //   });
          this.trucksInfo.push({'VIN': item['vin'], 'Driver Name': item['personName'], 'Status': status});
        }
      }else {
        if(item['speed'] == '0') {
          status = 'Stopped';
          icon = '../../assets/truck-stop.png';
        }else{
          status = 'Running';
          icon = '../../assets/truck-dir.png';
        }
        var currentlocation;
          var latlong = new google.maps.LatLng(item.latitude, item.longitude);
          // geocoder.geocode({ 'location': latlong }, function (res, status) {
          //   //   var r = []
          //     if (status == 'OK') {
                // currentlocation = res[0].address_components[2].long_name;
                // $this.currentlocation = currentlocation;
                // console.log($this.currentlocation);
                // r.push({'VIN': item['vin'], 'Driver Name': item['personName'], 'Location': $this.currentlocation,'Status': status});
                // console.log(r);
                // $this.trucksInfo.push(r);
            //   }
            // });
            // console.log($this.trucksInfo);
            this.trucksInfo.push({'VIN': item['vin'], 'Driver Name': item['personName'], 'Status': status});
      }
  }
                this.columns = Object.keys($this.trucksInfo[0]);
                // this.columns.splice(0, 1);
                this.itemResource = new DataTableResource($this.trucksInfo);
                this.itemResource.count().then((count: any) => this.itemCount = count);
                this.reloadItems(this.param);
  
}

  reloadItems(params: any) {
    this.itemResource.query(params).then((items: any) => this.items = items);
  }

  onTripTrucksInfo(fromdate, todate) {
    this.onTripTrucksArray = [];
    this.DTArray = [];
    var icon;
    var size;
    this.onTripTrucks = 0;
    for(let item of this.mapdata) {
     if(this.username == 'melrosepark') {
       if(item['fleetId'] == 129900) {
         if(item['speed'] > '0') {
           this.onTripTrucks = this.onTripTrucks + 1;
           if(item.heading == 'N') {
             icon = '../../assets/up.png';
             size = new google.maps.Size(15, 15);
            }else if(item.heading == 'S') {
             icon = '../../assets/down.png';
             size = new google.maps.Size(15, 15);
            }else if(item.heading == 'E' || item.heading == 'NE' || item.heading == 'SE') {
             icon = '../../assets/right.png';
             size = new google.maps.Size(15, 15);
            }else if(item.heading == 'W' || item.heading == 'NW' || item.heading == 'SW') {
             icon = '../../assets/left.png';
             size = new google.maps.Size(15, 15);
           }
            this.onTripTrucksArray.push({'VIN': item['vin'], 'Driver': item['personName'],'icon': icon, 'DriverId': item['driverId'], 'lat': item['latitude'], 'long': item['longitude'],'speed': item['speed']+ 'MPHs'});
         }
       }
     }else {
       if (item['speed'] > '0') {
         this.onTripTrucks = this.onTripTrucks + 1;
         if(item.heading == 'N') {
           icon = '../../assets/up.png';
           size = new google.maps.Size(15, 15);
          }else if(item.heading == 'S') {
           icon = '../../assets/down.png';
           size = new google.maps.Size(15, 15);
          }else if(item.heading == 'E' || item.heading == 'NE' || item.heading == 'SE') {
           icon = '../../assets/right.png';
           size = new google.maps.Size(15, 15);
          }else if(item.heading == 'W' || item.heading == 'NW' || item.heading == 'SW') {
           icon = '../../assets/left.png';
           size = new google.maps.Size(15, 15);
         }
         this.onTripTrucksArray.push({'VIN': item['vin'], 'Driver': item['personName'],'icon': icon, 'DriverId': item['driverId'], 'lat': item['latitude'], 'long': item['longitude'], 'speed': item['speed'] + 'MPHs'});
         
       }
     }
     // this.DTcolumns = Object.keys(this.DTArray[0]);
     // this.DTitemResource = new DataTableResource(this.DTArray);
     // this.DTitemResource.count().then((count: any) => this.DTitemCount = count);
     // this.DTreloadItems(this.DTparam);
    }
 }

 OnTripRoute(item) {
  console.log("item",item);
  var $this = this;
  let payload: { queryParams: { vehicle: string, drivername: string, location: string, driverid: string, searchfromdate: number, searchtodate: number } };
  var geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(item.lat, item.long);
            var currentlocation;
            geocoder.geocode({ 'location': latlng }, function (res, status) {
              if (status == 'OK') {
                currentlocation = res[0].formatted_address;
                payload = {
                  queryParams: {
                    vehicle: JSON.stringify(item.IMEI),
                    drivername: JSON.stringify(item.Driver),
                    location: JSON.stringify(currentlocation),
                    driverid: JSON.stringify(item.DriverId),
                    searchfromdate: item.fromdate,
                    searchtodate: item.todate
                  }
                };
                console.log(payload);
                $this.router.navigate(['/fleetmatics'], payload);
              }
            });
}

  getIdlingAllDevices() {
    // console.log(moment().subtract(1, 'days').toString()+ "hello ");
    var today = Date.now();
    var yesterday = Date.now() - 1000 * 60 * 60 * 24 * 6;   // current date's milliseconds - 1,000 ms * 60 s * 60 mins * 24 hrs * (# of days beyond one to go back)
    var yest = new Date(yesterday);
    // console.log(yest+""+yesterday);​
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

  driverData(idlingtime,stoptime){
    let body = {
      "username": "info@dataagile.com",
      "password": "conquest",
      "fromDate": this.searchfromdate,
      "toDate": this.searchtodate
    }
    this.databotService.getVehicleTrips(body).subscribe(result => {
      this.trips = result['data']['trips'];
      // console.log(this.trips);
      this.getTotalDriveTime(this.trips,idlingtime,stoptime);
    });
  }
  /**Get engine idling events */
  getIdlingEvents(stops) {
    // console.log(stops);
    
    this.todayIdling = 0;
    this.lastDayIdling = 0;
    this.weekIdling = 0;
    this.stoptime = 0
    this.idlingtime = 0;
    this.idleArray = [];
    // tslint:disable-next-line: forin
    for (var item in stops) {
      let today = moment(Date.now()).format('MMM DD, YYYY');
      let todayfromdata = moment(stops[item]['beginDate']).format('MMM DD, YYYY');
      let endfromdate = moment(stops[item]['endDate']).format('MMM DD, YYYY');
      var dateString = moment().subtract(1, 'days').toString();
      var dateObj = new Date(dateString);
      var momentObj = moment(dateObj);
      var momentString = momentObj.format('MMM DD, YYYY');
      if (stops[item]['stopType'] == 'Engine Off') {
        this.stoptime = this.stoptime + stops[item]['duration'];
      }
      if (stops[item]['stopType'] == 'Idling'){
        this.idlingtime = this.idlingtime + stops[item]['duration'];
        
      }
      // if(this.username == 'melrosepark') {
      //   // console.log('inside mel');
      //   if(stops[item]['lastName'] == 'PW') {
      //     // console.log('inside pw');
      //     if (stops[item]['stopType'] == 'Idling') {
      //       this.idlingtime = this.idlingtime + 1;
      //       // let duration = stops[item]['duration'];
      //       // let tripId = stops[item]['id'];
      //       // let tripStart = moment(stops[item]['beginDate']).format('YYYY-MM-DD  hh:mm:ss A');
      //       // let tripEnd = moment(stops[item]['endDate']).format('YYYY-MM-DD hh:mm:ss A');
      //       // let location = stops[item]['street'] + stops[item]['city'] + stops[item]['countryCode'];
      //       // let stoptype = stops[item]['stopType'];
      //       // this.idleArray.push({'Trip Id': tripId, 'Trip Start': tripStart, 'Trip End': tripEnd,'Duration': duration, 'Location': location, 'Stop Type': stoptype});
      //       // console.log(this.idleArray);
      //     }
      //   }
      // }else {
      //   this.idlingtime = this.idlingtime + 1;
      //   // if (stops[item]['stopType'] == 'Idling') {
      //   //   let duration = stops[item]['duration'];
      //   //   let tripId = stops[item]['id'];
      //   //   let tripStart = moment(stops[item]['beginDate']).format('YYYY-MM-DD  hh:mm:ss A');
      //   //   let tripEnd = moment(stops[item]['endDate']).format('YYYY-MM-DD hh:mm:ss A');
      //   //   let location = stops[item]['street'] + stops[item]['city'] + stops[item]['countryCode'];
      //   //   let stoptype = stops[item]['stopType'];
      //   //   this.idleArray.push({'Trip Id': tripId, 'Trip Start': tripStart, 'Trip End': tripEnd,'Duration': duration, 'Location': location, 'Stop Type': stoptype});
      //   // // }
        
      // }
          // // console.log(this.idleArray);
          // this.Idlecolumns = Object.keys(this.idleArray[0]);
          // // this.columns.splice(0, 1);
          // this.IdleitemResource = new DataTableResource(this.idleArray);
          // this.IdleitemResource.count().then((count: any) => this.IdleitemCount = count);
          // this.IdlereloadItems(this.Idleparam);
      
    }
    this.driverData(this.idlingtime,this.stoptime)
  }

  IdlereloadItems(params: any) {
    this.IdleitemResource.query(params).then((items: any) => this.Idleitems = items);
  }

  gettripevent() {
    var today = Date.now();
    var yesterday = Date.now() - 1000 * 60 * 60 * 24 * 1;
    let body = {
      "username": "info@dataagile.com",
      "password": "conquest",
      "fromDate": this.searchfromdate,
      "toDate": this.searchtodate
    }
    this.databotService.getVehicleTrips(body).subscribe(result => {
      this.trips = result['data']['trips'];
      // console.log(this.trips);
      // this.getTotalDriveTime(this.trips);
    });
  }

  getTotalDriveTime(trips,idlingtime,stoptime) {
    this.miles = 0;
    this.totaltrips = 0;
    this.unauthorizedMiles = 0;
    let drivetime = 0;
    this.distance = 0;
    this.DTArray = [];
    for (let item of trips) {
      drivetime = drivetime + item['durationMinutes'];
      this.miles = this.miles + item['authorizedMiles'];
      this.unauthorizedMiles = this.unauthorizedMiles + item['unauthorizedMiles'];
      this.totaltrips = this.totaltrips + 1;
      // console.log(item);
      // if(this.username == 'melrosepark') {
      //   // console.log(item);
      //    if(item['driverName'] == 'MP1 PW' || item['driverName'] == 'MP2 PW' ||item['driverName'] == 'MP3 PW' || item['driverName'] == 'MP4 PW' || item['driverName'] == 'MP5 PW' || item['driverName'] == 'MP6 PW' ||item['driverName'] == 'MP7 PW'||item['driverName'] == 'MP8 PW'||item['driverName'] == 'MP9 PW'||item['driverName'] == 'MP10 PW') {
      //     drivetime = drivetime + item['durationMinutes'];
      //     this.distance = this.distance + item['distanceMiles'];
      //     let startTime =  moment(item['startDateTime']).format('YYYY-MM-DD hh:mm:ss A');
      //     let endTime = moment(item['endDateTime']).format('YYYY-MM-DD hh:mm:ss A');
      //     this.DTArray.push({'Start Time': startTime, 'Start Address': item['startAddress'], 'End Time': endTime, 'End Address': item['endAddress'], 'Duration': item['durationMinutes'], 'Authorized Miles': item['authorizedMiles'], 'Total Miles': item['distanceMiles']});
      //     // console.log('drive time inside');
      //    }
      // }else {
      //   // console.log('drive time else');
      //   // console.log(item);
      //   drivetime = drivetime + item['durationMinutes'];
      //   this.distance = this.distance + item['distanceMiles'];
      //   let startTime =  moment(item['startDateTime']).format('YYYY-MM-DD hh:mm:ss A');
      //   let endTime = moment(item['endDateTime']).format('YYYY-MM-DD hh:mm:ss A');
      //   this.DTArray.push({'Start Time': startTime, 'Start Address': item['startAddress'], 'End Time': endTime, 'End Address': item['endAddress'], 'Duration': item['durationMinutes'], 'Authorized Miles': item['authorizedMiles'], 'Total Miles': item['distanceMiles']});
      // }
    }
    // console.log(this.DTArray);
    // this.DTcolumns = Object.keys(this.DTArray[0]);
    // this.DTitemResource = new DataTableResource(this.DTArray);
    // this.DTitemResource.count().then((count: any) => this.DTitemCount = count);
    // this.DTreloadItems(this.DTparam);
    this.drivetime = drivetime;
    console.log("drivetime",this.drivetime,idlingtime,stoptime);
    this. HoursChart(this.drivetime, idlingtime, stoptime);
    this.MilesChart(this.miles, this.totaltrips, this.unauthorizedMiles);
    // this.convertoDays(this.drivetime);
  }
  DTreloadItems(params: any) {
    this.DTitemResource.query(params).then((items: any) => this.DTitems = items);
  }

  getParams() {
    var today = this.searchtodate;
    var yesterday = this.searchfromdate;
    let body = {
      "username": "info@dataagile.com",
      "password": "conquest",
      "fromDate": this.searchfromdate,
      "toDate": this.searchtodate
    };
    return body;
  }

  getAlerts() {
    let harshbraking = 0;
    let highspeed = 0;
    let acceleration = 0;
    this.databotService.getVehicleAlerts(this.getParams()).subscribe(data => {
      for (let item of data['data']['alerts']) {
        // console.log(item['alertCode']);
        if(this.username == 'melrosepark') {
           if(item['lastName'] == 'PW') {
              // console.log('inside pw');
              if (item['alertCode'] == 'HARSH_BRAKING') {
              harshbraking = harshbraking + 1;
              //  console.log(this.harshbraking);
              }
              if (item['alertCode'] == 'HIGH_SPEED') {
                highspeed = highspeed + 1;
                // console.log(this.harshbraking);
              }
              if (item['alertCode'] == 'RAPID_ACCELERATION') {
                acceleration = acceleration + 1;
                // console.log(this.rapidacceleration);
              }

           }
        }else {
          // console.log('inside else');
          if (item['alertCode'] == 'HARSH_BRAKING') {
            harshbraking = harshbraking + 1;
            //  console.log(this.harshbraking);
            }
            if (item['alertCode'] == 'HIGH_SPEED') {
              highspeed = highspeed + 1;
              // console.log(this.harshbraking);
            }
            if (item['alertCode'] == 'RAPID_ACCELERATION') {
              acceleration = acceleration + 1;
              // console.log(this.rapidacceleration);
            }
        }
        
        
      }
      this.harshbraking = harshbraking;
      this.highspeed = highspeed;
      this.rapidacceleration = acceleration;
    });
  }

  searchingBydate() {
    clearInterval(this.initInterval);
    this.searchtodate  = new Date(this.todate).getTime();
    this.searchfromdate = new Date(this.fromdate).getTime();
    this.loadVehicles(this.searchfromdate, this.searchtodate);
    this.gettripevent();
    this.getIdlingAllDevices();
    if(this.username == 'melrosepark') {
      this.getidleArrayMelInfoByDates(this.searchfromdate, this.searchtodate);
       this.getAlertMelInfoByDates(this.searchfromdate, this.searchtodate);
      this.databotService.getMelroseInfobyDates(this.searchfromdate, this.searchtodate).subscribe(data => {
        console.log(data);
        this.flaskinfo = data;
      });
   } else {
    this.getidleArrayInfoByDates(this.searchfromdate, this.searchtodate);
    this.getAlertInfoByDates(this.searchfromdate, this.searchtodate);
     this.databotService.getAllInfobyDates(this.searchfromdate, this.searchtodate).subscribe(data => {
       console.log(data);
       this.flaskinfo = data;
     });
   }
    // this.searchInterval = setInterval(() => {
    //   // console.log(this.searchfromdate, this.searchtodate);
    //   this.getAlerts();
    //   this.getIdlingAllDevices();
    //   this.gettripevent();
    //   // this.loadmap(this.searchfromdate, this.searchtodate);
    // }, 10000);
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

    this.drivetimeDaysFormat =  days + 'd ' + hours + 'h ' + minutes + 'm ';
    // console.log('str:', this.drivetimeDaysFormat);
  }
  getuserParams() {
    var today = Date.now();
    var yesterday = Date.now() - 1000 * 60 * 60 * 24 * 1;
    let body = {
      "username": "info@dataagile.com",
      "password": "conquest",
      "fromDate": this.searchfromdate,
      "toDate": this.searchtodate
    };
    return body;
  }

  vehicleDDChange(event) {
    var geocoder = new google.maps.Geocoder();
    let payload: { queryParams: { vehicle: string, drivername: string, location: string, driverid: string, searchfromdate: number, searchtodate: number } };
    var driver = event.target.value;
    var vhehicleobj = this.vehicleData.filter((item)=>{
      return item.personName == driver;
    })
    console.log(vhehicleobj);
    var $this = this;
    var latlng = new google.maps.LatLng(vhehicleobj[0].latitude, vhehicleobj[0].longitude);
    var currentlocation;
    geocoder.geocode({ 'location': latlng }, function (res, status) {
      if (status == 'OK') {
        // var currentLocation = res[0].address_components[0].long_name + ',' + res[0].address_components[1].short_name + ',' + res[0].address_components[6].long_name;
        currentlocation = res[0].formatted_address;
        payload = {
          queryParams: {
            vehicle: JSON.stringify(vhehicleobj[0].imei),
            drivername: JSON.stringify(vhehicleobj[0].personName),
            location: JSON.stringify(currentlocation),
            driverid: JSON.stringify(vhehicleobj[0].driverId),
            searchfromdate: $this.searchfromdate,
            searchtodate: $this.searchtodate
          }
        };
        console.log(payload);
        $this.router.navigate(['/fleetmatics'], payload);
        // alert(this.warehousename)
        // infowindow.open(this.map, marker);

      } else {
        // alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  getTotalAlerts() {
    this.totalalertTypes = [];
    this.totalDrivers = [];
    this.databotService.getVehicleAlerts(this.getParams()).subscribe(data => {
      // console.log(data);
      var alerts = data['data']['alerts'];
      this.alertTypes = data['data']['alerts'];
      this.totalalertTypes = alerts.reduce(function(a, d) {
        if (a.indexOf(d.alertCode) === -1) {
            a.push(d.alertCode);
        }
        return a;
    }, []);
    for(let item of this.alertTypes) {
      this.totalDrivers.push({'driver':item['firstName'], alerttype: item['alertCode']});
    }
    // console.log(this.totalDrivers);
    // this.filterAlert();
    // this.filterAlertByFleet();
    this.filterAlertByDriver();
    });
  }

  filterAlert() {
     var filteredAlerts = [];
     var alerts = [];
     var alert = 0;
     for(let item of this.totalalertTypes) {
       alert = 0;
       for(let items of this.alertTypes) {
         if(item == items['alertCode']) {
             alert = alert + 1;
         }
       }
       filteredAlerts.push({alerttype: item, alertvalue: alert});
     }
    // console.log(filteredAlerts);
    // alerts.push({'Idle End': filteredAlerts[0].item, 'Idle Start': filteredAlerts[1].item, 'RAPID_ACCELERATION': filteredAlerts[2].item,'NO_SIGNAL_MODEM': filteredAlerts[3].item,'FIRST_IGNITION_OF_DAY': filteredAlerts[4].item,'HARSH_BRAKING': filteredAlerts[5].item, 'HIGH_SPEED': filteredAlerts[6].item});
    // console.log(alerts);
    this.databotService.sendEmail(filteredAlerts).subscribe(data => {
        // console.log(data);
    });
  }

  filterAlertByFleet() {
    var filteredAlertsByFleet = [];
    var DA = [];
    var MP = [];
    var total = [];
    var alerts = [];
    var DAalert = 0;
    var MPalert = 0;
    var totalalert = 0;
    var TTalert = 0;
    for(let item of this.totalalertTypes) {
      TTalert = 0;
      DAalert = 0;
      MPalert = 0;
      totalalert = 0;
      for(let items of this.alertTypes) {
        if (item == items['alertCode']) {
          TTalert = TTalert + 1;
          if(items['fleetName'] == 'Data Agile') {
              DAalert = DAalert + 1;
          }else if(items['fleetName'] == 'Melrose Park') {
              MPalert = MPalert + 1;
          }else if(items['fleetName'] == 'GTito-Fleet') {
              totalalert = totalalert + 1;
          }
        }
        
      }
      filteredAlertsByFleet.push({alerttype: item, totalCount: TTalert, DA: DAalert, MP: MPalert, GT: totalalert});
      // DA.push({alerttype: item, alertvalue: DAalert});
      // MP.push({alerttype: item, alertvalue: MPalert});
      // total.push({alerttype: item, alertvalue: totalalert});
    }
  //  console.log(filteredAlertsByFleet);
   // alerts.push({'Idle End': filteredAlerts[0].item, 'Idle Start': filteredAlerts[1].item, 'RAPID_ACCELERATION': filteredAlerts[2].item,'NO_SIGNAL_MODEM': filteredAlerts[3].item,'FIRST_IGNITION_OF_DAY': filteredAlerts[4].item,'HARSH_BRAKING': filteredAlerts[5].item, 'HIGH_SPEED': filteredAlerts[6].item});
   // console.log(alerts);
   this.databotService.sendEmail(filteredAlertsByFleet).subscribe(data => {
       console.log(data);
   });
  }

  filterAlertByDriver() {
    var filterBydriver = [];
    var counts = {};
    for(let item of this.totalalertTypes) {
        counts = {};
        this.totalDrivers.forEach(element => {
          // counts[element.driver] = (item || 0) + 1
          counts[element.driver] = (counts[element.driver] || 0) + 1,
          counts['alerttype'] = item;
          if(element['alerttype']==item) {
            counts[element.driver] = (counts[element.driver] || 0) + 1,
            counts['alerttype'] = item;
          }
        });
      // filterBydriver.push({alerttype: item, D1: D1alert, D2: D2alert, D3: D3alert, D4: D4alert, frank: frankalert, MP1: mp1alert, MP2: mp2alert, MP3: mp3alert, MP4: mp4alert, MP5: mp5alert, MP6: mp6alert, MP7: mp7alert, MP8: mp8alert, MP9: mp9alert, REP: repalert, Toni: tonialert});
      // console.log(counts);
    }
  }

  checkSignalModemAlert() {
    this.databotService.getVehicleAlerts(this.getParams()).subscribe(data => {
      // console.log(data);
      var alert = 'NO_SIGNAL_MODEM';
      var alerts = data['data']['alerts'];
      var firstname;
      let count = 0;
      for(let item of alerts) {
        if(alert == item['alertCode']) {
           firstname = item['firstName'];
           count = count + 1;
        }
      }
      this.signalmodemalert = count;

      if(this.signalmodemalert > this.checkValue) {
        this.checkValue = this.signalmodemalert;
      //   this.databotService.alertEmail(firstname).subscribe(data => {
      //     console.log(data);
      // });
      }else {
        this.checkValue = this.checkValue;
      }
      // console.log(this.checkValue);

    });
  }

  getIdleInfoData() {
    this.databotService.getVehicleStops(this.getParams()).subscribe(res => {
      var stops = res['data']['stops'];
      // console.log(stops);
      this.getIdleEventData(stops);
    });
  }

  getIdleEventData(stops) {
    // this.idleArray = [];
    if(this.username == 'melrosepark') {
          for(let item of stops) {
                if(item['lastName']=='PW') {
                     if(item['stopType']=='Idling') {
                       let duration = item['duration'];
                       let tripId = item['id'];
                       let tripStart = moment(item['beginDate']).format('YYYY-MM-DD  hh:mm:ss A');
                       let tripEnd = moment(item['endDate']).format('YYYY-MM-DD hh:mm:ss A');
                       let location = item['street'] + item['city'] + item['countryCode'];
                       let stoptype = item['stopType'];
                      //  this.idleArray.push({'Trip Id': tripId, 'Trip Start': tripStart, 'Trip End': tripEnd,'Duration': duration, 'Location': location, 'Stop Type': stoptype});
                      //  console.log(this.idleArray);
                     }
                }
          }
    }else {

      for(let item of stops) {
             if(item['stopType']=='Idling') {
               let duration = item['duration'];
               let tripId = item['id'];
               let tripStart = moment(item['beginDate']).format('YYYY-MM-DD  hh:mm:ss A');
               let tripEnd = moment(item['endDate']).format('YYYY-MM-DD hh:mm:ss A');
               let location = item['street'] + item['city'] + item['countryCode'];
               let stoptype = item['stopType'];
              //  this.idleArray.push({'Trip Id': tripId, 'Trip Start': tripStart, 'Trip End': tripEnd,'Duration': duration, 'Location': location, 'Stop Type': stoptype});
              //  console.log(this.idleArray);
             }
      }
    }
          this.Idlecolumns = Object.keys(this.idleArray[0]);
          // this.columns.splice(0, 1);
          this.IdleitemResource = new DataTableResource(this.idleArray);
          this.IdleitemResource.count().then((count: any) => this.IdleitemCount = count);
          this.IdlereloadItems(this.Idleparam);
  }

  getMilesInfo() {
    this.databotService.getVehicleTrips(this.getParams()).subscribe(result => {
      this.trips = result['data']['trips'];
      // console.log(this.trips);
      this.getMilesEventData(this.trips);
    });
  }

  getMilesEventData(trips) {
    this.DTArray = [];
    var count = 0;
    if(this.username == 'melrosepark') {
      for(let item of trips) {
        if(item['driverName'] == 'MP1 PW' || item['driverName'] == 'MP2 PW' ||item['driverName'] == 'MP3 PW' || item['driverName'] == 'MP4 PW' || item['driverName'] == 'MP5 PW' || item['driverName'] == 'MP6 PW' ||item['driverName'] == 'MP7 PW'||item['driverName'] == 'MP8 PW'||item['driverName'] == 'MP9 PW'||item['driverName'] == 'MP10 PW') {
          count = count + item['authorizedMiles'];
          let startTime =  moment(item['startDateTime']).format('YYYY-MM-DD hh:mm:ss A');
          let endTime = moment(item['endDateTime']).format('YYYY-MM-DD hh:mm:ss A');
          this.DTArray.push({'Start Time': startTime, 'Start Address': item['startAddress'], 'End Time': endTime, 'End Address': item['endAddress'], 'Duration': item['durationMinutes'], 'Authorized Miles': item['authorizedMiles'], 'Total Miles': item['distanceMiles']});
        }
      }
    }else {
      for(let item of trips) {
        count = count + item['authorizedMiles'];
        let startTime =  moment(item['startDateTime']).format('YYYY-MM-DD hh:mm:ss A');
        let endTime = moment(item['endDateTime']).format('YYYY-MM-DD hh:mm:ss A');
        this.DTArray.push({'Start Time': startTime, 'Start Address': item['startAddress'], 'End Time': endTime, 'End Address': item['endAddress'], 'Duration': item['durationMinutes'], 'Authorized Miles': item['authorizedMiles'], 'Total Miles': item['distanceMiles']});
      }
    }
    this.DTcolumns = Object.keys(this.DTArray[0]);
    this.DTitemResource = new DataTableResource(this.DTArray);
    this.DTitemResource.count().then((count: any) => this.DTitemCount = count);
    this.DTreloadItems(this.DTparam);
  }

  rowClick(event) {
    // this.showmap = true;
    // var mapOptions;
    // var map;
    //  var startloc = event.row.item['Start Address'];
    //  var endloc = event.row.item['End Address'];
    //  var startlatitude;
    //  var startlongitude;
    //  var endlatitude;
    //  var endlongitude;
    //  var geocoder = new google.maps.Geocoder();
    //  var startinfoWindow = new google.maps.InfoWindow();
    //  var endinfoWindow = new google.maps.InfoWindow();
    //  var bounds = new google.maps.LatLngBounds();
    //  geocoder.geocode({ 'address': startloc }, function (res, status) {
    //   if (status == 'OK') {
    //     startlatitude =  res[0].geometry.location.lat();
    //     startlongitude = res[0].geometry.location.lng();
    //     var latLng = new google.maps.LatLng(startlatitude, startlongitude);
    //     mapOptions = {
    //       center: new google.maps.LatLng(startlatitude, startlongitude),
    //       zoom: 9,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP
    //   };
    //   map = new google.maps.Map(document.getElementById("smallmap"),
    //   mapOptions);
    //   var startmarker = new google.maps.Marker({
    //     position: new google.maps.LatLng(startlatitude, startlongitude),
    //     map: map,
    //     // title: data[i].title
    //   });
    //   // bounds.extend(latLng);
    //   var contentString = '<div id="content">'+
    //     '<div id="siteNotice" style="color:black">'+ 'Start Point'
    //     '</div>'+
    //     '<h2 id="firstHeading" class="firstHeading">Uluru</h2>'+
    //     '</div>';
    //   startinfoWindow = new google.maps.InfoWindow({
    //      content: contentString
    //   });
    //   startinfoWindow.open(map, startmarker);
    //   }
    // });
    // geocoder.geocode({ 'address': endloc }, function (res, status) {
    //   if (status == 'OK') {
    //     endlatitude =  res[0].geometry.location.lat();
    //     endlongitude = res[0].geometry.location.lng();
    //     // var latlong1 = new google.maps.LatLng(endlatitude, endlongitude);
    //     var endmarker = new google.maps.Marker({
    //     position: new google.maps.LatLng(endlatitude, endlongitude),
    //     map: map,
    //     // title: data[i].title
    //   });
    //   // bounds.extend(latlong1);
    //   var contentString1 = '<div id="content">'+
    //     '<div id="siteNotice" style="color:black">'+ 'End Point'
    //     '</div>'+
    //     '<h2 id="firstHeading" class="firstHeading">Uluru</h2>'+
    //     '</div>';
    //   startinfoWindow = new google.maps.InfoWindow({
    //      content: contentString1
    //   });
    //   startinfoWindow.open(map, endmarker);
    //   }

    // });
  }

  close() {
    this.showmap = false;
    this.minimapshow = false;
    this.truckmapshow = false;
  }

  getidleArrayMelInfo() {
     this.idleArray = [];
     this.databotService.getidleArraymelinfo().subscribe(data => {
       this.idleArray = data;
      //  console.log(this.idleArray);
       this.Idlecolumns = Object.keys(this.idleArray[0]);
       // this.columns.splice(0, 1);
       this.IdleitemResource = new DataTableResource(this.idleArray);
       this.IdleitemResource.count().then((count: any) => this.IdleitemCount = count);
       this.IdlereloadItems(this.Idleparam);
     });
  }

  getidleArrayInfo() {
    this.idleArray = [];
    this.databotService.getidleArrayinfo().subscribe(data => {
      console.log(data);
      this.idleArray = data;
      this.Idlecolumns = Object.keys(this.idleArray[0]);
      // this.columns.splice(0, 1);
      this.IdleitemResource = new DataTableResource(this.idleArray);
      this.IdleitemResource.count().then((count: any) => this.IdleitemCount = count);
      this.IdlereloadItems(this.Idleparam);
    });
  }

  getAlertMelInfo() {
    this.speedArray = [];
    this.HBArray = [];
    this.ACCArray = [];
    this.databotService.getalertArrayMelinfo().subscribe(data => {
        console.log(data);
        this.speedArray = data['HIGH_SPEED'];
        this.HBArray = data['HARSH_BRAKING'];
        this.ACCArray = data['RAPID_ACCELERATION'];
        this.metadata = data['Metadata'][0];
        this.speedcolumns = Object.keys(this.speedArray[0]);
        // this.columns.splice(0, 1);
        this.speeditemResource = new DataTableResource(this.speedArray);
        this.speeditemResource.count().then((count: any) => this.speeditemCount = count);
        this.speedreloadItems(this.speedparam);

        this.HBcolumns = Object.keys(this.HBArray[0]);
        this.HBitemResource = new DataTableResource(this.HBArray);
        this.HBitemResource.count().then((count: any) => this.HBitemCount = count);
        this.HBreloadItems(this.HBparam);

        this.ACCcolumns = Object.keys(this.ACCArray[0]);
        this.ACCitemResource = new DataTableResource(this.ACCArray);
        this.ACCitemResource.count().then((count: any) => this.ACCitemCount = count);
        this.ACCreloadItems(this.ACCparam);
    });
  }

  getAlertInfo() {
    this.speedArray = [];
    this.HBArray = [];
    this.ACCArray = [];
    this.databotService.getalertArrayinfo().subscribe(data => {
        console.log(data);
        this.speedArray = data['HIGH_SPEED'];
        this.HBArray = data['HARSH_BRAKING'];
        this.ACCArray = data['RAPID_ACCELERATION'];
        this.metadata = data['Metadata'][0];
        this.speedcolumns = Object.keys(this.speedArray[0]);
        // this.columns.splice(0, 1);
        this.speeditemResource = new DataTableResource(this.speedArray);
        this.speeditemResource.count().then((count: any) => this.speeditemCount = count);
        this.speedreloadItems(this.speedparam);

        this.HBcolumns = Object.keys(this.HBArray[0]);
        this.HBitemResource = new DataTableResource(this.HBArray);
        this.HBitemResource.count().then((count: any) => this.HBitemCount = count);
        this.HBreloadItems(this.HBparam);

        this.ACCcolumns = Object.keys(this.ACCArray[0]);
        this.ACCitemResource = new DataTableResource(this.ACCArray);
        this.ACCitemResource.count().then((count: any) => this.ACCitemCount = count);
        this.ACCreloadItems(this.ACCparam);
    });
  }

  speedreloadItems(params: any) {
    this.speeditemResource.query(params).then((items: any) => this.speeditems = items);
  }
  HBreloadItems(params: any) {
    this.HBitemResource.query(params).then((items: any) => this.HBitems = items);
  }
  ACCreloadItems(params: any) {
    this.ACCitemResource.query(params).then((items: any) => this.ACCitems = items);
  }

  getidleArrayMelInfoByDates(fromdate, todate) {
    this.idleArray = [];
    this.databotService.getidleArraymelinfoByDates(fromdate, todate).subscribe(data => {
      this.idleArray = data;
     //  console.log(this.idleArray);
      this.Idlecolumns = Object.keys(this.idleArray[0]);
      // this.columns.splice(0, 1);
      this.IdleitemResource = new DataTableResource(this.idleArray);
      this.IdleitemResource.count().then((count: any) => this.IdleitemCount = count);
      this.IdlereloadItems(this.Idleparam);
    });
  }
  getAlertMelInfoByDates(fromdate, todate) {
    this.speedArray = [];
    this.HBArray = [];
    this.ACCArray = [];
    this.databotService.getalertArrayMelinfoByDates(fromdate, todate).subscribe(data => {
        // console.log(data);
        this.speedArray = data['HIGH_SPEED'];
        this.HBArray = data['HARSH_BRAKING'];
        this.ACCArray = data['RAPID_ACCELERATION'];
        this.metadata = data['Metadata'][0];
        this.speedcolumns = Object.keys(this.speedArray[0]);
        // this.columns.splice(0, 1);
        this.speeditemResource = new DataTableResource(this.speedArray);
        this.speeditemResource.count().then((count: any) => this.speeditemCount = count);
        this.speedreloadItems(this.speedparam);

        this.HBcolumns = Object.keys(this.HBArray[0]);
        this.HBitemResource = new DataTableResource(this.HBArray);
        this.HBitemResource.count().then((count: any) => this.HBitemCount = count);
        this.HBreloadItems(this.HBparam);

        this.ACCcolumns = Object.keys(this.ACCArray[0]);
        this.ACCitemResource = new DataTableResource(this.ACCArray);
        this.ACCitemResource.count().then((count: any) => this.ACCitemCount = count);
        this.ACCreloadItems(this.ACCparam);
    });
  }

  getidleArrayInfoByDates(searchfromdate, searchtodate) {
    this.idleArray = [];
    this.databotService.getidleArrayinfoByDates(searchfromdate, searchtodate).subscribe(data => {
      this.idleArray = data;
     //  console.log(this.idleArray);
      this.Idlecolumns = Object.keys(this.idleArray[0]);
      // this.columns.splice(0, 1);
      this.IdleitemResource = new DataTableResource(this.idleArray);
      this.IdleitemResource.count().then((count: any) => this.IdleitemCount = count);
      this.IdlereloadItems(this.Idleparam);
    });
  }
  getAlertInfoByDates(searchfromdate, searchtodate) {
    this.speedArray = [];
    this.HBArray = [];
    this.ACCArray = [];
    this.databotService.getalertArrayinfoByDates(searchfromdate, searchtodate).subscribe(data => {
        // console.log(data);
        this.speedArray = data['HIGH_SPEED'];
        this.HBArray = data['HARSH_BRAKING'];
        this.ACCArray = data['RAPID_ACCELERATION'];
        this.metadata = data['Metadata'][0];
        this.speedcolumns = Object.keys(this.speedArray[0]);
        // this.columns.splice(0, 1);
        this.speeditemResource = new DataTableResource(this.speedArray);
        this.speeditemResource.count().then((count: any) => this.speeditemCount = count);
        this.speedreloadItems(this.speedparam);

        this.HBcolumns = Object.keys(this.HBArray[0]);
        this.HBitemResource = new DataTableResource(this.HBArray);
        this.HBitemResource.count().then((count: any) => this.HBitemCount = count);
        this.HBreloadItems(this.HBparam);

        this.ACCcolumns = Object.keys(this.ACCArray[0]);
        this.ACCitemResource = new DataTableResource(this.ACCArray);
        this.ACCitemResource.count().then((count: any) => this.ACCitemCount = count);
        this.ACCreloadItems(this.ACCparam);
    });
  }

  // connect() {
  //   const socket = new SockJS('http://ec2-54-172-122-115.compute-1.amazonaws.com:6060/linxuplocation');
  //   this.stompClient = Stomp.over(socket);
 
  //   const _this = this;
  //   this.stompClient.connect({}, function (frame) {
  //     // _this.setConnected(true);
  //     // console.log('Connected: ' + frame);
 
  //     _this.stompClient.subscribe('/location/databot', function (data) {
  //       let locationData= JSON.parse(data.body);
  //        _this.locationData_= locationData;
  //     });

  //     //location maps
  //     _this.stompClient.subscribe('/trackingdata/vehicle', data=>{
  //       console.log(data.body);
  //     });
  //   });
  // }

  rowDTClick(event) {
    var mapOptions;
    var map;
     var lat  = event['lat'];
     var long = event['long'];
     this.minimapshow = true;
     var latLng = new google.maps.LatLng(lat, long);
     var geocoder = new google.maps.Geocoder();
     geocoder.geocode({ 'location': latLng }, function (res, status) {
      if (status == 'OK') {
        mapOptions = {
          center: new google.maps.LatLng(lat, long),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("minimap"),
      mapOptions);
      var startmarker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        map: map,
        // title: data[i].title
      });
    }else {

          }
    });
  }

  IdlerowClick(event) {
    this.showmap = true;
    var startlatitude;
    var startlongitude;
    var mapOptions;
    var map;
     var startloc = event.row.item['Location'];
     var geocoder = new google.maps.Geocoder();
     geocoder.geocode({ 'address': startloc }, function (res, status) {
      if (status == 'OK') {
        startlatitude =  res[0].geometry.location.lat();
        startlongitude = res[0].geometry.location.lng();
        var latLng = new google.maps.LatLng(startlatitude, startlongitude);
        mapOptions = {
          center: new google.maps.LatLng(startlatitude, startlongitude),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("smallmap"),
      mapOptions);
      var startmarker = new google.maps.Marker({
        position: new google.maps.LatLng(startlatitude, startlongitude),
        map: map,
        // title: data[i].title
      });
    }else {

          }
    });
  }

  TruckInfo(item) {
    this.truckmapshow = true;
    var mapOptions;
    var map;
     var lat  = item['lat'];
     var long = item['long'];
     this.minimapshow = true;
     var latLng = new google.maps.LatLng(lat, long);
     var geocoder = new google.maps.Geocoder();
     geocoder.geocode({ 'location': latLng }, function (res, status) {
      if (status == 'OK') {
        mapOptions = {
          center: new google.maps.LatLng(lat, long),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("truckminimap"),
      mapOptions);
      var startmarker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        map: map,
        // title: data[i].title
      });
      }
    });
        
  }

  getColor(i){
    if (i % 2 === 0){i = 'odd';}
    // if (this.vehicleTrackerInfo && (this.vehicleTrackerInfo.length - 1 === i)) {i = 'last'}
    switch (i) {
      case i = 1 : return '#FFFFFF';
      case i = 'odd' : return '#F6F6F6';
    }
  }

}

