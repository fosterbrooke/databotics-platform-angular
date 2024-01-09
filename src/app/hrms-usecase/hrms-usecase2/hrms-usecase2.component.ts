import { DatabotService } from './../../core/databot.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'angular-highcharts';
import { Highcharts } from 'angular-highcharts';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hrms-usecase2',
  templateUrl: './hrms-usecase2.component.html',
  styleUrls: ['./hrms-usecase2.component.css']
})
export class HrmsUsecase2Component implements OnInit, OnDestroy {
  onboardingDetaols: any;
  hiringPlan: any
  hiringPlanObjData: any;
  costofHiringChart: any;
  yieldratioChart: any;
  options: any;
  isClicked: boolean = false;
  selectedItem:number;
  constructor(private http: HttpClient, public databotService: DatabotService,private router : Router, public route: ActivatedRoute) {
    var heading = this.route.snapshot.queryParamMap.get("title");
    if(heading == null || heading == ""){
      localStorage.setItem('title',"Hiring Module");
    }else{
      localStorage.setItem("title",heading);
    }
    this.onboardingDetaols = [
      {
        "Onbording": 10,
        "Primary": "Guglielmo",
        "Department": "Engineering",
        "Start Dates": "18/04/18",
        "Job Title": "Engineering",

      },
      {
        "Onbording": 20,
        "Primary": "Heathfield",
        "Department": "Sales",
        "Start Dates": "11/06/18",
        "Job Title": "VP of Sales",

      },
      {
        "Onbording": 30,
        "Primary": "Lainey Bolus",
        "Department": "Legal",
        "Start Dates": "12/07/18",
        "Job Title": "Sales Man",

      },
      {
        "Onbording": 40,
        "Primary": "Ami Cozens",
        "Department": "Engineering",
        "Start Dates": "15/08/18",
        "Job Title": "Senior Bus",

      },
      {
        "Onbording": 50,
        "Primary": "Binnie Murkus",
        "Department": "Marketing",
        "Start Dates": "18/09/18",
        "Job Title": "BA ",

      },
      {
        "Onbording": 60,
        "Primary": "Nixie Celiz",
        "Department": "Enoineera",
        "Start Dates": "7/11/18",
        "Job Title": "Sales Man",

      },
      {
        "Onbording": 70,
        "Primary": "Miles Hendrick",
        "Department": "Marketing",
        "Start Dates": "2/03/18",
        "Job Title": "Developer",

      },
      {
        "Onbording": 55,
        "Primary": "Eydie Winfrey",
        "Department": "Engineering",
        "Start Dates": "1/03/18",
        "Job Title": "HR",

      },
    ];
  }

  ngOnInit() {
    //Onbording_Status
    this.databotService.loadHrHiringDashboard().subscribe(data => {
      this.hiringPlan = data;
      this.hiringPlanObjData = data[2];
      this.isClicked = true;
      console.log(" this.hiringPlan ", this.hiringPlan);
    });
    this.databotService.loadHiringOnboarding().subscribe(data => {
      this.onboardingDetaols = data;

      console.log("  this.onboardingDetaols ", this.onboardingDetaols);
    });

    this.onboardingDetaols;
    this.loadyieldChart();
    this.loadHiringChart();
  }

  ngOnDestroy(){
    localStorage.removeItem("title");
  }

  loadyieldChart() {
    this.options = {
      chart: {
        type: 'column',
        height: 193,
        style: {
          fontFamily: 'Ubuntu,sans-serif'
        }

      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        labels: {
          enabled: true
        }
      },
      yAxis: {
        // title: { text: 'Total percent market share' },

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
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },
      series: [
        {
          name: 'Categories',
          data: [
            {
              name: 'Dice',
              y: 30,
              color: '#a8b3cf'
            },
            {
              name: 'Indeed',
              y: 20,
              color: '#a8b3cf'
            },
            {
              name: 'Employee Referral',
              y: 10,
              color: '#a8b3cf'
            },
            {
              name: 'Website Posting',
              y: 15,
              color: '#a8b3cf'
            },
            {
              name: 'Social Media',
              y: 25,
              color: '#a8b3cf'
            }
          ]
        }
      ],
      credits: {
        enabled: null
      }
    };
    this.yieldratioChart = new Chart(this.options);
  }

  loadHiringChart() {
    this.options = {
      chart: {
        type: 'column',
        height: 193,
        style: {
          fontFamily: 'Ubuntu,sans-serif'
        }

      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        labels: {
          enabled: true
        }
      },
      yAxis: {
        //  title: { text: 'Total percent market share' },

        stackLabels: {
          enabled: false,
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
            enabled: true,
            format: '${point.y:.1f}'
          }
        }
      },
      series: [
        {
          name: 'Categories',
          data: [
            {
              name: 'Dice',
              y: 3000,
              color: '#a8b3cf'
            },
            {
              name: 'Indeed',
              y: 2000,
              color: '#a8b3cf'
            },
            {
              name: 'Employee Referral',
              y: 1500,
              color: '#a8b3cf'
            },
            {
              name: 'Website Posting',
              y: 1200,
              color: '#a8b3cf'
            },
            {
              name: 'Social Media',
              y: 1400,
              color: '#a8b3cf'
            }
          ]
        }
      ],
      credits: {
        enabled: null
      }
    };
    this.costofHiringChart = new Chart(this.options);
  }

  onClickHiring(id,data) {
    this.isClicked = true;
    this.selectedItem = id;
    this.hiringPlanObjData = data;
    console.log("Data coming from", this.hiringPlanObjData);
  }

  hrmsOverview(){
    this.router.navigate(['./hrms-usecase-1']);
  }

}
