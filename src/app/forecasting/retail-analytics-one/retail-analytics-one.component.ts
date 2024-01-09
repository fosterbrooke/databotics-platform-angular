import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import _ from 'lodash';
import { DataService } from 'src/app/core/data.service';
const numeral = require('numeral');
import { HttpClient } from '@angular/common/http';
import { Color } from 'highcharts';
import { createRendererV1 } from '@angular/core/src/view/refs';
declare const google: any;
@Component({
  selector: 'app-retail-analytics-one',
  templateUrl: './retail-analytics-one.component.html',
  styleUrls: ['./retail-analytics-one.component.css']
})
export class RetailAnalyticsOneComponent implements OnInit {
  CategoryArray: any = [];
  dummyArray: any = [];
  Category: any = [];
  changeData: any = [];
  Month: any = [];
  Months: any = [];
  totalData: any = [];
  buyerChartOptions: any;
  buychart: any;
  columnOptions: any;
  columnchart: any;
  bobbleOption: any;
  bobblechart: any;
  cat1: number = 0;
  saleArray: number = 0;
  totalArray: number = 0;
  map: any;
  data: any;
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
  bobbleChartDataOverview: any = [];
  columnChartDataOverview: any = [];
  columnChartDataSeries: any = [];
  count: number = 0;

