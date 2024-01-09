import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import _ from 'lodash';
import { DataService } from 'src/app/core/data.service';
const numeral = require('numeral');
@Component({
  selector: 'app-inpatientusecaseone',
  templateUrl: './inpatientusecaseone.component.html',
  styleUrls: ['./inpatientusecaseone.component.css']
})
export class InpatientusecaseoneComponent implements OnInit {
  lenghtOptions: any;
  lenghtchart: any;
  admissionOptions:any;
  admissionchart:any;
  treatmentOptions:any;
  treatmentchart:any;
  staysOptions:any;
  stayschart:any;
  hospitalOptions:any;
  hospitalchart:any;
  costpayerOptions:any;
  costpayerchart:any;
  name: any;
  value: any;
  admission:any;
  readmission:any;
  DummyArray : any = [];
  ProviderState : any = [];
  surgical: any = [];
  medical: any = [];
  maternal: any = [];
  Length: number = 0;
  Admission: number = 0;
  Average: number = 0;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.getFullData();

    // this.lengthChart();
    // this.admissionsChart();
    // this.treatmentChart();
    // this.staysChart();
    // this.hospitalChart();
    // this.costpayerChart();
  }
  getFullData() {
    this.dataService.getApiData().subscribe(data => {
    console.log("full",data)

      this.DummyArray = data;
      this.ProviderState = _.uniqBy(data,'ProviderState')
      console.log("this.DummyArray",this.DummyArray)

      this.DummyArray.map(item => {
        if (item.CoveredCharges != null) {
          this.Length += item.CoveredCharges / 50;
        }
      })
      this.DummyArray.map(item => {
        if (item.MedicarePayments != null) {
          this.Admission += parseInt(item.MedicarePayments);
        }
      })
      this.DummyArray.map(item => {
        if (item.TotalPayments != null) {
          this.Average += item.TotalPayments;
        }
      })
      this.getlengthchart(data);
      this.getadmissionchart(data);
      this.gettreatmentchart(data);
      this.getstaychart(data);
      this.getcostpayerchart(data);
      this.gethospitalchart(data);
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
  getlengthchart(data){
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['PhysicianGroup'].map(function (k) { return a[k]; }).join('|');
      if (a.MedicarePayments === undefined || a.MedicarePayments === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.PhysicianGroup, x: 0, y: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.x += a.MedicarePayments;
      hash[key].data.y += a.TotalDischarges*50;
      hash[key].data.definition = a.PhysicianGroup;
      hash[key].count++;
    });
    var names = ['MedicarePayments', 'TotalDischarges'];
    var color = ['#1769a3', '#ff6b1b'];
    var Xaxis: any = [];
    var series: any = [];
    var MedicarePayments: any = [];
    var TotalDischarges: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      MedicarePayments.push(result[index].x);
      TotalDischarges.push(result[index].y);
      Xaxis.push(result[index].definition);
      totalcases = [MedicarePayments, TotalDischarges];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] })
    });
    console.log(series);
    this.lengthChart(Xaxis, series);
  }
  getadmissionchart(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['PhysicianGroup'].map(function (k) { return a[k]; }).join('|');
        if (a.MedicarePayments === undefined || a.MedicarePayments === null) {
            return;
        }
        if (a.TotalPayments === undefined || a.TotalPayments === null) {
          return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: { id: a.PhysicianGroup, MedicarePayments: 0, TotalPayments: 0} };
            result.push(hash[key].data);
        }
        hash[key].data.MedicarePayments += a.MedicarePayments;
        hash[key].data.TotalPayments += a.TotalPayments;
        hash[key].count++;
    });
    var names = ['Admissoions', 'Readmissions'];
    var color = ['#b90302', '#118DFF']
    var series : any = [];
    var xaxis: any = [];
    var MedicarePayments:any = [];
    var TotalPayments:any = [];
    var totalcases : any = [];
    result.map((item,index)=>{
      MedicarePayments.push(result[index].MedicarePayments);
      TotalPayments.push(result[index].TotalPayments);
      xaxis.push(result[index].PhysicianGroup);
      totalcases = [MedicarePayments];
    });
    names.map((item,index) => {
      series.push({data:MedicarePayments})
    });
    this.admission = MedicarePayments;
    this.readmission = TotalPayments;
    this.admissionsChart(xaxis,MedicarePayments,TotalPayments);
  }
  gettreatmentchart(data){
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['DischargeStatus'].map(function (k) { return a[k]; }).join('|');
      if (a.TotalPayments === undefined || a.TotalPayments === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.DischargeStatus, TotalPayments: 0} };
        result.push(hash[key].data);
      }
      hash[key].data.TotalPayments += a.TotalPayments;
      hash[key].data.definition = a.DischargeStatus;
      hash[key].count++;
    });
    var names = ['Age'];
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
    this.treatmentChart(Xaxis, series);
  }
  getstaychart(data){
    console.log(data);
    var hash = Object.create(null);
    var result = [];
    data.forEach(function (a) {
      var key = ['PhysicianGroup'].map(function (k) { return a[k]; }).join('|');
      if (a.TotalDischarges === undefined || a.TotalDischarges === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.PhysicianGroup, y: 0 } };
        result.push(hash[key].data);
      }
      hash[key].data.y += parseInt(a.TotalDischarges);
      hash[key].count++;
    });
    result.map(item => {
      item.y = parseInt(item.y.toFixed(2));
    })
    this.staysChart(result);
  }
  getcostpayerchart(data){
    var hash = Object.create(null);
    var result = [];
    data.forEach(function (a) {
      var key = ['PhysicianGroup'].map(function (k) { return a[k]; }).join('|');
      if (a.TotalPayments === undefined || a.TotalPayments === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.PhysicianGroup, b: 0, c: 0, d:0} };
        result.push(hash[key].data);
      }
      hash[key].data.b += a.TotalPayments /10;
      hash[key].data.c += a.TotalDischarges*20;
      hash[key].data.d += a.MedicarePayments /20;
      hash[key].data.definition = a.PhysicianGroup;
      hash[key].count++;
    });
    var Xaxis: any = [];
    var Yaxis: any = [];
    var series: any = [];
    var surgical: any = [];
    var medical: any = [];
    var maternal: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      surgical.push(result[index].b);
      medical.push(result[index].c);
      maternal.push(result[index].d);
      Xaxis.push(result[index].definition);
      totalcases = [surgical];
    });
    result.map((item, index) => {
      series.push({ data: surgical })
    });
    this.surgical = surgical;
    this.medical = medical;
    this.maternal = maternal;
    this.costpayerChart(Xaxis, surgical, medical, maternal );
  } 
  gethospitalchart(data){
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
      var key = ['DischargeStatus'].map(function (k) { return a[k]; }).join('|');
      if (a.TotalPayments === undefined || a.TotalPayments === null) {
        return;
      }
      if (!hash[key]) {
        hash[key] = { count: 0, data: { name: a.DischargeStatus, TotalPayments: 0, MedicarePayments:0} };
        result.push(hash[key].data);
      }
      hash[key].data.TotalPayments += a.TotalPayments;
      hash[key].data.MedicarePayments += a.MedicarePayments;
      hash[key].data.definition = a.DischargeStatus;
      hash[key].count++;
    });
    var names = ['Surgical Site Infections', 'central-Line Catheter Infections'];
    var color = ['#1769a3','#ff6b1b'];
    var Xaxis: any = [];
    var series: any = [];
    var TotalPayments: any = [];
    var MedicarePayments: any = [];
    var totalcases: any = [];
    result.map((item, index) => {
      TotalPayments.push(result[index].TotalPayments);
      MedicarePayments.push(result[index].MedicarePayments);
      Xaxis.push(result[index].definition);
      totalcases = [TotalPayments,MedicarePayments];
    });
    names.map((item, index) => {
      series.push({ name: names[index], color: color[index], data: totalcases[index] });
    });
    this.hospitalChart(Xaxis, series);
  }
  lengthChart(Xaxis, series) {
    var $this = this;
    var tooltipEnabled = true;
    this.lenghtOptions = {
      chart: {
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
    xAxis: {
        // allowDecimals: false,
        title: {
          text: 'Length Of Stay In Days'
      },
    },
    yAxis: {
        title: {
            text: null
        },
    },
    legend: {
      enabled: false
    },
    tooltip: {
        pointFormat: '{point.y:,.0f}'
    },
    plotOptions: {
        area: {
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: series
    // [{
    //     name: 'USA',
    //     color:'#1769a3',
    //     data: 
    //     [
    //         null, null, null, null, null, 6, 11, 32, 110, 235,
    //         369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
    //         20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
    //         26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
    //         24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
    //         21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
    //         10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
    //         5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
    //     ]
    // }, {
    //     name: 'USSR/Russia',
    //     color:'#ff6b1b',
    //     data: [null, null, null, null, null, null, null, null, null, null,
    //         5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
    //         1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
    //         11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
    //         30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
    //         37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
    //         21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
    //         12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
    //     ]
    // }]
    }
    this.lenghtchart = new Chart(this.lenghtOptions);
  }
  admissionsChart(xaxis,MedicarePayments,TotalPayments) {
    var $this = this;
    var tooltipEnabled = true;
    this.admissionOptions = {
      chart: {
        zoomType: 'xy',
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
    xAxis: [{
        // categories: ['Q1 2016', 'Q2 2016', 'Q3 2016', 'Q4 2016'],
        crosshair: true
    }],
    yAxis: [{
        title: {
            text:null
        }
    }, { 
        title: {
            text: null
        },
        opposite: true
    }],
    tooltip: {
        shared: true,
        pointFormat: '{point.y:.1f}'
    },
    series: [{
        name: 'Admissoions',
        type: 'column',
        yAxis: 1,
        color:'#1769a3',
        data: MedicarePayments,
        tooltip: {
            valueSuffix: 'k'
        }

    }, {
        name: 'Readmissions',
        type: 'spline',
        color:'#ff6b1b',
        data: TotalPayments,
        tooltip: {
            valueSuffix: '%'
        }
    }]
    }
    this.admissionchart = new Chart(this.admissionOptions);
  }
  treatmentChart(Xaxis, series) {
    var $this = this;
    var tooltipEnabled = true;
    this.admissionOptions = {
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
        // categories: ['0-1', '1-17', '18-44', '45-64', '65-84', '85+'],
        title: {
          text:'Age Groups'
      }
    },
    yAxis: {
        title: {
            text:null
        }
    },
    legend: {
      enabled: false
    },
    tooltip: {
        shared: true,
        pointFormat: '{point.y:.1f}'
    },
    series:series
    //  [{
    //     name: 'age',
    //     color:'#1769a3',
    //     data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0]

    // }]
    }
    this.treatmentchart = new Chart(this.admissionOptions);
  }
  staysChart(series) {
    var $this = this;
    var tooltipEnabled = true;
    this.staysOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: '#ffffff',
        options3d: {
          enabled: true,
          alpha: 25,
          beta: 0
        },
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
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'center',
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            colors: ['#1769a3', '#ff6b1b', '#03cb44', '#a42cee','#EC2500','#d74550','#118dff','#6c007a'],
            dataLabels: {
              enabled: true
          },
          showInLegend: true
        }
    },
    series: [{
        name: 'Share',
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
    this.stayschart = new Chart(this.staysOptions);
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
  costpayerChart(Xaxis, surgical, medical, maternal) {
    var $this = this;
    var tooltipEnabled = true;
    this.costpayerOptions = {
      chart: {
        type: 'bar',
        backgroundColor: '#ffffff',
        height:300
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
        categories:Xaxis
        //  ['Medicare', 'Medicaid', 'Private Insurance', 'Uninsured']
    },
    yAxis: {
        title: {
            text: null
        }
    },
    legend: {
        reversed: true
    },
    tooltip: {
      shared: true,
      pointFormat: '{point.y:.1f}'
  },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        name: 'Surgical Stays',
        color:'#1769a3',
        data:surgical
    }, {
        name: 'Medical Stays',
        color:'#ff6b1b',
        data: medical
    }, {
        name: 'Maternal & Neonatal Stays',
        color:'#03cb44',
        data:maternal
    }]
    }
    this.costpayerchart = new Chart(this.costpayerOptions);
  }
  hospitalChart(Xaxis, series) {
    var $this = this;
    var tooltipEnabled = true;
    this.hospitalOptions = {
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
        // categories: ['Q1 2016', 'Q2 2016', 'Q3 2016', 'Q4 2016']
    },
    yAxis: {
        title: {
            text:null
        }
    },
    legend: {
      enabled: true
    },
    tooltip: {
        shared: true,
        pointFormat: '{point.y:.1f}'
    },
    series: series
  //   [{
  //       name: 'Surgical Site Infections',
  //       color:'#1769a3',
  //       data: [49.9, 71.5, 106.4, 129.2]
  //   },{
  //     name: 'central-Line Catheter Infections',
  //       color:'#ff6b1b',
  //       data: [200.4, 220.1, 75.6, 64.4]
  // }]
    }
    this.hospitalchart = new Chart(this.hospitalOptions);
  }
}
