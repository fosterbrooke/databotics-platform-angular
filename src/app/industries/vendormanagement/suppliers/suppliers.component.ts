import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { CaterpillarService } from '../../../core/caterpillar.service';
import * as Highcharts from 'highcharts';
import  More from 'highcharts/highcharts-more.src';
// import  more from 'highcharts/highcharts-more.src';


// more(Highcharts);
// import exporting from 'highcharts/modules/exporting.src';

More(Highcharts);
// exporting(Highcharts);

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit, OnChanges {
  asgChart: any;
  asgChartOptions: any;
  selected = 1;
  selected1 = 3;
  selected2 = 5;
  scChartOptions: any;
  scChart: any;
  CURRENT: any;
  ANNUALIZED: any;
  COMMITED: any;
  SPEND: any;
  filters: any = [];
  supplierName: string;
  SupplierData: any;
  spendamount: any;
  savings: any;
  CVtable: any = [];
  chartdata: any = [];
  name: any;
  value: any;
  processTable: any = [];
  @Input() supplierParam: any;
  metadata: any;

  bobbleChartOptions : any;
  bobbleChart : any;
  chart : any;
  Highcharts : any;
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
    // {
    //   name: "Tamzyn",
    //   y: 12.8,
    //   annualised: 2.0,
    //   current: 1.3,
    //   crs: '23',
    // },
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

  ngOnInit() {
    // this.loadSpendByCategoryChart(this.newData);
    this.ANNUALIZED = 90000000;
    this.CURRENT = 87000000;
    this.COMMITED = 87000000;
    this.SPEND = 90000000;
    
    this.loadfilters();
    // this.charts();
    // this.boubblechart();
  }

  ngOnChanges() {
      // console.log(this.supplierParam);
      // this.supplierName = this.supplierParam;
      // this.loadfilters();
  }

  loadfilters() {
    this.caterpillar.getsupplierfilters().subscribe(data => {
      this.filters = data['data'];
      if(this.supplierParam) {
        this.supplierName = this.supplierParam;
        this.initSupplier(this.supplierName);
      }else {
        this.supplierName = this.filters[0];
        this.initSupplier(this.supplierName);
      }
    });
    
  }

  initSupplier(supplier) {
    this.caterpillar.getbysupplier(supplier).subscribe(data => {
      // console.log(data);
      this.metadata = data[0];
      this.SupplierData = data[0];
      this.spendamount = data[0]['commitedSpend'];
      
      if(data[0]['ASavings'] < 0 ) {
        this.savings = data[0]['ASavings'] * -1;
      }else {
        this.savings = data[0]['ASavings'];
      }
      this.CVtable = data[0]['cvdata'];
      this.processTable = data[0]['cvdata'];
      this.chartdata = data[0]['chartdata'];
      var obj = this.chartdata;
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
      this.loadSpendByCategoryChart(result);
    });
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
        backgroundColor: null,
        //  height : 480,
        options3d: {
          enabled: true,
          alpha: 55,
          beta: 0
        }
      },
      credits: {
        enabled: false
      },
      // exporting: {
      //   enabled: true
      // },
      legends: {
        enabled: true,
        verticalAlign: 'top',

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
          // console.log(ret);
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
                $this.updateTableData(this.name, event.point.color);
              },
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
    this.scChart = new Chart(this.scChartOptions);
  }
  updateTableData(name, colorforrow) {
    // console.log(name);
    // console.log(colorforrow);
    for (var i = 0; i < this.CVtable.length; i++) {
      if (this.CVtable[i].ContractName == name) {
        this.CVtable[i].color = colorforrow;
      } else {
        // this.CVtable[i].color = "#fff";
        if(i % 2 == 0) {
          this.CVtable[i].color = "#fff";
         }else {
          this.CVtable[i].color = "#CCC";
         }
      }
    }
  }
  
  showDashboard(item, total) {
    this.selected = total;
    if (item == 'COMMITED') {
      if(this.SupplierData['commitedSpend'] < 0 ) {
        this.spendamount = this.SupplierData['commitedSpend'] * -1;
      }else {
        this.spendamount = this.SupplierData['commitedSpend'];
      }
      
      this.COMMITED = 87000000;
      this.SPEND = 97000000;
    } else if (item == 'SPEND') {
      if(this.SupplierData['currentSpend'] < 0 ) {
        this.spendamount = this.SupplierData['currentSpend'] * -1;
      }else {
        this.spendamount = this.SupplierData['currentSpend'];
      }
      this.SPEND = 83000000;
      this.COMMITED = 75000000;
    }
  }

  showDashboard1(item, selected) {
    this.selected1 = selected;
    // this.ANNUALIZED = true;

    if (item == 'CURRENT') {
      if(this.SupplierData['CSavings'] < 0 ) {
        this.savings = this.SupplierData['CSavings'] * -1;
      }else {
        this.savings = this.SupplierData['CSavings'];
      }

      // this.CURRENT = 9700000;
      // this.ANNUALIZED = 8700000;
    } else if (item == 'ANNUALIZED') {
      if(this.SupplierData['ASavings'] < 0 ) {
        this.savings = this.SupplierData['ASavings'] * -1;
      }else {
        this.savings = this.SupplierData['ASavings'];
      }
      // this.ANNUALIZED = 9200000;
      // this.CURRENT = 8700000;
    }


  }
  showDashboard2(item) {
    this.selected2 = item;
    if (item == 5) {
      this.CVtable = [];
      for(let item of this.metadata['cvdata']) {
        this.CVtable.push({ContractName: item['ContractName'], commited: item['commited'], current: item['current'], commitedrating: item['commitedrating']});
      }
    } else if (item == 6) {
      this.CVtable = [];
      for (let item of this.metadata['cvdata']) {
        // item['commited'] = (item['commited'] * (25 / 100));
        this.CVtable.push({ContractName: item['ContractName'], commited: (item['commited'] * (25 / 100)), current: (item['current'] * (25 / 100)), commitedrating: item['commitedrating']})
      }
    }else if (item == 7) {
      this.CVtable = [];
      for (let item of this.metadata['cvdata']) {
        // item['commited'] = (item['commited'] * (25 / 100));
        this.CVtable.push({ContractName: item['ContractName'], commited: (item['commited'] * (50 / 100)), current: (item['current'] * (50 / 100)), commitedrating: item['commitedrating']})
      }
    }
  }

  isActive(item: any) {
    return this.selected === item;
  };
  isActive1(item: any) {
    return this.selected1 == item
    // if(this.selected1 == item){
    //  return  true;
    // }else if (this.selected1 == item){
    //  return  true;
    // }
    //  return this.selected1 === item;  
  };
  isActive2(item: any) {
    return this.selected2 === item;
  };

  changeSupplier(event) {
    // console.log(event.target.value);
    this.selected = 1;
    this.selected1 = 3;
    var supplier = event.target.value;
    this.supplierName = event.target.value;
    this.caterpillar.getbysupplier(supplier).subscribe(data => {
      // console.log(data);
      this.metadata = data[0];
      this.SupplierData = data[0];
      this.spendamount = data[0]['commitedSpend'];
      this.savings = data[0]['ASavings'];
      this.CVtable = data[0]['cvdata'];
      this.chartdata = data[0]['chartdata'];
      var obj = this.chartdata;
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
      this.loadSpendByCategoryChart(result);
    })
  }

  ratingComponentClick(clickObj: any): void {
    // console.log(clickObj);
    const item = this.CVtable.find(((i: any) => i.ContractName === clickObj.name));
    if (!!item) {
      var obj = {
        type: 'CommittedAmount_2019',
        name: clickObj.name,
        rating: clickObj.rating
      }
      this.caterpillar.postCVRating(obj).subscribe(data => {
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
  // charts(){
  //   this.asgChartOptions = {
  //     chart: {
  //       plotBackgroundColor: null,
  //       plotBorderWidth: null,
  //       plotShadow: false,
  //       type: 'pie',
  //       backgroundColor : null,
  //       height : 255
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
  //         innerSize:100
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
  //            ['Business Analyst', 7]
  //       ],
  //       type: undefined
  //     }]
  //   },
  //   this.asgChart = new Chart(this.asgChartOptions);
  //  }

// }
// boubblechart(){
// this.bobbleChartOptions = {
//   chart: {
//       type: 'packedbubble',
//       height: '100%'
//   },
//   title: {
//       text: 'Carbon emissions around the world (2014)'
//   },
//   tooltip: {
//       useHTML: true,
//       pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
//   },
//   plotOptions: {
//       packedbubble: {
//           minSize: '30%',
//           maxSize: '120%',
//           zMin: 0,
//           zMax: 1000,
//           layoutAlgorithm: {
//               splitSeries: false,
//               gravitationalConstant: 0.02
//           },
//           dataLabels: {
//               enabled: true,
//               format: '{point.name}',
//               filter: {
//                   property: 'y',
//                   operator: '>',
//                   value: 250
//               },
//               style: {
//                   color: 'black',
//                   textOutline: 'none',
//                   fontWeight: 'normal'
//               }
//           }
//       }
//   },
//   series: [{
//       name: 'Europe',
//       data: [{
//           name: 'Germany',
//           value: 767.1
//       }, {
//           name: 'Croatia',
//           value: 20.7
//       },
//       {
//           name: "Belgium",
//           value: 97.2
//       },
//       {
//           name: "Czech Republic",
//           value: 111.7
//       },
//       {
//           name: "Netherlands",
//           value: 158.1
//       },
//       {
//           name: "Spain",
//           value: 241.6
//       },
//       {
//           name: "Ukraine",
//           value: 249.1
//       },
//       {
//           name: "Poland",
//           value: 298.1
//       },
//       {
//           name: "France",
//           value: 323.7
//       },
//       {
//           name: "Romania",
//           value: 78.3
//       },
//       {
//           name: "United Kingdom",
//           value: 415.4
//       }, {
//           name: "Turkey",
//           value: 353.2
//       }, {
//           name: "Italy",
//           value: 337.6
//       },
//       {
//           name: "Greece",
//           value: 71.1
//       },
//       {
//           name: "Austria",
//           value: 69.8
//       },
//       {
//           name: "Belarus",
//           value: 67.7
//       },
//       {
//           name: "Serbia",
//           value: 59.3
//       },
//       {
//           name: "Finland",
//           value: 54.8
//       },
//       {
//           name: "Bulgaria",
//           value: 51.2
//       },
//       {
//           name: "Portugal",
//           value: 48.3
//       },
//       {
//           name: "Norway",
//           value: 44.4
//       },
//       {
//           name: "Sweden",
//           value: 44.3
//       },
//       {
//           name: "Hungary",
//           value: 43.7
//       },
//       {
//           name: "Switzerland",
//           value: 40.2
//       },
//       {
//           name: "Denmark",
//           value: 40
//       },
//       {
//           name: "Slovakia",
//           value: 34.7
//       },
//       {
//           name: "Ireland",
//           value: 34.6
//       },
//       {
//           name: "Croatia",
//           value: 20.7
//       },
//       {
//           name: "Estonia",
//           value: 19.4
//       },
//       {
//           name: "Slovenia",
//           value: 16.7
//       },
//       {
//           name: "Lithuania",
//           value: 12.3
//       },
//       {
//           name: "Luxembourg",
//           value: 10.4
//       },
//       {
//           name: "Macedonia",
//           value: 9.5
//       },
//       {
//           name: "Moldova",
//           value: 7.8
//       },
//       {
//           name: "Latvia",
//           value: 7.5
//       },
//       {
//           name: "Cyprus",
//           value: 7.2
//       }]
//   }, {
//       name: 'Africa',
//       data: [{
//           name: "Senegal",
//           value: 8.2
//       },
//       {
//           name: "Cameroon",
//           value: 9.2
//       },
//       {
//           name: "Zimbabwe",
//           value: 13.1
//       },
//       {
//           name: "Ghana",
//           value: 14.1
//       },
//       {
//           name: "Kenya",
//           value: 14.1
//       },
//       {
//           name: "Sudan",
//           value: 17.3
//       },
//       {
//           name: "Tunisia",
//           value: 24.3
//       },
//       {
//           name: "Angola",
//           value: 25
//       },
//       {
//           name: "Libya",
//           value: 50.6
//       },
//       {
//           name: "Ivory Coast",
//           value: 7.3
//       },
//       {
//           name: "Morocco",
//           value: 60.7
//       },
//       {
//           name: "Ethiopia",
//           value: 8.9
//       },
//       {
//           name: "United Republic of Tanzania",
//           value: 9.1
//       },
//       {
//           name: "Nigeria",
//           value: 93.9
//       },
//       {
//           name: "South Africa",
//           value: 392.7
//       }, {
//           name: "Egypt",
//           value: 225.1
//       }, {
//           name: "Algeria",
//           value: 141.5
//       }]
//   }, {
//       name: 'Oceania',
//       data: [{
//           name: "Australia",
//           value: 409.4
//       },
//       {
//           name: "New Zealand",
//           value: 34.1
//       },
//       {
//           name: "Papua New Guinea",
//           value: 7.1
//       }]
//   }, {
//       name: 'North America',
//       data: [{
//           name: "Costa Rica",
//           value: 7.6
//       },
//       {
//           name: "Honduras",
//           value: 8.4
//       },
//       {
//           name: "Jamaica",
//           value: 8.3
//       },
//       {
//           name: "Panama",
//           value: 10.2
//       },
//       {
//           name: "Guatemala",
//           value: 12
//       },
//       {
//           name: "Dominican Republic",
//           value: 23.4
//       },
//       {
//           name: "Cuba",
//           value: 30.2
//       },
//       {
//           name: "USA",
//           value: 5334.5
//       }, {
//           name: "Canada",
//           value: 566
//       }, {
//           name: "Mexico",
//           value: 456.3
//       }]
//   }, {
//       name: 'South America',
//       data: [{
//           name: "El Salvador",
//           value: 7.2
//       },
//       {
//           name: "Uruguay",
//           value: 8.1
//       },
//       {
//           name: "Bolivia",
//           value: 17.8
//       },
//       {
//           name: "Trinidad and Tobago",
//           value: 34
//       },
//       {
//           name: "Ecuador",
//           value: 43
//       },
//       {
//           name: "Chile",
//           value: 78.6
//       },
//       {
//           name: "Peru",
//           value: 52
//       },
//       {
//           name: "Colombia",
//           value: 74.1
//       },
//       {
//           name: "Brazil",
//           value: 501.1
//       }, {
//           name: "Argentina",
//           value: 199
//       },
//       {
//           name: "Venezuela",
//           value: 195.2
//       }]
//   }, {
//       name: 'Asia',
//       data: [{
//           name: "Nepal",
//           value: 6.5
//       },
//       {
//           name: "Georgia",
//           value: 6.5
//       },
//       {
//           name: "Brunei Darussalam",
//           value: 7.4
//       },
//       {
//           name: "Kyrgyzstan",
//           value: 7.4
//       },
//       {
//           name: "Afghanistan",
//           value: 7.9
//       },
//       {
//           name: "Myanmar",
//           value: 9.1
//       },
//       {
//           name: "Mongolia",
//           value: 14.7
//       },
//       {
//           name: "Sri Lanka",
//           value: 16.6
//       },
//       {
//           name: "Bahrain",
//           value: 20.5
//       },
//       {
//           name: "Yemen",
//           value: 22.6
//       },
//       {
//           name: "Jordan",
//           value: 22.3
//       },
//       {
//           name: "Lebanon",
//           value: 21.1
//       },
//       {
//           name: "Azerbaijan",
//           value: 31.7
//       },
//       {
//           name: "Singapore",
//           value: 47.8
//       },
//       {
//           name: "Hong Kong",
//           value: 49.9
//       },
//       {
//           name: "Syria",
//           value: 52.7
//       },
//       {
//           name: "DPR Korea",
//           value: 59.9
//       },
//       {
//           name: "Israel",
//           value: 64.8
//       },
//       {
//           name: "Turkmenistan",
//           value: 70.6
//       },
//       {
//           name: "Oman",
//           value: 74.3
//       },
//       {
//           name: "Qatar",
//           value: 88.8
//       },
//       {
//           name: "Philippines",
//           value: 96.9
//       },
//       {
//           name: "Kuwait",
//           value: 98.6
//       },
//       {
//           name: "Uzbekistan",
//           value: 122.6
//       },
//       {
//           name: "Iraq",
//           value: 139.9
//       },
//       {
//           name: "Pakistan",
//           value: 158.1
//       },
//       {
//           name: "Vietnam",
//           value: 190.2
//       },
//       {
//           name: "United Arab Emirates",
//           value: 201.1
//       },
//       {
//           name: "Malaysia",
//           value: 227.5
//       },
//       {
//           name: "Kazakhstan",
//           value: 236.2
//       },
//       {
//           name: "Thailand",
//           value: 272
//       },
//       {
//           name: "Taiwan",
//           value: 276.7
//       },
//       {
//           name: "Indonesia",
//           value: 453
//       },
//       {
//           name: "Saudi Arabia",
//           value: 494.8
//       },
//       {
//           name: "Japan",
//           value: 1278.9
//       },
//       {
//           name: "China",
//           value: 10540.8
//       },
//       {
//           name: "India",
//           value: 2341.9
//       },
//       {
//           name: "Russia",
//           value: 1766.4
//       },
//       {
//           name: "Iran",
//           value: 618.2
//       },
//       {
//           name: "Korea",
//           value: 610.1
//       }]
//   }]
  
// };
// this.bobbleChart = new Chart(this.bobbleChartOptions);
// }
// }

