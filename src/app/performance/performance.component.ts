import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import _ from 'lodash';
import { DataService } from 'src/app/core/data.service';
const numeral = require('numeral');

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  budgetOptions: any;
  budgetchart: any;
  revenueOptions: any;
  revenuechart: any;
  countfireOptions: any;
  countfirechart: any;
  countcommunityOptions: any;
  countcommunitychart: any;
  housespentOptions: any;
  housespentchart: any;
  violentOptions: any;
  violentchart: any;
  countemergencyOptions: any;
  countemergencychart: any;

  dummyArray: any = [];
  sales: any = [];
  decimalData: any = [];
  may: any = [];
  Budget: number = 0;
  Revenue: number = 0;
  Count: number = 0;
  Community: number = 0;
  Hours: number = 0;
  Violent: number = 0;
  Emergency: number = 0;

  name: any;
  value: any;
  constructor(private router: Router,  private dataService: DataService) { }

  ngOnInit() {
    this.getfinancedata();
    this.getsafetydata();

    // this.budgetChart();
    // this.revenueChart();
    // this.countfiresChart();
    // this.countcommunityChart();
    // this.housespentChart();
    // this.violentChart();
    // this.countemergencyChart();
  }
  getfinancedata(){
    this.dataService.getGovtFinancesApi().subscribe(data => {
      console.log("finance",data);
      this.dummyArray = data;
      this.dummyArray.map(item => {
        if (item.budget != null) {
          this.Budget += item.budget/ 100;
        }
      })
      this.dummyArray.map(item => {
        if (item.revenue != null) {
          this.Revenue += parseInt(item.revenue)/ 200;
        }
      })
      this.getBudget(data);
      this.getRevenue(data);
    }, err => {
      console.log("error", err);
    })
  }
  getsafetydata(){
    this.dataService.getSafetiesApi().subscribe(data => {
      console.log("safety",data);
      this.dummyArray = data;
      this.dummyArray.map(item => {
        if (item.count != null) {
          this.Count += item.count / 10;
        }
      })
      this.dummyArray.map(item => {
        if (item.count != null) {
          this.Community += parseInt(item.count) / 1200;
        }
      })
      this.dummyArray.map(item => {
        if (item.count != null) {
          this.Hours += item.count / 1500;
        }
      })
      this.dummyArray.map(item => {
        if (item.count != null) {
          this.Violent += item.count / 10;
        }
      })
      this.dummyArray.map(item => {
        if (item.count != null) {
          this.Emergency += item.count / 10;
        }
      })
      this.getCountfires(data);
      this.getCountcommunity(data);
      this.getHousespent(data);
      this.getViolent(data);
      this.getCountemergency(data);
    }, err => {
      console.log("error", err);
    })
  }
  df(value) {
    return numeral(value).format('0,0.0');
  }
  getBudget(data){
    var hash = Object.create(null);
    var result = [];
    data.forEach(function (a) {
      var key = ['month'].map(function (k) { return a[k]; }).join('|');
      if (a.budget === undefined || a.budget === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.month, b: 0, c: 0} };
        result.push(hash[key].data);
      }
      hash[key].data.b += a.budget;
      hash[key].data.c += a.revenue;
      hash[key].data.definition = a.month;
      hash[key].count++;
    });
    var Xaxis: any = [];
    var Yaxis: any = [];
    var series: any = [];
    var budget: any = [];
    var revenue: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      budget.push(result[index].b);
      revenue.push(result[index].c);
      Xaxis.push(result[index].definition);
      // Yaxis.push(result[index].datanames);
      totalcases = [budget];
    });
    result.map((item, index) => {
      series.push({ data: budget })
    });
    // this.dynamiePieOverview = Xaxis;
    // this.dynamiePie = result;
    this.sales = budget;
    this.decimalData = revenue;

    this.budgetChart(Xaxis, budget, revenue);
  }
  getRevenue(data){
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['revenueFrom'].map(function (k) { return a[k]; }).join('|');
      if (a.budget === undefined || a.budget === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.revenueFrom, budget: 0, revenue: 0, permitsIssued: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.budget += a.budget;
      hash[key].data.revenue += a.revenue;
      hash[key].data.permitsIssued += a.revenue * 5;
      hash[key].data.definition = a.revenueFrom;
      hash[key].count++;
    });
    var names = ['May-2020', 'Apr-2020', 'Mar-2020'];
    var color = ['#1769a3', '#ff6b1b', '#03cb44'];
    var Xaxis: any = [];
    var series: any = [];
    var budget: any = [];
    var revenue: any = [];
    var permitsIssued: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      budget.push(result[index].budget);
      revenue.push(result[index].revenue);
      permitsIssued.push(result[index].permitsIssued);
      Xaxis.push(result[index].definition);
      totalcases = [budget, revenue, permitsIssued];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] });
    });
    // console.log("chart", series);
    // this.dynamicCategoryOverview = Xaxis;
    // this.dynamicCategorySeries = series;
    this.revenueChart(Xaxis, series);
  }
  getCountfires(data){
    var hash = Object.create(null);
    var result = [];
    data.forEach(function (a) {
      var key = ['month'].map(function (k) { return a[k]; }).join('|');
      if (a.count === undefined || a.count === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.month, b: 0, c: 0, d:0} };
        result.push(hash[key].data);
      }
      hash[key].data.b += a.count;
      hash[key].data.c += a.count*2;
      hash[key].data.d += a.count*1;
      hash[key].data.definition = a.month;
      hash[key].count++;
    });
    var Xaxis: any = [];
    var Yaxis: any = [];
    var series: any = [];
    var budget: any = [];
    var revenue: any = [];
    var count: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      budget.push(result[index].b);
      revenue.push(result[index].c);
      count.push(result[index].d);
      Xaxis.push(result[index].definition);
      // Yaxis.push(result[index].datanames);
      totalcases = [budget];
    });
    result.map((item, index) => {
      series.push({ data: budget })
    });
    // this.dynamiePieOverview = Xaxis;
    // this.dynamiePie = result;
    this.sales = budget;
    this.decimalData = revenue;
    this.may = count
    this.countfiresChart(Xaxis, budget, revenue,count);
  }
  getCountcommunity(data){
    console.log(data);
    var hash = Object.create(null);
    var result = [];
    data.forEach(function (a) {
      var key = ['month'].map(function (k) { return a[k]; }).join('|');
      if (a.count === undefined || a.count === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.month, y: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.y += parseInt(a.count);
      hash[key].count++;
    });
    result.map(item => {
      item.y = parseInt(item.y.toFixed(2));
    })
    this.countcommunityChart(result);
  }
  getHousespent(data){
    console.log(data);
    var hash = Object.create(null);
    var result = [];
    data.forEach(function (a) {
      var key = ['month'].map(function (k) { return a[k]; }).join('|');
      if (a.count === undefined || a.count === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.month, y: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.y += parseInt(a.count);
      hash[key].count++;
    });
    result.map(item => {
      item.y = parseInt(item.y.toFixed(2));
    })
    this.housespentChart(result);
  }
  getViolent(data){
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['month'].map(function (k) { return a[k]; }).join('|');
      if (a.count === undefined || a.count === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.month, count: 0, permitRevenue: 0} };
        result.push(hash[key].data);
      }
      hash[key].data.count += a.count;
      hash[key].data.permitRevenue += a.count*2;
      hash[key].data.definition = a.month;
      hash[key].count++;
    });
    var names = ['Violent Crime', 'Non Violent Crime'];
    var color = ['#1769a3', '#ff6b1b'];
    var Xaxis: any = [];
    var series: any = [];
    var count: any = [];
    var permitRevenue: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      count.push(result[index].count);
      // hi.push(result[index].hi);
      permitRevenue.push(result[index].permitRevenue);
      Xaxis.push(result[index].definition);
      totalcases = [count, permitRevenue];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] });
    });
    // console.log("chart", series);
    // this.dynamicCategoryOverview = Xaxis;
    // this.dynamicCategorySeries = series;
    this.violentChart(Xaxis, series);
  }
  getCountemergency(data){
    var hash = Object.create(null);
    var result = [];
    data.forEach(function (a) {
      var key = ['month'].map(function (k) { return a[k]; }).join('|');
      if (a.count === undefined || a.count === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.month, b: 0, c: 0, d:0} };
        result.push(hash[key].data);
      }
      hash[key].data.b += a.count*5;
      hash[key].data.c += a.count*2;
      hash[key].data.d += a.count;
      hash[key].data.definition = a.month;
      hash[key].count++;
    });
    var Xaxis: any = [];
    var Yaxis: any = [];
    var series: any = [];
    var budget: any = [];
    var revenue: any = [];
    var count: any= [];
    var totalcases: any = [];
    result.map((item, index) => {
      budget.push(result[index].b);
      revenue.push(result[index].c);
      count.push(result[index].d);
      Xaxis.push(result[index].definition);
      // Yaxis.push(result[index].datanames);
      totalcases = [budget];
    });
    result.map((item, index) => {
      series.push({ data: budget })
    });
    // this.dynamiePieOverview = Xaxis;
    // this.dynamiePie = result;
    this.sales = budget;
    this.decimalData = revenue;
    this.may = count
    this.countemergencyChart(Xaxis, budget, revenue,count);
  }


  budgetChart(Xaxis, budget, revenue) {
    var $this = this;
    var tooltipEnabled = true;
    this.budgetOptions = {
      chart: {
        type: 'column',
        backgroundColor: ' #ffffff',
        height:350,
      },
      title: {
        text: null,

      },
      xAxis: {
        categories:Xaxis
      },
      yAxis: {
        title: {
          text: null
        }
      },
      legend: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        },
        series: {
          point: {
            // events: {
            //   click: function (event) {
            //     console.log("sa",event)
            //      $this.updateapportunityData(event.point.category);
            //     console.log("sa",event.point.category);
            //   },
            // }
          }
        }
      },
      exporting: false,
      series: [{
        name: 'Outside Sources',
        color:'#1769a3',
        data:budget

      }, {
        name: 'Muncipalty Sources',
        color: '#ff6b1b',
        data: revenue

      }]

    }
    this.budgetchart = new Chart(this.budgetOptions);
  }
  revenueChart(Xaxis, series) {
    var $this = this;
    var tooltipEnabled = true;
    this.revenueOptions = {
      chart: {
        type: 'column',
        backgroundColor: ' #ffffff',
        height:350,
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
        }
      },
      legend: {
        enabled: true
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
            // events: {
            //   click: function (event) {
            //     console.log("sa",event)
            //      $this.updateapportunityData(event.point.category);
            //     console.log("sa",event.point.category);
            //   },
            // }
          }
        }
      },
      exporting: false,
      series:series
      //  [{
      //   name: 'May-2020',
      //   color: '#1769a3',
      //   data: [49.9, 71.5, 106.4, 129.2]

      // }, {
      //   name: 'Apr-2020',
      //   color: '#ff6b1b',
      //   data: [48.9, 38.8, 39.3, 41.4]

      // }, {
      //   name: 'Mar-2020',
      //   color: '#03cb44',
      //   data: [42.4, 33.2, 34.5, 39.7]

      // }]

    }
    this.revenuechart = new Chart(this.revenueOptions);
  }

  countfiresChart(Xaxis, budget, revenue,count) {
    var $this = this;
    var tooltipEnabled = true;
    this.countfireOptions = {
      chart: {
        type: 'column',
        backgroundColor: ' #ffffff',
        height:350,
      },
      title: {
        text: null,

      },
      xAxis: {
        categories: Xaxis
      },
      yAxis: {
        title: {
          text: null
        }
      },
      legend: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        },
        series: {
          point: {
            // events: {
            //   click: function (event) {
            //     console.log("sa",event)
            //      $this.updateapportunityData(event.point.category);
            //     console.log("sa",event.point.category);
            //   },
            // }
          }
        }
      },
      exporting: false,
      series: [{
        name: '10k',
        color: '#1769a3',
        data: budget

      }, {
        name: '20k',
        color: '#ff6b1b',
        data: revenue

      }, {
        name: '30k',
        color: '#03cb44',
        data: count

      }]

    }
    this.countfirechart = new Chart(this.countfireOptions);
  }
  countcommunityChart(series) {
    var $this = this;
    var tooltipEnabled = true;
    this.countcommunityOptions = {
      chart: {
        type: 'pie',
        height:350,
        options3d: {
          enabled: true,
          alpha: 25,
          beta: 0
        },
        backgroundColor: '#ffffff',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
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
          colors: ['#1769a3', '#ff6b1b', '#03cb44', '#a42cee','#ffac4e', '#1aa8a9','#EC2500','#d74550','#118dff','#6c007a','#e044a7','#754ec3'],
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 45,
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          },
          // events: {
          //   click: function (event) {
          //     let sliced: boolean;
          //     sliced = event.point.options.sliced
          //     console.log(sliced)
          //     $this.updatebuyerChartData(event.point.name,sliced);
          //   },
          // }
        }
      },
      series: [{
        type: "pie",
        name: "Browser share",
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
    this.countcommunitychart = new Chart(this.countcommunityOptions);
  }
  housespentChart(series) {
    var $this = this;
    var tooltipEnabled = true;
    this.housespentOptions = {
      chart: {
        type: 'pie',
        height:350,
        options3d: {
          enabled: true,
          alpha: 25,
          beta: 0
        },
        backgroundColor: '#ffffff',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
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
          colors: ['#1769a3', '#d74550', '#03cb44', '#a42cee','#ffac4e', '#1aa8a9','#754ec3','#ff6b1b','#118dff','#6c007a','#e044a7','#EC2500'],
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 45,
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          },
          // events: {
          //   click: function (event) {
          //     let sliced: boolean;
          //     sliced = event.point.options.sliced
          //     console.log(sliced)
          //     $this.updatebuyerChartData(event.point.name,sliced);
          //   },
          // }
        }
      },
      series: [{
        type: "pie",
        name: "Browser share",
        data: series,
        point: {
          events: {
            mouseOver: function (event) {
              // console.log(event.target.name, event.target.color)
              $this.name = event.target.name;
              $this.value = event.target.y;
              //  $this.updateTableData(event.target.name,event.target.color);
              $this.setTranslation(this, true);
            },
            mouseOut: function () {
              //  $this.updateTableData(event.target.name,event.target.color);
              $this.setTranslation(this, false);
            },
          }
        }
      }]
    }
    this.housespentchart = new Chart(this.housespentOptions);
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
  violentChart(Xaxis, series) {
    var $this = this;
    var tooltipEnabled = true;
    this.violentOptions = {
      chart: {
        type: 'column',
        backgroundColor: ' #ffffff',
        height:350,
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
        }
      },
      legend: {
        enabled: true
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
            // events: {
            //   click: function (event) {
            //     console.log("sa",event)
            //      $this.updateapportunityData(event.point.category);
            //     console.log("sa",event.point.category);
            //   },
            // }
          }
        }
      },
      exporting: false,
      series: series
      // [{
      //   name: 'Violent Crime',
      //   color: '#1769a3',
      //   data: [49.9, 71.5, 106.4, 129.2]

      // }, {
      //   name: 'Non Violent Crime',
      //   color: '#ff6b1b',
      //   data: [48.9, 38.8, 39.3, 41.4]

      // },]

    }
    this.violentchart = new Chart(this.violentOptions);
  }
  countemergencyChart(Xaxis, budget, revenue,count) {
    var $this = this;
    var tooltipEnabled = true;
    this.countemergencyOptions = {
      chart: {
        type: 'line',
        backgroundColor: ' #ffffff',
        height:350,
      },
      title: {
        text: null,

      },
      xAxis: {
        categories: Xaxis
      },
      yAxis: {
        title: {
          text: null
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        },
        series: {
          point: {
            // events: {
            //   click: function (event) {
            //     console.log("sa",event)
            //      $this.updateapportunityData(event.point.category);
            //     console.log("sa",event.point.category);
            //   },
            // }
          }
        }
      },
      exporting: false,
      series: [{
        name: 'Outside Sources',
        color: '#1769a3',
        data:budget

      }, {
        name: 'Muncipalty Sources',
        color: '#ff6b1b',
        data: revenue

      }, {
        name: 'Muncipalty Sources',
        color: '#03cb44',
        data: count

      }]

    }
    this.countemergencychart = new Chart(this.countemergencyOptions);
  }
}
