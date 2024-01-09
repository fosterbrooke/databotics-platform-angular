import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d.src';
highcharts3D(Highcharts);
import { CaterpillarService } from '../core/caterpillar.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-caterpillar-overview',
  templateUrl: './caterpillar-overview.component.html',
  styleUrls: ['./caterpillar-overview.component.css']
})
export class CaterpillarOverviewComponent implements OnInit {

  ssChart: any;
  ssChartOptions: any;
  scChart: any;
  scChartOptions: any;
  sdChart: any;
  sdChartOptions: any;
  savingsChart: any;
  savingsChartOptions: any;
  digitalChart: any;
  digitalChartOptions: any;
  treechart: any;
  treeoptions: any;

  supplierSpendType: any;
  categorySpendType: any;
  deptSpendType: any;
  supplierSavingsType: any;
  contractValueType: any;

  suppliersSpend: any = [];
  categorySpend: any = [];
  deptSpend: any = [];
  supplierSavings = [];
  contractValue = [];

  tabledata: any = [];

  contracttreechartoptions: any;
  contracttreechart: any;

  metadata: any = {vendors: 0, contracts: 0};
  ratingClicked: number;
  itemIdRatingClicked: string;
  ratingtype: string;
  overviewtabs: any = 1;

  @Output() private numberGenerated = new EventEmitter<any>();

  newData: any = [
    {
      name: "Stanbrige",
      y: 100000,
      annualised: 2.1,
      current: 1.3,
      crs: '23',

    },
    {
      name: "Wong",
      y: 123000,
      annualised: 2.9,
      current: 1.32,
      crs: '23',
    },
    {
      name: "Peter",
      y: 240000,
      annualised: 2.1,
      current: 0.9,
      crs: '23',
    },
    {
      name: "Tamzyn",
      y: 100000,
      annualised: 2.0,
      current: 1.3,
      crs: '23',
    },
    {
      name: "Verona",
      y: 2287665,
      annualised: 2.9,
      current: 1.3,
      crs: '23',
    },
    {
      name: "Daly",
      y: 100000,
      annualised: 2.0,
      current: 1.2,
      crs: '23',
    },
    {
      name: "Stanbrige",
      y: 1003400,
      annualised: 2.4,
      current: 1.8,
      crs: '13',
    },
    {
      name: "Verona sheren",
      y: 189000,
      annualised: 2.5,
      current: 1.3,
      crs: '2',
    },
    {
      name: "Daly Racheal",
      y: 1000678,
      annualised: 1.1,
      current: 1.0,
      crs: '10',
    },
    {
      name: "Stanley",
      y: 100000,
      annualised: 2.8,
      current: 1.1,
      crs: '8',
    },
    {
      name: "Others",
      y: 1409876,
      annualised: 2.8,
      current: 1.1,
      crs: '8',
    }
  ];
  category: string;
  title: string;
  tablecolumn: string;
  selectedOverview: any = 1;
  selectedVendor: any = 1;
  selectedContract: any = 1;
  selectedSS: any = 1;
  selectedCV: any = 1;
  selectedDS: any = 1;
  selected: any = 2;
  column: any;
  suppliershow: boolean = true;
  categoryshow: boolean = false;
  deptbushow: boolean = false;
  ssCV: any = 1;
  show10SS: boolean = true;
  show10CV: boolean = false
  digitalCategories: any = [];

  monthrecords: any = [];
  quaterrecords: any = [];
  weeklyrecords: any = [];
  yearlyrecords: any = [];
  commentWrote: any;
  itemName: any;

  constructor(private caterpillar: CaterpillarService, private router: Router) { }

  ngOnInit() {
    this.supplierSpendType = 'CommittedAmount_2019';
    this.categorySpendType = 'CommittedAmount_2019';
    this.deptSpendType = 'CommittedAmount_2019';
    this.supplierSavingsType = 'CommittedAmount_2019';
    this.contractValueType = 'CommittedAmount_2019';
    this.digitalCategories = ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6', 'Week7'];

    this.init();
    this.digitalSavings();
    this.loadMetadata();
    // this.loadSupplierSpendChart();
    // this.loadSpendByCategoryChart();
    // this.loadSpendByDeptChart();
    // this.loadDigitalChart();
    // this.showTree();
    this.category = 'Supplier Name';
    this.tablecolumn = "Committed";
    this.ratingtype = "Committed";
    this.title = 'TOP 10 SUPPLIERS BY SPEND';
  }

