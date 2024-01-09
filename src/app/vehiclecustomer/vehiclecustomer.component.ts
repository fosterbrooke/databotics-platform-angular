import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { state } from '@angular/animations';
import { IfStmt } from '@angular/compiler';
import { Console } from '@angular/core/src/console';


@Component({
  selector: 'app-vehiclecustomer',
  templateUrl: './vehiclecustomer.component.html',
  styleUrls: ['./vehiclecustomer.component.css']
})
export class VehiclecustomerComponent implements OnInit, OnDestroy {
  scrollchart: any;
  options: any;
  selectedId: any;

  /**dropdown */
  jsondata: any;
  driverjsondata: any;
  drivercount: any;
  region: any = [];
  state: any = [];
  regionname: any;
  statename: any;
  customerinfo: any = [];
  toprateddriveinfo: any = [];
  lowrateddriverinfo: any = [];
  rating: any;
  customername: any;
  drivername: any;
  companyterm: any;
  totalexp: any;
  date: any;
  feedback: any;
  noofreviews: any;
  driverperformance: any;
  fivestartratingcount: number = 0;
  fourstartratingcount: number = 0;
  threestartratingcount: number = 0;
  twostartratingcount: number = 0;
  onestartratingcount: number = 0;

  fivestarrating: any = [];
  fourstarrating: any = [];
  threestarrating: any = [];
  twostartrating: any = [];
  onestartrating: any = [];
  dates: any = [];

  avgfeedback: any;

  driverpreviousrating: any;
  driverpreviousratingone: any;
  driverpreviousratingtwo: any;
  driverpreviousratingthree: any;
  driverpreviousratingfour: any;
  driverpreviousratingfive: any;

  regiondefaultname: any;
  statedefaultname: any;
  selectedItem: number;

  title: any;
  constructor(public http: HttpClient, public route: ActivatedRoute) {
    var heading = this.route.snapshot.queryParamMap.get("title");
    if(heading ==  null || heading == ""){
      localStorage.setItem('title',"Driver Feedback");
    }else{
      localStorage.setItem("title", heading);
    }

    if (localStorage.getItem('title') == "" || localStorage.getItem('title') == null || localStorage.getItem('title') == undefined) {
      this.title = '';
    } else {
      this.title = localStorage.getItem('title');
    }


  }
  ngOnInit() {
    this.regiondefaultname = "West", this.statedefaultname = "Washington"
    this.http.get('../../assets/data/customer-feedback.json').subscribe(data => {
      this.jsondata = data;
      var index: any;
      for (index in this.jsondata) {
        if (this.region.indexOf(this.jsondata[index].Region) < 0) {
          this.region.push(this.jsondata[index].Region);
        }
      }
      this.loadDefaultRegion(this.regiondefaultname, this.jsondata)
    });


  }

  ngOnDestroy(){
    localStorage.removeItem("title");
  }

  loadDefaultRegion(regiondefaultname, jsondata) {
    this.state = []
    var index: any;
    for (index in jsondata) {
      if (jsondata[index].Region === regiondefaultname) {
        if (this.state.indexOf(jsondata[index].State) < 0) {
          this.state.push(jsondata[index].State);
        }
        this.rating = this.jsondata[index]['Avg Review Rating']
        if (this.rating == "5") {
          this.toprateddriveinfo.push({ "drivername": this.jsondata[index]['Driver Name'], "rating": this.jsondata[index]['Avg Review Rating'] });

        }
        else if (this.rating == "3" || this.rating == "2" || this.rating == "1") {
          this.lowrateddriverinfo.push({ "drivername": this.jsondata[index]['Driver Name'], "rating": this.jsondata[index]['Avg Review Rating'] })

        }
      }
    }

    this.loadDefaultData(this.regiondefaultname, this.jsondata, this.statedefaultname)
  }

  loadDefaultData(regiondefaultname, jsondata, statedefaultname) {
    this.customerinfo = [];
    var index: any;
    for (index in jsondata) {
      if (this.jsondata[index].Region === regiondefaultname && this.jsondata[index].State === statedefaultname) {
        this.customerinfo.push({ "customername": jsondata[index]['Customer Name'], "consigmentno": jsondata[index].Consignment })
      }
      this.fivestartratingcount += jsondata[index]['5 Star'];
      this.fourstartratingcount += jsondata[index]['4 Star'];
      this.threestartratingcount += jsondata[index]['3 Star'];
      this.twostartratingcount += jsondata[index]['2 Star'];
      this.onestartratingcount += jsondata[index]['1 Star'];
      this.fivestarrating.push(jsondata[index]['5 Star'])
      this.fourstarrating.push(jsondata[index]['4 Star']);
      this.threestarrating.push(jsondata[index]['3 Star']);
      this.twostartrating.push(jsondata[index]['2 Star']);
      this.onestartrating.push(jsondata[index]['1 Star']);
      this.dates.push(jsondata[index].Date)


    }
    this.fleetRatingChart(this.fivestarrating, this.dates, this.fourstarrating, this.threestarrating, this.twostartrating, this.onestartrating);
  }


