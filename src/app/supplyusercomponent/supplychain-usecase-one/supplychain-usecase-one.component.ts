import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { CaterpillarService } from 'src/app/core/caterpillar.service';
import { HttpClient } from '@angular/common/http';
declare var google: any;
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { count } from 'rxjs/operators';
import _ from 'lodash';
import { DatabotService } from 'src/app/core/databot.service';
import { DataService } from 'src/app/core/data.service';
import * as Highcharts from 'highcharts';
import * as exporting from 'highcharts/modules/exporting.src';
import highcharts3D from 'highcharts/highcharts-3d.src';
highcharts3D(Highcharts);
const numeral = require('numeral');

@Component({
  selector: 'app-supplychain-usecase-one',
  templateUrl: './supplychain-usecase-one.component.html',
  styleUrls: ['./supplychain-usecase-one.component.css']
})
export class SupplychainUsecaseOneComponent implements OnInit {
  highcharts = Highcharts;
  inventoryMap: any;
  trackOrder: any;
  supplyData: any = [];
  shoppingChartOption: any;
  salesChartOptions: any;
  shoppingchart: any;
  salesChart: any;
  map: any;
  lineChart: any;
  lineChartOptions: any;
  totalData: any = [];
  productsArray = 0;
  misseddeliveries = 0;
  delivered = 0;
  percentage = 0;
  percentage2 = 0;
  percentage3 = 0;
  Year: any = [];
  Products:any=[];
  Categort:any=[];
  Segment:any=[];
  dummyArray: any = [];
  MainData : any = [];
  dynamicDataOverview : any = [];
  dynamicDataOverviewSeries : any = [];
  shoppingDataOverview : any = [];
  shoppingChartSeries:any=[];
  linechartupdateXaxis  = [];
  linechartupdateSeries:any = [];
  saleChartOptions : any;
  salechart:any;
  newData: any = [
    {
      name: "Lindseys <br> $6M",
      y: 4.8,
      annualised: 2.1,
      current: 1.3,
      crs: '23',
      color: '#da1f28'

    },
    {
      name: "Fashions Direct <br> $16M",
      y: 12.8,
      annualised: 2.9,
      current: 1.32,
      crs: '23',
      color: '#2da2bf'
    },
  ]
  count : number = 0;
  constructor(public http: HttpClient, private databotservice: DatabotService, private dataService: DataService) { }