  loadSupplierSpendChart() {
    var chartData = this.suppliersSpend;
    // console.log(chartData);
    // var chartData = this.newData;
    var tooltipEnabled = true;
    var $this = this;
    this.ssChartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        // type: 'treemap',
        type: "bar",
        margin: [-80, 40, -80, 40],
        backgroundColor: '#f7f7ef',
        // options3d: {
        //   enabled: true,
        //   alpha: 55,
        //   beta: 0
        // }
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      accessibility: {
        point: {
          valueSuffix: "%"
        }
      },
      tooltip: {
        enabled: true,
      //   positioner: function (labelWidth, labelHeight, point) {
      //     return {
      //         x: point.plotX - point.h/1 + labelWidth/1,
      //         y: point.plotY
      //     };
      // },
        valueSuffix: '',
        useHTML:true,
        formatter: function() {
          // console.log(this.point.name, this.point.value);
          var ret = '',
              multi,
              axis = this.point.y,
              numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
              i = numericSymbols.length;
          while (i-- && ret === '') {
              multi = Math.pow(1000, i + 1);
              if (axis >= multi && numericSymbols[i] !== null) {
                  ret = '<span style="font-size: 10px; font-family: Arial; text-transform:uppercase;color: black ">' + this.series.name + ': ' + '$ <span style="font-size: 15px; font-family: Arial; text-transform:uppercase;color: black ">' + Highcharts.numberFormat(this.point.y / multi, 2) + numericSymbols[i] + '</span></span>';
              }
          }
          // console.log(ret);
          return ret;
        }
      },
      legend: {
        enabled: false,
        align: 'center',
        verticalAlign: 'top',
        layout: 'horizontal',
        useHTML: true,
        reversed: true,
        // labelFormatter: function() {
        //   // return 'hellooo'
          
        //   var ret = '',
        //   ret = this.name + ' '
        //   return ret;
        //   //     multi,
        //   //     // axis = this.series.yAxis,
        //   //     numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
        //   //     i = numericSymbols.length;
        //   // while (i-- && ret === '') {   
        //   //     multi = Math.pow(1000, i + 1);
        //   //     // if (axis.tickInterval >= multi && numericSymbols[i] !== null) {
        //   //         // ret = this.name + ':' + this.y;
        //   //         // + ':' + '$' + + Highcharts.numberFormat(this.y / multi, 2) + numericSymbols[i];
        //   //     // }
        //   // }
        //   // return ret;
        // },
        itemStyle: {
          fontSize: '10px'
        }
      },
      xAxis: {
        gridLineWidth:0,
        labels: {
          enabled: false,
          family:'Univers 67 Condensed Bold',
        }
      },
      yAxis: {
        labels: {
          enabled: false,
          family:'Univers 67 Condensed Bold',
        },
        gridLineWidth:0,
        title: {
          text: null
        }
      },
      plotOptions: {
        // pie: {
        //   allowPointSelect: true,
        //   cursor: "pointer",
        //   depth: 45,
        //   size : 200,
        //   dataLabels: {
        //     enabled: false,
        //     format: "{point.name}"
        //   },
        //   showInLegend: false,
        //   slicedOffset: 40
        // }
        bar: {
          dataLabels : {
            enabled : true,
            inside: true,
            // format: "{point.name}"
            shadow: false,
            style:{textOutline:false},
            formatter: function() {
              var ret = '',
                  multi,
                  axis = this.point.y,
                  numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
                  i = numericSymbols.length;
              while (i-- && ret === '') {
                  multi = Math.pow(1000, i + 1);
                  if (axis >= multi && numericSymbols[i] !== null) {
                      ret = '<span style="font-size:10px; font-family: Arial; color: black">' + this.series.name + ': ' + '<span style="font-size: 15px;font-family: Arial; color: black">$' + Highcharts.numberFormat(this.point.y / multi, 2) + numericSymbols[i] + '</span></span>';
                  }
              }
              return ret;
            }
          },
        },
        series: {
          dataLabels: {
              //  inside: true
          //   enabled: true,
          //   useHTML: true,
          //   formatter: function () {
          //     // console.log(Highcharts, this);
          //     var ret = '',
          //         multi,
          //         axis = this.series.yAxis,
          //         numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
          //         i = numericSymbols.length;
          //     while (i-- && ret === '') {
          //         multi = Math.pow(1000, i + 1);
          //         if (axis.tickInterval >= multi && numericSymbols[i] !== null) {
          //             ret = '<span style="font-size:7px; color: black">' + Highcharts.numberFormat(this.y / multi, 2) + numericSymbols[i] + '</span>';
          //         }
          //     }
          //     return ret;
          // }
          }
        },
      //   series: {
      //     stacking: 'normal',
      //     pointWidth: 40
      // }
      },
      series: 
      // [
      //   {
      //     name: 'x1',
      //     data: [45]
      //   },
      //   {
      //     name:'y1',
      //     data: [67]
      //   }
      // ]
      this.getseries(chartData)
      // [
      //   {
      //     type: "bar",
      //     layoutAlgorithm: 'squarified',
      //     name: "Supplier Spend",
      //     data: chartData,
      //     point: {
      //       events: {
      //           click: function (event) {
      //               // this.series.chart.update({
      //               //   tooltip: {
      //               //     enabled: tooltipEnabled,
      //               //   }
      //               // });
      //               // tooltipEnabled = tooltipEnabled ? false : true;
      //               // $this.updateTableData(this.name,event.point.color);
      //               $this.numberGenerated.emit({num: 2, eventtype: this.name});
      //           },
      //           mouseOut: function (event) {
      //             $this.updateTableData(event.target.name,event.target.color);
      //             $this.setTranslation(this, false);
      //           },
      //           mouseOver: function(event) {
      //             $this.updateTableData(event.target.name,event.target.color);
      //             $this.setTranslation(this, true);
      //           }
      //       }
      //   }
      //   }
      // ]
    }
    this.ssChart = new Chart(this.ssChartOptions);
  }

  getseries(chartData) {
    // console.log(chartData);
    var series = [];
    var tooltipEnabled = true;
    var $this = this;
    for(let item in chartData) {
        series.push({name: chartData[item]['name'], data: [chartData[item]['y']], color: chartData[item]['color'], point: {
          events: {
            click: function (event) {
              this.series.chart.update({
                                tooltip: {
                                  enabled: tooltipEnabled,
                                }
                              });
                              tooltipEnabled = tooltipEnabled ? false: true;
            },
            mouseOut: function (event) {
                          $this.updateTableData(this.series.name,event.target.color);
                          $this.setTranslation(this, false);
                        },
                        mouseOver: function(event) {
                          // console.log(this.series.name, event.target.color)
                          $this.updateTableData(this.series.name,event.target.color);
                          $this.setTranslation(this, true);
                        }
          }
        }});
    }
    // console.log(series);
    return series;
  }

  updateTableData(name,colorforrow) {
    // console.log(name);
    // console.log(colorforrow);
    for(var i=0;i<this.tabledata.length;i++){
      if(this.tabledata[i].name == name){
        this.tabledata[i].tablecolor = colorforrow;
      }else{
        if(i % 2 == 0) {
          this.tabledata[i].tablecolor = "#f7f7ef";
         }else {
          this.tabledata[i].tablecolor = "#f2f2f2";
         }
      }
    }
  }

  setTranslation(p, slice){
    p.sliced = slice;
    if(p.sliced){
        p.graphic.animate(p.slicedTranslation);
    } else {
        p.graphic.animate({
            translateX: 0,
            translateY: 0
        });
    }

  }

  loadSpendByCategoryChart(data) {
    var chartData = data;
    var tooltipEnabled = true;
    var $this = this;
    this.scChartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'bar',
        margin: [-80, 40, -80, 40],
        backgroundColor: '#f7f7ef',
        // options3d: {
        //   enabled: true,
        //   alpha: 55,
        //   beta: 0
        // }
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      accessibility: {
        point: {
          valueSuffix: "%"
        }
      },
      tooltip: {
        enabled: true,
      //   positioner: function (labelWidth, labelHeight, point) {
      //     return {
      //         x: point.plotX - point.h/1 + labelWidth/1,
      //         y: point.plotY
      //     };
      // },
        valueSuffix: '',
        useHTML:true,
        formatter: function() {
          // console.log(this.point.name, this.point.value);
          var ret = '',
              multi,
              axis = this.point.y,
              numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
              i = numericSymbols.length;
          while (i-- && ret === '') {
              multi = Math.pow(1000, i + 1);
              if (axis >= multi && numericSymbols[i] !== null) {
                  ret = '<span style="font-size: 10px; font-family: Arial; text-transform:uppercase;color: black ">' + this.series.name + ': ' + '<span style="font-size: 15px;font-family: Arial; color: black">$' + Highcharts.numberFormat(this.point.y / multi, 2) + numericSymbols[i] + '</span></span>';
              }
          }
          // console.log(ret);
          return ret;
        }
      },
      legend: {
        enabled: false,
        align: 'center',
        verticalAlign: 'top',
        layout: 'horizontal',
        reversed: true,
        itemStyle: {
          fontSize: '10px'
        }
      },
      xAxis: {
        labels: {
          enabled: false,
          family:'Univers 67 Condensed Bold',
        }
      },
      yAxis: {
        labels: {
          enabled: false,
          family:'Univers 67 Condensed Bold',
        },
        title: {
          text: null
        }
      },
      plotOptions: {
        // pie: {
        //   allowPointSelect: true,
        //   cursor: "pointer",
        //   depth: 45,
        //   size : 200,
        //   dataLabels: {
        //     enabled: false,
        //     format: "{point.name}"
        //   },
        //   showInLegend: false,
        //   slicedOffset: 40
        // }
            // bar: {
            //   dataLabels: {
            //     enabled: true,
            //     useHTML: true,
            //     formatter: function () {
            //       // console.log(Highcharts, this);
            //       var ret = '',
            //           multi,
            //           axis = this.series.yAxis,
            //           numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
            //           i = numericSymbols.length;
            //       while (i-- && ret === '') {
            //           multi = Math.pow(1000, i + 1);
            //           if (axis.tickInterval >= multi && numericSymbols[i] !== null) {
            //               ret = '<span style="font-size:7px; color: black">' + Highcharts.numberFormat(this.y / multi, 2) + numericSymbols[i] + '</span>';
            //           }
            //       }
            //       return ret;
            //   }
            //   }
            // },
            bar: {
              dataLabels : {
                enabled : true,
                inside : true,
                style:{textOutline:false},
                // format: "{point.name}"
                formatter: function() {
                  var ret = '',
                      multi,
                      axis = this.point.y,
                      numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
                      i = numericSymbols.length;
                  while (i-- && ret === '') {
                      multi = Math.pow(1000, i + 1);
                      if (axis >= multi && numericSymbols[i] !== null) {
                          ret = '<span style="font-size: 10px; font-family: Arial; text-transform:uppercase;color: black ">' + this.series.name + ': ' + '<span style="font-size: 15px;font-family: Arial; color: black">$' + Highcharts.numberFormat(this.point.y / multi, 2) + numericSymbols[i] + '</span></span>';
                      }
                  }
                  return ret;
                }
              },
            },
      //   series: {
      //     stacking: 'normal',
      //     pointWidth: 20
      // }
      },
      series: 
      this.getseries(chartData)
      // [
      //   {
      //     // type: "pie",
      //     type: "treemap",
      //     layoutAlgorithm: 'squarified',
      //     name: "Spend By Category",
      //     data: chartData,
      //     point: {
      //       events: {
      //           click: function (event) {
      //               // this.series.chart.update({
      //               //   tooltip: {
      //               //     enabled: tooltipEnabled,
      //               //   }
      //               // });
      //               // tooltipEnabled = tooltipEnabled ? false : true;
      //               // $this.updateTableData(this.name,event.point.color);
      //               $this.numberGenerated.emit({num: 3, eventtype: this.name});
      //           },
      //           mouseOut: function (event) {
      //             $this.updateTableData(event.target.name,event.target.color);
      //             $this.setTranslation(this, false);
      //           },
      //           mouseOver: function(event) {
      //             $this.updateTableData(event.target.name,event.target.color);
      //             $this.setTranslation(this, true);
      //           }
      //       }
      //   }
      //   }
      // ]
    }
    this.scChart = new Chart(this.scChartOptions);
  }

  loadSpendByDeptChart() {
    var chartData = this.deptSpend;
    var tooltipEnabled = true;
    var $this = this;
    this.sdChartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'bar',
        margin: [-80, 40, -80, 40],
        backgroundColor: '#f7f7ef',
        // options3d: {
        //   enabled: true,
        //   alpha: 55,
        //   beta: 0
        // }
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      accessibility: {
        point: {
          valueSuffix: "%"
        }
      },
      tooltip: {
        enabled: true,
      //   positioner: function (labelWidth, labelHeight, point) {
      //     return {
      //         x: point.plotX - point.h/1 + labelWidth/1,
      //         y: point.plotY
      //     };
      // },
        valueSuffix: '',
        useHTML:true,
        formatter: function() {
          // console.log(this.point.name, this.point.value);
          var ret = '',
              multi,
              axis = this.point.y,
              numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
              i = numericSymbols.length;
          while (i-- && ret === '') {
              multi = Math.pow(1000, i + 1);
              if (axis >= multi && numericSymbols[i] !== null) {
                  ret = '<span style="font-size: 10px; font-family: Arial; text-transform:uppercase;color: black ">'+this.series.name + ':' + '<span style="font-size: 15px; font-family: Arial; text-transform:uppercase;color: black ">$' + Highcharts.numberFormat(this.point.y / multi, 2) + numericSymbols[i] + '</span></span>';
              }
          }
          // console.log(ret);
          return ret;
        }
      },
      legend: {
        enabled: false,
        align: 'center',
        verticalAlign: 'top',
        layout: 'horizontal',
        reversed: true,
        itemStyle: {
          fontSize: '10px'
        }
      },
      xAxis: {
        labels: {
          enabled: false,
          family:'Univers 67 Condensed Bold',
        }
      },
      yAxis: {
        labels: {
          enabled: false,
          family:'Univers 67 Condensed Bold',
        },
        title: {
          text: null
        }
      },
      plotOptions: {
        // pie: {
        //   allowPointSelect: true,
        //   cursor: "pointer",
        //   depth: 45,
        //   size : 200,
        //   dataLabels: {
        //     enabled: false,
        //     format: "{point.name}"
        //   },
        //   showInLegend: false,
        //   slicedOffset: 40
        // }
              // bar: {
              //   dataLabels: {
              //     enabled: true,
              //     useHTML: true,
              //     formatter: function () {
              //       // console.log(Highcharts, this);
              //       var ret = '',
              //           multi,
              //           axis = this.series.yAxis,
              //           numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
              //           i = numericSymbols.length;
              //       while (i-- && ret === '') {
              //           multi = Math.pow(1000, i + 1);
              //           if (axis.tickInterval >= multi && numericSymbols[i] !== null) {
              //               ret = '<span style="font-size:7px; color: black">' + Highcharts.numberFormat(this.y / multi, 2) + numericSymbols[i] + '</span>';
              //           }
              //       }
              //       return ret;
              //   }
              //   }
              // },
          bar: {
            dataLabels : {
              enabled : true,
              inside: true,
              style:{textOutline:false},
              // format: "{point.name}"
              formatter: function() {
                var ret = '',
                    multi,
                    axis = this.point.y,
                    numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
                    i = numericSymbols.length;
                while (i-- && ret === '') {
                    multi = Math.pow(1000, i + 1);
                    if (axis >= multi && numericSymbols[i] !== null) {
                        ret = '<span style="font-size: 10px; font-family:Arial; text-transform:uppercase; color:black">' + this.series.name + ': ' + '<span style="font-size: 15px; font-family: Arial; text-transform:uppercase;color: black ">$' + Highcharts.numberFormat(this.point.y / multi, 2) + numericSymbols[i] + '</span><span>';
                    }
                }
                return ret;
              }
            },
          },
      //   series: {
      //     stacking: 'normal',
      //     pointWidth: 20
      // }
      },
      series: 
      this.getseries(chartData)
      // [
      //   {
      //     // type: "pie",
      //     type: "treemap",
      //     layoutAlgorithm: 'squarified',
      //     name: "Spend By DeptBU",
      //     data: chartData,
      //     point: {
      //       events: {
      //           click: function (event) {
      //               // this.series.chart.update({
      //               //   tooltip: {
      //               //     enabled: tooltipEnabled,
      //               //   }
      //               // });
      //               // tooltipEnabled = tooltipEnabled ? false : true;
      //               // $this.updateTableData(this.name,event.point.color);
      //               $this.numberGenerated.emit({num: 4, eventtype: this.name});
      //           },
      //           mouseOut: function (event) {
      //             $this.updateTableData(event.target.name,event.target.color);
      //             $this.setTranslation(this, false);
      //           },
      //           mouseOver: function(event) {
      //             $this.updateTableData(event.target.name,event.target.color);
      //             $this.setTranslation(this, true);
      //           }
      //       }
      //   }
      //   }
      // ]
    }
    this.sdChart = new Chart(this.sdChartOptions);
  }

  loadDigitalChart(data) {
    var categories = data.reduce(function(a,d) {
      a.push(d.month)
      return a
    }, []);
    var actual = data.reduce(function (a, d) {
    a.push(d.actual)
    return a
    }, []);
    var goal = data.reduce(function (a, d) {
    a.push(d.goal)
    return a
    }, []);

    this.digitalChartOptions = {
      chart: {
        backgroundColor: '#f7f7ef',
        type: 'area',
        // plotAreaWidth: 300,
        plotAreaHeight: 300,
        style: {
            color: 'white',

        },
    },
    legend: {
        itemStyle: {
            color: 'black'
        },
        align: 'right',

        verticalAlign: 'top',
        floating: false,
        style: {
            color: '#fff'
        }
    },

    credits: {
        enabled: false
    },
    title: {
        text: null,
        style: {
            color: '#fff'
        }
    },
    tooltip: {
      // enabled: true,
      valueSuffix: '',
      formatter: function () {
        // console.log(Highcharts, this);
        var ret = '',
            multi,
            axis = this.series.yAxis,
            numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
            i = numericSymbols.length;
        while (i-- && ret === '') {
            multi = Math.pow(1000, i + 1);
            if (axis.tickInterval >= multi && numericSymbols[i] !== null) {
                ret = '<span style="font-size: 10px; font-family: Arial; text-transform:uppercase;color: black ">'+this.series.name + ': ' + '<span style="font-size: 15px; font-family: Arial; text-transform:uppercase;color: black ">$' + + Highcharts.numberFormat(this.y / multi, 2) + numericSymbols[i] + '</span></span>';
            }
        }
        return ret;
    }
    },
    plotOptions: {
         line: {
           marker:{
             enabled: false
           }
         },
        area: {
          marker:{
            enabled: false 
          },
          fillColor: {
              linearGradient: [0, 0, 0, 300],
              stops: [
                  [0, '#ffe16a'],
                  [1, '#fff0b8']
              ]
          }
      }
    },
    xAxis: {
        // tickInterval: 1,
        // type: 'datetime',
        categories: categories,
        labels: {
            enabled: true,
            family:'Univers 67 Condensed Bold',
            style: {
                color: 'black'
            },
            format: '{value}',
        },
    },
    yAxis: {
        gridLineColor: 'transparent',
        labels: {
            enabled: true,
            // format: '{value}',
            formatter: function () {
              var exp, rounded,
              suffixes = ['K', 'M', 'G', 'T', 'P', 'E'];
            if (this.value == undefined) {
              return 0;
            }
        
            if (this.value < 1000) {
              return this.value;
            }
        
            exp = Math.floor(Math.log(this.value) / Math.log(1000));
        
            return (this.value / Math.pow(1000, exp)).toFixed(2) + suffixes[exp - 1]
          },
            style: {
                color: 'black'
            }
        },

        title: {
            text: null,
        },
    },
    series: [
      {
        name: 'Actual',
        type: 'area',
        data: actual,
        color: '#1aa8a9'
        // color: '#ffe687'

    },
        {
            name: 'Goal',
            type: 'line',
            data: goal,
            color: '#333333'
        },
        
    ],
    }
    this.digitalChart = new Chart(this.digitalChartOptions);
  }

  // spend(spend, title) {
  //   this.title = title;
  //   this.newData = []
  //   if(spend == 'Commited') {
  //     this.category = 'Commited';
  //     this.newData = [{name: "Stanbrige",y: 12.8,annualised: 2.5,current: 1.3,crs: 23},{name: "Wong",y: 12.8,annualised: 1.1,current: 1.3,crs: 23},{name: "Peter",y: 12.8,annualised: 2.1,current: 1.9,crs: 23},{name: "Tamzyn",y: 12.8,annualised: 2.1,current: 2.0,crs: 23},{name: "Verona",y: 12.8,annualised: 2.1,current: 1.3,crs: 23},{name: "Daly",y: 12.8,annualised: 2.1,current: 1.3,crs: 23},{name: "Stanbrige",y: 12.8,annualised: 2.1,current: 1.3,crs: 23},{name: "Verona sheren",y: 12.8,annualised: 2.1,current: 1.9,crs: 23},{name: "Daly Racheal",y: 12.8,annualised: 2.1,current: 1.3,crs: 23},{name: "Stanley",y: 12.8,annualised: 2.1,current: 1.3,crs: 23}, {name: "Others",y: 13.8,annualised: 13.1,current: 1.0,crs: 23}]
    
  //   }else if(spend == 'Current'){
  //     this.category = 'Current';
  //     this.newData = [{name: "Stanbrige",y: 12.8,annualised: 1.0,current: 1.1,crs: 23},{name: "Wong",y: 12.8,annualised: 2.1,current: 1.1,crs: 23},{name: "Peter",y: 12.8,annualised: 1.1,current: 1.0,crs: 23},{name: "Tamzyn",y: 12.8,annualised: 1.8,current: 1.3,crs: 23},{name: "Verona",y: 12.8,annualised: 1.1,current: 1.4,crs: 23},{name: "Daly",y: 12.8,annualised: 1.1,current: 1.9,crs: 23},{name: "Stanbrige",y: 12.8,annualised: 1.4,current: 1.9,crs: 23},{name: "Verona sheren",y: 12.8,annualised: 1.4,current: 1.3,crs: 23},{name: "Daly Racheal",y: 12.8,annualised: 1.6,current: 2.3,crs: 23},{name: "Stanley",y: 12.8,annualised: 2.1,current: 1.3,crs: '23'}, {name: "Others",y: 14.8,annualised: 11.1,current: 1.3,crs: 23}]
    
  //   }else if(spend == 'Annualised'){
  //     this.category = 'Annualised';
  //     this.newData = [{name: "Stanbrige",y: 12.8,annualised: 2.1,current: 1.5,crs: 23},{name: "Wong",y: 12.8,annualised: 1.1,current: 1.5,crs: 23},{name: "Peter",y: 12.8,annualised: 2.3,current: 1.1,crs: 23},{name: "Tamzyn",y: 12.8,annualised: 1.9,current: 1.4,crs: 23},{name: "Verona",y: 12.8,annualised: 1.1,current: 1.6,crs: 23},{name: "Daly",y: 12.8,annualised: 1.9,current: 1.2,crs: 23},{name: "Stanbrige",y: 12.8,annualised: 1.5,current: 1.3,crs: 23},{name: "Verona sheren",y: 12.8,annualised: 2.1,current: 1.1,crs: 23},{name: "Daly Racheal",y: 12.8,annualised: 1.8,current: 1.3,crs: 23},{name: "Stanley",y: 12.8,annualised: 2.1,current: 1.3,crs: '23'}, {name: "Others",y: 11.8,annualised: 12.1,current: 1.3,crs: 23}]
    
  //   }
  // }

  showTree(data) {
    var $this = this;
    var chartData = $this.supplierSavings;
    // console.log(chartData);
    this.treeoptions = {
      chart: {
        backgroundColor: '#f7f7ef',
      },
      title : {
         text: null
      },
      // colorAxis : {
      //    minColor: '#FFFFFF',
      //    maxColor: Highcharts.getOptions().colors[0]
      // },
      legend: {
        enabled: false
      },
      credits: {
         enabled: false
      },
      tooltip: {
        enabled: true,
        pointFormat: "{series.type}: <b>{data.value:.1f}</b>"
      },
      series : [{
         type: "treemap",
         layoutAlgorithm: 'squarified',
         events: {
          click: function (event) {
            // $this.updateTableData(event.target.name,event.target.color);
          },
          mouseOut: function (event) {
            $this.updateTableData(event.target.name,event.target.color);
            $this.setTranslation(this, false);
          },
          mouseOver: function(event) {
            $this.updateTableData(event.target.name,event.target.color);
            $this.setTranslation(this, true);
          }
        },
         data: data,
        //  showInLegend: true
      }]
   };
    this.treechart = new Chart(this.treeoptions);
  }

  contractTree(data) {
    var $this = this;
    this.contracttreechart = {
      chart: {
        backgroundColor: '#f7f7ef',
      },
      title : {
         text: null
      },
      // colorAxis : {
      //    minColor: '#FFFFFF',
      //    maxColor: Highcharts.getOptions().colors[0]
      // },
      legend: {
        enabled: false,
        labels : {
          fontSize:'12'
        },
      },
      credits: {
         enabled: false
      },
      series : [{
         type: "treemap",
         layoutAlgorithm: 'squarified',
         events: {
          click: function (event) {
            $this.updateTableData(event.target.name,event.target.color);
          },
          mouseOut: function (event) {
            $this.updateTableData(event.target.name,event.target.color);
            $this.setTranslation(this, false);
          },
          mouseOver: function(event) {
            $this.updateTableData(event.target.name,event.target.color);
            $this.setTranslation(this, true);
          }
        },
         data: data,
         showInLegend: true
      }]
   };
    this.contracttreechart = new Chart(this.contracttreechart);
  }

  supsChart(data) {
    var $this = this;
    var tooltipEnabled = true;
    this.treeoptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: '#f7f7ef',
        options3d: {
          enabled: true,
          alpha: 55,
          beta: 0
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      accessibility: {
        point: {
          valueSuffix: "%"
        }
      },
      tooltip: {
        // enabled: true,
        // pointFormat: "<b>{series.name}</b>: {point.y:.1f}"
        formatter: function() {
          var ret = '',
              multi,
              axis = this.point.y,
              numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
              i = numericSymbols.length;
          while (i-- && ret === '') {
              multi = Math.pow(1000, i + 1);
              if (axis >= multi && numericSymbols[i] !== null) {
                  ret = this.point.name + ':' + '$' + + Highcharts.numberFormat(this.point.y / multi, 2) + numericSymbols[i];
              }
          }
          console.log(ret);
          return ret;
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          depth: 45,
          size : 300,
          dataLabels: {
            enabled: true,
            // format: "{point.name}"
            useHTML: true,
            formatter: function() {

              var ret = '',
                  multi,
                  axis = this.point.y,
                  numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
                  i = numericSymbols.length;
              while (i-- && ret === '') {
                  multi = Math.pow(1000, i + 1);
                  if (axis >= multi && numericSymbols[i] !== null) {
                      ret = '<span style="color: #333;font-family: Arial !importent; text-transform:uppercase">'+this.point.name + '</span>:' + '&nbsp;' + '<span style="color:#000000; font-size:15px;font-family: "Univers 67 Condensed Bold !importent;"">$' + Highcharts.numberFormat(this.point.y / multi, 2) + numericSymbols[i] + '</span>';
                  }
              }
              // console.log(ret);
              return ret;
            }
          },
          showInLegend: false,
          slicedOffset: 40
        }
      },
      series: 
      [
        {
          type: "pie",
          name: "Supplier Spend",
          data: data,
          point: {
            events: {
                click: function (event) {
                    this.series.chart.update({
                      tooltip: {
                        enabled: tooltipEnabled,
                      }
                    });
                    tooltipEnabled = tooltipEnabled ? false : true;
                    $this.updateTableData(this.name,event.point.color);
                },
                mouseOut: function (event) {
                  $this.updateTableData(event.target.name,event.target.color);
                  $this.setTranslation(this, false);
                },
                mouseOver: function(event) {
                  // console.log(event.target.name, event.target.color);
                  $this.updateTableData(event.target.name,event.target.color);
                  $this.setTranslation(this, true);
                }
            }
        }
        }
      ]
    }
    this.treechart = new Chart(this.treeoptions);
  }

  contractChart(data) {
    var $this = this;
    var tooltipEnabled;
    this.contracttreechartoptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: '#f7f7ef',
        options3d: {
          enabled: true,
          alpha: 55,
          beta: 0
        }
      },
      legend:{
        labels : {
          fontSize:30
        },
      },
      credits: {
        enabled: false
      },
      title: {
        text: null
      },
      accessibility: {
        point: {
          valueSuffix: "%"
        }
      },
      tooltip: {
        formatter: function() {
          var ret = '',
              multi,
              axis = this.point.y,
              numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
              i = numericSymbols.length;
          while (i-- && ret === '') {
              multi = Math.pow(1000, i + 1);
              if (axis >= multi && numericSymbols[i] !== null) {
                  ret = this.point.name + ':' + '$' + Highcharts.numberFormat(this.point.y / multi, 2) + numericSymbols[i];
              }
          }
          console.log(ret);
          return ret;
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          depth: 55,
          size : 300,
          dataLabels: {
            enabled: true,
            // format: "{point.name}"
            useHTML: true,
            formatter: function() {
              var ret = '',
                  multi,
                  axis = this.point.y,
                  numericSymbols = ['k', 'M', 'G', 'T', 'P', 'E'],
                  i = numericSymbols.length;
              while (i-- && ret === '') {
                  multi = Math.pow(1000, i + 1);
                  if (axis >= multi && numericSymbols[i] !== null) {
                      ret = '<span style="color: #333;font-family: Arial !importent;">'+this.point.name + '</span>:' + '&nbsp;' + '<span style="color:#000000; font-size:15px; font-family: "Univers 67 Condensed Bold !importent"">$' + Highcharts.numberFormat(this.point.y / multi, 2) + numericSymbols[i] + '</span>';
                  }
              }
              return ret;
            }
          },
          showInLegend: false,
          slicedOffset: 40
        }
      },
      series: 
      [
        {
          type: "pie",
          name: "Contract Value",
          data: data,
          point: {
            events: {
                click: function (event) {
                    this.series.chart.update({
                      tooltip: {
                        enabled: tooltipEnabled,
                      }
                    });
                    tooltipEnabled = tooltipEnabled ? false : true;
                    $this.updateTableData(this.name,event.point.color);
                },
                mouseOut: function (event) {
                  $this.updateTableData(event.target.name,event.target.color);
                  $this.setTranslation(this, false);
                },
                mouseOver: function(event) {
                  // console.log(event.target.name, event.target.color);
                  $this.updateTableData(event.target.name,event.target.color);
                  $this.setTranslation(this, true);
                }
            }
        }
        }
      ]
    }
    this.contracttreechart = new Chart(this.contracttreechartoptions);
  }


  /////////////

  init() {
      this.spendSuppliersinit();
      this.spendCategoryinit();
      this.spendDeptinit();
      this.supplierSavinginit();
      this.contractValueDatainit();
  }

