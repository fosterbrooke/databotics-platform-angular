import { DatabotService } from './../../core/databot.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Highcharts } from 'angular-highcharts';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-hrms-usecase1',
  templateUrl: './hrms-usecase1.component.html',
  styleUrls: ['./hrms-usecase1.component.css']
})
export class HrmsUsecase1Component implements OnInit, OnDestroy {
  stockchartcategories: any;
  negativStack: any;
  stockagingchart: any;
  options: any;
  hrdashboardData: any;
  employeecount: any;
  fulltimeemployee: any = [];
  traineeemployee: any = [];
  contractemployee: any = [];
  femaleemployee: any = [];
  maleemployee: any = [];
  oneBandemployee: any = [];
  twoBandemployee: any = [];
  threeBandemployee: any = [];
  fourBandemployee: any = [];
  fiveBandemployee: any = [];
  sixBandemployee: any = [];
  sevenBandemployee: any = [];
  fulltimeemployeeCount: any;
  traineeemployeeCount: any;
  contractemployeeCount: any;
  femaleemployeeCount: any;
  maleemployeeCount: any;
  averageSalary: any;
  averageExperience: any;
  averageattritionRate: any;
  averageSatisfaction: any;
  category:any;
  cardSelected: any;
  tableAttritionHeaders = [];
  attritionData:any;
  ethnicityData:any;
  /**Age group */
  eighteentwentyfive:any;
  twentyfivethirty:any;
  thirtyonetothirtyfive:any;
  thirtysixtofourty:any;
  greaterfoutry:any;

  grad:any;
  postgra:any;
  undergrad:any;

  whiteEthnicity:any;
  africanamericanEthnicity:any;
  latinAmericanEthnicity:any;
  asianEthnicity:any;
  otherEthnicity:any;


  bandOneCount:any;
  bandTwoCount:any;
  bandThreeCount:any;
  bandFourCount:any;
  bandFiveCount:any;
  bandSixCount:any;
  bandSevenCount:any;

  malepercent:any;
  femaleperecent:any;

  gradPercent:any;
  undergradPercent:any;
  postGraduatePercent:any;

  whiteEthinPercent:any;
  africanAmericanPercent:any;
  latinAmericanPercent:any;
  asianPercent:any;
  otherPercent:any;

  eighteenTwentyPercent:any;
  twentysixthirtyPercent:any;
  thirtyonefivePercent:any;
  thirtySixfortyPercent:any;
  greaterFortyPercent:any;

  selected = false;
  selectedFemale = false;
  selectedband1 = false;
  default =true;
 /**Age group */
 title: any;

  constructor(public databotService: DatabotService, public router: Router,public http: HttpClient, public route: ActivatedRoute) {
    var heading = this.route.snapshot.queryParamMap.get("title");
    if(heading == null || heading == ""){
      localStorage.setItem('title',"HR Overview");
    }else{
      localStorage.setItem("title",heading);
    }

    if (localStorage.getItem('title') == "" || localStorage.getItem('title') == null || localStorage.getItem('title') == undefined) {
      this.title = '';
    } else {
      this.title = localStorage.getItem('title');
    }

    this.hiredChart();
  }

  ngOnInit() {
    this.cardSelected = 1;
    this.loadJsonData();
    this.loadAttritionRate();
    this.loadEthnicityData();
  }

  ngOnDestroy(){
    localStorage.removeItem("title");
  }

  loadJsonData() {
    this.databotService.loadHrdashboard1().subscribe(data => {
      console.log(data);
      this.hrdashboardData = data;
      this.employeecount = this.hrdashboardData.length;
      this.filterData(data);
      this.filterBandData(data);
      this.filterAverageData(data);
      this.departmentChart(data);
    });

  }


 loadAttritionRate(){
    this.databotService.loadAttritionData().subscribe(data => {
      this.attritionData = data;

      let responseData = data[0];
      for (var key in responseData) {
        if (responseData.hasOwnProperty(key)) {
            this.tableAttritionHeaders.push(key);
        }
      }
    })
  }

