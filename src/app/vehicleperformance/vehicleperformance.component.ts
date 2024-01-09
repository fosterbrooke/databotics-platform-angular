import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { chart } from 'highcharts';
declare var require: any;
import { HttpClient } from '@angular/common/http';
import { ScrollBar } from '@ng-bootstrap/ng-bootstrap/util/scrollbar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicleperformance',
  templateUrl: './vehicleperformance.component.html',
  styleUrls: ['./vehicleperformance.component.css']
})
export class VehicleperformanceComponent  implements OnInit,OnDestroy {
    driveranalytics = true;
    selected: any;
    driverattendance = false;
    driveranalyticsdata: any;
    driverattendencedata: any;
    cellValue: any;
    data: any;
    options: any;
    months: any = ["1", "2", "3"];
    /**dropdown*/
    jsondata: any;
    categories: any = [];
    state: any = [];
    region: any = [];
    rating: any = [];

    categoryname: any;
    statename: any;
    regionname: any;
    performanc: any;
    driverinformation: any = []
    drivername: any = [];
    response: any = [];
    /**JSON BINDING */
    trip: any;
    deliveries: any;
    tripduration: any;
    tripmileage: any;
    engineoffline: any
    cardSelected: any;
    sampleRudhBreaking: any
    historicdata: any;

    speedevent: any;
    seeddate: any;
    historiceventdata: any = []
    xasis: any = []
    yaxis: any = []

    /**Default Value */
    regiondefaultname: any;
    statedefaultname: any;
    categorydefaultname: any;
    ratingdefaultname: any;

    /**Heat Map Value */
    heatmapdata: any = [];
    array: any = [];
    paramasid: any;
    title: any;

    constructor(public http: HttpClient, private route: ActivatedRoute) {
        var heading = this.route.snapshot.queryParamMap.get("title");
        if(heading == null || heading == ""){
          localStorage.setItem('title',"Vehicle Performance");
        }else{
          localStorage.setItem("title",heading);
        }

        if (localStorage.getItem('title') == "" || localStorage.getItem('title') == null || localStorage.getItem('title') == undefined) {
            this.title = '';
          } else {
            this.title = localStorage.getItem('title');
          }
    
    }

    ngOnInit() {
        this.cardSelected = 1;
        this.selected = 1;
        this.regiondefaultname = "Midwest", this.statedefaultname = "Illinois", this.categorydefaultname = "91-100", this.ratingdefaultname = "4"
        this.http.get('../../assets/data/driverinfo.json').subscribe(data => {
            this.jsondata = data;
            var index: any;
            for (index in this.jsondata) {
                // alert('HII')

                if (this.region.indexOf(this.jsondata[index].Region) < 0) {
                    this.region.push(this.jsondata[index].Region);
                }

            }
                this.loadDefaultRegion(this.regiondefaultname, this.jsondata);
        });
    }

    ngOnDestroy(){
      localStorage.removeItem("title");
    }

    loadDefaultRegion(regiondefaultname, jsondata) {
        this.state = [];
        this.categories = [];
        this.rating = [];
        var index: any;
        for (index in this.jsondata) {
            if (this.jsondata[index].Region === regiondefaultname) {

                if (this.state.indexOf(jsondata[index].State) < 0) {
                    this.state.push(jsondata[index].State);
                }
            }
        }
        this.loadDefaultCategory(this.regiondefaultname, this.statedefaultname, this.jsondata)

    }

    loadDefaultCategory(regiondefaultname, statedefaultname, jsondata) {
        this.categories = [];
        this.rating = [];
        var index: any;
        for (index in this.jsondata) {
            if (jsondata[index].Region === regiondefaultname && this.jsondata[index].State === statedefaultname) {
                if (this.categories.indexOf(this.jsondata[index].Category) < 0) {
                    this.categories.push(this.jsondata[index].Category);
                }
            }
        }
        this.loadDefaultRating(this.regiondefaultname, this.statedefaultname, this.jsondata, this.categorydefaultname)
    }