///////
  spendSuppliersEvent(type, key) {
       this.supplierSpendType = type;
       this.categorySpendType = type;
       this.deptSpendType = type;
       this.title = 'TOP 10 SUPPLIERS BY SPEND';
       this.tablecolumn = key;
       this.ratingtype = key;
       this.category = 'Supplier Name';
       this.spendSuppliers();
       this.spendCategory();
       this.spendDept();
  }

  spendSuppliers() {
    
    this.caterpillar.getSupplierSpend(this.supplierSpendType).subscribe(data => {
      console.log(data);
      this.suppliersSpend = data['data'];
      this.tabledata = data['data'];
      this.loadSupplierSpendChart();
    });
  }

  spendSuppliersinit() {
    
    this.caterpillar.getSupplierSpend(this.supplierSpendType).subscribe(data => {
      // console.log(data);
      this.suppliersSpend = data['data'];
      this.tabledata = this.suppliersSpend;
      this.loadSupplierSpendChart();
    });
  }

  ///////
  spendCategoryEvent(type, key) {
      this.categorySpendType = type;
      this.title = 'SPEND BY CATEGORY';
      this.tablecolumn = key;
      this.ratingtype = key;
      this.category = 'Category Name';
      this.spendCategory();
  }

  spendCategory() {
    this.caterpillar.getCategorySpend(this.categorySpendType).subscribe(data => {
      // console.log(data);
      this.categorySpend = data['data'];
      this.tabledata = data['data'];
      this.loadSpendByCategoryChart(data['data']);
    });
  }

  spendCategoryinit() {
    this.caterpillar.getCategorySpend(this.categorySpendType).subscribe(data => {
      // console.log(data);
      this.categorySpend = data['data'];
      // this.tabledata = data['data'];
      this.loadSpendByCategoryChart(data['data']);
    });
  }

  //////

  spendDeptEvent(type, key) {
    this.deptSpendType = type;
    this.title = 'SPEND BY DEPT/BU';
    this.tablecolumn = key;
    this.ratingtype = key;
    this.category = 'Dept/Bu';
    this.spendDept();
  }

  spendDept() {
    this.caterpillar.getDeptSpend(this.deptSpendType).subscribe(data => {
      // console.log(data);
      this.deptSpend = data['data'];
      this.tabledata = data['data'];
      this.loadSpendByDeptChart();
    });
  }

  spendDeptinit() {
    this.caterpillar.getDeptSpend(this.deptSpendType).subscribe(data => {
      // console.log(data);
      this.deptSpend = data['data'];
      // this.tabledata = data['data'];
      this.loadSpendByDeptChart();
    });
  }

  /////

  supplierSavingEvent(type, key) {
      this.supplierSavingsType = type;
      this.title = 'TOP 10 SUPPLIERS BY SAVINGS';
      this.tablecolumn = key;
      if(key == 'Current') {
        this.ratingtype = 'Current'
      }else if(key == 'Annualised') {
        this.ratingtype = 'Commited';
      }
      this.category = 'Supplier Name';
      this.supplierSaving();
  }

  supplierSaving() {
    this.caterpillar.getSupplierSavings(this.supplierSavingsType).subscribe(data => {
      // console.log(data);
      this.supplierSavings = data['data'];
      var obj = this.supplierSavings;
      var result = obj.map(function(el) {
        var o = Object.assign({}, el);
          if(o['y'] < 0) {
            o['y'] = o['y'] * -1;
          }
          if(o['name'] == 'ACCENTURE LLP') {
            o.sliced = true;
          }else {
            o.sliced = false;
          }
          return o;
      });
      this.tabledata = data['data'];
      this.supsChart(result);
    });
  }

  supplierSavinginit() {
    this.caterpillar.getSupplierSavings(this.supplierSavingsType).subscribe(data => {
      this.supplierSavings = data['data'];
      var obj = this.supplierSavings;
      var result = obj.map(function(el) {
        var o = Object.assign({}, el);
          if(o['y'] < 0) {
            o['y'] = o['y'] * -1;
          }
          if(o['name'] == 'ACCENTURE LLP') {
            o.sliced = true;
          }else {
            o.sliced = false;
          }
          
          return o;
      });
      // console.log(result);
      this.supsChart(result);

    });
  }

  //////

  contractValueEvent(type, key) {
      this.contractValueType = type;
      this.title = 'TOP 10 CONTRACTS BY VALUE';
      this.tablecolumn = key;
      if(key == 'Current') {
        this.ratingtype = 'Commited';
      }else if(key == 'Annualised') {
        this.ratingtype = 'Current';
      }
      this.category = 'Contract Name';
      this.contractValueData();
  }

  contractValueData() {
    this.caterpillar.getContractValue(this.contractValueType).subscribe(data => {
      // console.log(data);
      this.contractValue = data['data'];
      this.tabledata = data['data'];
      var obj = this.contractValue;
      var result = obj.map(function(el) {
        var o = Object.assign({}, el);
          if(o['name'] == 'Costa Rica – Test Analyst') {
            o.sliced = true;
          }else {
            o.sliced = false;
          }
          
          return o;
      });
      this.contractChart(result);
    });
  }

  contractValueDatainit() {
    this.caterpillar.getContractValue(this.contractValueType).subscribe(data => {
      // console.log(data);
      this.contractValue = data['data'];
      // this.tabledata = data['data'];
      // this.contractTree(this.contractValue);
      var obj = this.contractValue;
      var result = obj.map(function(el) {
        var o = Object.assign({}, el);
          if(o['name'] == 'Costa Rica – Test Analyst') {
            o.sliced = true;
          }else {
            o.sliced = false;
          }
          
          return o;
      });
      this.contractChart(result);
    });
  }

  //////

  loadMetadata() {
    this.caterpillar.getVendorsandContracts().subscribe(data => {
      // console.log(data);
      this.metadata.vendors = data['vendors'];
      this.metadata.contracts = data['contracts']
    });
  }

  digitalSavings() {
    this.caterpillar.getDigitalSavings().subscribe(data => {
      // console.log(data);
      // var goal = data['goal'];
      this.monthrecords = data['monthrecords'];
      this.quaterrecords = data['quater'];
      this.yearlyrecords = data['yearly'];
      this.weeklyrecords = data['weekly']
      this.loadDigitalChart(this.monthrecords);
    });
  }

  ratingComponentClick(clickObj: any): void {
    // console.log(clickObj);
    const item = this.tabledata.find(((i: any) => i.name === clickObj.name));
    // console.log(item);
    if (!!item) {
      item.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = item.name;
      if(this.title == 'TOP 10 SUPPLIERS BY SPEND') {
            this.postSSRating();
      }else if(this.title == 'SPEND BY CATEGORY') {
            this.postSCRating();
      }else if(this.title == 'SPEND BY DEPT/BU') {
            this.postSDRating();
      }else if(this.title == 'TOP 10 SUPPLIERS BY SAVINGS') {

      }else if(this.title == 'TOP 10 CONTRACTS BY VALUE') {
            this.postCVRating();
      }
    }

  }

  postSSRating() {
    let body = {
      name: this.itemIdRatingClicked,
      rating: this.ratingClicked,
      type: this.supplierSpendType
    }
    this.caterpillar.postSSRating(body).subscribe(data => {
      console.log(data);
    });
    // this.postSScomment();
  }
  postSScomment() {
    let body = {
      name: this.itemName,
      comment: this.commentWrote,
      type: this.supplierSpendType
    }
    this.caterpillar.postSScomment(body).subscribe(data => {
      console.log(data);
    });
  }

  postSCRating() {
    let body = {
      name: this.itemIdRatingClicked,
      rating: this.ratingClicked,
      type: this.categorySpendType
    }
    this.caterpillar.postSCRating(body).subscribe(data => {
      console.log(data);
    });
  }

  postSCcomment() {
    let body = {
      name: this.itemName,
      comment: this.commentWrote,
      type: this.supplierSpendType
    }
    this.caterpillar.postSCcomment(body).subscribe(data => {
      console.log(data);
    });
  }

  postSDRating() {
    let body = {
      name: this.itemIdRatingClicked,
      rating: this.ratingClicked,
      type: this.deptSpendType
    }
    this.caterpillar.postSDRating(body).subscribe(data => {
      console.log(data);
    });
  }

  postSDcomment() {
    let body = {
      name: this.itemName,
      comment: this.commentWrote,
      type: this.supplierSpendType
    }
    this.caterpillar.postSDcomment(body).subscribe(data => {
      console.log(data);
    });
  }

  postCVRating() {
    let body = {
      name: this.itemIdRatingClicked,
      rating: this.ratingClicked,
      type: this.contractValueType
    }
    this.caterpillar.postCVRating(body).subscribe(data => {
      console.log(data);
    });
  }

  postCVcomment() {
    let body = {
      name: this.itemName,
      comment: this.commentWrote,
      type: this.supplierSpendType
    }
    this.caterpillar.postCVcomment(body).subscribe(data => {
      console.log(data);
    });
  }
  
  overview(type, key, item) {
    this.selectedOverview = item;
    this.supplierSpendType = type;
       this.categorySpendType = type;
       this.deptSpendType = type;
      //  this.title = 'TOP 10 SUPPLIERS BY SPEND';
       this.tablecolumn = key;
       this.ratingtype = key;
      //  this.category = 'Supplier Name';
      //  this.spendSuppliers();
      //  this.spendCategory();
      //  this.spendDept();
      console.log(this.overviewtabs);

      if(this.overviewtabs == 1) {
        this.spendSuppliers();
      }else if(this.overviewtabs == 2) {
        this.spendCategory();
      }else if(this.overviewtabs == 3) {
        this.spendDept();
      }
  }

  showVendors(type, key, item) {
    this.selectedVendor = item;
  }

  showSS(type, key, item) {
    this.selectedSS = item;
    this.supplierSavingsType = type;
      this.title = 'TOP 10 SUPPLIERS BY SAVINGS';
      this.tablecolumn = key;
      if(key == 'Current') {
        this.ratingtype = 'Current'
      }else if(key == 'Annualised') {
        this.ratingtype = 'Commited';
      }
      this.category = 'Supplier Name';
      this.supplierSaving();
  }
  showCV(type, key, item) {
    this.selectedCV = item;
    this.contractValueType = type;
      this.title = 'TOP 10 CONTRACTS BY VALUE';
      this.tablecolumn = key;
      if(key == 'Current') {
        this.ratingtype = 'Commited';
      }else if(key == 'Annualised') {
        this.ratingtype = 'Current';
      }
      this.category = 'Contract Name';
      this.contractValueData();
  }

  showContracts(type, key, item) {
    this.selectedContract = item;
  }

  digitalsavings(type, key, item) {
    this.selectedDS = item
    this.selected = item
    if(item == 1) {
      this.loadDigitalChart(this.weeklyrecords);
    }
    else if(item == 2) {
      this.digitalCategories = ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6', 'Week7'];
      // this.digitalSavings();
      this.loadDigitalChart(this.monthrecords);
    }else if(item == 3) {
      this.digitalCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      // this.digitalSavings();
      this.loadDigitalChart(this.quaterrecords);
    }else if(item == 4) {
      this.digitalCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      // this.digitalSavings();
      this.loadDigitalChart(this.yearlyrecords);
    }
  }

  isActive(item:any) {
    return this.selected === item;
  };

  isActiveOverview(item:any) {
    return this.selectedOverview === item;
  };
  isActiveVendor(item:any) {
    return this.selectedVendor === item;
  };
  isActiveContract(item:any) {
    return this.selectedContract === item;
  };
  isActiveSS(item:any) {
    return this.selectedSS === item;
  };
  isActiveCV(item:any) {
    return this.selectedCV === item;
  };
  isActiveDS(item:any) {
    return this.selectedDS === item;
  };

  suppTable() {
    this.tabledata = this.suppliersSpend;
    this.title = 'TOP 10 SUPPLIERS BY SPEND';
    this.category = 'Supplier Name';
  }
  catTable() {
    this.tabledata = this.categorySpend;
    this.title = 'SPEND BY CATEGORY';
    this.category = 'Category Name';
  }
  deptTable() {
    this.tabledata = this.deptSpend;
    this.title = 'SPEND BY DEPT/BU';
    this.category = 'Dept/BU';
  }

  redirect(item) {
      if(this.title == 'TOP 10 SUPPLIERS BY SPEND') {
            console.log('2')
        this.numberGenerated.emit({num: 2, eventtype: item});
      }else if(this.title == 'SPEND BY CATEGORY') {
        this.numberGenerated.emit({num: 3, eventtype: item});
        console.log('3')
      }else if(this.title == 'SPEND BY DEPT/BU') {
        this.numberGenerated.emit({num: 4, eventtype: item});
        console.log('4')
      }else if(this.title == 'VMO') {
        this.numberGenerated.emit({num: 5, eventtype: item});
        console.log('5')
      }
  }

  ////sorting---
  direction: number;
  isDesc: boolean = false;
  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  convertToCSV(objArray) {
    // var objArray = this.tabledata;
    console.log(objArray);
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var keys = [];
    // for(var k in objArray[0]) keys.push(k);
    keys.push(this.category, 'CommitedCurrentYear', 'CommitedPreviousYear','Contracts', 'Rating', 'Comment');
     for (var i = 0; i < keys.length; i++)
     {
         if(i==keys.length-1){str=str+keys[i]+'\r\n'}
             else {str=str+keys[i]+','}
         }
     for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
               if(array[i][index].toString().includes(",") && typeof array[i][index] === 'string'){array[i][index]="\""+array[i][index]+"\""}
                   line += array[i][index];
           }
           str += line + '\r\n';
       }
       console.log(str);
       return str;
    // var headers = Object.keys(this.tabledata[0]);
    // this.exportCSVFile(headers, str, 'test');
}