  loadEthnicityData(){
    this.http.get('../../assets/data/ethnicity.json').subscribe(data => {
      this.ethnicityData = data;
      // alert(JSON.stringify(this.ethnicityData))
    });


  }



  filterBandData(banddata) {
    for (var i = 0; i < banddata.length; i++) {
      if (banddata[i]['Employee Band'] == 1) {
        this.oneBandemployee.push(banddata[i]['Employee Band']);
      } else if (banddata[i]['Employee Band'] == 2) {
        this.twoBandemployee.push(banddata[i]['Employee Band']);
      } else if (banddata[i]['Employee Band'] == 3) {
        this.threeBandemployee.push(banddata[i]['Employee Band']);
      } else if (banddata[i]['Employee Band'] == 4) {
        this.fourBandemployee.push(banddata[i]['Employee Band']);
      } else if (banddata[i]['Employee Band'] == 5) {
        this.fiveBandemployee.push(banddata[i]['Employee Band']);
      } else if (banddata[i]['Employee Band'] == 6) {
        this.sixBandemployee.push(banddata[i]['Employee Band']);
      } else if (banddata[i]['Employee Band'] == 7) {
        this.sevenBandemployee.push(banddata[i]['Employee Band']);
      }
    }

    this.bandChart(this.oneBandemployee, this.twoBandemployee, this.threeBandemployee, this.fourBandemployee, this.fiveBandemployee, this.sixBandemployee, this.sevenBandemployee);
  }

  filterData(hrdata) {
    this.africanamericanEthnicity = 0;
    this.whiteEthnicity = 0;
    this.latinAmericanEthnicity = 0;
    this.asianEthnicity = 0;
    this.otherEthnicity = 0;
    this.postgra = 0;
    this.undergrad = 0;
    this.grad = 0;
    this.eighteentwentyfive =0;
    this.twentyfivethirty = 0;
    this.thirtyonetothirtyfive =0;
    this.thirtysixtofourty =0;
    this.greaterfoutry =0;

    for (var i = 0; i < hrdata.length; i++) {
      if (hrdata[i]['Employement'] == 'Full Time') {
        this.fulltimeemployee.push(hrdata[i]['Employement']);
      }
      if (hrdata[i]['Employement'] == 'Trainee') {
        this.traineeemployee.push(hrdata[i]['Employement']);
      }
      if (this.hrdashboardData[i]['Employement'] == 'Contract') {
        this.contractemployee.push(hrdata[i]['Employement']);
      }
      if (hrdata[i]['Gender'] == 'Male') {
        this.maleemployee.push(hrdata[i]['Gender']);
      }
      if (hrdata[i]['Gender'] == 'Female') {
        this.femaleemployee.push(hrdata[i]['Gender']);
      }
      if(hrdata[i]['Ethinicity'] == 'African American'){
        this.africanamericanEthnicity+=1;
      }
      if(hrdata[i]['Ethinicity'] == 'White'){
        this.whiteEthnicity+=1;
      }
      if(hrdata[i]['Ethinicity'] == 'Latin American'){
        this.latinAmericanEthnicity+=1;
      }
      if(hrdata[i]['Ethinicity'] == 'Asian'){
        this.asianEthnicity+=1;
      }
      if(hrdata[i]['Ethinicity'] == 'Others'){
        this.otherEthnicity +=1;
      }
      if(hrdata[i]['Education'] == 'Under Graduate'){
        this.undergrad +=1;
      }
      if(hrdata[i]['Education'] == 'Post Graduate'){
        this.postgra +=1;
      }
      if(hrdata[i]['Education'] == 'Graduate'){
        this.grad +=1;
      }
      if(hrdata[i]['Age Group'] >= 18  && hrdata[i]['Age Group'] <= 25){
        this.eighteentwentyfive += 1;
      }
      if(hrdata[i]['Age Group'] >= 26  && hrdata[i]['Age Group'] <= 30){
        this.twentyfivethirty += 1;
      }
      if(hrdata[i]['Age Group'] >= 31  && hrdata[i]['Age Group'] <= 35){
        this.thirtyonetothirtyfive += 1;
      }
      if(hrdata[i]['Age Group'] >= 36  && hrdata[i]['Age Group'] <= 40){
        this.thirtysixtofourty += 1;
      }
      if(hrdata[i]['Age Group'] > 40){
        this.greaterfoutry += 1;
      }
    }
    this.traineeemployeeCount = this.traineeemployee.length;
    this.fulltimeemployeeCount = this.fulltimeemployee.length;
    this.contractemployeeCount = this.contractemployee.length;
    this.femaleemployeeCount = this.femaleemployee.length;
    this.maleemployeeCount = this.maleemployee.length;
    this.malepercent = (this.maleemployeeCount/1000)*100+"%";
    this.femaleperecent = (this.femaleemployeeCount/1000)*100+"%";
    this.gradPercent = (this.grad/1000)*100+"%";
    this.undergradPercent = (this.undergrad/1000)*100+"%";
    this.postGraduatePercent = (this.postgra/1000)*100+"%";
    this.whiteEthinPercent = (this.whiteEthnicity/1000)*100+"%";
    this.africanAmericanPercent = (this.africanamericanEthnicity/1000)*100+"%";;
    this.latinAmericanPercent = (this.latinAmericanEthnicity/1000)*100+"%";;
    this.asianPercent = (this.asianEthnicity/1000)*100+"%";
    this.otherPercent = (this.otherEthnicity/1000)*100+"%";
    this.eighteenTwentyPercent = (this.eighteentwentyfive/1000)*100+"%";
    this.twentysixthirtyPercent = (this.twentyfivethirty/1000)*100+"%";
    this.thirtyonefivePercent = (this.thirtyonetothirtyfive/1000)*100+"%";
    this.thirtySixfortyPercent = (this.thirtysixtofourty/1000)*100+"%";
    this.greaterFortyPercent = (this.greaterfoutry/1000)*100+"%";
  }

