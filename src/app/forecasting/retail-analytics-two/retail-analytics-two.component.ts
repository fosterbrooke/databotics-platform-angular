import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { DataService } from 'src/app/core/data.service';
import _ from 'lodash';
import { DatabotService } from 'src/app/core/databot.service';
const numeral = require('numeral');
@Component({
  selector: 'app-retail-analytics-two',
  templateUrl: './retail-analytics-two.component.html',
  styleUrls: ['./retail-analytics-two.component.css']
})
export class RetailAnalyticsTwoComponent implements OnInit {
  dummyArray: any = [];
  category = [];
  columnOptions: any;
  columnchart: any;
  areaOptions: any;
  areachart: any;
  categorychart: any;
  categoryOptions: any;
  bobblechart: any;
  bobbleOptions: any;
  series: any = [];
  data: any;
  categoryDataOverview: any = [];
  categoryDataSeries: any = [];
  categoryByNmae: any = [];
  manager: any = [];
  isChecked = false;
  static: any;
  dynamicDataOverview: any = [];
  dynamicDataOverviewSeries: any = [];
  bobblechartSeries: any = [];
  areachartDataOverview: any = [];
  areachartSeries: any = [];
  count: number = 0;

  constructor(private router: Router, private dataservice: DatabotService) { }