  name: any;
  value: any;
  constructor(public http: HttpClient, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.getFullData();
    this.mapLocation();
  }
  getFullData() {
    this.dataService.getRetailDataOne().subscribe(data => {
      console.log(data);
      this.dummyArray = data;
      this.CategoryArray = _.uniqBy(data, 'Category');
      this.Months = _.uniqBy(data, 'FiscalMonth').reverse();
      this.getPieChart(data);
      this.getColumnChart(data);
      this.getBobbleChart(data);
      this.dummyArray.map(item => {
        this.cat1 += item.TotalSales;
      })
      this.dummyArray.map(item => {
        this.saleArray += item.TotalSalesLY;
      })
      this.dummyArray.map(item => {
        this.totalArray += item.salesPerSqFt * 10;
      })
    }, err => {
      console.log("error", err);
    })
  }
  df(value) {
    return numeral(value).format('0,0.0');
  }
  updateColumnData(event) {
    this.columnChart(this.columnChartDataOverview, this.columnChartDataSeries, event)
    this.bobbleChart(this.bobbleChartDataOverview, event);
  }
  updateBobbleChartData(event) {
    this.columnChart(this.columnChartDataOverview, this.columnChartDataSeries, event)
    this.bobbleChart(this.bobbleChartDataOverview, event);
  }
  updatePiechartData(event,sliced) {
    if(sliced == undefined || sliced == false){
      console.log(" if");
      console.log(event)
    var selectedChain = [];
    for(let obj of this.dummyArray){
      if(obj.Chain == event){
        selectedChain.push(obj);
      }
    }
    selectedChain.map(item => {
      if (item.TotalSales != null) {
        this.cat1 += item.TotalSales;
      }
    })
    selectedChain.map(item => {
      if (item.TotalSalesLY != null) {
        this.saleArray += parseInt(item.TotalSalesLY);
      }
    })
    selectedChain.map(item => {
      if (item.salesPerSqFt != null) {
        this.totalArray += item.salesPerSqFt * 10;
      }
    })
    this.getBobbleChart(selectedChain);
    this.getColumnChart(selectedChain);
    }else if(sliced == true){
      console.log("else if");
  this.cat1= 0;
  this.saleArray= 0;
  this.totalArray= 0;
      this.dummyArray.map(item => {
        if (item.TotalSales != null) {
          this.cat1 += item.TotalSales;
        }
      })
      this.dummyArray.map(item => {
        if (item.TotalSalesLY != null) {
          this.saleArray += parseInt(item.TotalSalesLY);
        }
      })
      this.dummyArray.map(item => {
        if (item.salesPerSqFt != null) {
          this.totalArray += item.salesPerSqFt * 10;
        }
      })
      this.getBobbleChart(this.dummyArray);
      this.getColumnChart(this.dummyArray);
    }
  }
  getPieChart(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['Chain'].map(function (k) { return a[k]; }).join('|');
      if (a.TotalSales === undefined || a.TotalSales === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.Chain, y: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.y += a.TotalSales;
      hash[key].count++;
    });
    var color = ['#03cb44', '#ff2500'];
    var Xaxis: any = [];
    var series: any = [];
    var TotalSales: any = [];
    result.map((item, index) => {
      TotalSales.push(result[index].y);
      Xaxis.push(result[index].definition);
    });
    result.map((item, index) => {
      series.push({ name: Xaxis[index], color: color[index], data: [{ y: TotalSales[index] }] })
    });
    this.totalData = result;
    console.log("piechart", result)
    result.map(item => {
      item.y = parseFloat(item.y.toFixed(2));
    })
    this.buyerChart(result)
  }
  getBobbleChart(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['DM'].map(function (k) { return a[k]; }).join('|');
      if (a.DM === undefined || a.avgDollarPerUnitTY === null && a.totalSalesVariancePercentage === undefined || a.avgDollarPerUnitTY === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.DM, x: 0, y: 0, z: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.x += a.avgDollarPerUnitTY*2;
      hash[key].data.y += a.totalSalesVariancePercentage;
      hash[key].data.z += a.avgDollarPerUnitTY;
      hash[key].data.definition = a.DM;
      hash[key].count++;
    });
    var color = ['#7cc0f7', '#1aa8a9', '#070fb0', '#1769a3', '#ff4b4c', '#ff6b1b', '#03cb44', '#a42cee', '#ffac4e', '#070fb0'];
    var Xaxis: any = [];
    var series: any = [];
    var cat1: any = [];
    var cat2: any = [];
    var cat3: any = [];
    result.map((item, index) => {
      cat1.push(result[index].x);
      cat2.push(result[index].y);
      cat3.push(result[index].z);
      Xaxis.push(result[index].definition);
    });
    console.log(result);
    result.map((item, index) => {
      series.push({ name: Xaxis[index], color: color[index], data: [{ x: cat1[index], y: cat2[index], z: cat3[index] }] })
    });
    console.log(series);
    // this.totalData = result;
    this.bobbleChartDataOverview = series;
    this.bobbleChart(series, '')
  }
  getColumnChart(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['FiscalMonth'].map(function (k) { return a[k]; }).join('|');
      if (a.TotalSales === undefined || a.TotalSales === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = {
          count: 0, data: {
            name: a.FiscalMonth, sales: 0, totalSales: 0, allanguinot: 0, andrew: 0, annelie: 0,
            bradsutton: 0, carlos: 0, chris: 0, gurk: 0, tinal: 0
          }
        };
        result.push(hash[key].data);
      }
      // hash[key].data.sales += a.sales;
      hash[key].data.totalSales += a.totalSalesVariancePercentage*6;
      hash[key].data.allanguinot += a.avgDollarPerUnitTY*1;
      hash[key].data.andrew += a.salesPerSqFt*1;
      hash[key].data.annelie += a.totalSalesVariancePercentage*10;
      hash[key].data.bradsutton += a.salesPerSqFt;
      hash[key].data.carlos += a.avgDollarPerUnitTY;
      hash[key].data.chris += a.totalSalesVariancePercentage*8;
      hash[key].data.gurk += a.salesPerSqFt*2;
      hash[key].data.tinal += a.avgDollarPerUnitTY*-1;
      hash[key].data.definition = a.FiscalMonth;
      hash[key].count++;
    });
    var names = ['Allan Guinot', 'Andrew Ma', 'Annelie Zubar', 'Brad Sutton', 'Carlos Grilo', 'Chris Gray', 'Chris Mc Gurk', 'Tinal Tassila', 'Valery Ushakov'];
    var color = ['#7cc0f7', '#1aa8a9', '#070fb0', '#1769a3', '#ff4b4c', '#ff6b1b', '#03cb44', '#a42cee', '#ffac4e']
    var Xaxis: any = [];
    var series: any = [];
    var sales: any = [];
    var totalSales: any = [];
    var allanguinot: any = [];
    var andrew: any = [];
    var annelie: any = [];
    var bradsutton: any = [];
    var carlos: any = [];
    var chris: any = [];
    var gurk: any = [];
    var tinal: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      // sales.push(result[index].sales);
      totalSales.push(result[index].totalSales);
      allanguinot.push(result[index].allanguinot);
      andrew.push(result[index].andrew);
      annelie.push(result[index].annelie);
      bradsutton.push(result[index].bradsutton);
      carlos.push(result[index].carlos);
      chris.push(result[index].chris);
      gurk.push(result[index].gurk);
      tinal.push(result[index].tinal);
      Xaxis.push(result[index].definition);
      totalcases = [totalSales, allanguinot, andrew, annelie, bradsutton, carlos, chris, gurk, tinal];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] })
    });
    console.log(series);
    this.columnChartDataOverview = Xaxis;
    this.columnChartDataSeries = series;
    this.columnChart(Xaxis, series, '');
  }
  // getBuyerCount(data) {
  //   var hash = Object.create(null);
  //   var result = [];

  //   data.forEach(function (a) {
  //     var key = ['category'].map(function (k) { return a[k]; }).join('|');
  //     if (a.category === undefined || a.category === null) {
  //       return;
  //     }
  //     if (!hash[key]) {
  //       hash[key] = { count: 0, data: { name: a.category, y: 0 } };
  //       result.push(hash[key].data);
  //     }
  //     hash[key].data.y += a.fiscal;
  //     hash[key].count++;
  //   });
  //   var color = ['#070fb0', '#ff4b4c', '#03cb44', '#a42cee', '#ffac4e','#7cc0f7'];
  //   var names = ['Fashions Direct', 'Lindseyes', 'Lindseyes1', 'Fashions', 'Direct', 'Fashions1']
  //   var Xaxis: any = [];
  //   var series: any = [];
  //   var fiscal: any = [];
  //   result.map((item, index) => {
  //     fiscal.push(result[index].y);
  //     Xaxis.push(result[index].definition);
  //   });
  //   result.map((item, index) => {
  //     series.push({ name: names[index], color: color[index], y: fiscal[index] })
  //   });
  //   this.totalData = result;
  //   console.log("piechart", result, series)
  //   result.map(item => {
  //     item.y = parseFloat(item.y.toFixed(2));
  //   })
  //   this.buyerChart(series)
  // }
  // getBobbleCount(data) {
  //   var hash = Object.create(null);
  //   var result = [];

  //   data.forEach(function (a) {
  //     var key = ['sales'].map(function (k) { return a[k]; }).join('|');
  //     if (a.sales === undefined || a.andrew === null && a.totalSales === undefined || a.totalSales === null) {
  //       return;
  //     }
  //     if (!hash[key]) {
  //       hash[key] = { count: 0, data: { name: a.sales, x: 0, y: 0, z: 0 } };
  //       result.push(hash[key].data);
  //     }
  //     hash[key].data.x += a.cat1;
  //     hash[key].data.y += a.cat2;
  //     hash[key].data.z += a.cat3;
  //     hash[key].data.definition = a.sales;
  //     hash[key].count++;
  //   });
  //   var color = ['#7cc0f7', '#1aa8a9', '#070fb0', '#1769a3', '#ff4b4c', '#ff6b1b', '#03cb44', '#a42cee', '#ffac4e', '#070fb0'];
  //   var Xaxis: any = [];
  //   var series: any = [];
  //   var cat1: any = [];
  //   var cat2: any = [];
  //   var cat3: any = [];
  //   result.map((item, index) => {
  //     cat1.push(result[index].x);
  //     cat2.push(result[index].y);
  //     cat3.push(result[index].z);
  //     Xaxis.push(result[index].definition);
  //   });
  //   console.log(result);
  //   result.map((item, index) => {
  //     series.push({ name: Xaxis[index], color: color[index], data: [{ x: cat1[index], y: cat2[index], z: cat3[index] }] })
  //   });
  //   console.log(series);
  //   // this.totalData = result;
  //   this.bobbleChartDataOverview = series
  //   this.bobbleChart(series, '')
  // }
  // getColumnCount(data) {
  //   var hash = Object.create(null);
  //   var result = [];

  //   data.forEach(function (a) {
  //     var key = ['month'].map(function (k) { return a[k]; }).join('|');
  //     if (a.sales === undefined || a.sales === null) {
  //       return;
  //     }
  //     if (!hash[key]) {
  //       hash[key] = {
  //         count: 0, data: {
  //           name: a.month, sales: 0, totalSales: 0, allanguinot: 0, andrew: 0, annelie: 0,
  //           bradsutton: 0, carlos: 0, chris: 0, gurk: 0, tinal: 0
  //         }
  //       };
  //       result.push(hash[key].data);
  //     }
  //     // hash[key].data.sales += a.sales;
  //     hash[key].data.totalSales += a.totalSales;
  //     hash[key].data.allanguinot += a.allanguinot;
  //     hash[key].data.andrew += a.andrew;
  //     hash[key].data.annelie += a.annelie;
  //     hash[key].data.bradsutton += a.bradsutton;
  //     hash[key].data.carlos += a.carlos;
  //     hash[key].data.chris += a.chris;
  //     hash[key].data.gurk += a.gurk;
  //     hash[key].data.tinal += a.tinal;
  //     hash[key].data.definition = a.month;
  //     hash[key].count++;
  //   });
  //   var names = ['Allan Guinot', 'Andrew Ma', 'Annelie Zubar', 'Brad Sutton', 'Carlos Grilo', 'Chris Gray', 'Chris Mc Gurk', 'Tinal Tassila', 'Valery Ushakov'];
  //   var color = ['#7cc0f7', '#1aa8a9', '#070fb0', '#1769a3', '#ff4b4c', '#ff6b1b', '#03cb44', '#a42cee', '#ffac4e']
  //   var Xaxis: any = [];
  //   var series: any = [];
  //   var sales: any = [];
  //   var totalSales: any = [];
  //   var allanguinot: any = [];
  //   var andrew: any = [];
  //   var annelie: any = [];
  //   var bradsutton: any = [];
  //   var carlos: any = [];
  //   var chris: any = [];
  //   var gurk: any = [];
  //   var tinal: any = [];
  //   var totalcases: any = [];
  //   result.map((item, index) => {
  //     // sales.push(result[index].sales);
  //     totalSales.push(result[index].totalSales);
  //     allanguinot.push(result[index].allanguinot);
  //     andrew.push(result[index].andrew);
  //     annelie.push(result[index].annelie);
  //     bradsutton.push(result[index].bradsutton);
  //     carlos.push(result[index].carlos);
  //     chris.push(result[index].chris);
  //     gurk.push(result[index].gurk);
  //     tinal.push(result[index].tinal);
  //     Xaxis.push(result[index].definition);
  //     totalcases = [totalSales, allanguinot, andrew, annelie, bradsutton, carlos, chris, gurk, tinal];
  //   });
  //   names.map((item, index) => {
  //     series.push({ name: names[index], color: color[index], data: totalcases[index] })
  //   });
  //   console.log(series);
  //   this.columnChartDataOverview = Xaxis;
  //   this.columnChartDataSeries = series
  //   this.columnChart(Xaxis, series, '');
  // }
  buyerChart(result) {
    var $this = this;
    var tooltipEnabled = true;
    this.buyerChartOptions = {
      chart: {
        type: 'pie',
        backgroundColor: '#ffffff',
        options3d: {
          enabled: true,
          alpha: 20,
          beta: 0
        }
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
          colors: ['#03cb44', '#ff2500', '#ffff00'],
          allowPointSelect: true,
          cursor: "pointer",
          depth: 45,
          size: 250,
          events: {
            click: function (event) {
              let sliced: boolean;
              sliced = event.point.options.sliced
              console.log(sliced)
              $this.updatePiechartData(event.point.name,sliced);
            },
          },
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        type: 'pie',
        innerSize: '50%',
        data: result,
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
      }]
      // [{
      //   type: 'pie',
      //   name: 'Buyer',
      //   data: [{
      //     name: 'Fashions Direct',
      //     y: 21.41,
      //     color:'#2da2bf'
      // }, {
      //     name: 'Lindseyes',
      //     y: 11.84,
      //     color:'#da1f28'
      // }]
      // }]
    }
    this.buychart = new Chart(this.buyerChartOptions)
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
  columnChart(Xaxis, series, name) {
    var $this = this;
    this.columnOptions = {
      chart: {
        type: 'column',
        backgroundColor: "#ffffff",
        events: {
          load: function (e) {
            console.log("e", e);
            var dataarr = e.target.series[0].data;
            var dataarr1 = e.target.series[1].data;
            var dataarr2 = e.target.series[2].data;
            var dataarr3 = e.target.series[3].data;
            var dataarr4 = e.target.series[4].data;
            var dataarr5 = e.target.series[5].data;
            var dataarr6 = e.target.series[6].data;
            var dataarr7 = e.target.series[7].data;
            var dataarr8 = e.target.series[8].data;
            console.log("dataarr", dataarr);
            dataarr.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#1e90ed'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr1.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#54ddde'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr2.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#3a42cf'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr3.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#5ea2d3'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr4.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#e37a7b'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr5.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#d98c63'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr6.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#5abb7a'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr7.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#9e62c2'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr8.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#b18c62'
                });
              } else {
                item.update({
                  color: null
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
        // ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug']
      },
      yAxis: {
        title: {
          text: null
        },
        labels: {
          format: '$ {value} M'
        },
      },
      credits: {
        enabled: false
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click: function (event) {
                console.log(event)
                $this.updateColumnData(event.point.category);
                console.log(event.point.category);
              },
            }
          }
        }
      },
      exporting: false,
      series: series

    }
    this.columnchart = new Chart(this.columnOptions);
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
    this.map = new google.maps.Map(document.getElementById('NewdataRetail'), {
      zoom: 10,
      center: new google.maps.LatLng(34.051, -86.045),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false
    });

    var infowindow = new google.maps.InfoWindow();
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
    //   attachSecretMessage(marker, mapdata[i].Latitude, mapdata[i].Longitude);
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

  bobbleChart(series, name) {
    var $this = this
    this.bobbleOption = {

      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        backgroundColor: "#ffffff",
        events: {
          load: function (e) {
            console.log("e1", e);
            var dataarr = e.target.series[0].data;
            var dataarr1 = e.target.series[1].data;
            var dataarr2 = e.target.series[2].data;
            var dataarr3 = e.target.series[3].data;
            var dataarr4 = e.target.series[4].data;
            var dataarr5 = e.target.series[5].data;
            var dataarr6 = e.target.series[6].data;
            var dataarr7 = e.target.series[7].data;
            console.log("dataarr", dataarr);
            dataarr.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#67b3f1'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr1.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#33c2c4'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr2.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#4a50c2'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr3.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#3c7ca9'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr4.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#e35252'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr5.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#ec7230'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr6.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#2fd364'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr7.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#9638d0'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
          }
        }
      },
      legend: {
        enabled: false
      },

      title: {
        text: null
      },

      accessibility: {
        point: {
          valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
        }
      },

      xAxis: {
        gridLineWidth: 1,
        title: {
          text: 'Total Sales Variance %'
        },
        labels: {
          format: '{value} %'
        },
      },

      yAxis: {
        title: {
          text: 'Sales Per Sq Ft'
        },
        labels: {
          format: '$ {value}'
        },
      },
      credits: {
        enabled: false
      },
      exporting: false,
      plotOptions: {
        series: {
          point: {
            events: {
              click: function (event) {
                console.log(event)
                $this.updateBobbleChartData(event.point.category);
                console.log(event.point.category);
              },
            }
          },
          dataLabels: {
            enabled: false,
          }
        }
      },

      series: series
      // [{
      //     data:
      //      [
      //         { x: 95, y: 95, z: 13.8, name: 'BE' , color:'#df4048'},
      //         { x: 86.5, y: 102.9, z: 14.7, name: 'DE' ,color:'#df4048'},
      //         { x: 80.8, y: 91.5, z: 15.8, name: 'FI',color:'#567aab'},
      //         { x: 80.4, y: 102.5, z: 12, name: 'NL' ,color:'#eece3c'},
      //         { x: 80.3, y: 86.1, z: 11.8, name: 'SE',color:'#df4048'},
      //         { x: 78.4, y: 70.1, z: 16.6, name: 'ES',color:'#4c75c8'},
      //         { x: 74.2, y: 68.5, z: 14.5, name: 'FR',color:'#df4048' },
      //         { x: 73.5, y: 83.1, z: 10, name: 'NO',color:'#4c75c8'},
      //         { x: 71, y: 93.2, z: 24.7, name: 'UK',color:'#905965'},
      //         { x: 69.2, y: 57.6, z: 10.4, name: 'IT' ,color:'#4cafc8'},
      //         { x: 68.6, y: 20, z: 16, name: 'RU' ,color:'#905965'},
      //         { x: 65.5, y: 126.4, z: 35.3, name: 'US',color:'#df4048' },
      //         { x: 65.4, y: 50.8, z: 28.5, name: 'HU',color:'#df8340' },
      //         { x: 63.4, y: 51.8, z: 15.4, name: 'PT' ,color:'#df4048'},
      //         { x: 64, y: 82.9, z: 31.3, name: 'NZ' ,color:'#62658c'}
      //     ]
      // }]

    }
    this.bobblechart = new Chart(this.bobbleOption);
  }
}
