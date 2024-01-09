import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import _ from 'lodash';
import { DataService } from 'src/app/core/data.service';
const numeral = require('numeral');

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  permitOptions: any;
  permitchart: any;
  inspectionOptions: any;
  inspectionchart: any;
  historicOptions: any;
  historicchart: any;
  permitrevenueOptions: any;
  permitrevenuechart: any;
  projectwithinOptions: any;
  projectwithinchart: any;
  averagecustomerOptions: any;
  averagecustomerchart: any;
  averagewithinOptions: any;
  averagewithinchart: any;


  dummyArray: any = [];
  sales: any = [];
  decimalData: any = [];
  may: any = [];
  apr: any = [];
  jun: any = [];
  jul: any = [];
  Permits: number = 0;
  Inspection: number = 0;
  Historic: number = 0;
  Permit: number = 0;
  Projects: number = 0;
  Avgcostomer: number = 0;
  Avgcomp: number = 0;
  treeColors:any = [{
    color: "#EC2500",
    backgroundColor: "#EC2500",
  },
  {
    color: "#d74550",
    backgroundColor: "#EC2500",
  },
  {
    color: "#118dff",
    backgroundColor: "#EC2500",
  },
  {
    color: "#6c007a",
    backgroundColor: "#EC2500",
  },
  {
    color: "#e044a7",
    backgroundColor: "#EC2500",
  },
  {
    color: "#754ec3",
    backgroundColor: "#EC2500",
  }]
  treemapColors: any = [{
    color: "#13239d",
    backgroundColor: "#EC2500",
  },{
    color: "#e56c37",
    backgroundColor: "#EC2500",
  },{
    color: "#1769a3",
    backgroundColor: "#EC2500",
  },
  {
    color: "#ff6b1b",
    backgroundColor: "#EC2500",
  },
  {
    color: "#03cb44",
    backgroundColor: "#EC2500",
  },
  {
    color: "#a42cee",
    backgroundColor: "#EC2500",
  }];
  name: any;
  value: any;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.getconstructiondata();
    this.getpublicdata();
  }
  getconstructiondata(){
    this.dataService.getConstructionsApi().subscribe(data => {
      console.log("const",data);
      this.dummyArray = data;
      this.dummyArray.map(item => {
        if (item.permitsIssued != null) {
          this.Permits += item.permitsIssued / 5;
        }
      })
      this.dummyArray.map(item => {
        if (item.permitsIssued != null) {
          this.Inspection += parseInt(item.permitsIssued) / 20;
        }
      })
      this.dummyArray.map(item => {
        if (item.permitsIssued != null) {
          this.Historic += item.permitsIssued / 25;
        }
      })
      this.dummyArray.map(item => {
        if (item.permitsIssued != null) {
          this.Permit += item.permitsIssued / 10;
        }
      })
      this.getPermitissued(data);
      this.getinspection(data);
      this.getHistoric(data);
      this.getPermitrevenue(data);
    }, err => {
      console.log("error", err);
    })
  }
  getpublicdata(){
    this.dataService.getPublicworksApi().subscribe(data => {
      console.log("public",data);
      this.dummyArray = data;
      this.dummyArray.map(item => {
        if (item.budgetAllocation != null) {
          this.Projects += item.budgetAllocation / 550000;
        }
      })
      this.dummyArray.map(item => {
        if (item.budgetAllocation != null) {
          this.Avgcostomer += parseInt(item.budgetAllocation) / 1000000;
        }
      })
      this.dummyArray.map(item => {
        if (item.budgetAllocation != null) {
          this.Avgcomp += item.budgetAllocation / 40;
        }
      })
      this.getProjectwithin(data);
      this.getAveragecustomer(data);
      this.getAveragewithin(data);
    }, err => {
      console.log("error", err);
    })
  }
  df(value) {
    return numeral(value).format('0,0.0');
  }
  getPermitissued(data){
    console.log(data);
    var hash = Object.create(null);
    var result = [];
    data.forEach(function (a) {
      var key = ['category'].map(function (k) { return a[k]; }).join('|');
      if (a.fundings === undefined || a.fundings === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.category, y: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.y += parseInt(a.fundings);
      hash[key].count++;
    });
    result.map(item => {
      item.y = parseInt(item.y.toFixed(2));
    })
    this.permitissuedChart(result);
  }
  getinspection(data){
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['category'].map(function (k) { return a[k]; }).join('|');
      if (a.permitRevenue === undefined || a.permitRevenue === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.category, fundings: 0, permitRevenue: 0, permitsIssued: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.fundings += a.fundings;
      hash[key].data.permitRevenue += a.permitRevenue;
      hash[key].data.permitsIssued += a.permitsIssued * 50;
      hash[key].data.definition = a.category;
      hash[key].count++;
    });
    var names = ['May-2020', 'Apr-2020', 'Mar-2020'];
    var color = ['#1769a3', '#ff6b1b', '#03cb44'];
    var Xaxis: any = [];
    var series: any = [];
    var fundings: any = [];
    var permitRevenue: any = [];
    var permitsIssued: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      fundings.push(result[index].fundings);
      permitRevenue.push(result[index].permitRevenue);
      permitsIssued.push(result[index].permitsIssued);
      Xaxis.push(result[index].definition);
      totalcases = [fundings, permitRevenue, permitsIssued];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] });
    });
    // console.log("chart", series);
    // this.dynamicCategoryOverview = Xaxis;
    // this.dynamicCategorySeries = series;
    this.inspectionChart(Xaxis, series);
  }
  getHistoric(data){
    var hash = Object.create(null);
    var result = [];
    data.forEach(function (a) {
      var key = ['month'].map(function (k) { return a[k]; }).join('|');
      if (a.inspectionsPerformed === undefined || a.inspectionsPerformed === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.month, b: 0, c: 0} };
        result.push(hash[key].data);
      }
      hash[key].data.b += a.inspectionsPerformed;
      hash[key].data.c += a.permitsIssued;
      hash[key].data.definition = a.month;
      hash[key].count++;
    });
    var Xaxis: any = [];
    var Yaxis: any = [];
    var series: any = [];
    var inspectionsPerformed: any = [];
    var permitsIssued: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      inspectionsPerformed.push(result[index].b);
      permitsIssued.push(result[index].c);
      Xaxis.push(result[index].definition);
      totalcases = [inspectionsPerformed];
    });
    result.map((item, index) => {
      series.push({ data: inspectionsPerformed })
    });
    // this.dynamiePieOverview = Xaxis;
    // this.dynamiePie = result;
    this.sales = inspectionsPerformed;
    this.decimalData = permitsIssued;

    this.historicChart(Xaxis, inspectionsPerformed, permitsIssued);

  }
  getPermitrevenue(data){
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['permitFor'].map(function (k) { return a[k]; }).join('|');
      if (a.permitRevenue === undefined || a.permitRevenue === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.permitFor, fundings: 0, permitRevenue: 0, permitsIssued: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.fundings += a.permitRevenue;
      hash[key].data.permitRevenue += a.fundings;
      hash[key].data.permitsIssued += a.permitsIssued * 50;
      hash[key].data.definition = a.permitFor;
      hash[key].count++;
    });
    var names = ['May-2020', 'Apr-2020', 'Mar-2020'];
    var color = ['#1769a3', '#ff6b1b', '#03cb44'];
    var Xaxis: any = [];
    var series: any = [];
    var fundings: any = [];
    var permitRevenue: any = [];
    var permitsIssued: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      fundings.push(result[index].fundings);
      permitRevenue.push(result[index].permitRevenue);
      permitsIssued.push(result[index].permitsIssued);
      Xaxis.push(result[index].definition);
      totalcases = [fundings, permitRevenue, permitsIssued];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] });
    });
    // console.log("chart", series);
    // this.dynamicCategoryOverview = Xaxis;
    // this.dynamicCategorySeries = series;
    this.permitrevenueChart(Xaxis, series);
  }
  getProjectwithin(data){
    var hash = Object.create(null);
    var result = [];
    data.forEach(function (a) {
      var key = ['month'].map(function (k) { return a[k]; }).join('|');
      if (a.budgetAllocation === undefined || a.budgetAllocation === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.month, b: 0, c: 0, d:0, e:0} };
        result.push(hash[key].data);
      }
      hash[key].data.b += a.budgetAllocation*4;
      hash[key].data.c += a.budgetAllocation*2;
      hash[key].data.d += a.budgetAllocation*3;
      hash[key].data.e += a.budgetAllocation*4;
      hash[key].data.definition = a.month;
      hash[key].count++;
    });
    var Xaxis: any = [];
    var Yaxis: any = [];
    var series: any = [];
    var budgetAllocation: any = [];
    var permitsIssued: any = [];
    var may: any = [];
    var apr: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      budgetAllocation.push(result[index].b);
      permitsIssued.push(result[index].c);
      may.push(result[index].d);
      apr.push(result[index].e);
      Xaxis.push(result[index].definition);
      totalcases = [budgetAllocation];
    });
    result.map((item, index) => {
      series.push({ data: budgetAllocation })
    });
    // this.dynamiePieOverview = Xaxis;
    // this.dynamiePie = result;
    this.may = may;
    this.apr = apr;
    this.jun = budgetAllocation;
    this.jul = permitsIssued;
    this.projectwithinChart(Xaxis, budgetAllocation, permitsIssued, may , apr);
  } 
  getAveragecustomer(data){
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['projectName'].map(function (k) { return a[k]; }).join('|');
      if (a.month === undefined || a.month === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.projectName, budgetAllocation: 0} };
        result.push(hash[key].data);
      }
      hash[key].data.budgetAllocation += a.budgetAllocation;
      hash[key].data.definition = a.projectName;
      hash[key].count++;
    });
    var series = [];
    result.map((item, index)=> {
        series.push({name: item.name, value: item.budgetAllocation, color: this.treemapColors[index].color, backgroundColor: this.treemapColors[index].backgroundColor});
    });
    console.log("chart", series);
    this.averagecustomerChart(series);
  }
  getAveragewithin(data){
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['projectName'].map(function (k) { return a[k]; }).join('|');
      if (a.budgetAllocation === undefined || a.budgetAllocation === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.projectName, budgetAllocation: 0} };
        result.push(hash[key].data);
      }
      hash[key].data.budgetAllocation += a.budgetAllocation;
      hash[key].data.definition = a.projectName;
      hash[key].count++;
    });
    var series = [];
    result.map((item, index)=> {
        series.push({name: item.name, value: item.budgetAllocation, color: this.treeColors[index].color, backgroundColor: this.treeColors[index].backgroundColor});
    });
    this.averagewithinChart(series);
  }


  permitissuedChart(series) {
    var $this = this;
    var tooltipEnabled = true;
    this.permitOptions = {
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        height:350,
        options3d: {
          enabled: true,
          alpha: 25,
          beta: 0
        },
        backgroundColor: '#ffffff',
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
      series: [
        {
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
        }
      ]
    }
    this.permitchart = new Chart(this.permitOptions);
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
  inspectionChart(xAxis,series) {
    var $this = this;
    var tooltipEnabled = true;
    this.inspectionOptions = {
      chart: {
        type: 'column',
        backgroundColor: ' #ffffff',
        height:350,
      },
      title: {
        text: null
      },
      subtitle: {
        text: 'Inspect Performed - Count'
      },
      xAxis: {
        categories:xAxis
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
      //   name: 'May-2020',
      //   color:  '#1769a3',
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
    this.inspectionchart = new Chart(this.inspectionOptions);
  }
  historicChart(Xaxis, inspectionsPerformed, permitsIssued) {
    var $this = this;
    var tooltipEnabled = true;
    this.historicOptions = {
      chart: {
        type: 'column',
        backgroundColor: ' #ffffff',
        height:350,
      },
      title: {
        text: null,

      },
      subtitle: {
        text: 'Hostoric Preservation Funding - Value'
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
        name: 'Outside Sources',
        color:  '#1769a3',
        data: inspectionsPerformed

      }, {
        name: 'Muncipalty Sources',
        color: '#ff6b1b',
        data:permitsIssued

      },]

    }
    this.historicchart = new Chart(this.historicOptions);
  }
  permitrevenueChart(xAxis,series) {
    var $this = this;
    var tooltipEnabled = true;
    this.permitrevenueOptions = {
      chart: {
        type: 'column',
        backgroundColor: ' #ffffff',
        height:350,
      },
      title: {
        text: null
      },
      subtitle: {
        text: 'Permit Revenue'
      },
      xAxis: {
        categories: xAxis
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
      //   name: 'May-2020',
      //   color:  '#1769a3',
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
    this.permitrevenuechart = new Chart(this.permitrevenueOptions);
  }

  projectwithinChart(Xaxis, budgetAllocation, permitsIssued, may , apr) {
    var $this = this;
    var tooltipEnabled = true;
    this.projectwithinOptions = {
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
        name: 'May-20',
        color:  '#1769a3',
        data: budgetAllocation

      }, {
        name: 'Apr-20',
        color: '#ff6b1b',
        data:permitsIssued

      }, {
        name: 'Mar-20',
        color: '#03cb44',
        data: may

      }, {
        name: 'May-21',
        color: '#a42cee',
        data: apr

      }] 

    }
    this.projectwithinchart = new Chart(this.projectwithinOptions);
  }
  averagecustomerChart(series) {
    var $this = this;
    var tooltipEnabled = true;
    this.averagecustomerOptions = {
      chart: {
        type: "treemap",
        height:350,
        layoutAlgorithm: 'stripes',
        alternateStartingDirection: true,
        levels: [{
          level: 1,
          layoutAlgorithm: 'sliceAndDice',

        }],
      },
      title: {
        text: null,
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false
      },
      exporting: false,
      series:[{
        data: series

      }]
    }
    this.averagecustomerchart = new Chart(this.averagecustomerOptions);
  }
  averagewithinChart(series) {
    var $this = this;
    var tooltipEnabled = true;
    this.averagewithinOptions = {
      chart: {
        type: "treemap",
        height:350,
        layoutAlgorithm: 'stripes',
        alternateStartingDirection: true,
        levels: [{
          level: 1,
          layoutAlgorithm: 'sliceAndDice',

        }],
      },
      title: {
        text: null,

      },

      legend: {
        enabled: false,
        // align: 'center',
        // verticalAlign: 'top',
        // borderWidth: 0
      },
      credits: {
        enabled: false
      },
      exporting: false,
      series:[{
        data:series
      }]
    }
    this.averagewithinchart = new Chart(this.averagewithinOptions);
  }
}