    loadDefaultRating(regiondefaultname, statedefaultname, jsondata, categorydefaultname) {
        var index: any;
        for (index in this.jsondata) {
            if (jsondata[index].Region === regiondefaultname && this.jsondata[index].State === statedefaultname, this.jsondata[index].Category === categorydefaultname) {
                if (this.rating.indexOf(this.jsondata[index].Rating) < 0) {
                    this.rating.push(this.jsondata[index].Rating);
                }
            }
        }
        this.loadDefaultData(this.regiondefaultname, this.statedefaultname, this.categorydefaultname, this.ratingdefaultname, this.jsondata)
    }
    loadDefaultData(regiondefaultname, statedefaultname, categorydefaultname, ratingdefaultname, jsondata) {
        var index: any;
        var index: any;
        for (index in this.jsondata) {
            if (jsondata[index].Region === regiondefaultname && jsondata[index].Category === categorydefaultname &&
                this.jsondata[index].State === statedefaultname && this.jsondata[index].Rating == ratingdefaultname) {
                this.driverinformation.push({
                    "Name": this.jsondata[index]['Name'], "Experience": this.jsondata[index].Experience, "Licensenumber":
                        this.jsondata[index]['Licence Number'], "Trafficviolation": this.jsondata[index]['Traffic Violation'], "Truckid": this.jsondata[index]['Truck ID'],
                    "Xcategory": this.jsondata[index].Dates, "overspeeding": this.jsondata[index].Over_Speeding, "heatmapdata": this.jsondata[index].Shift,
                    "rashbreaking": this.jsondata[index]['Rash Breaking'], "idletime": this.jsondata[index]['Idle Item'], "vehicletype": this.jsondata[index]['Vehcile Type']
                });
            }
        }
        this.loadChartsForDriver(this.driverinformation);

    }

