import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { style } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { StockChart } from 'angular-highcharts';
import * as $ from 'jquery';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css']
})
export class InventoryReportComponent implements OnInit, OnDestroy {
  foods: any;
  livechart = true;
  historicalchart = false;
  selected: any;
  livechartdata: any;
  historicalchartdata: any;
  stockchartcategories: any;
  returnchart: any;
  stockagingchart: any;
  stockchart: any;
  /**Drop downs */
  categories: any;
  vehicle: any;
  spare: any;
  categoryname: any;
  vehiclename; any;
  sparename: any;
  /**Json data */
  inventoryDatafromJson: any;
  inventorydata: any;
  cardSelected: any;
  historiccardSelected: any;
  stockvalueChartData: any;
  stockvolumeChartData: any;
  deliveryValueChartdata: any;
  stockAgingChartData: any;
  sampleHistoricChartData: any;
  alerts: any
  /**Model Display*/
  display = 'none';
  display1 = 'none';
  displaypopup = 'none';
  alertmsg: any;
  alerttxt: any;
  alertarray: any = [];
  actionalerttext: any;
  showalertmodel: boolean = false;
  showactionmodel: boolean = false;
  alertarr: any[];
  interval: any
  modelarr: any[]
  showpopmodel: boolean = false;
  title: any;




