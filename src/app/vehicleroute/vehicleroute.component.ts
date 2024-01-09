import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { chart, SolidGaugeChart } from 'highcharts';
declare const google: any;
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import * as solidGauge from 'highcharts/modules/solid-gauge.src';
import { Chart } from 'angular-highcharts';

declare var $: any;


@Component({
  selector: 'app-vehicleroute',
  templateUrl: './vehicleroute.component.html',
  styleUrls: ['./vehicleroute.component.css']
})
export class VehiclerouteComponent  implements OnInit, OnDestroy {
  returnchart: any;
  chartSpeed: any;
  chartRpm: any;
  map: any;
  options: any;

  /**Drop down */
  jsondata: any;
  categories: any = [];
  state: any = [];
  region: any = [];
  driverrating: any = [];

  categoryname: any;
  vehicleidno: any = [];
  trucknumber: any[];
  statename: any;
  regionname: any;
  performanc: any;
  vehiclename: any;
  vehicleid: any;
  truckidno: any;
  driverinformation: any = [];

  /**JSON BINDING */
  drivername: any;
  trip: any;
  deliveries: any;
  tripduration: any;
  tripmileage: any;
  engineoffline: any;
  engineedletime: any;
  totalmilesrun: any;
  lastservicedate: any;
  milesrunssinceservice: any;
  flattireevents: any;
  lastbreakdown: any;
  planneddeliveries: any;
  deliverescompleted: any;
  licenceno: any;
  rating: any;
  rapidacceleration: any;
  address: any[];
  /**Map */
  location: any = [];
  /**Default Name*/

  regiondefaultname: any;
  statedefaultname: any;
  categorydefaultname: any;
  ratingdefaultvalue: any;
  vehicledefaultname: any;

  /**Chart*/
  speed: any;
  rpm: any;

  fuel: any = 70;
  temperature: any = 195;
  fuelalert: any = false;
  tempalert: any = false;
  batteryalert: any = true;
  mpgalert: any = false;
  result: any;
  value: any;

  timeresult: any;
  // value:string;