  filterAverageData(avgdata) {
    var averageSal = 0;
    var averageExp = 0;
    var attrRate = 0;
    var satisRate = 0;
    for (var i = 0; i < avgdata.length; i++) {
      averageSal += avgdata[i]['Salary'];
      averageExp += avgdata[i]['Experience'];
      attrRate += avgdata[i]['Attrition rate'];
      satisRate += avgdata[i]['Satisfaction Index'];
    }

    this.averageSalary = averageSal / this.employeecount;
    this.averageExperience = averageExp / this.employeecount;
    this.averageattritionRate = attrRate / this.employeecount;
    this.averageSatisfaction = satisRate / this.employeecount;

  }

  bandChart(oneband, twoband, threeband, fourband, fiveband, sixband, sevenband) {
      this.bandOneCount = oneband.length;
      this.bandTwoCount = twoband.length;
      this.bandThreeCount = threeband.length;
      this.bandFourCount = fourband.length;
      this.bandFiveCount = fiveband.length;
      this.bandSixCount = sixband.length;
      this.bandSevenCount = sevenband.length;
  }
  departmentChart(itbandone) {
    var $this = this;
    var UNDEFINED;
    this.options = {
      chart: {
          type: 'column',
          height:200
      },
      title: {
          text: '',

      },
      xAxis: {
          categories:["Admin","Accounting","IT","Marketing","Sales","Legal"]
      },
      yAxis: {
          min: 0,
          title: {
              text: ''
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: 'gray'
              }
          },
          gridLineColor: 'transparent',
          labels:{
              enabled:false
           },


      },

      credits: {
        enabled: false
    },
      legend: {
         enabled:false
      },
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: false,
                  color: 'black'
              }
          }
      },
      series: [
        {
          name: 'Band 1',
          data: [31,42,52,43,16,28],
          color: '#3D7BAA'
        },
        {
          name: 'Band 2',
          data: [37,31,52,23,30,24],
          color: '#42506D'
        },
        {
          name: 'Band 3',
          data: [31,31,75,44,19,35],
          color: '#F7C13B'
        },
        {
          name: 'Band 4',
          data: [29,29,35,26,10,25],
          color: '#EA1651'
        },
        {
          name: 'Band 5',
          data: [0,18,33,15,16,13],
          color: '#E932FF'
        },
        {
          name: 'Band 6',
          data: [0,10,27,10,7,10],
          color: '#2CAFC4'
        },
        {
          name: 'Band 7',
          data: [0,6,22,5,6,4],
          color: '#3D7BAA'
    }
  ]
  };
    this.stockchartcategories = new Chart(this.options);
  }

  ethinicityChart(itbandone) {
    var $this = this;
    var UNDEFINED;
    this.options = {
      chart: {
          type: 'column',
          height:200
      },
      title: {
          text: '',

      },
      xAxis: {
          categories:["Admin","Accounting","IT","Marketing","Sales","Legal"]
      },
      yAxis: {
          min: 0,
          title: {
              text: ''
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: 'gray'
              }
          },
          gridLineColor: 'transparent',
          labels:{
              enabled:false
           },


      },

      credits: {
        enabled: false
    },
      legend: {
         enabled:false
      },
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: false,
                  color: 'black'
              }
          }
      },
      series: [
        {
          name: 'White',
          data: [23,35,58,40,21,27],
          color: '#3D7BAA'
        },
        {
          name: 'Africian Americian',
          data: [60,28,52,31,14,25],
          color: '#42506D'
        },
        {
          name: 'Latin Americian',
          data: [32,40,62,39,26,33],
          color: '#F7C13B'
        },
        {
          name: 'Asian',
          data: [27,35,57,30,18,30],
          color: '#EA1651'
        },
        {
          name: 'Other',
          data: [30,29,67,26,25,25],
          color: '#E932FF'
        },

  ]
  };
    this.stockchartcategories = new Chart(this.options);
  }


  ageGroupChart(itbandone) {
    var $this = this;
    var UNDEFINED;
    this.options = {
      chart: {
          type: 'column',
          height:200
      },
      title: {
          text: '',

      },
      xAxis: {
          categories:["Admin","Accounting","IT","Marketing","Sales","Legal"]
      },
      yAxis: {
          min: 0,
          title: {
              text: ''
          },
          stackLabels: {
              enabled: true,
              style: {
                  fontWeight: 'bold',
                  color: 'gray'
              }
          },
          gridLineColor: 'transparent',
          labels:{
              enabled:false
           },


      },

      credits: {
        enabled: false
    },
      legend: {
         enabled:false
      },
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: false,
                  color: 'black'
              }
          }
      },
      series: [
        {
          name: '18-25',
          data: [68,73,104,66,46,52],
          color: '#3D7BAA'
        },
        {
          name: '26-30',
          data: [51,55,103,67,27,53],
          color: '#42506D'
        },
        {
          name: '31-35',
          data: [9,31,57,24,24,30],
          color: '#F7C13B'
        },
        {
          name: '35-40',
          data: [0,7,22,7,3,4],
          color: '#EA1651'
        },
        {
          name: 'Above 40',
          data: [0,1,7,2,2,0],
          color: '#E932FF'
        },

  ]
  };
    this.stockchartcategories = new Chart(this.options);
  }

  hiredChart() {
    var categories = [
      "IT",

      "Accounting",

      "Marketing",

      "Sales",

      "Admin",

      "Legal"
    ];
    this.options = {

      chart: {
        type: "bar",
        height: 375
      },
      title: {
        text: ""
      },
      subtitle: {
        text:
          ''
      },
      xAxis: [
        {
          categories: categories,
          reversed: false,



          labels: {
            step: 1
          },

        },

        {
          // mirror axis on right side
          opposite: true,
          reversed: false,
          categories: categories,
          linkedTo: 0,
          labels: {
            step: 1
          }
        }
      ],
      yAxis: {

        title: {
          text: null
        },
        labels: {
          formatter: function () {
            return Math.abs(this.value) + "%";
          }
        }
      },
      credits: {
        enabled: false
    },

      plotOptions: {
        series: {
          stacking: "normal",
          pointWidth: 20,


        }
      },

      tooltip: {
        formatter: function () {
          return (
            "<b>" +
            this.series.name +
            ", age " +
            this.point.category +
            "</b><br/>" +
            "Population: " +
            Highcharts.numberFormat(Math.abs(this.point.y), 0)
          );
        }
      },

      series: [
        {
          name: "Employees left",
          data: [
            -2.9,
            -3.5,
            -4.4,
            -4.1,
            -3.4,
            -2.7,
          ],
          color: "#ea2537",
        },
        {
          name: "Employees hired",
          data: [
            4.3,
            4.0,
            3.5,
            2.9,
            2.5,
            2.7,
          ],
          color: "#7282a7",

        }
      ]
    };
    this.negativStack = new Chart(this.options);
    // Data gathered from http://populationpyramid.net/germany/2015/

    // Age categories
  }

  getAverageData(dep, count) {
    var index: any
    this.category = dep;
    this.default = false;
    this.averageSalary = 0;
    this.averageExperience = 0;
    this.averageattritionRate = 0;
    this.averageSatisfaction = 0;
    for (index in this.hrdashboardData) {
      if (this.hrdashboardData[index]['Department'] == dep) {
        this.averageSalary += this.hrdashboardData[index]['Salary'] / count;
        this.averageExperience += this.hrdashboardData[index]['Experience'] / count;
        this.averageattritionRate += this.hrdashboardData[index]['Attrition rate'] / count;
        this.averageSatisfaction += this.hrdashboardData[index]['Satisfaction Index'] / count;
      }
    }
  }

  getBandAvgData(band,count) {
    this.default = false;
    this.category = "Band"+' '+':'+' '+band;
    var index: any
    this.averageSalary = 0;
    this.averageExperience = 0;
    this.averageattritionRate = 0;
    this.averageSatisfaction = 0;
    for (index in this.hrdashboardData) {
      if (this.hrdashboardData[index]['Employee Band'] == band) {
        this.averageSalary += this.hrdashboardData[index]['Salary'] / count;
        this.averageExperience += this.hrdashboardData[index]['Experience'] / count;
        this.averageattritionRate += this.hrdashboardData[index]['Attrition rate'] / count;
        this.averageSatisfaction += this.hrdashboardData[index]['Satisfaction Index'] / count;
      }
    }
  }

  getMaleEmployeeAvg(){
    var index: any
    this.default = false;
    this.category = "Gender"+' '+':'+' '+"Male";
    this.selected =  true;
    this.averageSalary = 0;
    this.averageExperience = 0;
    this.averageattritionRate = 0;
    this.averageSatisfaction = 0;
    for (index in this.hrdashboardData) {
      if (this.hrdashboardData[index]['Gender'] == "Male") {
        this.averageSalary += this.hrdashboardData[index]['Salary'] / this.maleemployeeCount;
        this.averageExperience += this.hrdashboardData[index]['Experience'] / this.maleemployeeCount;
        this.averageattritionRate += this.hrdashboardData[index]['Attrition rate'] / this.maleemployeeCount;
        this.averageSatisfaction += this.hrdashboardData[index]['Satisfaction Index'] / this.maleemployeeCount;
      }
    }
  }

  getFemaleEmployeeAvg(){
    this.default = false;
    this.category = "Gender"+' '+':'+' '+"Female";
    var index: any;
    this.averageSalary = 0;
    this.averageExperience = 0;
    this.averageattritionRate = 0;
    this.averageSatisfaction = 0;
    for (index in this.hrdashboardData) {
      if (this.hrdashboardData[index]['Gender'] == "Female") {
        this.averageSalary += this.hrdashboardData[index]['Salary'] / this.femaleemployeeCount;
        this.averageExperience += this.hrdashboardData[index]['Experience'] / this.femaleemployeeCount;
        this.averageattritionRate += this.hrdashboardData[index]['Attrition rate'] / this.femaleemployeeCount;
        this.averageSatisfaction += this.hrdashboardData[index]['Satisfaction Index'] / this.femaleemployeeCount;
      }
    }
  }

  getEduAverage(category,count){
    this.default = false;
    this.category = "Education"+' '+':'+' '+category;
    var index: any;
    this.averageSalary = 0;
    this.averageExperience = 0;
    this.averageattritionRate = 0;
    this.averageSatisfaction = 0;
    for (index in this.hrdashboardData) {
      if (this.hrdashboardData[index]['Education'] == category) {
        this.averageSalary += this.hrdashboardData[index]['Salary'] / count;
        this.averageExperience += this.hrdashboardData[index]['Experience'] / count;
        this.averageattritionRate += this.hrdashboardData[index]['Attrition rate'] / count;
        this.averageSatisfaction += this.hrdashboardData[index]['Satisfaction Index'] / count;
      }
    }
  }

  getAgeAverage(min,max,count){
    this.default = false;
    this.category = "Age"+' '+':'+' '+min+'-'+max;
    var index: any
    this.averageSalary = 0;
    this.averageExperience = 0;
    this.averageattritionRate = 0;
    this.averageSatisfaction = 0;
    for (index in this.hrdashboardData) {
      if (this.hrdashboardData[index]['Age Group'] >= min && this.hrdashboardData[index]['Age Group'] <= max) {
        this.averageSalary += this.hrdashboardData[index]['Salary'] / count;
        this.averageExperience += this.hrdashboardData[index]['Experience'] / count;
        this.averageattritionRate += this.hrdashboardData[index]['Attrition rate'] / count;
        this.averageSatisfaction += this.hrdashboardData[index]['Satisfaction Index'] / count;
      }
    }
  }

  getAgeAverageForty(value,count){
    this.default = false;
    this.category = "Age"+' '+':'+' '+value;
    var index: any
    this.averageSalary = 0;
    this.averageExperience = 0;
    this.averageattritionRate = 0;
    this.averageSatisfaction = 0;
    for (index in this.hrdashboardData) {
      if (this.hrdashboardData[index]['Age Group'] > value) {
        this.averageSalary += this.hrdashboardData[index]['Salary'] / count;
        this.averageExperience += this.hrdashboardData[index]['Experience'] / count;
        this.averageattritionRate += this.hrdashboardData[index]['Attrition rate'] / count;
        this.averageSatisfaction += this.hrdashboardData[index]['Satisfaction Index'] / count;
      }
    }
  }

  getAvgForEthinicity(value, count){
    this.default = false;
    this.category = "Ethnicity"+' '+':'+' '+value;
    var index: any
    this.averageSalary = 0;
    this.averageExperience = 0;
    this.averageattritionRate = 0;
    this.averageSatisfaction = 0;
    for (index in this.hrdashboardData) {
      if (this.hrdashboardData[index]['Ethinicity'] == value) {
        this.averageSalary += this.hrdashboardData[index]['Salary'] / count;
        this.averageExperience += this.hrdashboardData[index]['Experience'] / count;
        this.averageattritionRate += this.hrdashboardData[index]['Attrition rate'] / count;
        this.averageSatisfaction += this.hrdashboardData[index]['Satisfaction Index'] / count;
      }
    }
  }

  goToHrmsUsecase2(){
    this.router.navigate(['/hrms-usecase-2']);
  }

  isCardActive(item: any) {
    return this.cardSelected === item;
  }


  setDepatmentActive(item:any){
    this.cardSelected = item;
    this.departmentChart(item);
  }

  setDemographicActive(item:any){
    this.cardSelected = item;
    this.ethinicityChart(item);
  }

  setAgeActive(item:any){
    this.cardSelected = item;
    this.ageGroupChart(item);
  }

  openAttritionTable(){
    $('#myModal').modal('show');
  }

}