  constructor(public http: HttpClient, private ngZone: NgZone, public route: ActivatedRoute) {
    var heading = this.route.snapshot.queryParamMap.get("title");
    if(heading == null || heading == ""){
      localStorage.setItem('title',"Inventory Management");
    }else{
      localStorage.setItem("title",heading);
    }

    if (localStorage.getItem('title') == "" || localStorage.getItem('title') == null || localStorage.getItem('title') == undefined) {
      this.title = '';
    } else {
      this.title = localStorage.getItem('title');
    }

    /** Column chart categories */
    this.stockchartcategories = new Chart({
      chart: {
        type: 'column',
        style: {
          fontFamily: 'Ubuntu,sans-serif'
        }

      },
      title: {
        text: 'Stock Categories'
      },
      xAxis: {
        type: 'category',
        labels: {
          enabled: true
        }
      },
      yAxis: {
        title: { text: 'Total percent market share' },

        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'red'
          }
        },
        gridLineColor: 'transparent',
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: false,
            format: '{point.y:.1f}%'
          }
        }
      },
      series: [
        {
          name: 'Categories',
          data: [
            {
              name: 'D Category',
              y: 222624,
              drilldown: 'D Category'
            },
            {
              name: 'C Category',
              y: 824520,
              drilldown: 'C Category',
              color: '#F64947'
            },
            {
              name: 'M Category',
              y: 347710,
              drilldown: 'M Category',
              color: 'orange'
            },
            {
              name: '0-9 Category',
              y: 458649,
              drilldown: '0-9 Category',
              color: 'green'
            }
          ]
        }
      ],
      credits: {
        enabled: null
      },

      drilldown: {
        series: [
          {
            name: 'D Category',
            id: 'D Category',
            data: [
              { name: 'Caterpillar D4', y: 67713, drilldown: 'Caterpillar D4' },
              { name: 'Caterpillar D5', y: 44335, drilldown: 'Caterpillar D5' },
              { name: 'Caterpillar D6', y: 60644, drilldown: 'Caterpillar D6' },
              { name: 'Caterpillar D7', y: 49912, drilldown: 'Caterpillar D7' }
            ]
          }, {
            name: 'Caterpillar D4', id: 'Caterpillar D4', data: [
              ['Battery', 29071],
              ['Fan Belt', 14990],
              ['Camshaft', 23652]
            ]
          },
          {
            name: 'Caterpillar D5', id: 'Caterpillar D5', data: [
              ['Fan Belt', 9472],
              ['Camshaft', 19036],
              ['Battery', 15827]
            ]
          },
          {
            name: 'Caterpillar D6', id: 'Caterpillar D6', data: [
              ['Camshaft', 23174],
              ['Battery', 21755],
              ['Fan Belt', 15735]
            ]
          },
          {
            name: 'Caterpillar D7', id: 'Caterpillar D7', data: [
              ['Battery', 14794],
              ['Fan Belt', 29543],
              ['Camshaft', 5575]
            ]
          },
          {
            name: 'C Category',
            id: 'C Category',
            data: [
              { name: 'Caterpillar CS-533E', y: 212040, drilldown: 'Caterpillar CS-533E' },
              { name: 'Caterpillar 797', y: 251450, drilldown: 'Caterpillar 797' },
              { name: 'Caterpillar 797F', y: 168895, drilldown: 'Caterpillar 797F' },
              { name: 'Caterpillar Twenty-Two', y: 170825, drilldown: 'Caterpillar Twenty-Two' }
            ]
          }, {
            name: 'Caterpillar CS-533E', id: 'Caterpillar CS-533E', data: [
              ['Fan Belt', 37773],
              ['Camshaft', 84969],
              ['Battery', 89298]
            ]
          },
          {
            name: 'Caterpillar 797', id: 'Caterpillar 797', data: [
              ['Camshaft', 95889],
              ['Battery', 60566],
              ['Fan Belt', 94995]
            ]
          },
          {
            name: 'Caterpillar 797F', id: 'Caterpillar 797F', data: [
              ['Battery', 53087],
              ['Fan Belt', 47033],
              ['Camshaft', 68775]
            ]
          },
          {
            name: 'Caterpillar Twenty-Two', id: 'Caterpillar Twenty-Two', data: [
              ['Battery', 40182],
              ['Fan Belt', 99326],
              ['Camshaft', 31317]
            ]
          },
          {
            name: 'M Category',
            id: 'M Category',
            data: [
              { name: 'M520 Goer', y: 109612, drilldown: 'M520 Goer' },
              { name: 'M559', y: 107832, drilldown: 'M559' },
              { name: 'M877', y: 130266, drilldown: 'M877' }
            ]
          }, {
            name: 'M520 Goer', id: 'M520 Goer', data: [
              ['Fan Belt', 14319],
              ['Camshaft', 41389],
              ['Battery', 53904]
            ]
          },
          {
            name: 'M559', id: 'M559', data: [
              ['Camshaft', 38575],
              ['Battery', 63961],
              ['Fan Belt', 5296]
            ]
          },
          {
            name: 'M877', id: 'M877', data: [
              ['Battery', 88218],
              ['Fan Belt', 36640],
              ['Camshaft', 5408]
            ]
          },
          {
            name: '0-9 Category',
            id: '0-9 Category',
            data: [
              { name: 'Caterpillar 345C L', y: 147560, drilldown: 'Caterpillar 345C L' },
              { name: 'Caterpillar 924G', y: 192202, drilldown: 'Caterpillar 924G' },
              { name: 'Caterpillar 930G', y: 118887, drilldown: 'Caterpillar 930G' }
            ]
          }, {
            name: 'Caterpillar 345C L', id: 'Caterpillar 345C L', data: [
              ['Fan Belt', 33618],
              ['Camshaft', 78582],
              ['Battery', 35360]
            ]
          },
          {
            name: 'Caterpillar 924G', id: 'Caterpillar 924G', data: [
              ['Camshaft', 91195],
              ['Battery', 44681],
              ['Fan Belt', 56326]
            ]
          },
          {
            name: 'Caterpillar 930G', id: 'Caterpillar 930G', data: [
              ['Battery', 38977],
              ['Fan Belt', 43270],
              ['Camshaft', 36640]
            ]
          }
        ]
      }
    });


    /**Treemap chart for return goods */
    this.returnchart = new Chart({


      series: [{
        type: 'treemap',
        // layoutAlgorithm: 'squarified',


        data: [{
          name: 'D Category',
          value: 6,
          colorValue: 1

        }, {
          name: 'C Category',
          value: 4,
          color: '#FF6260'
        }, {
          name: 'M Category',
          value: 3,
          color: '#FFA500'
        }, {
          name: '0-9 Category',
          value: 2,
          color: '#008000'

        },


        ],

      }],
      title: {
        text: 'Defective/Return Goods'
      },


    });

  }

  ngOnInit() {
    // this.alerttxt=""
    this.modelarr = [{ "name": "Alert1", "Date": "18-08-2018", "Type": "DSIReaching Threshold", "Button_text": "Action1" }]
    this.selected = 1;
    this.cardSelected = 1;
    this.historiccardSelected = 1;
    this.categoryname = 'D Category';


    /**Getting data from local json file */
    this.http.get('../../assets/data/data.json').subscribe(data => {
      this.categories = data['CATEGORIES'];
      this.vehicle = data['VEHICLE'];
      this.spare = data['SPARENAME'];
      this.inventorydata = data['INVENTORY_DATA'];
      this.alerts = data['ALERTS'];
      this.loadDefaultData(this.inventorydata);
    });
    this.settimeinterval()
    this.onpopmodelclose()
    //this.stopinterval()


    // this.openModal()
    // this.ngZone.run(() => {
    //   this.settimeinterval()
    // });



  }

  ngOnDestroy(){
    localStorage.removeItem("title");
  }
  loadDefaultData(inventorydefault) {
    for (let i = 0; i < inventorydefault.length; i++) {
      if (inventorydefault[i].main_value === this.categoryname) {
        this.inventoryDatafromJson = inventorydefault[i];
        this.stockvalueChartData = inventorydefault[i].stock_value_chart;
        this.stockvolumeChartData = inventorydefault[i].stock_volume_chart;
        this.deliveryValueChartdata = inventorydefault[i].total_delevery_chart;
        if (this.cardSelected === 1) {
          this.getLiveChart(this.stockvalueChartData);
        } else if (this.cardSelected === 2) {
          this.getLiveChart(this.stockvolumeChartData);
        } else if (this.cardSelected === 3) {
          this.getLiveChart(this.deliveryValueChartdata);
        }
        this.stockAgingChartData = this.inventorydata[i].stockaging;
        this.sampleHistoricChartData = [1234, 5684, 6645, 3455, 2334, 2311, 7000, 5545, 2344, 3534, 3423, 6345];
        this.getHistoricalChart(this.sampleHistoricChartData);
        this.getStockaging(this.categoryname, this.stockAgingChartData);
        this.settimeinterval();
      }
    }
  }


  changeValue(selection) {
    const selectedValue = selection.currentTarget.value;
    console.log(selectedValue);
    for (let i = 0; i < this.inventorydata.length; i++) {
      if (this.inventorydata[i].main_value === selectedValue) {
        this.inventoryDatafromJson = this.inventorydata[i];
        this.stockvalueChartData = this.inventorydata[i].stock_value_chart;
        this.stockvolumeChartData = this.inventorydata[i].stock_volume_chart;
        this.deliveryValueChartdata = this.inventorydata[i].total_delevery_chart;
        if (this.cardSelected === 1) {
          this.getLiveChart(this.stockvalueChartData);
        } else if (this.cardSelected === 2) {
          this.getLiveChart(this.stockvolumeChartData);
        } else if (this.cardSelected === 3) {
          this.getLiveChart(this.deliveryValueChartdata);
        }
        this.stockAgingChartData = this.inventorydata[i].stockaging;
        this.sampleHistoricChartData = [1234, 5684, 6645, 3455, 2334, 2311, 7000, 5545, 2344, 3534, 3423, 6345];
        this.getHistoricalChart(this.sampleHistoricChartData);
        this.getStockaging(selectedValue, this.stockAgingChartData);
      }
    }
  }


  setActive(item: any) {
    this.livechart = false;
    this.historicalchart = true;
    this.selected = item;
  }

  setActiveLive(item: any) {
    this.livechart = true;
    this.historicalchart = false;
    this.selected = item;
  }

  isActive(item: any) {
    return this.selected === item;
  }

  /**for historical buttons */
  isCardActive(item: any) {
    return this.cardSelected === item;
  }

  isHistoricActive(item: any) {
    return this.historiccardSelected === item;
  }

  setStockActive(item: any) {
    this.cardSelected = item;
    this.getLiveChart(this.stockvalueChartData);
  }

  setVolumeActive(item: any) {
    this.cardSelected = item;
    this.getLiveChart(this.stockvolumeChartData);
  }

  setDeliveryActive(item: any) {
    this.cardSelected = item;
    this.getLiveChart(this.deliveryValueChartdata);
  }

  setHistoricStockActive(item: any) {
    this.historiccardSelected = item;
    this.sampleHistoricChartData = [1234, 5684, 6645, 3455, 2334, 2311, 7000, 5545, 2344, 3534, 3423, 6345];
    this.getHistoricalChart(this.sampleHistoricChartData);
  }

  setHistoricVolumeActive(item: any) {
    this.historiccardSelected = item;
    this.sampleHistoricChartData = [1000, 3000, 4000, 4540, 1230, 3450, 8000, 5000, 11000, 800, 1500, 2500];
    this.getHistoricalChart(this.sampleHistoricChartData);
  }

  setHistoricDeliveryActive(item: any) {
    this.historiccardSelected = item;
    this.sampleHistoricChartData = [2000, 10000, 6000, 4455, 5420, 4678, 8354, 1234, 5432, 6754, 9238, 8734];
    this.getHistoricalChart(this.sampleHistoricChartData);
  }

  getLiveChart(value) {
    var $this = this;
    this.livechartdata = new Chart({
      chart: {
        type: 'spline', // don't animate in old IE
        events: {
          load: function () {
            // set up the updating of the chart each second
            var dataIndex = 0;
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = (+value[dataIndex]);
              series.addPoint([x, y], true, true);
            }, 1000);

            setInterval(function () {
              dataIndex = dataIndex + 1;
              if (dataIndex === value.length) {
                dataIndex = 0;
              }
            }, 1000);
          }
        }
      },

      time: {
        useUTC: false
      },

      credits: {
        enabled: null
      },

      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: ''
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: '',
        data: (function () {
          // generate an array of random data
          const data = [],
            time = (new Date()).getTime();
          for (let i = -10; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: value[i]
            });
          }
          return data;
        }())
      }]
    });

  }



  getHistoricalChart(datahistory) {
    /** Historical Chart data */
    this.historicalchartdata = new Chart({
      chart: {

        type: 'line',
        style: {
          fontFamily: 'Ubuntu,sans-serif'
        }

      },
      title: {
        text: null
      },
      credits: {
        enabled: null,

      },
      yAxis: {
        gridLineColor: 'transparent',
        title: null,
        labels: {
          enabled: true
        },
        plotLines: [{
          color: '#20283D',
          width: 1,
          value: 6000,
          label: {
            text: 'Market Average',
            align: 'left'
          }
        }]

      },

      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: {
          text: null
        },


      },
      series: [{
        data: datahistory,

      }],
      legend: {
        enabled: false
      },


    });
  }

  getStockaging(value, chartsdata) {
    this.stockagingchart = new Chart({
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,

        },
        style: {
          fontFamily: 'Ubuntu,sans-serif'
        }

      },
      title: {
        text: 'Stock Aging'
      },
      credits: {
        enabled: null
      },

      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 45
        }
      },


      series: [{
        name: value,
        data: [
          { name: '< 1month', y: chartsdata[0], color: 'green' },
          { name: '1-6 month', y: chartsdata[1], color: 'yellow' },
          { name: '6 month - 1 year', y: chartsdata[2], color: 'red' },
          { name: '> 1 year', y: chartsdata[3], color: 'purple' },
          // ['Year',5, ],
          // ['one month', 2],
          // ['Six Month', 7],
          // ['One Year', 9],

        ]
      }]



    });
  }

  //** Open Model**/
  openModal() {
    this.display = 'block';
    localStorage.setItem('ModelOpen', 'true');
    this.showalertmodel = true;
  }

  openModalAdd(value) {
    // alert("Hi")
    this.display1 = 'block';
    this.actionalerttext = value.Button_text;
    this.showactionmodel = true
    this.showalertmodel = false


    //this.alertarray = [];
  }
  openpopmodeladd() {
    this.displaypopup = 'block'
  }

  //close model
  onCloseHandled() {
    this.display = 'none';


  }


  onalertCloseHandled() {

    this.display1 = 'none';
  }
  onpopmodelclose() {
    setInterval(() => {
      this.displaypopup = 'none'

    }, 6000)

  }


  actionalert() {

    // alert(this.alertarray)
    // this.alertmsg =""
    this.alerttxt = this.alertmsg
    for (var i = 0; i < this.alerts.length; i++) {
      if (this.actionalerttext == this.alerts[i].Button_text) {

        this.alertarray.push(this.alerttxt)
        this.alertmsg = ''
      }

    }

  }


  settimeinterval() {
    this.interval = setInterval(() => {
      this.openpopmodeladd()

    }, 10000)

  };



}