  ngOnInit() {
    this.getFullData();
    this.getCategory();
  }
  updatecolumnChartData(event) {
    console.log(event);
    this.columnChart(this.dynamicDataOverview, this.dynamicDataOverviewSeries, event);
    this.categoryChart(this.categoryDataOverview, this.categoryDataSeries, event);
    this.bobbleChart(this.bobblechartSeries, event);
    this.areaChart(this.areachartDataOverview, this.areachartSeries, event)
  }
  updatecategoryChartData(event) {
    this.count = this.count + 0.5;
    console.log(this.count);
   
    this.bobblechartSeries.forEach(element => {
      // element.data[0].x = element.data[0].x * this.count;
      element.data[0].y = element.data[0].y * this.count;
      element.data[0].z = element.data[0].z * this.count;
    });
    this.areachartSeries.forEach(element => {
      element.data[0].y = element.data[0].y * this.count;
      element.data[1].y = element.data[1].y * this.count;
      element.data[2].y = element.data[2].y * this.count;
      element.data[3].y = element.data[3].y * this.count;
      element.data[4].y = element.data[4].y * this.count;
      element.data[5].y = element.data[5].y * this.count;
      element.data[6].y = element.data[6].y * this.count;
      element.data[7].y = element.data[7].y * this.count;
    });
    this.dynamicDataOverviewSeries.forEach(element => {
      element.y = element.y * this.count;
     
    });
    this.columnChart(this.dynamicDataOverview, this.dynamicDataOverviewSeries, event);
    // this.categoryChart(this.categoryDataOverview, this.categoryDataSeries, event);
    this.bobbleChart(this.bobblechartSeries, event);
    this.areaChart(this.areachartDataOverview, this.areachartSeries, event)

  }
  updatebobbleChartData(event) {
    this.columnChart(this.dynamicDataOverview, this.dynamicDataOverviewSeries, event);
    this.categoryChart(this.categoryDataOverview, this.categoryDataSeries, event);
    this.bobbleChart(this.bobblechartSeries, event);
    this.areaChart(this.areachartDataOverview, this.areachartSeries, event)

  }
  updateareachartData(event) {
    this.columnChart(this.dynamicDataOverview, this.dynamicDataOverviewSeries, event);
    this.categoryChart(this.categoryDataOverview, this.categoryDataSeries, event);
    this.bobbleChart(this.bobblechartSeries, event);
    this.areaChart(this.areachartDataOverview, this.areachartSeries, event)

  }
  getCategory() {
    this.dataservice.getFinancedByCategory().subscribe(category => {
      console.log(category);
    }, err => {
      console.log("Error", err)
    })
  }
  getFullData() {
    this.dataservice.getFinancedDataTwo().subscribe(data => {
      console.log(data);
      this.dummyArray = data
      this.static = data;
      this.category = _.uniqBy(data, 'category');
      this.manager = _.uniqBy(data, 'manager');
      this.getCategoryCount(data);
      this.getColumnCount(data);
      this.getBobbleCount(data);
      this.getAreaCount(data);
    })
  }
  selectCategory(value) {
    console.log(value);
    let selectedData = [];
    let data = [];
    if ('All' == value) {
      selectedData = this.static;
    }
    this.data = selectedData;
    this.getCategoryCount(selectedData);
    this.getColumnCount(selectedData);
    this.getBobbleCount(selectedData);
    this.getAreaCount(selectedData);
    this.dataservice.getFinancedByCategory().subscribe(category => {
      console.log(category);
      this.categoryByNmae = category;
      console.log(this.categoryByNmae)
      for (let obj of this.categoryByNmae) {
        if (obj['manager'] == value) {
          selectedData.push(obj);
        }
      }
      this.category = selectedData;
      console.log(this.category)
      this.getCategoryCount(this.category);
      this.getColumnCount(this.category);
      this.getBobbleCount(this.category);
      this.getAreaCount(this.category);
    }, err => {
      console.log("Error", err);;
    })
  }
  getCategoryCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['sales'].map(function (k) { return a[k]; }).join('|');
      if (a.totalSales === undefined || a.totalSales === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.sales, TotalSales: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.TotalSales += a.totalSales;
      hash[key].data.definition = a.sales;
      hash[key].count++;
    });
    var names = ['TotalSales'];
    var color = ['#2da2bf'];
    var Xaxis: any = [];
    var series: any = [];
    var TotalSales: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      TotalSales.push(result[index].TotalSales);
      Xaxis.push(result[index].definition);
      totalcases = TotalSales;
    });
    names.map((item, index) => {
      series.push(totalcases)
    });
    this.categoryDataOverview = Xaxis;
    this.categoryDataSeries = series[0];
    this.categoryChart(Xaxis, series[0], '');
  }
  getColumnCount(data) {
    console.log(data)

    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['month'].map(function (k) { return a[k]; }).join('|');
      if (a.fiscal === undefined || a.fiscal === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.month, TotalSales: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.TotalSales += a.fiscal;
      hash[key].data.definition = a.month;
      hash[key].count++;
    });
    var names = ['TotalSales'];
    var color = ['#4a587d'];
    var Xaxis: any = [];
    var series: any = [];
    var TotalSales: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      TotalSales.push(result[index].TotalSales);
      Xaxis.push(result[index].definition);
      totalcases = TotalSales;
    });
    names.map((item, index) => {
      series.push(totalcases)
    });
    this.dynamicDataOverview = Xaxis;
    this.dynamicDataOverviewSeries = series[0];
    this.columnChart(Xaxis, series[0], '');
  }
  getAreaCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['month'].map(function (k) { return a[k]; }).join('|');
      if (a.month === undefined || a.month === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.month, x: 0, y: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.x += a.cat1;
      hash[key].data.y += a.cat2;
      hash[key].data.z += a.cat3;
      hash[key].data.definition = a.month;
      hash[key].count++;
    });
    var names = ['Last Year Sales', 'This Year sales'];
    var color = ['#999999', '#e76e74'];
    var Xaxis: any = [];
    var series: any = [];
    var cat1: any = [];
    var cat2: any = [];
    var cat3: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      cat1.push(result[index].x);
      cat2.push(result[index].y);
      Xaxis.push(result[index].definition);
      totalcases = [cat1, cat2];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] })
    });
    console.log(series);
    this.areachartDataOverview = Xaxis;
    this.areachartSeries = series;
    this.areaChart(Xaxis, series, '');
  }
  getBobbleCount(data) {
    console.log(data)
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['category'].map(function (k) { return a[k]; }).join('|');
      if (a.category === undefined || a.Buyer === null && a.City === undefined || a.City === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.category, x: 0, y: 0, z: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.x += a.cat1;
      hash[key].data.y += a.cat2;
      hash[key].data.z += a.cat3;
      hash[key].data.definition = a.category;
      hash[key].count++;
    });
    var color = ['#2da2bf', '#da1f28', '#eb641b', '#39639d', '#474b78', '#7d3c4a', '#2d5dbf', '#da6e1f', '#ebc61b', '#40399d'];
    var Xaxis: any = [];
    var series: any = [];
    var cat1: any = [];
    var cat2: any = [];
    var cat3: any = [];
    var TotalSalesly: any = [];
    var totalcases: any = [];
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
    this.bobblechartSeries = series;
    this.bobbleChart(series, '')
  }
  columnChart(Xaxis, data, name) {
    var $this = this;
    var tooltipEnabled = true;
    this.columnOptions = {
      chart: {
        type: 'column',
        backgroundColor: "#ffffff",
        events: {
          load: function (e) {
            console.log("e", e);
            var dataarr = e.target.series[0].data;
            console.log("dataarr", dataarr);
            dataarr.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#6fb7c9'
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
        categories: Xaxis,
      },
      yAxis: {
        title: {
          text: null
        },
        labels: {
          format: '{value} %'
        },
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click: function (event) {
                console.log('columndata',event)
                $this.updatecolumnChartData(event.point.category);
                console.log(event.point.category);
              },
            }
          }
        }
      },
      legend: false,
      exporting: false,
      series: [{
        name: 'Allan Guinot',
        data: data,
        color: '#2da2bf'
      }],
    }
    this.columnchart = new Chart(this.columnOptions);
  }
  categoryChart(Xaxis, series, name) {
    var $this = this;
    var tooltipEnabled = true;
    this.categoryOptions = {
      chart: {
        type: 'column',
        backgroundColor: "#ffffff",
        events: {
          load: function (e) {
            console.log("e1", e);
            var dataarr = e.target.series[0].data;
            console.log("dataarr", dataarr);
            dataarr.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#7c90c6'
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
      },
      yAxis: {
        title: {
          text: null
        },
        labels: {
          format: '${value}M'
        },
      },
      credits: {
        enabled: false
      },
      legend: false,
      exporting: false,
      plotOptions: {
        series: {
          point: {
            events: {
              click: function (event) {
                console.log(event)
                $this.updatecategoryChartData(event.point.category);
                console.log(event.point.category);
              },
            }
          }
        }
      },
      series: [{
        name: 'Allan Guinot',
        data: series,
        color: '#4a587d'
      }],
    }
    this.categorychart = new Chart(this.categoryOptions);
  }
  areaChart(Xaxis, series, name) {
    console.log(Xaxis, series)
    var $this = this;
    var tooltipEnabled = true;
    this.areaOptions = {
      chart: {
        type: 'area',
        backgroundColor: "#ffffff",
        events: {
          load: function (e) {
            console.log("e2", e);
            var dataarr = e.target.series[0].data;
            var dataarr1 = e.target.series[1].data;
            console.log("dataarr", dataarr);
            dataarr.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#3d3d3d'
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
                  color: '#db1c27'
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
      },
      yAxis: {
        title: {
          text: null
        },
        labels: {
          format: '${value}M'
        },
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click: function (event) {
                console.log(event)
                $this.updateareachartData(event.point.category);
                console.log(event.point.category);
              },
            }
          }
        }
      },
      legend: {
        align: 'left',
        verticalAlign: 'top'
      },

      exporting: false,
      series: series
    }
    this.areachart = new Chart(this.areaOptions);
  }
  bobbleChart(series, name) {
    console.log(series)
    var $this = this;

    this.bobbleOptions = {

      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        backgroundColor: "#ffffff",
        events: {
          load: function (e) {
            console.log("e3", e);
            var dataarr = e.target.series[0].data;
            var dataarr1 = e.target.series[1].data;
            var dataarr2 = e.target.series[2].data;
            var dataarr3 = e.target.series[3].data;
            var dataarr4 = e.target.series[4].data;
            var dataarr5 = e.target.series[5].data;
            var dataarr6 = e.target.series[6].data;
            var dataarr7 = e.target.series[7].data;
            var dataarr8 = e.target.series[8].data;
            var dataarr9 = e.target.series[9].data;
            console.log("dataarr", dataarr);
            dataarr.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#4bb0ca'
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
                  color: '#e8262f'
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
                  color: '#e07a45'
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
                  color: '#336bbb'
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
                  color: '#595e8f'
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
                  color: '#a74358'
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
                  color: '#a74358'
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
                  color: '#526996'
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
                  color: '#ebd056'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr9.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: '#4842a3'
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
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
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
          text: 'Total Sales Veriances %'
        },
        labels: {
          format: '${value}'
        },
      },

      yAxis: {
        title: {
          text: 'Avg $/unit TY'
        },
        labels: {
          format: '$ {value}'
        },
      },
      credits: {
        enabled: false
      },
      exporting: false,
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click: function (event) {
                console.log(event)
                $this.updatebobbleChartData(event.point.category);
                console.log(event.point.category);
              },
            }
          }
        }
      },
      series: series
    }
    this.bobblechart = new Chart(this.bobbleOptions);
  }
}
