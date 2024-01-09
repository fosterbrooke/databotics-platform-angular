import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import _ from 'lodash';
import { DatabotService } from 'src/app/core/databot.service';
import { numberFormat } from 'highcharts';
import { element } from '@angular/core/src/render3/instructions';
import { DataService } from 'src/app/core/data.service';
const numeral = require('numeral');

@Component({
  selector: 'app-report-usecase-one',
  templateUrl: './report-usecase-one.component.html',
  styleUrls: ['./report-usecase-one.component.css']
})
export class ReportUsecaseOneComponent implements OnInit {
  buyerChartOptions: any;
  buychart: any;
  categoryOptions: any;
  categorychart: any;
  segmentOptions: any;
  segmentChart: any;
  segmentData: any;
  totalData: any = [];
  Months: any = [];
  dummyArray: any = [];
  CustomerCount: number = 0;
  Opportunity: number = 0;
  OpportunityGrowth: number = 0;
  Satisfactory: number = 0;
  dynamicBuyerResult = [];
  dynamicCategorySeries = [];
  dynamicCategoryOverview = [];
  segmentDynamic = [];
  segmentDynamicOverview = [];
  apportunityOptions: any;
  apportunitychart: any;
  barchart: any;
  barChartOptions: any;
  apportunityDataOverview: any = [];
  apportunityDataSeries: any = [];
  barChartDataOverview: any = [];
  barChartDataSeries: any = [];
  category = [];
  Region: any;
  Market: any;
  data: any;
  static: any;
  cate = [];
  categoryByNmae: any = [];
  dynamicDataOverview: any = [];
  dynamicDataOverviewSeries: any = [];
  // shoppingDataOverview: any = [];
  // shoppingChartSeries: any = [];
  // linechartupdateXaxis = [];
  // linechartupdateSeries = [];
  selected : number = 0;
  name: any;
  value: any;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.getFinaceData();
  }
  updatebuyerChartData(event,sliced) {
    if(sliced == undefined || sliced == false){
      console.log(" if");
      console.log(event)
    var selectedMarket = [];
    for(let obj of this.dummyArray){
      if(obj.Market == event){
        selectedMarket.push(obj);
      }
    }
    selectedMarket.map(item => {
      if (item.CustomerCount != null) {
        this.CustomerCount += item.CustomerCount * 10;
      }
    })
    selectedMarket.map(item => {
      if (item.Opportunity != null) {
        this.Opportunity += parseInt(item.Opportunity) * 10;
      }
    })
    selectedMarket.map(item => {
      if (item.OpportunityGrowth != null) {
        this.OpportunityGrowth += item.OpportunityGrowth * 10;
      }
    })
    selectedMarket.map(item => {
      if (item.Satisfactory != null) {
        this.Satisfactory += item.Satisfactory * 10;
      }
    })
    this.getCategoryCount(selectedMarket);
    this.getColumnCount(selectedMarket);
    this.getBarChart(selectedMarket);
    }else if(sliced == true){
      console.log("else if");
  this.CustomerCount= 0;
  this.Opportunity= 0;
  this.OpportunityGrowth= 0;
  this.Satisfactory= 0;
      this.dummyArray.map(item => {
        if (item.CustomerCount != null) {
          this.CustomerCount += item.CustomerCount * 10;
        }
      })
      this.dummyArray.map(item => {
        if (item.Opportunity != null) {
          this.Opportunity += parseInt(item.Opportunity) * 10;
        }
      })
      this.dummyArray.map(item => {
        if (item.OpportunityGrowth != null) {
          this.OpportunityGrowth += item.OpportunityGrowth * 10;
        }
      })
      this.dummyArray.map(item => {
        if (item.Satisfactory != null) {
          this.Satisfactory += item.Satisfactory * 10;
        }
      })
      this.getCategoryCount(this.dummyArray);
      this.getColumnCount(this.dummyArray);
      this.getBarChart(this.dummyArray);
    }
    
    // this.count = this.count+0.5;
    // this.barChartDataSeries.forEach(element => {
    //   element.data[0]= element.data[0]*this.count;
    //   element.data[1]= element.data[1]*this.count;
    //   element.data[2]= element.data[2]*this.count;
    //   element.data[3]= element.data[3]*this.count;
    //   element.data[4]= element.data[4]*this.count;
    //   element.data[5]= element.data[5]*this.count;
    //   element.data[6]= element.data[6]*this.count;
    //   console.log(this.count);
    // });
    // this.apportunityDataSeries.forEach(element => {
    //   element.data[0].y = element.data[0].y*this.count;
    //   element.data[1].y = element.data[1].y*this.count;
    //   element.data[2].y = element.data[2].y*this.count;
    //   element.data[3].y = element.data[3].y*this.count;
    //   console.log(this.count);
    // });
    // this.dynamicCategorySeries.forEach(element => {
    //   element.data[0].y = element.data[0].y*this.count;
    //   element.data[1].y = element.data[1].y*this.count;
    //   element.data[2].y = element.data[2].y*this.count;
    //   console.log(this.count);
    // });
    // this.Opportunity = this.Opportunity*this.count;
    // this.CustomerCount = this.CustomerCount*this.count;
    // this.OpportunityGrowth = this.OpportunityGrowth*this.count;
    // this.Satisfactory = this.Satisfactory*this.count;
    // this.barChart(this.barChartDataOverview,this.barChartDataSeries,event);
    // this.apportunityChart(this.apportunityDataOverview,this.apportunityDataSeries,event);
    // this.categoryChart(this.dynamicCategoryOverview,this.dynamicCategorySeries,event);

  }
  // updatecategoryChartData(event) {
  //   console.log(event)
  //   this.buyerChart(this.dynamicDataOverview,event);
  //   this.barChart(this.barChartDataOverview,this.barChartDataSeries,event);
  //   this.apportunityChart(this.apportunityDataOverview,this.apportunityDataSeries,event);
  //   this.categoryChart(this.dynamicCategoryOverview,this.dynamicCategorySeries,event);
  // }
  // updateapportunityData(event) {
  //   console.log(event)
  //   this.buyerChart(this.dynamicDataOverview,event);
  //   this.barChart(this.barChartDataOverview,this.barChartDataSeries,event);
  //   this.apportunityChart(this.apportunityDataOverview,this.apportunityDataSeries,event);
  //   this.categoryChart(this.dynamicCategoryOverview,this.dynamicCategorySeries,event);
  // }
  // updateBarChartData(event) {
  //   console.log(event)
  //   this.buyerChart(this.dynamicDataOverview,event);
  //   this.barChart(this.barChartDataOverview,this.barChartDataSeries,event);
  //   this.apportunityChart(this.apportunityDataOverview,this.apportunityDataSeries,event);
  //   this.categoryChart(this.dynamicCategoryOverview,this.dynamicCategorySeries,event);
  // }
  getFinaceData() {
    this.dataService.getFinancedDataOne().subscribe(data => {
      console.log(data);
      this.dummyArray = data;
      this.static = data;
      this.category = _.uniqBy(data, 'Category');
      this.Region = _.uniqBy(data, 'Region');
      this.Market = _.uniqBy(data, 'Market');
      console.log(this.category,this.Region,this.Market)
      this.dummyArray.map(item => {
        if (item.CustomerCount != null) {
          this.CustomerCount += item.CustomerCount * 10;
        }
      })
      this.dummyArray.map(item => {
        if (item.Opportunity != null) {
          this.Opportunity += parseInt(item.Opportunity) * 10;
        }
      })
      this.dummyArray.map(item => {
        if (item.OpportunityGrowth != null) {
          this.OpportunityGrowth += item.OpportunityGrowth * 10;
        }
      })
      this.dummyArray.map(item => {
        if (item.Satisfactory != null) {
          this.Satisfactory += item.Satisfactory * 10;
        }
      })
      this.getBuyerCount(data);
      this.getCategoryCount(data);
      this.getColumnCount(data);
      this.getBarChart(data);
    }, err => {
      console.log("error", err);
    })

  }
  selectCategory(value) {
    console.log(value)
    var selectedCategory = [];
    if('All' == value){
      selectedCategory = this.dummyArray
    }
    console.log(selectedCategory)
    for(let obj of this.dummyArray){
      if(obj.Category == value){
        selectedCategory.push(obj);
      }
    }
    console.log(selectedCategory)
    this.getBuyerCount(selectedCategory);
      this.getCategoryCount(selectedCategory);
      this.getColumnCount(selectedCategory);
      this.getBarChart(selectedCategory);
  }
  selectRegion(value) {
    console.log(value);
    var selectedRegion = [];
    if('All' == value){
      selectedRegion = this.dummyArray
    }
    for(let obj of this.dummyArray){
      if(obj.Region == value){
        selectedRegion.push(obj);
      }
    }
    this.getBuyerCount(selectedRegion);
      this.getCategoryCount(selectedRegion);
      this.getColumnCount(selectedRegion);
      this.getBarChart(selectedRegion);
  }
  selectMarket(value) {
    console.log(value);
    var selectedMarket = [];
    if('All' == value){
      selectedMarket = this.dummyArray
    }
    for(let obj of this.dummyArray){
      if(obj.Market == value){
        selectedMarket.push(obj);
      }
    }
    this.getBuyerCount(selectedMarket);
      this.getCategoryCount(selectedMarket);
      this.getColumnCount(selectedMarket);
      this.getBarChart(selectedMarket);
  }
  getBuyerCount(data) {
    console.log(data);
    var hash = Object.create(null);
    var result = [];
    data.forEach(function (a) {
      var key = ['Market'].map(function (k) { return a[k]; }).join('|');
      if (a.Opportunity === undefined || a.Opportunity === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.Market, y: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.y += parseInt(a.Opportunity);
      hash[key].count++;
    });
    result.map(item => {
      item.y = parseInt(item.y.toFixed(2));
    })
    this.dynamicDataOverview = result;
    this.buyerChart(result, '');
  }
  getCategoryCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['Segment'].map(function (k) { return a[k]; }).join('|');
      if (a.CustomerCount === undefined || a.CustomerCount === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.Segment, critic: 0, hi: 0, lo: 0, med: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.critic += a.CustomerCount;
      hash[key].data.hi += parseInt(a.Opportunity);
      hash[key].data.lo += a.OpportunityGrowth;
      hash[key].data.med += a.Satisfactory;
      hash[key].data.definition = a.Segment;
      hash[key].count++;
    });
    var names = ['critical', 'High', 'Low', 'Medium'];
    var color = ['#1769a3', '#ff6b1b', '#03cb44', '#a42cee'];
    var Xaxis: any = [];
    var series: any = [];
    var critic: any = [];
    var hi: any = [];
    var lo: any = [];
    var med: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      critic.push(result[index].critic);
      hi.push(result[index].hi);
      lo.push(result[index].lo);
      med.push(result[index].med);
      Xaxis.push(result[index].definition);
      totalcases = [critic, hi, lo, med];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] });
    });
    // console.log("chart", series);
    this.dynamicCategoryOverview = Xaxis;
    this.dynamicCategorySeries = series;
    this.categoryChart(Xaxis, series,'');
  }
  getColumnCount(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['Category'].map(function (k) { return a[k]; }).join('|');
      if (a.CustomerCount === undefined || a.CustomerCount === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.Category, critical: 0, high: 0, low: 0, medium: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.critical += a.CustomerCount;
      hash[key].data.high += parseInt(a.Opportunity);
      hash[key].data.low += a.OpportunityGrowth;
      hash[key].data.medium += a.Satisfactory;
      hash[key].data.definition = a.Category;
      hash[key].count++;
    });
    var names = ['critical', 'High', 'Low', 'Medium'];
    var color = ['#1769a3', '#ff6b1b', '#03cb44', '#a42cee']
    var Xaxis: any = [];
    var series: any = [];
    var critical: any = [];
    var high: any = [];
    var low: any = [];
    var medium: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      critical.push(result[index].critical);
      high.push(result[index].high);
      low.push(result[index].low);
      medium.push(result[index].medium)
      Xaxis.push(result[index].definition);
      totalcases = [critical, high, low, medium];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] })
    });
    // console.log(series);
    this.apportunityDataOverview = Xaxis;
    this.apportunityDataSeries = series;
    this.apportunityChart(Xaxis, series,'');
  }
  getBarChart(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['Region'].map(function (k) { return a[k]; }).join('|');
      if (a.Opportunity === undefined || a.Opportunity === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.Region, center: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.center += parseInt(a.Opportunity);
      hash[key].data.definition = a.Region;
      hash[key].count++;
    });
    var names = ['Center'];
    var color = ['#01b8aa']
    var Xaxis: any = [];
    var series: any = [];
    var center: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      center.push(result[index].center);
      Xaxis.push(result[index].definition);
      totalcases = [center];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] })
    });
    console.log(series);
    this.barChartDataOverview = Xaxis;
    this.barChartDataSeries = series;
    this.barChart(Xaxis, series,'');
    console.log("bar",this.barChartDataOverview,this.barChartDataSeries);
  }
  // selectedState(event){
  //     var element = event.currentTarget.value;
  //     console.log(element)
  //     if (element == "ALL MONTHS") {
  //         this.dataService.getReportCaseOne().subscribe(data => {
  //             console.log(data);
  //             this.dummyArray = data;
  //             this.Months = _.uniqBy(data,'Month')
  //             console.log(_.meanBy(data, function(o) { return o.TotalSales; }));
  //             console.log(_.meanBy(data, function(o) { return o.TotalSalesLY; }));

  //             data.map(item =>{
  //                 this.Satisfactory += item.TotalSales;
  //             })
  //             console.log(this.Satisfactory)
  //             this.buyerChart(data);
  //             this.categoryChart(Xaxis,series);
  //         }, err => {
  //             console.log("error", err);
  //         })
  //     }
  //     console.log(element);
  //     let dataArray : any = [];
  //     for(let obj of this.dummyArray){
  //       if(obj['Month'] == element){
  //         dataArray.push(obj);
  //       }
  //     }
  //     // this.DummyArray = dataArray;
  //     var data = dataArray;
  //     console.log(data)
  //     this.buyerChart(data);
  //     this.categoryChart(data);
  // }

  df(value) {
    return numeral(value).format('$0,0.0M');
  }
  buyerChart(series,name) {
    // console.log("chartData")
    var $this = this;
    var tooltipEnabled = true;
    this.buyerChartOptions = {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 25,
          beta: 0
        },
        backgroundColor: '#ffffff',
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        events: {
          load: function (e) {
            // console.log("e", e);
            var dataarr = e.target.series[0].data[0];
            var dataarr1 = e.target.series[0].data[1];
            var dataarr2 = e.target.series[0].data[2];
            var dataarr3 = e.target.series[0].data[3];
            var dataarr4 = e.target.series[0].data[4];
            var dataarr5 = e.target.series[0].data[5];
            // console.log("dataarr", dataarr);
            dataarr.map(item => {
              if (item['name'] == name) {
                item.update({
                  color: '#5590ba'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr1.map(item => {
              if (item['name'] == name) {
                item.update({
                  color: '#ec905e'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr2.map(item => {
              if (item['name'] == name) {
                item.update({
                  color: '#59d280'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr3.map(item => {
              if (item['name'] == name) {
                item.update({
                  color: '#c284e9'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr4.map(item => {
              if (item['name'] == name) {
                item.update({
                  color: '#d4b38d'
                });
              } else {
                item.update({
                  color: null
                });
              }
            });
            dataarr5.map(item => {
              if (item['name'] == name) {
                item.update({
                  color: '#66bfbf'
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
          colors: ['#1769a3', '#ff6b1b', '#03cb44', '#a42cee','#ffac4e', '#1aa8a9'],
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          },
          events: {
            click: function (event) {
              let sliced: boolean;
              sliced = event.point.options.sliced
              console.log(sliced)
              $this.updatebuyerChartData(event.point.name,sliced);
            },
          }
        }
      },
      series: [{
        type: 'pie',
        innerSize: '50%',
        data: series,
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
  categoryChart(Xaxis, series,name) {
    var $this = this;
    var tooltipEnabled = true;
    this.categoryOptions =  {
      chart: {
        type: 'column',
            backgroundColor: ' #ffffff',
            events: {
          load: function (e) {
            // console.log("e1",e);
              var dataarr = e.target.series[0].data;
              var dataarr1 = e.target.series[1].data;
              var dataarr2 = e.target.series[2].data;
              var dataarr3 = e.target.series[3].data;
              // console.log("dataarr",dataarr);
              dataarr.map(item => {
                if(item['category'] == name){
                  item.update({
                    color: '#5590ba'
                });
                }else{
                  item.update({
                    color:null
                  });
                }
              });
              dataarr1.map(item => {
                if(item['category'] == name){
                  item.update({
                    color: '#ec905e'
                });
                }else{
                  item.update({
                    color:null
                  });
                }
              });
              dataarr2.map(item => {
                if(item['category'] == name){
                  item.update({
                    color: '#59d280'
                });
                }else{
                  item.update({
                    color:null
                  });
                }
              });
              dataarr3.map(item => {
                if(item['category'] == name){
                  item.update({
                    color: '#c284e9'
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
              align: 'center',
              verticalAlign: 'top',
              borderWidth: 0
            },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        series: {
            point: {
                events: {
                  click: function (event) {
                    // console.log("sale",event)
                    //  $this.updatecategoryChartData(event.point.category);
                    // console.log("sale",event.point.category);
                  },
                }
            }
        }
    },
      exporting: false,
      series: series,
        
    }
    this.categorychart = new Chart(this.categoryOptions);
  }
  apportunityChart(Xaxis, series,name) {
    var $this = this;
    var tooltipEnabled = true;
    this.apportunityOptions = {
      chart: {
        type: 'column',
            backgroundColor: ' #ffffff',
            events: {
          load: function (e) {
            // console.log("e2",e);
              var dataarr = e.target.series[0].data;
              var dataarr1 = e.target.series[1].data;
              var dataarr2 = e.target.series[2].data;
              var dataarr3 = e.target.series[3].data;
              // console.log("dataarr",dataarr);
              dataarr.map(item => {
                if(item['category'] == name){
                  item.update({
                    color: '#5590ba'
                });
                }else{
                  item.update({
                    color:null
                  });
                }
              });
              dataarr1.map(item => {
                if(item['category'] == name){
                  item.update({
                    color: '#ec905e'
                });
                }else{
                  item.update({
                    color:null
                  });
                }
              });
              dataarr2.map(item => {
                if(item['category'] == name){
                  item.update({
                    color: '#59d280'
                });
                }else{
                  item.update({
                    color:null
                  });
                }
              });
              dataarr3.map(item => {
                if(item['category'] == name){
                  item.update({
                    color: '#c284e9'
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
              align: 'center',
              verticalAlign: 'top',
              borderWidth: 0
            },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        series: {
            point: {
                events: {
                  click: function (event) {
                    // console.log("sa",event)
                    //  $this.updateapportunityData(event.point.category);
                    // console.log("sa",event.point.category);
                  },
                }
            }
        }
    },
      exporting: false,
      series: series,
        
    }
    this.apportunitychart = new Chart(this.apportunityOptions);
  }
  barChart(Xaxis, series,name) {
    var $this = this;
    var tooltipEnabled = true;
    this.barChartOptions = {
      chart: {
        type: 'bar',
        backgroundColor: '#ffffff',
        events: {
          load: function (e) {
            // console.log('abcghjk')
            // console.log("e3", e);
            var dataarr = e.target.series[0].data;
            // console.log("dataarr", dataarr);
            dataarr.map(item => {
              if (item['category'] == name) {
                item.update({
                  color: null
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
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: null
        },
        labels: {
          overflow: 'justify'
        }
      },
      exporting: null,
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false
          }
        },
        series: {
          // colors:['#01b8aa', '#374649','#fd625e','#fd625e','#01b8aa','#4a587d'],
          colorByPoint: true,
          point: {
            events: {
              click: function (event) {
                // console.log(event)
                // $this.updateBarChartData(event.point.category);
                // console.log(event.point.category);
              },
            }
          }
        }
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false
      },
      series: series
    }
    this.barchart = new Chart(this.barChartOptions);
  }

}
