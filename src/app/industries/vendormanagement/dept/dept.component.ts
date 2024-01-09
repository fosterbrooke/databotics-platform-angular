import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { CaterpillarService } from 'src/app/core/caterpillar.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css']
})
export class DeptComponent implements OnInit {
  asgChart : any;
  asgChartOptions : any;
  selected = 1;
  selected1 = 3;
  selected2 = 5;
  scChartOptions : any;
  scChart : any;
  CURRENT : any;
  ANNUALIZED : any;
  COMMITED : any;
  SPEND : any;
  tabledata: any;
  @Input() deptParam: any;
  newData: any = [
    {
      name: "Stanbrige",
      y: 12.8,
      annualised: 2.1,
      current: 1.3,
      crs: '23',

    },
    {
      name: "Wong",
      y: 12.8,
      annualised: 2.9,
      current: 1.32,
      crs: '23',
    },
    {
      name: "Peter",
      y: 12.8,
      annualised: 2.1,
      current: 0.9,
      crs: '23',
    },
    {
      name: "Tamzyn",
      y: 12.8,
      annualised: 2.0,
      current: 1.3,
      crs: '23',
    },
    // {
    //   name: "Verona",
    //   y: 22.8,
    //   annualised: 2.9,
    //   current: 1.3,
    //   crs: '23',
    // },
    // {
    //   name: "Daly",
    //   y: 12.8,
    //   annualised: 2.0,
    //   current: 1.2,
    //   crs: '23',
    // },
    // {
    //   name: "Stanbrige",
    //   y: 12.8,
    //   annualised: 2.4,
    //   current: 1.8,
    //   crs: '13',
    // },
    // {
    //   name: "Verona sheren",
    //   y: 22.8,
    //   annualised: 2.5,
    //   current: 1.3,
    //   crs: '2',
    // },
    // {
    //   name: "Daly Racheal",
    //   y: 12.8,
    //   annualised: 1.1,
    //   current: 1.0,
    //   crs: '10',
    // },
    // {
    //   name: "Stanley",
    //   y: 12.8,
    //   annualised: 2.8,
    //   current: 1.1,
    //   crs: '8',
    // },
    // {
    //   name: "Others",
    //   y: 14.8,
    //   annualised: 2.8,
    //   current: 1.1,
    //   crs: '8',
    // }
  ];
  filters: any = [];
  deptbu: string;
  metadata: any;
  spend: any;
  savings: any;
  suppliers: any;
  contracts: any;
  chartdata: any = [];
  name: any;
  value: any;
  metaTable: any = [];
  column: any;

  constructor(private caterpillar: CaterpillarService) { }

  ngOnInit() {
    
    // this.loadSpendByCategoryChart(this.newData);
    this.ANNUALIZED = 35000000;
      this.CURRENT = 46000000;
      this.COMMITED = 86000000;
      this.SPEND = 92000000;
      this.deptbu = this.deptParam;
      
      this.loadfilters();
  }

  loadfilters() {
    this.caterpillar.getdeptbufilters().subscribe(data => {
         this.filters = data;
         if(this.deptParam) {
          this.deptbu = this.deptParam;
          this.initDept(this.deptbu);
        }else {
          this.deptbu = this.filters[0];
          this.initDept(this.deptbu);
        }
    });
    
  }

