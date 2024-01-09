import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { CaterpillarService } from 'src/app/core/caterpillar.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  asgChartOptions : any;
  asgChart : any;
  selected1 = 3;
  selected = 1;
  selected2 = 5;
  scChartOptions : any;
  scChart : any;
  CURRENT : any;
  ANNUALIZED : any;
  COMMITED : any;
  SPEND : any;
  filters: any = [];
  selectedCategory: any;
  metadata: any;
  Spend: any;
  Savings: any;
  tabledata: any = [];
  name: any;
  value: any;
  @Input() categoryParam: any;
  metaTable: any = [];
  column: any;
  constructor(private caterpillar: CaterpillarService) { }
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
    {
      name: "Verona",
      y: 22.8,
      annualised: 2.9,
      current: 1.3,
      crs: '23',
    },
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

  ngOnInit() {
    // this.loadSpendByCategoryChart(this.newData);
    this.ANNUALIZED = 35000000;
      this.CURRENT = 45000000;
      this.COMMITED = 86000000;
      this.SPEND = 97000000;
      this.selectedCategory = this.categoryParam;
      this.loadfilters();
  }

  loadfilters() {
    this.caterpillar.getcategoryfilters().subscribe(data => {
          this.filters = data['data'];
          if(this.categoryParam) {
            this.selectedCategory = this.categoryParam;
            this.initCategory(this.selectedCategory);
          }else {
            this.selectedCategory = this.filters[0];
            this.initCategory(this.selectedCategory);
          }
    });
    
  }

  initCategory(category) {
    this.caterpillar.getbyCategory(category).subscribe(data => {
      console.log(data);
      this.metadata = data['metadata'][0];
      this.tabledata = data['tabledata'];
      this.metaTable = data['tabledata'];
      var obj = data['chartdata'];
      this.name = obj[0].name;
      this.value = obj[0].y;
      var result = obj.map(function(el) {
        var o = Object.assign({}, el);
          if(o['name'] == obj[0].name) {
            o.sliced = true;
          }else {
            o.sliced = false;
          }
          return o;
      });
      this.showMetadata();
      this.loadSpendByCategoryChart(result);

    });
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
        // height : 595,
        // width:1000,
        options3d: {
          enabled: true,
          alpha: 55,
          beta: 0
        }
      },
      credits: {
        enabled: false
      },
      legends: {
        enabled:false,
        verticalAlign: 'bottom',

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
                
                mouseOut: function (event) {
                              //  $this.updateTableData(event.target.name,event.target.color);
                               $this.setTranslation(this, false);
                             },
                             mouseOver: function(event) {
                              //  console.log(event.target.name, event.target.color);
                               $this.name = event.target.name;
                               $this.value = event.target.y;
                              //  $this.updateTableData(event.target.name,event.target.color);
                               $this.setTranslation(this, true);
                             }
            }
        }
        }
      ]
    }
    this.scChart = new Chart(this.scChartOptions);
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

  updateTableData(name,colorforrow) {
    console.log(name);
    console.log(colorforrow);
    for(var i=0;i<this.newData.length;i++){
      if(this.newData[i].name == name){
        this.newData[i].color = colorforrow;
      }else{
        // this.newData[i].color = "#fff";
        if(i % 2 == 0) {
          this.newData[i].color = "#fff";
         }else {
          this.newData[i].color = "#CCC";
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
  //       height : 370
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
  //         innerSize:150
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

  showMetadata() {
    if(this.metadata['commitedSpend'] < 0) {
      this.Spend = this.metadata['commitedSpend'] * -1
    }else {
      this.Spend = this.metadata['commitedSpend'];
    }
    if(this.metadata['currentSavings'] < 0) {
      this.Savings = this.metadata['currentSavings'] * -1
    }else {
      this.Savings = this.metadata['currentSavings'];
    }
  }

   showDashboard(item,total) {
    this.selected = total;
    if(item == 'COMMITED'){
      // this.COMMITED = '$8.67M';
      // this.SPEND = '$9.7M';
      if(this.metadata['commitedSpend'] < 0) {
        this.Spend = this.metadata['commitedSpend'] * -1
      }else {
        this.Spend = this.metadata['commitedSpend'];
      }
      
    }else if(item == 'SPEND'){
      // this.SPEND = '$8.3M';
      // this.COMMITED = '$7.5M';
      if(this.metadata['currentSpend'] < 0) {
        this.Spend = this.metadata['currentSpend'] * -1
      }else {
        this.Spend = this.metadata['currentSpend'];
      }
    }
   }
   showDashboard1(item,selected) {
    this.selected1 = selected;
    if(item == 'CURRENT'){
      // this.CURRENT = '$3.5M';
      // this.ANNUALIZED = '$4.5M';
      if(this.metadata['currentSavings'] < 0 ) {
        this.Savings = this.metadata['currentSavings'] * -1;
      }else {
        this.Savings = this.metadata['currentSavings'];
      }
    }else if(item == 'ANNUALIZED'){
      // this.ANNUALIZED = '$3.5M';
      // this.CURRENT = '$4.5M';
      if(this.metadata['annualisedSavings'] < 0 ) {
        this.Savings = this.metadata['annualisedSavings'] * -1;
      }else {
        this.Savings = this.metadata['annualisedSavings'];
      }
    }
   }
  showDashboard2(item) {
    this.selected2 = item;
    if (item == 5) {
      this.tabledata = [];
      for (let item of this.metaTable) {
        this.tabledata.push({ SupplierName: item['SupplierName'], Commited: item['Commited'], Current: item['Current'],  Rating: item['Rating']})
      }
    } else if (item == 6) {
      this.tabledata = [];
      for (let item of this.metaTable) {
        this.tabledata.push({ SupplierName: item['SupplierName'], Commited: (item['Commited'] * (25 / 100)), Current: (item['Current'] * (25 / 100)),  Rating: item['Rating']})
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

  /////////////////

  changeCategory(event) {
      //  console.log(event.target.value);
      this.selected = 1;
      this.selected1 = 3;
      this.selected2 = 5;
      this.selectedCategory = event.target.value;
      this.caterpillar.getbyCategory(this.selectedCategory).subscribe(data => {
        console.log(data);
        this.metadata = data['metadata'][0];
        this.Spend = this.metadata['commitedSpend'];
        this.Savings = this.metadata['currentSpend'];
        this.tabledata = data['tabledata'];
        this.metaTable = data['tabledata'];
        var obj = data['chartdata'];
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

  ratingComponentClick(clickObj: any): void {
    // console.log(clickObj);
    const item = this.tabledata.find(((i: any) => i.SupplierName === clickObj.name));
    if (!!item) {
      var obj = {
        type:'CommittedAmount_2019',
        name:clickObj.name,
        rating: clickObj.rating
      }
      this.caterpillar.postSSRating(obj).subscribe(data => {
        console.log(data);
      });
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

}