  changeRegion(region) {
    this.regionname = this.regiondefaultname = region.currentTarget.value;
    this.toprateddriveinfo = [];
    this.lowrateddriverinfo = [];
    this.state = [];
    var index: any;
    for (index in this.jsondata) {
      if (this.jsondata[index].Region === this.regionname) {
        if (this.state.indexOf(this.jsondata[index].State) < 0) {
          this.state.push(this.jsondata[index].State);
        }
        this.rating = this.jsondata[index]['Avg Review Rating']
        if (this.rating == "5") {
          this.toprateddriveinfo.push({ "drivername": this.jsondata[index]['Driver Name'], "rating": this.jsondata[index]['Avg Review Rating'] });

        }
        else if (this.rating == "1" || this.rating == "2" || this.rating == "3") {
          this.lowrateddriverinfo.push({ "drivername": this.jsondata[index]['Driver Name'], "rating": this.jsondata[index]['Avg Review Rating'] })

        }
      }

    }
  }

  changeState(state) {
    this.statename = this.statedefaultname = state.currentTarget.value;
    // this.loadReviewJson(this.regionname,this.statename)
    this.customerinfo = [];
    var index: any;
    for (index in this.jsondata) {
      if (this.jsondata[index].Region === this.regiondefaultname && this.jsondata[index].State === this.statename) {
        this.customerinfo.push({ "customername": this.jsondata[index]['Customer Name'], "consigmentno": this.jsondata[index].Consignment })

      }
      this.fivestartratingcount += this.jsondata[index]['5 Star'];
      this.fourstartratingcount += this.jsondata[index]['4 Star'];
      this.threestartratingcount += this.jsondata[index]['3 Star'];
      this.twostartratingcount += this.jsondata[index]['2 Star'];
      this.onestartratingcount += this.jsondata[index]['1 Star'];
      this.fivestarrating.push(this.jsondata[index]['5 Star'])
      this.fourstarrating.push(this.jsondata[index]['4 Star']);
      this.threestarrating.push(this.jsondata[index]['3 Star']);
      this.twostartrating.push(this.jsondata[index]['2 Star']);
      this.onestartrating.push(this.jsondata[index]['1 Star']);
      this.dates.push(this.jsondata[index].Date)


    }
    this.fleetRatingChart(this.fivestarrating, this.dates, this.fourstarrating, this.threestarrating, this.twostartrating, this.onestartrating);
  }


  listClick(id, item: any) {
    this.customername = item;
    this.selectedItem = id;
    var index: any;
    for (index in this.jsondata) {
      if (this.jsondata[index]['Customer Name'] === this.customername) {
        this.drivername = this.jsondata[index]['Driver Name'];
        this.companyterm = this.jsondata[index]['Company Term'];
        this.totalexp = this.jsondata[index]['Total Experience'];
        this.date = this.jsondata[index]['Date'];
        this.feedback = this.jsondata[index]['feedback'];
        this.noofreviews = this.jsondata[index]['No of Reviews']
        this.driverperformance = this.jsondata[index]['Rating']
        this.avgfeedback = this.jsondata[index]['Avg Review Rating']
      }
    }
    this.driverRating(this.drivername)
  }


  driverRating(drivername) {
    var index: any;
    for (index in this.jsondata) {
      if (this.jsondata[index]['Driver Name'] === drivername) {
        // this.driverpreviousrating = this.jsondata[index]['Rating']
        this.driverpreviousratingone = this.jsondata[index]['1 Star']
        this.driverpreviousratingtwo = this.jsondata[index]['2 Star']
        this.driverpreviousratingthree = this.jsondata[index]['3 Star']
        this.driverpreviousratingfour = this.jsondata[index]['4 Star']
        this.driverpreviousratingfive = this.jsondata[index]['5 Star']


      }
    }
  }



  fleetRatingChart(fivestarrating, dates, fourstarrating, threestarrating, twostartrating, onestartrating) {
    this.options = {
      chart: {
        type: 'column',
        height: 350
      },
      title: {
        text: '',

      },
      xAxis: {
        categories: dates,
        min: 0,
        max: 10,
        scrollbar: {
          enabled: true
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'gray'
          }
        },
        gridLineColor: 'transparent',
        labels: {
          enabled: false
        },


      },

      credits: {
        enabled: false
      },
      legend: {
        align: 'right',
        x: 0,
        verticalAlign: 'top',
        y: 0,
        floating: true,
        backgroundColor: 'white',
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
            enabled: true,
            color: 'black'
          }
        }
      },
      series: [{
        name: '5 Star',
        data: fivestarrating,
        color: '#FF5534'
      }, {
        name: '4 Star',
        data: fourstarrating,
        color: '#FBD41F'
      }, {
        name: '3 Star',
        data: threestarrating,
        color: '#88c053'
      }, {
        name: '2 Star',
        data: twostartrating,
        color: '#D570AC'
      }, {
        name: '1 Star',
        data: onestartrating,
        color: '#47CEAD',
      }]
    };

    this.scrollchart = new Chart(this.options)

  }
}
