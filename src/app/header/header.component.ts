import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteService } from '../service/route.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  childmessage: string = "I am passed from Parent to child component"
  title: any;
  userId: any;
  previous: any;
  backUrl: Boolean = false;
  currentUrl: any;
  username: any;
  menushow = false;

  constructor(private router: Router, private routerService: RouteService, private changeRef: ChangeDetectorRef) {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('userid');
    if (localStorage.getItem('title') == "" || localStorage.getItem('title') == null || localStorage.getItem('title') == undefined) {
      this.title = '';
    } else {
      this.title = localStorage.getItem('title');
    }
    if (this.username!=='melrosepark') {
      this.menushow = true;
    }


  }

  ngOnInit() {
    this.loadIndustries();

  //   this.currentUrl = this.routerService.getCurrentUrl();
  //   var URL = this.currentUrl;
  //   var fleetmaticsURL = URL.split('?');
  //   fleetmaticsURL = fleetmaticsURL[0];
  //   var fleetmatics = '/fleetmatics?vehicle=%22357812091510963%22&drivername=%22Frank%20Perry%22&location=%2223446%20Ridge%20Rd,%20Minerva,%20OH%2044657,%20USA%22&driverid=390510&searchfromdate=1569409755524&searchtodate=1569496155524';
  //   if ((this.currentUrl == '/productionusecase') || (this.currentUrl == '/telematicsusecase')  || (this.currentUrl == '/supplyusercase') || (this.currentUrl == '/vendor-manager')
  //     || (this.currentUrl == '/reportusecase') || (this.currentUrl == '/humancapital')
  //     || (this.currentUrl == '/healthusecase') || (this.currentUrl == '/hrms-usecase-2') || (this.currentUrl == '/healthcare-analytics') 
  //     || (this.currentUrl == '/inventory') || (this.currentUrl == '/inventormap') || (this.currentUrl == '/stocktracking') || (fleetmaticsURL == '/fleetmatics') || (fleetmaticsURL == '/vendor-home') || (fleetmaticsURL == '/healthcare-covid') 
  //     || (fleetmaticsURL == '/forecasting') || (this.currentUrl == '/consumption') || (this.currentUrl == '/management')) {
  //     this.backUrl = true;
  //   }
  //   if((this.currentUrl == '/fleetmatic')){
  //     this.backUrl = true;
  //   }
  this.currentUrl = this.routerService.getCurrentUrl();
    console.log(this.currentUrl);
    if(this.currentUrl.includes("?")){
      this.currentUrl = this.currentUrl.split("?")[0]
    }else{
      this.currentUrl = this.currentUrl;
    }
    var fleetmatics =
      "/fleetmatics?vehicle=%22357812091510963%22&drivername=%22Frank%20Perry%22&location=%2223446%20Ridge%20Rd,%20Minerva,%20OH%2044657,%20USA%22&driverid=390510&searchfromdate=1569409755524&searchtodate=1569496155524";
    if (
      this.currentUrl == "/productionusecase" ||
      this.currentUrl == "/telematicsusecase" ||
      this.currentUrl == "/supplyusercase" ||
      this.currentUrl == "/vendor-manager" ||
      this.currentUrl == "/reportusecase" ||
      this.currentUrl == "/humancapital" ||
      this.currentUrl == "/operations" ||
      this.currentUrl == "/performance" ||
      this.currentUrl == "/healthusecase" ||
      this.currentUrl == "/hrms-usecase-2" ||
      this.currentUrl == "/healthcare-analytics" ||
      this.currentUrl == "/inventory" ||
      this.currentUrl == "/inventormap" ||
      this.currentUrl == "/stocktracking" ||
      this.currentUrl == "/fleetmatics" ||
      this.currentUrl == "/vendor-home" ||
      this.currentUrl == "/healthcare-covid" ||
      this.currentUrl == "/forecasting" ||
      this.currentUrl == "/consumption" ||
      this.currentUrl == "/management" ||
      this.currentUrl == "/fleetmatic"
    ) {
      this.backUrl = true;
      this.changeRef.detectChanges();
    }
   }

  previousUrl() {
     const referrer = this.routerService.getPreviousUrl();
     console.log(referrer);
     this.previous= this.router.navigate([referrer]);
  }

  loadIndustries() {
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }

  logOut() {
    this.router.navigate(['/login']);
    localStorage.removeItem('title');
    localStorage.removeItem('userid');
    sessionStorage.removeItem('usecase');
    sessionStorage.removeItem('reportusecase');
    localStorage.removeItem('username');
  }

  showDashBoard() {
    this.router.navigate(["/industries" + "/home"]);
    localStorage.removeItem('title');
    sessionStorage.removeItem('usecase');
    sessionStorage.removeItem('reportusecase');


  }

  showSideMenu() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }


  sidenavChange(count) {
    console.log(count);
}

}
