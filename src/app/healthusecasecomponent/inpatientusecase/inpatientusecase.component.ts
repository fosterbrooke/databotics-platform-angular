import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { DatabotService } from 'src/app/core/databot.service';
import { Chart } from 'angular-highcharts';
import _ from 'lodash';
const numeral = require('numeral');
@Component({
  selector: 'app-inpatientusecase',
  templateUrl: './inpatientusecase.component.html',
  styleUrls: ['./inpatientusecase.component.css']
})
export class InpatientusecaseComponent implements OnInit {
  selected: any;
  healthAnalysis = true;
  helthCaretableData: any = [];

  EpChart: any;
  EpChartOptions: any;
  drgChartOptions: any;
  dischargeChartOptions: any;
  drgChart: any;
  dischargeChart: any;
  statusChart: any;
  statusChartOptions: any;
  extraProcedure: any = [];
  stateArray : any = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA',
                      'KS','KY','LA','ME','MD','MA','MI','MN','MS','TX','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH',
                      'OK','OR','PA','RI','SC','SD','TN','UT','VT','VA','WA','WV','WI','WY'];
  DummyArray : any = [];
  ProviderState : any = [];
  coveredcharges : any = [];
  eploadOverview  = [];
  epchart = [];
  dischargeOverview = [];
  dynamicColumnOverview = [];
  dynamicColumn = [];
  paymantsOverview = [];
  treemapColors: any = [{
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
  },
  {
    color: "#13239d",
    backgroundColor: "#EC2500",
  },{
    color: "#e56c37",
    backgroundColor: "#EC2500",
  }];
  newData: any = [
    {
      name: "Lindseys <br> $6M",
      y: 4.8,
      color: '#e36d32'

    },
    {
      name: "Fashions Direct <br> $16M",
      y: 12.8,
      color: '#13239d'
    },
    {
      name: "Fashions Direct <br> $16M",
      y: 12.8,
      color: '#118dff'
    },
  ];
  drgColors: any = [{
    color: "#1769a3",
  },
  {
    color: "#ff6b1b",
  },
  {
    color: "#03cb44",
  },
  {
    color: "#a42cee",
  }]
  overallData: any;

  Doctors: number = 0;
  Nurses: number = 0;
  Patients: number = 0;
  Pharmacists: number = 0;
  Appointments: number = 0;
  Completed : number = 0;
  Cancelled : number = 0;
  Followup : number = 0;
  column: any;
  constructor(private databotserveice: DatabotService, private dataService: DataService) { }

  ngOnInit() {
    this.selected = 1;
    this.getFullData();
    this.getProviderListData('');
    this.getDrgPayments('');
    this.getDisPhysician('');
    this.getDisChargeCoveredCharges('');
  }
  updatecolumnData(event){
    this.loadStatusChart(this.dischargeOverview,event);
    this.loadDischarges(this.dynamicColumn,this.dynamicColumnOverview,event);
    // this.loadDrgChary(this.paymantsOverview,event);
    this.loadEpchart(this.epchart,this.eploadOverview,event);

  }
  // updateChartData(event){
  //   this.loadStatusChart(this.dischargeOverview,event);
  //   this.loadDischarges(this.dynamicColumn,this.dynamicColumnOverview,event);
  //   this.loadDrgChary(this.paymantsOverview,event);
  //   this.loadEpchart(this.epchart,this.eploadOverview,event);
  // }
  updateChartData2(event){
    this.loadStatusChart(this.dischargeOverview,event);
    this.loadDischarges(this.dynamicColumn,this.dynamicColumnOverview,event);
    // this.loadDrgChary(this.paymantsOverview,event);
    this.loadEpchart(this.epchart,this.eploadOverview,event);
  }
  getProviderListData(filter){
    this.dataService.getProviderList(filter).subscribe(data => {
    console.log("pro",data)
      this.helthCaretableData = data;
    }, err => {
      console.log(err);
    });
  }

  getDrgPayments(filter){
    this.dataService.getDrgList(filter).subscribe(data => {
    console.log("drg",data)

      this.overallData = data;
      var series = [];
      data.map((item, index) => {
        series.push({name: item.DRG_Definition, y: item.t_payments, color: this.drgColors[index].color});
      });
      this.paymantsOverview = series;
      this.loadDrgChary(series,'');
    }, err=> {
      console.log(err);
    });
  }

  getDisPhysician(filter){
    this.dataService.getPhysicianList(filter).subscribe(data => {
    console.log("phy",data)
    let xaxisCat = [];
      let values = [];
      data.map(item => {
        xaxisCat.push(item.PhysicianGroup);
        values.push(parseInt(item.t_discharges));
      });
      this.dynamicColumn = xaxisCat;
      this.dynamicColumnOverview = values;
      this.loadDischarges(xaxisCat,values,'');
    }, err => {
      console.log(err);
    });
  }

  getDisChargeCoveredCharges(filter) {
    this.dataService.getDischargeList(filter).subscribe(data => {
    console.log("dis",data)
    var series = [];
      data.map((item, index)=> {
          series.push({name: item.DischargeStatus, value: item.t_coveredcharges, color: this.treemapColors[index].color, backgroundColor: this.treemapColors[index].backgroundColor});
      });
      this.dischargeOverview = series;
      this.loadStatusChart(series,'');
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


  getFullData() {
    this.dataService.getApiData().subscribe(data => {
    console.log("full",data)

      this.DummyArray = data;
      this.ProviderState = _.uniqBy(data,'ProviderState')
      console.log("this.DummyArray",this.DummyArray)

      this.DummyArray.map(item => {
        if (item.CoveredCharges != null) {
          this.Doctors += item.CoveredCharges / 50;
        }
      })
      this.DummyArray.map(item => {
        if (item.MedicarePayments != null) {
          this.Nurses += parseInt(item.MedicarePayments)/50;
        }
      })
      this.DummyArray.map(item => {
        if (item.MedicarePayments != null) {
          this.Patients += item.MedicarePayments /50;
        }
      })
      this.DummyArray.map(item => {
        if (item.TotalDischarges != null) {
          this.Pharmacists += item.TotalDischarges /10;
        }
      })
      this.DummyArray.map(item => {
        if (item.TotalPayments != null) {
          this.Appointments += item.TotalPayments /200;
        }
      })
      this.DummyArray.map(item => {
        if (item.TotalDischarges != null) {
          this.Completed  += parseInt(item.TotalDischarges) / 50;
        }
      })
      this.DummyArray.map(item => {
        if (item.ZipCode != null) {
          this.Cancelled  += item.ZipCode / 500;
        }
      })
      this.DummyArray.map(item => {
        if (item.ZipCode != null) {
          this.Followup  += item.ZipCode / 100;
        }
      })
      this.getDischargeStatus(data);
    }, err => {
      console.log(err);
    });
  }

  selectedState(event){
    var element = event.currentTarget.value;
    console.log(element);
    var filter = `&ProviderState=${element}`;
    console.log(element);
    if (element == "ALL STATES") {
      this.getFullData();
      this.getProviderListData('');
      this.getDrgPayments('');
      this.getDisPhysician('');
      this.getDisChargeCoveredCharges('');
    }else{
      let dataArray : any = [];
      for(let obj of this.DummyArray){
        if(obj['ProviderState'] == element){
          dataArray.push(obj);
          console.log(obj['ProviderState']);
        }
      }
      var data = dataArray;
      this.getDischargeStatus(data);
      this.getProviderListData(filter);
      this.getDrgPayments(filter);
      this.getDisPhysician(filter);
      this.getDisChargeCoveredCharges(filter);
    }
  }

  getDischargeStatus(data) {
    var hash = Object.create(null);
    var result = [];

    data.forEach(function (a) {
        var key = ['DischargeStatus', 'DRG_Definition'].map(function (k) { return a[k]; }).join('|');
        if (a.TotalDischarges === undefined || a.TotalDischarges === null && a.DRG_Definition === undefined || a.DRG_Definition === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: { status : a.DischargeStatus , TotalDischarges: 0} };
            result.push(hash[key].data);
        }
        hash[key].data.TotalDischarges += a.TotalDischarges;
        hash[key].data.definition = a.DRG_Definition;
        hash[key].count++;
    });
    var xaxisvalues = [];
    result.map((item,index)=> {
      xaxisvalues.push(item.status);
    });
    xaxisvalues = _.uniq(xaxisvalues);
    this.filterDrgDef(result,xaxisvalues);
  }


  filterDrgDef(res,xaxiscat){
    var hash = Object.create(null);
    var result = [];

    res.forEach(function (a) {
        var key = ['definition'].map(function (k) { return a[k]; }).join('|');
        if (a.TotalDischarges === undefined || a.TotalDischarges === null) {
            return;
        }
        if (!hash[key]) {
            hash[key] = { count: 0, data: { name : a.DischargeStatus , data: []} };
            result.push(hash[key].data);
        }
        hash[key].data.data.push(a.TotalDischarges);
        hash[key].data.name = a.definition;
        hash[key].count++;
    });
    var series = [];
    var color = ['#118DFF','#a42cee','#ff6b1b','#1aa8a9']
    result.map((item,index)=> {
      series.push({data: result[index].data, name: result[index].name, color:color[index]});
    });
    this.epchart = xaxiscat;
    this.eploadOverview = result;
    this.loadEpchart(xaxiscat,series,'');
  }

  sidenavChanged(){

  }

  setactiveProject(item: any) {
    this.healthAnalysis = true;
    this.selected = item;
  }



  isActive(item: any) {
    return this.selected === item;
  }
  // loadExtraprocedure() {
  //   this.databotserveice.loadExtraprocedure().subscribe(data => {
  //     this.extraProcedure = data;
  //   }, err => {
  //     console.log("error", err);
  //   });
  // }

  loadEpchart(xaxis, res,name) {
    var $this = this;
    var tooltipEnabled = true;
    this.EpChartOptions = {
      chart: {
        type: 'column',
        backgroundColor: "#ffffff",
        events: {
          load: function (e) {
            console.log("e",e);
              var dataarr = e.target.series[0].data;
              var dataarr1 = e.target.series[1].data;
              var dataarr2 = e.target.series[2].data;
              var dataarr3 = e.target.series[3].data;
              console.log("dataarr",dataarr);
              dataarr.map(item => {
                if(item['category'] == name){
                  item.update({
                    color: 'yellow'
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
                    color: 'yellow'
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
                    color: 'yellow'
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
                    color: 'yellow'
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
        categories: xaxis
      },
      yAxis: {
        title: {
          text: null
        }
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
                     $this.updatecolumnData(event.point.category);
                    console.log(event.point.category);
                  },
                }
            }
        }
    },
      exporting: false,
      series: res,
        
    }
    this.EpChart = new Chart(this.EpChartOptions);
  }
  loadDrgChary(chartdata,name) {
    var chartData = chartdata;
    var tooltipEnabled = true;
    var $this = this;
    this.drgChartOptions = {
      chart: {
        type: 'pie',
        backgroundColor:'#f8f8f9',
        options3d: {
            enabled: true,
            alpha: 20,
            beta: 0
        },
        events:{
         
      }
    },
    exporting:{
      enabled: false
    },
    credits:{
      enabled : false
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
          allowPointSelect: true,
          cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            events: {
              // click: function (event) {
              //   console.log(event)
              //   $this.updateChartData(event.point.name);
              //   console.log(event.point.name);
              // },
              // mouseOut: function (event) {
              //   $this.setTranslation(this, false);
              // },
              // mouseOver: function (event) {
              //   $this.setTranslation(this, true);
              // }
            }
          }
    },
    series: [{
        type: 'pie',
        name: 'Stock Breakdown',
        data: chartdata
    }]
    }
    this.drgChart = new Chart(this.drgChartOptions);
  }

  loadDischarges(xaixs,yaxis,name) {
    var tooltipEnabled = true;
    var $this = this;
    this.dischargeChartOptions = {
      chart: {
        type: 'column',
        inverted: true,
        backgroundColor: "#f9f9f8",
        events:{
          load: function(e){
            console.log(e);
            var dataarr = e.target.series[0].data;
              console.log("dataarr",dataarr);
              dataarr.map(item => {
                if(item['name'] == name){
                  item.update({
                    color: '#000000'
                });
                }else{
                  item.update({
                    color:item.color
                  });
                }
          })
        }
      }
      },

      title: {
        text: null
      },
      exporting:null,

      xAxis: {
        categories: xaixs
      },

      yAxis: {
        title: {
          text: 'Discharges'
        }
      },

      tooltip: {
        valueSuffix: 'K'
      },

      credits: {
        enabled: false
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            format: '{y}'
          }
        },
        series: {
          point: {
              events: {
                click: function (event) {
                  console.log(event)
                   $this.updatecolumnData(event.point.category);
                  console.log(event.point.category);
                },
              }
          }
      }
      },

      legend: {
        enabled: false
      },

      series: [{
        name: 'Discharges',
        data: yaxis,
        color:'#20283d'
      }]

    }
    this.dischargeChart = new Chart(this.dischargeChartOptions);
  }
  loadStatusChart(seriesdata,name) {
    this.statusChartOptions = {
      series: [{
        type: "treemap",
        layoutAlgorithm: 'stripes',
        alternateStartingDirection: true,
        levels: [{
          level: 1,
          layoutAlgorithm: 'sliceAndDice',
          dataLabels: {
            enabled: true,
            align: 'left',
            backgroundColor: "f9f9f8",
            verticalAlign: 'top',
            style: {
              fontSize: '15px',
              fontWeight: 'bold'
            }
          }
        }],
        data: seriesdata
      }],
      exporting:null,
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      
    }
    this.statusChart = new Chart(this.statusChartOptions);
  }
  direction: number;
  isDesc: boolean = false;
  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
}
