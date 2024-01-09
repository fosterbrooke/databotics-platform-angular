import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-health-care-analytics',
  templateUrl: './health-care-analytics.component.html',
  styleUrls: ['./health-care-analytics.component.css']
})
export class HealthCareAnalyticsComponent implements OnInit, OnDestroy {
  title: any;
  
  constructor(public route: ActivatedRoute) {
    var heading = this.route.snapshot.queryParamMap.get("title");
    if(heading == null || heading == ""){
      localStorage.setItem('title',"Health Care Analytics");
    }else{
      localStorage.setItem("title",heading);
    }

    if (localStorage.getItem('title') == "" || localStorage.getItem('title') == null || localStorage.getItem('title') == undefined) {
      this.title = '';
    } else {
      this.title = localStorage.getItem('title');
    }

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    localStorage.removeItem("title");
  }

}