  /**Date and time picker */

  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy hh:mm a',
    defaultOpen: false,
    closeOnSelect: false

  };
  /**driverschedule */
  driverschedulejsondata: any;
  locationone: any;
  locationtwo: any;
  locationthree: any;
  locationfour: any;
  locationfive: any;
  locationsix: any;
  locationseven: any;
  locationeight: any;
  locationnine: any;
  locationten: any;
  schtimeone: any;
  schtimetwo: any;
  schtimethree: any;
  schtimefour: any;
  schtimefive: any;
  schtimesix: any;
  schtimeseven: any;
  schtimeeight: any;
  schtimenine: any;
  schtimeten: any;
  /**driverschedule */

  /**preventive maintanance */
  preventivemaintenancejson: any;
  prementiveMaintenancearr: any = [];
  prementiveMaintenancearrsort: any = [];

  axelcheckup: any;
  nextbreakchange: any;
  nextoilchangedate: any;
  axelalignment: any;
  pollutioncheck: any;
  batterycheckup: any;

  axelcheckupvalue: any;
  title: any;
  selectedItem:any;
  selectedButton = {};
  constructor(public http: HttpClient,public route: ActivatedRoute) {
    var heading = this.route.snapshot.queryParamMap.get("title");
    if(heading == null || heading == ""){
      localStorage.setItem("title","Route Optimization");
    }else{
      localStorage.setItem("title",heading);
    }

    if (localStorage.getItem('title') == "" || localStorage.getItem('title') == null || localStorage.getItem('title') == undefined) {
      this.title = '';
    } else {
      this.title = localStorage.getItem('title');
    }


    // this.result = this.value
  }
  ngAfterViewInit() {

  }

  ngOnInit() {

    this.result = 'reshedule';
    var $this = this;
    this.regiondefaultname = 'Midwest'; this.statedefaultname = 'Ohio'; this.categorydefaultname = '91-100', this.ratingdefaultvalue = 4;
    this.vehicledefaultname = 'CAT6257';
    this.http.get('../../assets/data/vehiclemetric.json').subscribe(data => {
      this.jsondata = data;
      var index: any;
      for (index in this.jsondata) {
        if (this.region.indexOf(this.jsondata[index].Region) < 0) {
          this.region.push(this.jsondata[index].Region);
        }

      }
      this.loadDefaultRegion(this.region, this.jsondata);
      // this.distributors = data['LOCATIONS'];
    });
    setInterval(function () {
      var val = 10;
      var tempval = 1;

      $this.batteryalert = false;
      if ($this.fuel) {
        $this.fuel -= val;
        if ($this.fuel == 0) {
          $this.fuel = 70;
        } else if ($this.fuel == 30) {
          $this.fuelalert = true;
        } else {
          $this.fuelalert = false;
        }
      }

      if ($this.temperature) {
        $this.temperature += tempval;
        if ($this.temperature == 202) {
          $this.temperature = 195;
        } else if ($this.temperature == 200) {
          $this.tempalert = true;
        } else {
          $this.tempalert = false;
        }
      }

    }, 5000);


    // this.routeMap();
  }

  ngOnDestroy() {
    localStorage.removeItem("title");
  }

  loadDefaultRegion(region, jsondata) {
    var index: any;
    this.state = [];
    this.categories = [];
    this.driverrating = [];
    this.vehicleidno = [];
    for (index in jsondata) {
      if (jsondata[index].Region === this.regiondefaultname) {

        if (this.state.indexOf(jsondata[index].State) < 0) {
          this.state.push(jsondata[index].State);
        }
      }
    }
    this.loadDefaultCategory(this.regiondefaultname, this.statedefaultname, this.jsondata);
  }

  loadDefaultCategory(regiondefaultname, statedefaultname, jsondata) {
    var index: any;
    this.categories = [];
    this.driverrating = [];
    this.vehicleidno = [];
    for (index in this.jsondata) {
      if (jsondata[index].Region === regiondefaultname && this.jsondata[index].State === statedefaultname) {
        if (this.categories.indexOf(jsondata[index].Category) < 0) {
          this.categories.push(jsondata[index].Category);
          // alert(this.categories)
        }
      }

    }
    this.loadDefaultRating(this.regiondefaultname, this.statedefaultname, this.categorydefaultname, jsondata);

  }
  loadDefaultRating(regiondefaultname, statedefaultname, categorydefaultname, jsondata) {
    this.driverrating = [];
    this.vehicleidno = [];
    var index: any;
    for (index in this.jsondata) {
      if (jsondata[index].Region === regiondefaultname && jsondata[index].State === statedefaultname &&
        this.jsondata[index].Category === categorydefaultname) {
        if (this.driverrating.indexOf(this.jsondata[index].Rating) < 0) {
          this.driverrating.push(this.jsondata[index].Rating);
        }
      }
    }
    this.loadDefaultVehicle(this.regiondefaultname, this.statedefaultname, this.categorydefaultname, jsondata, this.ratingdefaultvalue);
  }
  loadDefaultVehicle(regiondefaultname, statedefaultname, categorydefaultname, jsondata, ratingdefaultvalue) {
    var index: any;
    for (index in jsondata) {
      if (jsondata[index].Region === regiondefaultname && jsondata[index].State === statedefaultname &&
        jsondata[index].Category === categorydefaultname && jsondata[index].Rating == ratingdefaultvalue) {
        if (this.vehicleidno.indexOf(jsondata[index]['Truck ID']) < 0) {
          this.vehicleidno.push(jsondata[index]['Truck ID']);
          console.log(this.vehicledefaultname);
        }

      }

    }
    this.loadDefaultDriverData(this.regiondefaultname, this.statedefaultname, this.categorydefaultname, jsondata, this.ratingdefaultvalue, this.vehicledefaultname);
  }


  loadDefaultDriverData(regiondefaultname, statedefaultname, categorydefaultname, jsondata, ratingdefaultvalue, vehicledefaultname) {
    var $this = this;
    var index: any;
    for (index in this.jsondata) {
      if (jsondata[index].Region === regiondefaultname && jsondata[index].State === statedefaultname &&
        this.jsondata[index].Category === categorydefaultname && this.jsondata[index].Rating == ratingdefaultvalue && this.jsondata[index]['Truck ID'] === vehicledefaultname) {

        this.drivername = this.jsondata[index]['Name'];
        this.licenceno = this.jsondata[index]['Vehicle Licence ID'];
        this.rating = this.jsondata[index]['Rating'];
        this.trip = this.jsondata[index]['Trip Miles'];
        this.deliveries = this.jsondata[index]['Deliveries Completed'];
        this.tripduration = this.jsondata[index]['Trip Duration'];
        this.tripmileage = this.jsondata[index]['Trip Mileage'];
        this.engineoffline = this.jsondata[index]['Engine Offline'];
        this.engineedletime = this.jsondata[index]['Engine Idle Time'];
        this.totalmilesrun = this.jsondata[index]['Total Miles Run'];
        this.lastservicedate = this.jsondata[index]['Last Service Date'];
        this.milesrunssinceservice = this.jsondata[index]['Miles Run since Serviced'];
        this.flattireevents = this.jsondata[index]['Flat Tire Events'];
        this.lastbreakdown = this.jsondata[index]['Last Breakdown On'];
        this.planneddeliveries = this.jsondata[index]['Planned Deliveries'];
        this.deliverescompleted = this.jsondata[index]['Deliveries Completed'];
        this.rapidacceleration = this.jsondata[index]['Rapid Acceleration'];
        this.address = this.jsondata[index].Address;
        this.location = this.jsondata[index].Locations;
        this.speed = this.jsondata[index].Speed;
        this.rpm = this.jsondata[index].Rpm;
        this.loadMap();
        this.loadGuage(this.speed);
        this.loadGaugerpm(this.rpm);

      }
    }

    setInterval(function () {
      var value = 1;

      $this.tripmileage = $this.tripmileage;
      $this.tripmileage -= value;
      console.log($this.tripmileage);
      if ($this.tripmileage == 11) {
        $this.mpgalert = true;
      } else if ($this.tripmileage == 10) {
        $this.tripmileage = 15;
        $this.mpgalert = false;
      }

    }, 2000);

  }



  loadMap() {
    this.http.get('../../assets/data/location.json').subscribe(res => {
      var newmapdata = res;
      console.log(newmapdata);
      this.routeMap(newmapdata);
    });
  }

  routeMap(newmapdata) {

    var lat_lng = new Array();
    // let that;
    for (var i = 0; i < newmapdata.length; i++) {
      var lat = newmapdata[i].Latitude;
      var long = newmapdata[i].Longitude;
      var myLatlng = new google.maps.LatLng(lat, long);
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        }

      });
      lat_lng.push(myLatlng);
      var image = {
        url: '../../assets/images/warehouse.png',
        // This marker is 50 pixels wide by 50 pixels high.
        scaledSize: new google.maps.Size(50, 50),
        // The origin for this image is (0, 0).
      };

      var imagetruck = {
        url: '../../assets/images/truck_top.png',
        // This marker is 50 pixels wide by 50 pixels high.
        scaledSize: new google.maps.Size(30, 30),
        // The origin for this image is (0, 0).
      };


      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        map: map,
        icon: imagetruck,
      });
      var marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(32.542, -93.604),
        map: map,
        icon: image,
      });

      // var infowindow = new google.maps.InfoWindow({
      //   content: '<b><p style="color:red;text-weight:bold">Tire Position:' + JSON.stringify(tirepos) + '</p></b>' +
      //     '<b><p style="color:red;text-weight:bold">Tire Pressure:' + JSON.stringify(tirepsi) + '</p></b>'


      // });
      // var infowindow1 = new google.maps.InfoWindow({
      //   // content: '<b><p style="color:black">1</p>'


      // });
      // // infowindow.open(map, marker);
      // infowindow1.open(map, marker1);

      setInterval(function () {
        map.panTo(marker.getPosition());
      }, 5000);
    }

    var service = new google.maps.DirectionsService();
    var delayFactor = 0;

    function m_get_directions_route(request, latlong) {
      service.route(request, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          //Process you route here
          var path = new google.maps.MVCArray();

          var polylineoptns = {
            strokeOpacity: 0.8,
            strokeWeight: 3,
            strokeColor: "blue",
            map: map,
          };


          var poly = new google.maps.Polyline(polylineoptns);
          poly.setPath(path);

          var infowindow_polygon_1 = new google.maps.InfoWindow({ content: 'Stock' });
          google.maps.event.addListener(poly, "mouseover", function (event) {
            this.setOptions({ fillColor: "#00FF00" });
            infowindow_polygon_1.setPosition(event.latLng);
            infowindow_polygon_1.open(map);
          });
          google.maps.event.addListener(poly, "mouseout", function (event) {
            this.setOptions({ fillColor: "#00FF00" });
            //infowindow_polygon_1.setPosition(event.latLng);
            infowindow_polygon_1.close(map);
          });

          for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
            path.push(result.routes[0].overview_path[i]);
            marker.setPosition(result.routes[0].overview_path[i]);
          }
        } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
          delayFactor++;
          setTimeout(function () {
            m_get_directions_route(request, latlong);
          }, delayFactor * 1000);
        } else {
          //console.log("Route: " + status);
        }
      });
    }


    for (i = 0; i < lat_lng.length; i++) {
      if ((i + 1) < lat_lng.length) {
        var src = lat_lng[i];
        var des = lat_lng[i + 1];
        var request = {
          origin: src,
          destination: des,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        };


        m_get_directions_route(request, lat_lng);

      }
    }



  }
  loadGuage(speed) {
    let $this = this;
    this.options = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        // spacing: [0, 0, 0, 0],
        backgroundColor: null,
        width:250,
        height:250


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
          to: 120,
          color: '#55BF3B' // green
        }, {
          from: 120,
          to: 160,
          color: '#DDDF0D' // yellow
        }, {
          from: 160,
          to: 200,
          color: '#DF5353' // red
        }]
      },

      series: [{
        name: 'Speed',
        data: [60]
      }]

    };
    $this.chartSpeed = new Chart(this.options);
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

      // RPM
      if ($this.chartRpm) {
        point = $this.chartRpm.ref.series[0].points[0];
        inc = Math.round((Math.random() - 0.5) * 10);
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 10) {
          newVal = point.y - inc;
        }

        point.update(newVal);
      }
    }, 2000);
  }

  loadGaugerpm(rpm) {
    this.options = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        // spacing: [50, 50, 50, 50],
        backgroundColor: null,
        width:250,
        height:250

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
        max: 12,

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
          text: 'rpm'
        },
        plotBands: [{
          from: 0,
          to: 4,
          color: '#55BF3B' // green
        }, {
          from: 4,
          to: 8,
          color: '#DDDF0D' // yellow
        }, {
          from: 8,
          to: 12,
          color: '#DF5353' // red
        }]
      },

      series: [{
        name: 'Rpm',
        data: [4]
      }]

    };
    this.chartRpm = new Chart(this.options);
  }
  /**Drop down */
  changeRegion(region) {
    this.regionname = this.regiondefaultname = region.currentTarget.value;
    var index: any;
    this.state = [];
    this.categories = [];
    this.driverrating = [];
    this.vehicleidno = [];
    for (index in this.jsondata) {
      if (this.jsondata[index].Region === this.regionname) {

        if (this.state.indexOf(this.jsondata[index].State) < 0) {
          this.state.push(this.jsondata[index].State);
        }
      }
    }
  }

  changeState(state) {
    this.statename = this.statedefaultname = state.currentTarget.value;
    // console.log(this.categories);
    var index: any;
    this.categories = [];
    this.driverrating = [];
    this.vehicleidno = [];
    for (index in this.jsondata) {
      if (this.jsondata[index].Region === this.regiondefaultname && this.jsondata[index].State === this.statename) {
        if (this.categories.indexOf(this.jsondata[index].Category) < 0) {
          this.categories.push(this.jsondata[index].Category);
          // alert(this.categories)
          // console.log(this.categories+"ihhi");
        }
      }
    }
  }


  changeCategory(category) {
    this.categoryname = this.categorydefaultname = category.currentTarget.value;
    this.driverrating = [];
    this.vehicleidno = [];
    var index: any;
    for (index in this.jsondata) {
      if (this.jsondata[index].Region === this.regiondefaultname && this.jsondata[index].State === this.statedefaultname && this.jsondata[index].Category === this.categoryname) {
        if (this.driverrating.indexOf(this.jsondata[index].Rating) < 0) {
          this.driverrating.push(this.jsondata[index].Rating);
        }
      }
    }
  }

  changeRating(rating) {
    this.performanc = this.ratingdefaultvalue = rating.currentTarget.value;
    this.vehicleidno = [];
    var index: any;
    for (index in this.jsondata) {
      if (this.jsondata[index].Region === this.regiondefaultname && this.jsondata[index].State === this.statedefaultname &&
        this.jsondata[index].Category === this.categorydefaultname && this.jsondata[index].Rating == this.performanc) {
        if (this.vehicleidno.indexOf(this.jsondata[index]['Truck ID']) < 0) {
          this.vehicleidno.push(this.jsondata[index]['Truck ID']);
        }
      }
    }
  }



  changeVehicle(name) {
    this.vehiclename = this.vehicledefaultname = name.currentTarget.value;
    this.result = 'Reschedule';
    var index: any;
    for (index in this.jsondata) {
      if (this.jsondata[index].Region === this.regiondefaultname && this.jsondata[index].State === this.statedefaultname &&
        this.jsondata[index].Category === this.categorydefaultname && this.jsondata[index].Rating == this.ratingdefaultvalue && this.jsondata[index]['Truck ID'] === this.vehiclename) {

        this.drivername = this.jsondata[index]['Name'];
        this.licenceno = this.jsondata[index]['Vehicle Licence ID'];
        this.rating = this.jsondata[index]['Rating'];
        this.trip = this.jsondata[index]['Trip Miles'];
        this.deliveries = this.jsondata[index]['Deliveries Completed'];
        this.tripduration = this.jsondata[index]['Trip Duration'];
        this.tripmileage = this.jsondata[index]['Trip Mileage'];
        this.engineoffline = this.jsondata[index]['Engine Offline'];
        this.engineedletime = this.jsondata[index]['Engine Idle Time'];
        this.totalmilesrun = this.jsondata[index]['Total Miles Run'];
        this.lastservicedate = this.jsondata[index]['Last Service Date'];
        this.milesrunssinceservice = this.jsondata[index]['Miles Run since Serviced'];
        this.flattireevents = this.jsondata[index]['Flat Tire Events'];
        this.lastbreakdown = this.jsondata[index]['Last Breakdown On'];
        this.planneddeliveries = this.jsondata[index]['Planned Deliveries'];
        this.deliverescompleted = this.jsondata[index]['Deliveries Completed'];
        this.rapidacceleration = this.jsondata[index]['Rapid Acceleration'];
        this.address = this.jsondata[index].Address;
        this.location = this.jsondata[index].Locations;
        this.speed = this.jsondata[index].Speed;
        this.rpm = this.jsondata[index].Rpm;
        this.loadMap();
        this.loadGuage(this.speed);
        this.loadGaugerpm(this.rpm);
        // this.routeMap(this.location)


      }
    }

    this.getSchedule(this.drivername);
    this.getPreventiveMaintanence(this.vehiclename);


  }

  getPreventiveMaintanence(vehiclename) {
    var index: any;
    this.prementiveMaintenancearr = [];
    this.http.get('../../assets/data/preventivemaintenance.json').subscribe(data => {
      this.preventivemaintenancejson = data;
      for (index in this.preventivemaintenancejson) {
        if (this.preventivemaintenancejson[index]['Truck ID'] === vehiclename) {

          this.prementiveMaintenancearr.push(
            { "date_main": this.preventivemaintenancejson[index]['Axle Checkup'], "part": 'Axle Checkup' },
            { "date_main": this.preventivemaintenancejson[index]['Next Break Change Date'], "part": 'Next Break Change Date' },
            { "date_main": this.preventivemaintenancejson[index]['Next Oil Change Date'], "part": 'Next Oil Change Date' },
            { "date_main": this.preventivemaintenancejson[index]['Axel Alignment & Wheel Balancing'], "part": 'Axel Alignment & Wheel Balancing' },
            { "date_main": this.preventivemaintenancejson[index]['Pollution Check'], "part": 'Pollution Check' },
            { "date_main": this.preventivemaintenancejson[index]['Battery Check up'], "part": 'Battery Check up' }
          );
        }

      }

      this.filterMaintanenceData(this.prementiveMaintenancearr);

    });
  }


  getSchedule(drivernmae) {
    this.http.get('../../assets/data/driver-schedule.json').subscribe(data => {
      this.driverschedulejsondata = data;
      for (var i = 0; i <= this.driverschedulejsondata.length; i++) {
        if (this.driverschedulejsondata[i].Name === drivernmae) {
          this.locationone = this.driverschedulejsondata[i]['Location 1'];
          this.locationtwo = this.driverschedulejsondata[i]['Location 2'];
          this.locationthree = this.driverschedulejsondata[i]['Location 3'];
          this.locationfour = this.driverschedulejsondata[i]['Location 4'];
          this.locationfive = this.driverschedulejsondata[i]['Location 5'];
          this.locationsix = this.driverschedulejsondata[i]['Location 6'];
          this.locationseven = this.driverschedulejsondata[i]['Location 7'];
          this.locationeight = this.driverschedulejsondata[i]['Location 8'];
          this.locationnine = this.driverschedulejsondata[i]['Location 9'];
          this.locationten = this.driverschedulejsondata[i]['Location 10'];

          this.schtimeone = this.driverschedulejsondata[i]['Scheduled Time 1'];
          this.schtimetwo = this.driverschedulejsondata[i]['Scheduled Time 2'];
          this.schtimethree = this.driverschedulejsondata[i]['Scheduled Time 3'];
          this.schtimefour = this.driverschedulejsondata[i]['Scheduled Time 4'];
          this.schtimefive = this.driverschedulejsondata[i]['Scheduled Time 5'];
          this.schtimesix = this.driverschedulejsondata[i]['Scheduled Time 6'];
          this.schtimeseven = this.driverschedulejsondata[i]['Scheduled Time 7'];
          this.schtimeeight = this.driverschedulejsondata[i]['Scheduled Time 8'];
          this.schtimenine = this.driverschedulejsondata[i]['Scheduled Time 9'];
          this.schtimeten = this.driverschedulejsondata[i]['Scheduled Time 10'];


        }

      }
      // this.distributors = data['LOCATIONS'];
    });
  }





  deliveryReschedule(event) {
    $(".modal-header .modal-title").text();
    $('#calendarModal').modal('show');
  }

  setDate() {
    this.result = this.date.toLocaleString();
    $('#calendarModal').modal('hide');
    // $('#messageeModel').modal('show');
    alert("Your Activity has been scheduled");

  }
  scheduleActivity(id,item) {
    // this.selectedItem = id;
    this.selectedButton[id]= !this.selectedButton[id];
    $('#calendarModal').modal('show');
    $('#maintenanceModel').modal('hide');

  }




  prementiveMaintenance() {
    $(".modal-header .modal-title").text();
    $('#maintenanceModel').modal('show');
  }

  filterMaintanenceData(preventive) {
    preventive.sort(function (a, b) {
      // convert date object into number to resolve issue in typescript
      return +new Date(a.date_main) - +new Date(b.date_main);
    });
    this.prementiveMaintenancearrsort = preventive;
  }
}
