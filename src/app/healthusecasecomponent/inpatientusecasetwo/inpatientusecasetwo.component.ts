import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import _ from 'lodash';
import { DataService } from 'src/app/core/data.service';
const numeral = require('numeral');

@Component({
  selector: 'app-inpatientusecasetwo',
  templateUrl: './inpatientusecasetwo.component.html',
  styleUrls: ['./inpatientusecasetwo.component.css']
})
export class InpatientusecasetwoComponent implements OnInit {
  averageOptions:any;
  averagechart:any;
  barOptions:any;
  barchart:any;
  staysOptions:any;
  stayschart:any;
  staffOptions:any;
  staffchart:any;
  admission:any;
  readmission:any;
  DummyArray : any = [];
  ProviderState : any = [];
  surgical: any = [];
  medical: any = [];
  maternal: any = [];

  Patient: number = 0;
  Staff: number = 0;
  Admitted: number = 0;
  Waiting: number = 0;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.getFullData();
    this.averageChart();
    this.barChart();
    this.staysChart();
    // this.staffChart();
  }
  getFullData() {
    this.dataService.getApiData().subscribe(data => {
    console.log("full",data)

      this.DummyArray = data;
      this.ProviderState = _.uniqBy(data,'ProviderState')
      console.log("this.DummyArray",this.DummyArray)

      this.DummyArray.map(item => {
        if (item.CoveredCharges != null) {
          this.Patient += item.CoveredCharges / 50;
        }
      })
      this.DummyArray.map(item => {
        if (item.MedicarePayments != null) {
          this.Staff += parseInt(item.MedicarePayments)/5000;
        }
      })
      this.DummyArray.map(item => {
        if (item.TotalPayments != null) {
          this.Admitted += item.TotalPayments/50000;
        }
      })
      this.DummyArray.map(item => {
        if (item.TotalPayments != null) {
          this.Waiting += item.TotalPayments/100000;
        }
      })
      // this.getaveragetchart(data);
      // this.getbarchart(data);
      // this.getstaychart(data);
      this.getstaffchart(data);
    }, err => {
      console.log(err);
    });
  }
  cf(value){
    return numeral(value).format('0,0');
  }
  df(value){
    return numeral(value).format('$0,0.0');
  }
  // getaveragetchart(data){
  //   var hash = Object.create(null);
  //   var result = [];

  //   data.forEach(function (a) {
  //     var key = ['PhysicianGroup'].map(function (k) { return a[k]; }).join('|');
  //     if (a.TotalPayments === undefined || a.TotalPayments === null) {
  //       return;
  //     }
  //     if (!hash[key]) {
  //       hash[key] = { count: 0, data: { name: a.PhysicianGroup, TotalPayments: 0} };
  //       result.push(hash[key].data);
  //     }
  //     hash[key].data.TotalPayments += a.TotalDischarges/1000;
  //     hash[key].data.definition = a.PhysicianGroup;
  //     hash[key].count++;
  //   });
  //   var names = ['Total Waiting'];
  //   var color = ['#1769a3'];
  //   var Xaxis: any = [];
  //   var series: any = [];
  //   var TotalDischarges: any = [];
  //   var totalcases: any = [];
  //   result.map((item, index) => {
  //     TotalDischarges.push(result[index].TotalPayments);
  //     Xaxis.push(result[index].definition);
  //     totalcases = [TotalDischarges];
  //   });
  //   names.map((item, index) => {
  //     series.push({ name: names[index], color: color[index], data: totalcases[index] });
  //   });
  //   this.averageChart(Xaxis, series);
  // }
  // getbarchart(data){
  //   var hash = Object.create(null);
  //   var result = [];

  //   data.forEach(function (a) {
  //     var key = ['PhysicianGroup'].map(function (k) { return a[k]; }).join('|');
  //     if (a.TotalPayments === undefined || a.TotalPayments === null) {
  //       return;
  //     }
  //     if (!hash[key]) {
  //       hash[key] = { count: 0, data: { name: a.PhysicianGroup, TotalPayments: 0} };
  //       result.push(hash[key].data);
  //     }
  //     hash[key].data.TotalPayments += a.TotalPayments;
  //     hash[key].data.definition = a.PhysicianGroup;
  //     hash[key].count++;
  //   });
  //   var names = ['Age'];
  //   var color = ['#1769a3'];
  //   var Xaxis: any = [];
  //   var series: any = [];
  //   var TotalPayments: any = [];
  //   var totalcases: any = [];
  //   result.map((item, index) => {
  //     TotalPayments.push(result[index].TotalPayments);
  //     Xaxis.push(result[index].definition);
  //     totalcases = [TotalPayments];
  //   });
  //   names.map((item, index) => {
  //     series.push({ name: names[index], color: color[index], data: totalcases[index] });
  //   });
  //   this.barChart(Xaxis, series);
  // }
  // getstaychart(data) {
  //   var hash = Object.create(null);
  //   var result = [];

  //   data.forEach(function (a) {
  //     var key = ['PhysicianGroup'].map(function (k) { return a[k]; }).join('|');
  //     if (a.PhysicianGroup === undefined || a.CoveredCharges === null && a.MedicarePayments === undefined || a.CoveredCharges === null ) {
  //       return;
  //     }
  //     if (!hash[key]) {
  //       hash[key] = { count: 0, data: { name: a.PhysicianGroup, a: 0, b: 0, c: 0, d: 0, e:0} };
  //       result.push(hash[key].data);
  //     }
  //     hash[key].data.a += a.CoveredCharges;
  //     hash[key].data.b += a.MedicarePayments;
  //     hash[key].data.c += a.TotalDischarges;
  //     hash[key].data.d += a.TotalPayments;
  //     hash[key].data.e += a.CoveredCharges/30;
  //     hash[key].data.definition = a.PhysicianGroup;
  //     hash[key].count++;
  //   });
  //   var names= ['Medicine', 'Neurology', 'Primary care', 'Pediatrics', 'Adv Practice', 'Psychiatry','Surgory', 'Cardeology']
  //   var color = ['#1769a3', '#ff6b1b', '#03cb44', '#a42cee','#2da2bf', '#da1f28', '#eb641b', '#39639d'];
  //   var Xaxis: any = [];
  //   var series: any = [];
  //   var max: any = [];
  //   var up: any = [];
  //   var med: any = [];
  //   var low: any = [];
  //   var min: any = [];
  //   var totalcases: any = [];
  //   result.map((item, index) => {
  //     max.push(result[index].a);
  //     up.push(result[index].b);
  //     med.push(result[index].c);
  //     low.push(result[index].d);
  //     min.push(result[index].e);
  //     Xaxis.push(result[index].definition);
  //   });
  //   console.log(result);
  //   names.map((item, index) => {
  //     series.push({ color: color[index], data: [ [max[index], up[index], med[index], low[index], min[index]] ] })
  //   });
  //   console.log(series);
  //   this.staysChart(Xaxis, series)
  // }
  getstaffchart(data){
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['PhysicianGroup'].map(function (k) { return a[k]; }).join('|');
      if (a.TotalPayments === undefined || a.TotalPayments === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.PhysicianGroup, TotalPayments: 0} };
        result.push(hash[key].data);
      }
      hash[key].data.TotalPayments += a.TotalPayments;
      hash[key].data.definition = a.PhysicianGroup;
      hash[key].count++;
    });
    var names = ['Staff'];
    var color = ['#1769a3'];
    var Xaxis: any = [];
    var series: any = [];
    var TotalPayments: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      TotalPayments.push(result[index].TotalPayments);
      Xaxis.push(result[index].definition);
      totalcases = [TotalPayments];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] });
    });
    this.staffChart(Xaxis, series);
  }
  averageChart() {
    var $this = this;
    var tooltipEnabled = true;
    this.averageOptions = {
      chart: {
        type: 'column',
        backgroundColor: '#ffffff',
        // height:300
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
    xAxis: {
        // categories:Xaxis
        categories: ['Medicine', 'Neurology', 'Primary care', 'Pediatrics', 'Adv Practice', 'Psychiatry','Surgory','Cardiology']
    },
    yAxis: {
      labels: {
        format: '{value}hr',
    },
      // categories:['0hr','1hr','2hr','3hr','4hr','5hr','6hr','7hr','8hr','9hr','10hr','11hr','12hr','13hr','14hr','15hr','16hr','17hr','18hr','19hr','20hr','21hr','22hr','23hr','24hr','25hr',
      // '26hr','27hr','28hr','29hr','30hr','31hr','32hr','33hr','34hr','35hr','36hr','37hr','38hr','39hr','40hr','41hr','42hr','43hr','44hr','45hr','46hr','47hr','48hr','49hr','50hr',
      // '51hr','52hr','53hr','54hr'],
        title: {
            text:null
        }
    },
    plotOptions: {
      column: {
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
      enabled: false
    },
    tooltip: {
        shared: true,
        pointFormat: '{point.y:.1f}'
    },
    series:
     [{
        name: 'age',
        // color:'#1769a3',
        data:[2,4,3,4.5,1.5,4,3,2.5],
      //   dataLabels: {
      //     enabled: true,
      // }

    }]
    }
    this.averagechart = new Chart(this.averageOptions);
  }
  barChart() {
    var $this = this;
    var tooltipEnabled = true;
    this.barOptions = {
      chart: {
        type: 'bar',
        backgroundColor: '#ffffff',
        // height:350
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
    xAxis: {
        // categories: Xaxis
        categories: ['Medicine', 'Neurology', 'Primary care', 'Pediatrics', 'Adv Practice', 'Psychiatry','Surgory','Cardiology']
    },
    dataLabels: {
            enabled: true,
        },
    yAxis: {
        title: {
            text:null
        }
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
      enabled: false
    },
    tooltip: {
        shared: true,
        pointFormat: '{point.y:.1f}'
    },
    series:[{
      name: 'age',
      // color:'#1769a3',
      data:[2,4,3,4.5,1.5,4,3,2.5],
    //   dataLabels: {
    //     enabled: true,
    // }

  }]
    }
    this.barchart = new Chart(this.barOptions);
  }
  staysChart() {
    var $this = this;
    var tooltipEnabled = true;
    this.staysOptions = {
      chart: {
        type: 'boxplot',
        backgroundColor: '#ffffff',
        // height:300
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
    legend: {
        enabled: false
    },
    xAxis: {
        // categories: Xaxis
        categories: ['Medicine', 'Neurology', 'Primary care', 'Pediatrics', 'Adv Practice', 'Psychiatry','Surgory']
    },
    yAxis: {
        title: {
            text: null
        }
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
    series: 
    [{
        name: 'Stays',
        data: [
            [760, 801, 848, 895, 965],
            [733, 853, 939, 980, 1080],
            [714, 762, 817, 870, 918],
            [724, 802, 806, 871, 950],
            [834, 836, 864, 882, 910],
            [733, 853, 939, 980, 1080],
            [714, 762, 817, 870, 918],
        ]
    }]
    }
    this.stayschart = new Chart(this.staysOptions);
  }
  staffChart(Xaxis, series) {
    var $this = this;
    var tooltipEnabled = true;
    this.staffOptions = {
      chart: {
        polar: true,
        type: 'area',
        backgroundColor: '#ffffff',
        // height:300
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
    pane: {
        startAngle: 0,
        endAngle: 360
    },
    legend: {
      enabled: false
  },
  tooltip: {
    shared: true,
    pointFormat: '{point.y:.1f}'
},
    xAxis: {
      // categories:  ['Cardiology', 'Dormatology', 'Gyniology', 'Nuorology', 'Oncology', 'Orthopedic','Surgory'],
        tickInterval: 45,
        min: 0,
        max: 360,
        // labels: {
        //     format: '{value}°'
        // }
    },

    yAxis: {
        min: 0
    },

    plotOptions: {
        series: {
            pointStart: 0,
            pointInterval: 45
        }
    },
    series:series
    }
    this.staffchart = new Chart(this.staffOptions);
  }
}
