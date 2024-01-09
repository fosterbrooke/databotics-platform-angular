import { Component, OnInit,OnChanges } from '@angular/core';
import { DatabotService } from './../../core/databot.service';
import { HttpClient } from '@angular/common/http';
import { Options,ChangeContext} from 'ng5-slider';

@Component({
  selector: 'app-poltical-statics',
  templateUrl: './poltical-statics.component.html',
  styleUrls: ['./poltical-statics.component.css']
})
export class PolticalStaticsComponent implements OnInit {
  categoryData:any;
  ConstituencyName:any =[]
  demographicname:any;
  comfortablewin:any =[];
  moderatefight:any=[];
  narrowfight:any=[];
  toughfight:any=[];
  
  changecomfortwin:any =[];
  changemoderatefight:any =[];
  changenarrowfight:any =[];
  changetoughfight:any =[];


  religion:any;
  demographicnames:any;
  demographiconeparam:any;
  demographictwoparam:any;
  demographicthreeparam:any;
  demographicfourparam:any;
  demographicfiveparam:any;

  showgender: boolean = false;
  showdemographi:boolean = false;
  showincomegroup:boolean = false;
  agegroup:boolean =false;
  laworder:boolean =false;
  logText: string = ''

  valueparamone: number = 50;
  valueparamtwo:number =50;
  valueparamthree:number =50;
  valueparamfour:number =50;
  valueparamfive:number =50;
  slidervalue:any;

  options: Options = {
    floor: 0,
    ceil: 100,

  };

 
  constructor(public databotService: DatabotService,public http: HttpClient) {

    
   }

  ngOnInit() {
   
  this.demographicnames = "Demographic"
  this.showdemographi = true;
  this.demographiconeparam ="OC";
  this.demographictwoparam ="BC";
  this.demographicthreeparam ="SC & ST";
  this.demographicfourparam = "Muslim";
  this.demographicfiveparam = "Christian";

  this.loadAttritionRate();
  }

  // ngOnChanges() {
  //   console.log(this.valueparamone)
  // }

  onUserChangeStart(changeContext: ChangeContext) {
   console.log(changeContext);
    
   this.slidervalue = changeContext
    if(this.slidervalue  < 50){

    this.moderatefight = this.changecomfortwin;
    this.narrowfight = this.changemoderatefight;
    }
    else if(this.slidervalue > 50){
      this.narrowfight = this.changetoughfight;
      this.moderatefight = this.changenarrowfight;

    }
     
   
  
      // this.toughfight = this.changemoderatefight;
      // this.moderateFight = this.changetoughfight;
      // this.comfortableFight = this.changenarrowfight;
      // this.narrowfight = this.changecomfortwin;
  

  //   console.log(this.categoryData);
  //   this.comfortableFight(this.categoryData);
  //  this.moderateFight(this.categoryData);
  //   this.narrowFight(this.categoryData);
  //   this.fightleveltTough(this.categoryData);
  }


  loadAttritionRate(){
    this.databotService.loadPoliticsData().subscribe(data => {
      this.categoryData = data;
      this.fightleveltTough(this.categoryData);
      this.moderateFight(this.categoryData);
      this.narrowFight(this.categoryData);
      this.comfortableFight(this.categoryData);
       })
      }

     


  comfortableFight(categoryData){
    var index: any;
    for (index in categoryData) {
       if(categoryData[index]['Fight Level'] == "Comfortable" ){
        this.comfortablewin.push({
          "ConstituencyName" :categoryData[index]['Constituency name'],"TDP" :categoryData[index]['TDP'],
          "YSR" :categoryData[index]['YSR'], "OTHR" :categoryData[index]['OTHR'],
        })
        
      }
  }
  this.changecomfortwin = this.comfortablewin;
  }
  
  moderateFight(categoryData){
    var index: any;
    for (index in categoryData) {
       if(categoryData[index]['Fight Level'] == "Moderate" ){
        this.moderatefight.push({
          "ConstituencyName" :categoryData[index]['Constituency name'],"TDP" :categoryData[index]['TDP'],
          "YSR" :categoryData[index]['YSR'], "OTHR" :categoryData[index]['OTHR'],
        })
      }
  }
  this.changemoderatefight= this.moderatefight;
  }

  narrowFight(categoryData){
    var index: any;
    for (index in categoryData) {
       if(categoryData[index]['Fight Level'] == "Narrow" ){
        this.narrowfight.push({
          "ConstituencyName" :categoryData[index]['Constituency name'],"TDP" :categoryData[index]['TDP'],
          "YSR" :categoryData[index]['YSR'], "OTHR" :categoryData[index]['OTHR'],
        })
  
      }
  }
  this.changenarrowfight= this.narrowfight;
  }
  


  fightleveltTough(categoryData){
    var index: any;
    for (index in categoryData) {
       if(categoryData[index]['Fight Level'] == "Tough" ){
        this.toughfight.push({
          "ConstituencyName" :categoryData[index]['Constituency name'],"TDP" :categoryData[index]['TDP'],
          "YSR" :categoryData[index]['YSR'], "OTHR" :categoryData[index]['OTHR'],
        })
       
        }
  }
  
  this.changetoughfight =  this.toughfight;    
  
}

ChaneDemographic(demographic){
  this.demographicname = demographic.currentTarget.value;
  if(this.demographicname == "Gender"){

    this.demographiconeparam ="Male";
    this.demographictwoparam ="Female";
    this.showgender = true;
    this.showdemographi =false;
    this.showincomegroup =false;
    this.agegroup = false;
    this.laworder =false;

  }

  else if(this.demographicname == "Demographic"){
    this.demographiconeparam ="OC";
    this.demographictwoparam ="BC";
    this.demographicthreeparam ="SC & ST";
    this.demographicfourparam = "Muslim";
    this.demographicfiveparam = "Christian";
    this.showdemographi =true;
    this.showgender = false;
    this.showincomegroup =false;
    this.agegroup = false;
    this.laworder =false;
    

  }

  else if(this.demographicname == "Income Group"){
    this.demographiconeparam ="More than 1,00,000";
    this.demographictwoparam ="Between 99,999 & 50,0000";
    this.demographicthreeparam ="Between 49,999 & 25,000";
    this.demographicfourparam = "Between 24,999 & 10,000";
    this.demographicfiveparam = "Less then 10,000";
    this.showincomegroup =true;
    this.showdemographi =false;
    this.showgender = false;
    this.agegroup = false;
    this.laworder =false;
    
    

  }
  else if(this.demographicname == "Age Group"){
    this.demographiconeparam ="Above 60";
    this.demographictwoparam ="Between 45-60";
    this.demographicthreeparam ="Between 30-45";
    this.demographicfourparam = "Between 20-30";
    this.demographicfiveparam = "Between 18-20";
    this.agegroup = true;
    this.showincomegroup =false;
    this.showdemographi =false;
    this.showgender = false;
    this.laworder =false;
    
 }

 else if(this.demographicname == "Major Concern"){
  this.demographiconeparam ="Agriculture";
  this.demographictwoparam ="Jobs";
  this.demographicthreeparam ="Infrastructure";
  this.demographicfourparam = "Law & Order";
  this.demographicfiveparam = "Governance";
  this.laworder =true;
  this.agegroup = false;
  this.showincomegroup =false;
  this.showdemographi =false;
  this.showgender = false;
  
}

}

  // demographic(item){
  //   this.demographicname = item.currentTarget.value
  //   console.log(this.demographicname)
    
  // }
  
}