exportCSVFile() {
    // if (headers) {
    //     items.unshift(headers);
    // }

    // Convert Object to JSON
    // var jsonObject = JSON.stringify(items);
    var arr = [];
    arr = this.tabledata;
    arr = arr.map(element => {
      delete element.color;
      delete element.tablecolor;
      return element;
    });
    console.log(arr);
    var fileTitle = 'test';
    var csv = this.convertToCSV(arr);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

overviewTabs(item) {
  return this.overviewtabs === item;
}

  showsupplier(item) {
    this.overviewtabs = item;
    this.suppliershow = true;
    this.categoryshow = false;
    this.deptbushow = false;
    this.tabledata = this.suppliersSpend;
    this.title = 'TOP 10 SUPPLIERS BY SPEND';
    this.category = 'Supplier Name';
    // this.spendSuppliers();
  }
  showcategory(item) {
    this.overviewtabs = item;
    this.suppliershow = false;
    this.categoryshow = true;
    this.deptbushow = false;
    this.tabledata = this.categorySpend;
    this.title = 'SPEND BY CATEGORY';
    this.category = 'Category Name';
    // this.spendCategory();
  }
  showdeptbu(item) {
    this.overviewtabs = item;
    this.suppliershow = false;
    this.categoryshow = false;
    this.deptbushow = true;
    this.tabledata = this.deptSpend;
    this.title = 'SPEND BY DEPT/BU';
    this.category = 'Dept/BU';
    // this.spendDept();
  }

  seeAllInfo() {
     var body;
     if(this.title == 'TOP 10 SUPPLIERS BY SPEND') {
       body = {
         type: 'SupplierName',
         commitedamounttype: 'CommittedAmount_2019',
         currentamounttype: 'CurrentAmount_2019'
       }
     }else if(this.title == 'SPEND BY CATEGORY') {
      body = {
        type: 'Category',
        commitedamounttype: 'CommittedAmount_2019',
        currentamounttype: 'CurrentAmount_2019'
      }
     }else if(this.title == 'SPEND BY DEPT/BU') {
      body = {
        type: 'DeptBU',
        commitedamounttype: 'CommittedAmount_2019',
        currentamounttype: 'CurrentAmount_2019'
      }
     }

     this.caterpillar.getallinfo(body).subscribe(data => {
      console.log(data);
      this.tabledata = data;
    })
    
  }

  sscv(item) {
    return this.ssCV === item
  }

  changesscv(item) {
      this.ssCV = item;
      if(item == 1) {
        this.show10SS = true;
        this.show10CV = false;
      }else if(item == 2) {
        this.show10CV = true;
        this.show10SS = false;
      }
  }

  getCommentandSend(event) {
       console.log(event);
       const item = this.tabledata.find(((i: any) => i.name === event['obj']['name']));
    // console.log(item);
    if (!!item) {
      console.log(item);
      this.itemName = item.name;
      this.commentWrote = item.comment;
      if(this.title == 'TOP 10 SUPPLIERS BY SPEND') {
            this.postSScomment();
      }else if(this.title == 'SPEND BY CATEGORY') {
            this.postSCcomment();
      }else if(this.title == 'SPEND BY DEPT/BU') {
            this.postSDcomment();
      }else if(this.title == 'TOP 10 SUPPLIERS BY SAVINGS') {

      }else if(this.title == 'TOP 10 CONTRACTS BY VALUE') {
            this.postCVcomment();
      }
    }
  }
  

}