  initDept(dept) {
    this.caterpillar.getbyDeptbu(dept).subscribe(data => {
      // console.log(data);
      this.metadata = data['metadata'][0];
      this.suppliers = this.metadata['totalSuppliers'];
      this.contracts = this.metadata['contracts'];
      this.chartdata = data['chartdata'];
      this.tabledata = data['tabledata'];
      this.metaTable = data['tabledata'];
      if(this.metadata['annualisedSavings'] < 0) {
        this.savings = this.metadata['annualisedSavings'] * -1;
      }else {
        this.savings = this.metadata['annualisedSavings'];
      }
      var obj = this.chartdata;
      this.name = obj[0].name;
      this.value = obj[0].y
      var result = obj.map(function(el) {
        var o = Object.assign({}, el);
          if(o['name'] == obj[0].name) {
            o.sliced = true;
          }else {
            o.sliced = false;
          }
          return o;
      });
      this.showmetadata();
      this.loadSpendByCategoryChart(result);
    });
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

  loadSpendByCategoryChart(chartdata) {
    var chartData = chartdata;
    var tooltipEnabled = true;
    var $this = this;
    this.scChartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor : '#f5f5f5',
        // height : 470,
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
      legends: {
        enabled: true,
        align: 'center',
        layout: 'horizontal',

      },
      tooltip: {
        enabled: true,
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
          return ret;
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          depth: 55,
          size: 300,
          dataLabels: {
            enabled: true,
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
                      ret = '<span style="color: #333">'+this.point.name + '</span>:' + '&nbsp;' + '<span style="color:#000000; font-size:15px">$' + Highcharts.numberFormat(this.point.y / multi, 2) + numericSymbols[i] + '</span>';
                  }
              }
              return ret;
            }
          },
          showInLegend: false,
          slicedOffset: 40
        }
      },
      series: [
        {
          type: "pie",
          name: "Browser share",
          data: chartData,
          point: {
            events: {
                click: function (event) {
                    // this.series.chart.update({
                    //   tooltip: {
                    //     enabled: tooltipEnabled,
                    //   }
                    // });
                    tooltipEnabled = tooltipEnabled ? false : true;
                    $this.updateTableData(this.name,event.point.color);
                },
                mouseOver: function(event) {
                              //  console.log(event.target.name, event.target.color);
                               $this.name = event.target.name;
                               $this.value = event.target.y;
                               $this.updateTableData(event.target.name,event.target.color);
                               $this.setTranslation(this, true);
                             },
                             mouseOut: function (event) {
                               $this.updateTableData(event.target.name,event.target.color);
                               $this.setTranslation(this, false);
                             },
                             
            }
        }
        }
      ]
    }
    this.scChart = new Chart(this.scChartOptions);
  }
  updateTableData(name,colorforrow) {
    // console.log(name);
    // console.log(colorforrow);
    for(var i=0;i<this.tabledata.length;i++){
      if(this.tabledata[i].name == name){
        this.tabledata[i].color = colorforrow;
      }else{
        // this.tabledata[i].color = "#fff";
        if(i % 2 == 0) {
          this.tabledata[i].color = "#fff";
         }else {
          this.tabledata[i].color = "#CCC";
         }
      }
    }
  }
  // charts(){
  //   this.asgChartOptions = {
  //     chart: {
  //       plotBackgroundColor: null,
  //       plotBorderWidth: null,
  //       plotShadow: false,
  //       type: 'pie',
  //       backgroundColor : null,
  //       height : 245
  //     },
  //     tooltip: {
  //       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  //     },
  //     title: {
  //       text: null
  //     },
  //     plotOptions: {
  //       pie: {
  //         allowPointSelect: true,
  //         cursor: 'pointer',
  //         dataLabels: {
  //           enabled: false
  //         },
  //         showInLegend: true,
  //         innerSize:50
  //       }
  //     },
  //     credits: {
  //       enabled: false
  //     },
  //     series: [{
  //       name: 'Brands',
  //       colorByPoint: true,
  //       data: [
  //         ['Architect', 10],
  //            ['Database Analyst', 5],
  //            ['Business Analyst', 7],
  //            ['category',8]
  //       ],
  //       type: undefined
  //     }]
  //   },
  //   this.asgChart = new Chart(this.asgChartOptions);
  //  }

  showmetadata() {
    if(this.metadata['commitedSpend'] < 0) {
      this.spend = this.metadata['commitedSpend'] * -1;
    }else {
      this.spend = this.metadata['commitedSpend'];
    }
  }


   showDashboard(item, total) {
    this.selected = total;
    if(item == 'COMMITED'){
      // this.COMMITED = '$8.67M';
      if(this.metadata['commitedSpend'] < 0) {
        this.spend = this.metadata['commitedSpend'] * -1;
      }else {
        this.spend = this.metadata['commitedSpend'];
      }
      this.SPEND = 97000000;
    }else if(item == 'SPEND'){
      this.SPEND = 84000000
      // this.COMMITED = '$7.5M';
      if(this.metadata['currentSpend'] < 0) {
        this.spend = this.metadata['currentSpend'] * -1
      }else {
        this.spend = this.metadata['currentSpend'];
      }
      
    }
   }
   showDashboard1(item,selected) {
    this.selected1 = selected;
    if(item == 'CURRENT'){
      this.CURRENT = 75000000;
      if(this.metadata['annualisedSavings'] < 0) {
        this.savings = this.metadata['annualisedSavings'] * -1;
      }else {
        this.savings = this.metadata['annualisedSavings'];
      }
      // this.ANNUALIZED = '$4.5M';
    }else if(item == 'ANNUALIZED'){
      // this.ANNUALIZED = '$3.5M';
      this.CURRENT = 45000000;
      if(this.metadata['currentSavings'] < 0) {
        this.savings = this.metadata['currentSavings'] * -1
      }else {
        this.savings = this.metadata['currentSavings'];
      }
      
    }
   }
   showDashboard2(item) {
    this.selected2 = item;
    if(item == 5) {
         this.tabledata = [];
         for(let item of this.metaTable) {
           this.tabledata.push({name: item['name'], y: item['y']})
         }
    }else if(item == 6) {
      this.tabledata = [];
      for(let item of this.metaTable) {
        this.tabledata.push({name: item['name'], y: (item['y'] * (25 / 100))})
      }
    }else if(item == 7) {
      this.tabledata = [];
      for(let item of this.metaTable) {
        this.tabledata.push({name: item['name'], y: (item['y'] * (50 / 100))})
      }
    }
   }
   
   isActive(item:any) {
    return this.selected === item;
  };
  isActive1(item:any) {
    return this.selected1 === item;
  };
  isActive2(item:any) {
    return this.selected2 === item;
  };


  changeDept(event) {
    this.selected = 1;
    this.selected1 = 3;
    this.selected2 = 5
    this.deptbu = event.target.value;
    this.caterpillar.getbyDeptbu(this.deptbu).subscribe(data => {
      console.log(data);
      this.metadata = data['metadata'][0];
      this.spend = this.metadata['commitedSpend'];
      this.savings = this.metadata['annualisedSavings'];
      this.suppliers = this.metadata['totalSuppliers'];
      this.contracts = this.metadata['contracts'];
      this.chartdata = data['chartdata'];
      this.tabledata = data['tabledata'];
      this.metaTable = data['tabledata'];
      if(this.metadata['annualisedSavings'] < 0) {
        this.savings = this.metadata['annualisedSavings'] * -1;
      }else {
        this.savings = this.metadata['annualisedSavings'];
      }
      var obj = this.chartdata;
      this.name = obj[0].name;
      this.value = obj[0].y
      var result = obj.map(function(el) {
        var o = Object.assign({}, el);
          if(o['name'] == obj[0].name) {
            o.sliced = true;
          }else {
            o.sliced = false;
          }
          return o;
      });
      this.loadSpendByCategoryChart(result);
    });
  }

  ////sorting---
  direction: number;
  isDesc: boolean = false;
  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

}