  ngOnInit() {
    this.loadsupplyUsecase();
    this.mapLocation();
  }
  df(value) {
    return numeral(value).format('0,0.00');
  }
  updatechartData(event){
    this.count = this.count+0.5;
    this.dynamicDataOverviewSeries.forEach(element => {
      element[0].y = element[0].y*this.count;
    });
    var names = ['stock'];
    var color = ['#FF6B1B'];
    var series: any = [];
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: this.dynamicDataOverviewSeries[index] })
    });
    this.shoppingChartSeries.forEach(element => {
      element.y = element.y*this.count;
    });
    var names1 = ['delivered'];
    var color1 = ['#070FB0'];
    var series1: any = [];
    this.linechartupdateSeries.forEach(element => {
      element[0].y = element[0].y*this.count;
    });
    names1.map((item, index) => {
      series1.push({ name: names1[index], color: color1[index], data: this.linechartupdateSeries[index] })
    });
    this.misseddeliveries = this.misseddeliveries*this.count;
    this.delivered = this.delivered*this.count;
    this.percentage = this.percentage*this.count;
    this.percentage2 = this.percentage2*this.count;
    this.percentage3 = this.percentage3*this.count;
    this.saleChart(this.linechartupdateXaxis,series1,event);
    this.loadnagativevaluesChart(this.dynamicDataOverview,series,event);
    this.shoppingChart(this.shoppingDataOverview,this.shoppingChartSeries,event);
  }
  updatecolumnData(event){
    this.count = this.count+0.5;
    this.dynamicDataOverviewSeries.forEach(element => {
      element[0].y = element[0].y*this.count;
    });
    var names = ['stock'];
    var color = ['#FF6B1B'];
    var series: any = [];
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: this.dynamicDataOverviewSeries[index] })
    });
    this.linechartupdateSeries.forEach(element => {
      element[0].y = element[0].y*this.count;
    });
    var names1 = ['delivered'];
    var color1 = ['#070FB0'];
    var series1: any = [];
    names1.map((item, index) => {
      series1.push({ name: names1[index], color: color1[index], data: this.linechartupdateSeries[index] })
    });
    this.shoppingChartSeries.forEach(element => {
      element.y = element.y*this.count;
    });
    this.misseddeliveries = this.misseddeliveries*this.count;
    this.delivered = this.delivered*this.count;
    this.percentage = this.percentage*this.count;
    this.percentage2 = this.percentage2*this.count;
    this.percentage3 = this.percentage3*this.count;
    this.loadnagativevaluesChart(this.dynamicDataOverview,series,event);
    this.shoppingChart(this.shoppingDataOverview,this.shoppingChartSeries,event);
    this.saleChart(this.linechartupdateXaxis,series1,event);
  }
  updateShoppingData(event){
    this.loadnagativevaluesChart(this.dynamicDataOverview,this.dynamicDataOverviewSeries,event);
    this.shoppingChart(this.shoppingDataOverview,this.shoppingChartSeries,event);
    this.saleChart(this.linechartupdateXaxis,this.linechartupdateSeries,event);
  }
  loadsupplyUsecase() {
    this.databotservice.getSupplyUsecaseone().subscribe(data => {
      this.getLineCount(data); 
      this.getColChart(data);
      this.getColumnCount(data);
      this.supplyData = data;
      this.dummyArray = data;
      this.Year = _.uniqBy(data, 'year')
      this.Products = _.uniqBy(data,'product')
      this.Categort = _.uniqBy(data,'Category')
      this.Segment = _.uniqBy(data,'segment')
      this.supplyData.map(item => {
        this.misseddeliveries += item.misseddeliveries * 10;
      })
      this.supplyData.map(item => {
        if (item.delivered != null) {
          this.delivered += item.delivered * 10;
        }
      })
      this.supplyData.map(item => {
        if (item.percentage != null) {
          this.percentage += item.percentage * 10;
        }
      })
      this.supplyData.map(item => {
        if (item.percentage != null) {
          this.percentage2 += item.profit % 100;
        }
      })
      this.supplyData.map(item => {
        if (item.percentage != null) {
          this.percentage3 += item.profitRate % 100;
        }
      })
    }, err => {
      console.log("Error", err);
    })
  }
  selectedState(event) {
  this.productsArray = 0;
  this.misseddeliveries = 0;
  this. delivered = 0;
  this.percentage = 0;
  this.percentage2 = 0;
  this.percentage3 = 0;
    var element = event.currentTarget.value;
    let dataArray: any = [];
    if('ALL' == element){
      dataArray = this.dummyArray;
    }
    for (let obj of this.dummyArray) {
      if (obj['year'] == element) {
        dataArray.push(obj);
      }
    } 
    dataArray.map(item => {
      this.misseddeliveries += item.misseddeliveries * 10;
    })
    dataArray.map(item => {
      if (item.delivered != null) {
        this.delivered += item.delivered * 17;
      }
    })
    dataArray.map(item => {
      if (item.percentage != null) {
        this.percentage += item.percentage * 19;
      }
    })
    dataArray.map(item => {
      if (item.percentage != null) {
        this.percentage2 += item.profit % 100;
      }
    })
    dataArray.map(item => {
      if (item.percentage != null) {
        this.percentage3 += item.profitRate % 100;
      }
    })
    var data = dataArray;
    this.getLineCount(data); 
    this.getColChart(data);
    this.getColumnCount(data);
  }
  selectedSales(event) {
    this.productsArray = 0;
  this.misseddeliveries = 0;
  this. delivered = 0;
  this.percentage = 0;
  this.percentage2 = 0;
  this.percentage3 = 0;
    var element = event.currentTarget.value;
    let dataArray: any = [];
    if('ALL' == element){
      dataArray = this.dummyArray;
    }
    for (let obj of this.dummyArray) {
      if (obj['product'] == element) {
        dataArray.push(obj);
      }
    }
    dataArray.map(item => {
      this.misseddeliveries += item.misseddeliveries * 5;
    })
    dataArray.map(item => {
      if (item.delivered != null) {
        this.delivered += item.delivered * 16;
      }
    })
    dataArray.map(item => {
      if (item.percentage != null) {
        this.percentage += item.percentage * 18;
      }
    })
    dataArray.map(item => {
      if (item.percentage != null) {
        this.percentage2 += item.profit % 100;
      }
    })
    dataArray.map(item => {
      if (item.percentage != null) {
        this.percentage3 += item.profitRate % 100;
      }
    })
    var data = dataArray;
    this.getLineCount(data); 
    this.getColChart(data);
    this.getColumnCount(data);
  }
  selectedStock(event) {
    this.productsArray = 0;
  this.misseddeliveries = 0;
  this. delivered = 0;
  this.percentage = 0;
  this.percentage2 = 0;
  this.percentage3 = 0;
    var element = event.currentTarget.value;
    let dataArray: any = [];
    if('ALL' == element){
      dataArray = this.dummyArray;
    }
    for (let obj of this.dummyArray) {
      if (obj['Category'] == element) {
        dataArray.push(obj);
      }
    }
    dataArray.map(item => {
      this.misseddeliveries += item.misseddeliveries * 18;
    })
    dataArray.map(item => {
      if (item.delivered != null) {
        this.delivered += item.delivered * 9;
      }
    })
    dataArray.map(item => {
      if (item.percentage != null) {
        this.percentage += item.percentage * 18;
      }
    })
    dataArray.map(item => {
      if (item.percentage != null) {
        this.percentage2 += item.profit % 100;
      }
    })
    dataArray.map(item => {
      if (item.percentage != null) {
        this.percentage3 += item.profitRate % 100;
      }
    })
    var data = dataArray; 
    this.getLineCount(data); 
    this.getColChart(data);
    this.getColumnCount(data);
  }
  selectedIds(event) {
    this.productsArray = 0;
  this.misseddeliveries = 0;
  this. delivered = 0;
  this.percentage = 0;
  this.percentage2 = 0;
  this.percentage3 = 0;
    var element = event.currentTarget.value;
    // console.log(element)
    let dataArray: any = [];
    if('ALL' == element){
      dataArray = this.dummyArray;
    }
    for (let obj of this.dummyArray) {
      if (obj['segment'] == element) {
        dataArray.push(obj);
      }
    }
    dataArray.map(item => {
      this.misseddeliveries += item.misseddeliveries * 22;
    })
    dataArray.map(item => {
      if (item.delivered != null) {
        this.delivered += item.delivered * 5;
      }
    })
    dataArray.map(item => {
      if (item.percentage != null) {
        this.percentage += item.percentage * 10;
      }
    })
    dataArray.map(item => {
      if (item.percentage != null) {
        this.percentage2 += item.profit % 100;
      }
    })
    dataArray.map(item => {
      if (item.percentage != null) {
        this.percentage3 += item.profitRate % 100;
      }
    })
    var data = dataArray;
    this.getLineCount(data); 
    this.getColChart(data);
    this.getColumnCount(data);
  }
  getLineCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['product'].map(function (k) { return a[k]; }).join('|');
      if (a.product === undefined || a.product === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.product, delivered: 0} };
        result.push(hash[key].data);
      }
      hash[key].data.delivered += a.delivered;
      hash[key].data.definition = a.product;
      hash[key].count++;
    });
    var names = ['delivered'];
    var color = ['#070FB0']
    var Xaxis: any = [];
    var series: any = [];
    var TotalSales: any = [];
    var TotalSalesly: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      TotalSales.push(result[index].delivered);
      Xaxis.push(result[index].definition);
      totalcases = [TotalSales];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] })
    });
    // console.log("line", series);
    this.linechartupdateXaxis = Xaxis;
    this.linechartupdateSeries = totalcases;
    this.saleChart(Xaxis, series,'');
  }
  getColumnCountByUpdate(data,event) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['product'].map(function (k) { return a[k]; }).join('|');
      if (a.product === undefined || a.product === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.product, stock: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.stock += a.annualstock;
      hash[key].data.definition = a.product;
      hash[key].count++;
    });
    var names = ['stock'];
    var color = ['#FF6B1B']
    var Xaxis: any = [];
    var series: any = [];
    var TotalSales: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      TotalSales.push(result[index].stock);
      Xaxis.push(result[index].name);
      totalcases = [TotalSales];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] })
    });
    this.dynamicDataOverview = Xaxis;
    this.dynamicDataOverviewSeries = totalcases;
    this.loadnagativevaluesChart(Xaxis, series,'');
  }
  getColumnCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['product'].map(function (k) { return a[k]; }).join('|');
      if (a.product === undefined || a.product === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.product, stock: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.stock += a.annualstock;
      hash[key].data.definition = a.product;
      hash[key].count++;
    });
    var names = ['stock'];
    var color = ['#FF6B1B']
    var Xaxis: any = [];
    var series: any = [];
    var TotalSales: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      TotalSales.push(result[index].stock);
      Xaxis.push(result[index].name);
      totalcases = [TotalSales];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] })
    });
    this.dynamicDataOverview = Xaxis;
    this.dynamicDataOverviewSeries = totalcases;
    this.loadnagativevaluesChart(Xaxis, series,'');
  }
  getColChart(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['product'].map(function (k) { return a[k]; }).join('|');
      if (a.profitRate === undefined || a.profitRate === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.product, stock: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.stock += a.profitRate;
      hash[key].data.definition = a.product;
      hash[key].count++;
    });
    var names = ['stock'];
    var color = [' #FFAC4E']
    var Xaxis: any = [];
    var series: any = [];
    var TotalSales: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      TotalSales.push(result[index].stock);
      Xaxis.push(result[index].name);
      totalcases = [TotalSales];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] })
    });
    this.shoppingDataOverview = Xaxis;
    this.shoppingChartSeries = series;
    this.shoppingChart(Xaxis, series,'');
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
  loadnagativevaluesChart(Xaxis, chartData,name) {
    // console.log(chartData)
    var $this = this;
    var tooltipEnabled = true;
    this.salesChartOptions = {
      chart: {
        type: 'column',
        backgroundColor: ' #ffffff',
        events: {
          load: function (e) {
              var dataarr = e.target.series[0].data;
              dataarr.map(item => {
                if(item['category'] == name){
                  item.update({
                    color: '#ff6b1b96'
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
        categories: Xaxis,
      },
      yAxis:{
        title:{
          text:null
        }
      },
      legend: {
        enabled: false
    },
      credits: {
        enabled: false
      },
      showInLegend:false,
      plotOptions: {
        series: {
            point: {
                events: {
                  click: function (event) {
                     $this.updatecolumnData(event.point.category);
                  },
                }
            }
        }
    },
      exporting: false,
      series: chartData,
        
    }
    this.salesChart = new Chart(this.salesChartOptions);
  }
  saleChart(Xaxis, series,name) {
    var $this = this;
    var tooltipEnabled = true;
    this.saleChartOptions = {
      chart: {
        type: 'column',
            backgroundColor: ' #ffffff',
            events: {
          load: function (e) {
              var dataarr = e.target.series[0].data;
              dataarr.map(item => {
                if(item['category'] == name){
                  item.update({
                    color: '#070fb07a'
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
      yAxis:{
        title:{
          text:null
        }
      },
      legend: {
        enabled: false
    },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
            point: {
                events: {
                  click: function (event) {
                     $this.updatechartData(event.point.category);
                  },
                }
            }
        }
    },
      exporting: false,
      series: series,
        
    }
    this.salechart = new Chart(this.saleChartOptions);
  }
  shoppingChart(Xaxis, series,name) {
    let value = [2000, 10000, 6000, 4455, 5420, 4678, 8354, 1234, 5432, 6754, 9238, 8734];
    var $this = this;
    var tooltipEnabled = true;
    this.shoppingChartOption = {
      chart: {
        type: 'column',
            backgroundColor: ' #ffffff',
            events: {
          load: function (e) {
            var dataIndex = 0;
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = (+value[dataIndex]);
              series.addPoint([x, y], true, true);
            }, 1000);

            setInterval(function () {
              dataIndex = dataIndex + 1;
              if (dataIndex === value.length) {
                dataIndex = 0;
              }
            }, 1000);
           }
      }
      },
      title: {
        text: null
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      time: {
        useUTC: false
      },
      yAxis:{
        title:{
          text:null
        }
      },
      legend: {
        enabled: false
    },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
            point: {
                events: {
                  click: function (event) {
                     $this.updateShoppingData(event.point.category);
                  },
                }
            }
        }
    },
      exporting: false,
      series:  [{
      name: 'Year 1800',
      color:' #FFAC4E',
      data:(function () {
        // generate an array of random data
        const data = [],
          time = (new Date()).getTime();
        for (let i = -10; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: value[i]
          });
        }
        return data;
      }())
    }]
    }
    this.shoppingchart = new Chart(this.shoppingChartOption);
  }
  mapLocation() {
    this.http.get('../../assets/data/fleetLocation.json').subscribe(data => {
      var mapdata = data;
      this.loadmap(mapdata)
    });
  }

  loadmap(mapdata) {
    // console.log(mapdata);
    var $this = this;
    this.map = new google.maps.Map(document.getElementById('Newdata'), {
      zoom: 10,
      center: new google.maps.LatLng(34.051, -86.045),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false
    });

    // var infowindow = new google.maps.InfoWindow();
    var marker;
    var i;
    // var image = {
    //   url: '../../assets/images/warehouse.png',
    //   scaledSize: new google.maps.Size(50, 50),
    // };

    // for (i = 0; i < mapdata.length; i++) {
    //   marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(mapdata[i].Latitude, mapdata[i].Longitude),
    //     map: this.map,
    //     icon: image
    //   });
    //   // attachSecretMessage(marker, mapdata[i].Latitude, mapdata[i].Longitude);
    // }

    // function attachSecretMessage(marker, lat, long) {
    //   var geocoder = new google.maps.Geocoder();
    //   marker.addListener('click', function () {
    //     var latlong1 = new google.maps.LatLng(lat, long);
    //     geocoder.geocode({ 'location': latlong1 }, function (res, status) {
    //       if (status == 'OK') {

    //         var currentLocation = res[0].address_components[2].long_name;
    //         // $this.city = currentLocation;
    //         // $this.state = res[0].address_components[4].long_name;
    //         // $this.country = res[0].address_components[5].long_name;

    //         // $this.esttime = est;
    //         infowindow = new google.maps.InfoWindow({
    //           content: '<b><p style="color:blue;text-weight:bold">' + currentLocation + '</p></b>'

    //         });

    //         // alert(this.warehousename)
    //         infowindow.open(this.map, marker);

    //       } else {
    //         alert('Geocode was not successful for the following reason: ' + status);
    //       }
    //       marker.addListener('mouseout', function () {
    //         infowindow.close(marker.get('map'), marker);
    //       });
    //     });
    //   });


    //   // marker.addListener('dblclick', function (mouseEvent) {
    //   //   // alert('Right click triggered');
    //   //   // this.map.setCenter(this.position);
    //   //   $(".modal-header .modal-title").text(this.title);
    //   //   //  $(".modal-body #modalLatLng").text(this.position);
    //   //   $('#myModal').modal('show');


    //   // });
    // }


  }

}