    loadSpline(seriesdata, dates) {

        this.options = {
            chart: {
                type: 'spline'
            },

            xAxis: {
                categories: seriesdata,
                min: 0,
                max: 10,
                scrollbar: {
                    enabled: true
                }
            },
            title: {
                text: ''

            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value + '';
                    },

                },
                gridLineColor: 'transparent',
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        // radius: 4,
                        lineColor: '#273048',
                        lineWidth: 1
                    }
                }
            },
            series: [{

                data: dates,
                color: '#273048'


            }]

        };

        return new Chart(this.options);
    }


    loadHeatmap(heatdata) {
        this.array = [];
        let duplicatearr = heatdata.slice();
        duplicatearr.push("8.08", "8.53", "9.02", "8.00");
        duplicatearr[63] = null;
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k <= 31; k++) {
                this.array.push([k, j, duplicatearr[k]]);
                // heapmapdata.splice(0,k);
            }
            duplicatearr.splice(0, k);
        }
        this.options = {
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1,
                ScrollBar: {
                    enabled: true
                }
            },


            title: {
                text: 'Driver Attendance'
            },
            credits: {
                enabled: false
            },

            xAxis: {
                categories: this.months,
                min: 0,
                max: 8,
                scrollbar: {
                    enabled: true
                }
            },

            yAxis: {
                categories: ['Oct', 'Nov', 'Dec'],
                title: null
            },

            colorAxis: {
                min: 0,
                max: 9,
                minColor: '#FFFFFF',
                maxColor: '#155F57'
            },

            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },

            tooltip: {
                formatter: function () {
                    return this.point.value + '</b> hours on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                }
            },

            series: [{
                name: '',
                borderWidth: 1,
                data: this.array,
                dataLabels: {
                    enabled: true,
                    color: 'black'
                }
            }]


        };

        return new Chart(this.options);
    }


    setActive(item: any) {
        this.driveranalytics = false;
        this.driverattendance = true;
        this.selected = item;
    }

    setActiveDriver(item: any) {
        this.driveranalytics = true;
        this.driverattendance = false;
        this.selected = item;
    }

    isActive(item: any) {
        return this.selected === item;
    }
    /**Drop Down*/
    changeRegion(region) {
        this.regionname = this.regiondefaultname = region.currentTarget.value;
        this.state = [];
        this.categories = [];
        this.rating = [];
        var index: any;
        for (index in this.jsondata) {
            if (this.jsondata[index].Region === this.regionname) {

                if (this.state.indexOf(this.jsondata[index].State) < 0) {
                    this.state.push(this.jsondata[index].State);
                }
            }
        }
    }

    changeState(state) {
        this.statename = this.statedefaultname = state.currentTarget.value
        this.categories = [];
        this.rating = [];
        var index: any;
        for (index in this.jsondata) {
            if (this.jsondata[index].Region === this.regiondefaultname && this.jsondata[index].State === this.statename) {
                if (this.categories.indexOf(this.jsondata[index].Category) < 0) {
                    this.categories.push(this.jsondata[index].Category);
                }
            }
        }

    }
    changeCategory(category) {
        this.categoryname = this.categorydefaultname = category.currentTarget.value
        // console.log(this.categoryname)
        this.rating = [];
        var index: any;
        for (index in this.jsondata) {
            if (this.jsondata[index].Region === this.regiondefaultname && this.jsondata[index].State ===
                this.statedefaultname && this.jsondata[index].Category === this.categoryname) {
                if (this.rating.indexOf(this.jsondata[index].Rating) < 0) {
                    this.rating.push(this.jsondata[index].Rating);

                }
            }

        }

    }

    changeRating(rating) {
        this.response = [];
        this.driverinformation = [];
        this.performanc = this.ratingdefaultname = rating.currentTarget.value;
        var index: any;
        for (index in this.jsondata) {
            if (this.jsondata[index].Region === this.regiondefaultname && this.jsondata[index].Category === this.categorydefaultname &&
                this.jsondata[index].State === this.statedefaultname && this.jsondata[index].Rating == this.performanc) {
                this.driverinformation.push({
                    "Name": this.jsondata[index]['Name'], "Experience": this.jsondata[index].Experience, "Licensenumber":
                        this.jsondata[index]['Licence Number'], "Trafficviolation": this.jsondata[index]['Traffic Violation'], "Truckid": this.jsondata[index]['Truck ID'],
                    "Xcategory": this.jsondata[index].Dates, "overspeeding": this.jsondata[index].Over_Speeding, "heatmapdata": this.jsondata[index]['Shift'],
                    "rashbreaking": this.jsondata[index]['Rash Breaking'], "idletime": this.jsondata[index]['Idle Item'], "vehicletype": this.jsondata[index]['Vehcile Type']
                })
                //  this.drivername = this.jsondata[index]['Name']
                //        this.xasis = this.jsondata[index]['X Axis']
                //        this.yaxis = this.jsondata[index]['Y Axis']
                // this.loadSpline(this.xasis,this.yaxis);

                // this.getOverSpeedingData(this.drivername)
            }

        }
        this.loadChartsForDriver(this.driverinformation);
    }


    loadChartsForDriver(driverinfochart) {
        console.log(this.cardSelected);
        driverinfochart.forEach(element => {
            if (this.cardSelected == 1) {
                element['chartObject'] = this.loadSpline(element.Xcategory, element.overspeeding);
            } else if (this.cardSelected == 2) {
                element['chartObject'] = this.loadSpline(element.Xcategory, element.rashbreaking);
            } else if (this.cardSelected == 3) {
                element['chartObject'] = this.loadSpline(element.Xcategory, element.idletime);
            }
            element['heatMapObject'] = this.loadHeatmap(element.heatmapdata);
            this.response.push(element);
        });
        // console.log(this.response);

    }



    /**Chart Binding */
    isCardActive(item: any) {
        return this.cardSelected === item;
    }

    setOverSpeedingActive(item: any) {
        this.cardSelected = item;
        this.response = [];
        this.loadChartsForDriver(this.driverinformation);
    }

    setOverRudhBreakingActive(item: any) {
        this.cardSelected = item;
        this.response = [];
        this.loadChartsForDriver(this.driverinformation);

    }
    setEngineIdlingActive(item: any) {
        this.cardSelected = item;
        this.response = [];
        this.loadChartsForDriver(this.driverinformation);
    }



}
