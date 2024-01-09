import { Component, OnInit, EventEmitter, Output, OnChanges, HostListener } from '@angular/core';
declare function require(path: string);
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.css']
})
export class IndustriesComponent implements OnInit, OnChanges {
  someProperty = false;
  show: boolean = false;
  showHealth: boolean = false;
  showManufacturing: boolean = false;
  showTextile: boolean = false;
  showEnergy: boolean = false;
  usecase: boolean = false;
  health: boolean = false;
  showpsephology: boolean = false;
  UseCaseTypeValue: any = 0;
  showreport: boolean = false;
  userId: any;
  showEng: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.userId = localStorage.getItem('userid');
    
    route.params.subscribe(val => {
      if (val.id == 'home') {
        //var usecase = localStorage.removeItem('usecase');
        var usecase = sessionStorage.removeItem('usecase');
        sessionStorage.removeItem('reportusecase');
        this.usecase = false;
      } else {
        //var usecase1 = localStorage.getItem('usecase');
        var usecase1 = sessionStorage.getItem('usecase');
        this.showUseCase(usecase1);
      }
    });

    
    }

  ngOnInit() {
    this.userId = sessionStorage.getItem("userId");
  }
  ngOnChanges() {
    const jsonString: string = this.route.snapshot.queryParamMap.get('homepage');
    if(jsonString)
    {
      //var usecase = localStorage.removeItem('usecase');
      var usecase = sessionStorage.removeItem('usecase');
     this.usecase = false;
    }else { 
      //var usecase1 = localStorage.getItem('usecase');
      var usecase1 = sessionStorage.getItem('usecase');
      this.showUseCase(usecase1);
    }
  }

  showUseCase(useCaseType) {
    
    this.router.navigate(['/industries'], {
      queryParams: {
        id: null,
      },
      queryParamsHandling: 'merge'
    })

      this.UseCaseTypeValue = useCaseType;
      //localStorage.setItem('usecase',this.UseCaseTypeValue);
      sessionStorage.setItem('usecase', this.UseCaseTypeValue);
    if (useCaseType == 1) {
      this.show = true
      this.showHealth = false
      this.showManufacturing = false
      this.showTextile = false;
      this.showEnergy = false;
      this.showpsephology = false;
      this.showEng = false;
      this.usecase = true;
    }
    else if (useCaseType == 2) {
      this.showHealth = true
      this.show = false
      this.showManufacturing = false;
      this.showTextile = false;
      this.showEnergy = false;
      this.showpsephology = false;
      this.showEng = false;
      this.usecase = true;
    }
    else if (useCaseType == 3) {
      this.showManufacturing = true
      this.show = false
      this.showHealth = false;
      this.showTextile = false;
      this.showEnergy = false;
      this.showpsephology = false;
      this.showEng = false;
      this.usecase = true;
    }

    else if (useCaseType == 4) {
      this.showTextile = true
      this.show = false
      this.showHealth = false;
      this.showEnergy = false;
      this.showManufacturing = false;
      this.showpsephology = false;
      this.showEng = false;
      this.usecase = true;
    }

    else if (useCaseType == 5) {
      this.showEnergy = true;
      this.show = false
      this.showHealth = false;
      this.showManufacturing = false;
      this.showTextile = false;
      this.showpsephology = false;
      this.showEng = false;
      this.usecase = true;
    }
    else if (useCaseType == 6) {
      this.showpsephology = true;
      this.showEnergy = false;
      this.show = false
      this.showHealth = false;
      this.showManufacturing = false;
      this.showTextile = false;
      this.showEng = false;
      this.usecase = true;
    }

    else if (useCaseType == 7) {
      this.showEng = true;
      this.showpsephology = false;
      this.showEnergy = false;
      this.show = false
      this.showHealth = false;
      this.showManufacturing = false;
      this.showTextile = false;
      this.usecase = true;
    }

  }

  // @HostListener("window:onbeforeunload",["$event"])
  // clearLocalStorage(event){
  //   localStorage.removeItem('usecase');
  // }
}
