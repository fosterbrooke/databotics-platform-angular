import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-boothincharge-level',
  templateUrl: './boothincharge-level.component.html',
  styleUrls: ['./boothincharge-level.component.css']
})
export class BoothinchargeLevelComponent implements OnInit {
  boothjsondata :any;
  district:any =[];
  assembly:any =[];
  districtname:any;
  boothNumbers:any;
  assemlyname:any;
  personData:any;
   name:any;
  /**Default Value */
  distdefaultname:any;
  asseblydefaultname:any;
  bootdefaultname:any;
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.distdefaultname="Chittoor";this.asseblydefaultname="Chittoor",this.bootdefaultname="Booth 70";
    this.http.get('../../assets/data/boothincharge.json').subscribe(data => {
      this.boothjsondata = data;
       var index: any;
      for (index in this.boothjsondata) {
          if (this.district.indexOf(this.boothjsondata[index].District) < 0) {
              this.district.push(this.boothjsondata[index].District);

          }

      }
            //this.distdefaultname=this.district[0];
            this. loadDefaultDistrict(this.distdefaultname, this.boothjsondata);

    });


  }
 //monika (14-02-2019)
  loadDefaultDistrict(distdefaultname, boothjsondata) {
    console.log("loadDefaultDistrict",distdefaultname);
    this.assembly = [];
    this.boothNumbers = [];
    var index: any;
    for (index in this.boothjsondata) {
        if (this.boothjsondata[index].District === distdefaultname) {

            if (this.assembly.indexOf(boothjsondata[index].Assembly) < 0) {
                this.assembly.push(boothjsondata[index].Assembly);
            }
        }
    }
    this.loadDefaultAssembly(this.distdefaultname, this.asseblydefaultname, this.boothjsondata)

}

loadDefaultAssembly(distdefaultname, asseblydefaultname, boothjsondata) {
  console.log("loadDefaultAssembly",distdefaultname,asseblydefaultname);
    this.boothNumbers = [];
  //  this.rating = [];
    var index: any;
    for (index in this.boothjsondata) {
        if (boothjsondata[index].District === distdefaultname && this.boothjsondata[index].Assembly === asseblydefaultname) {
            if (this.boothNumbers.indexOf(this.boothjsondata[index]['Booth Number']) < 0) {
                this.boothNumbers.push(this.boothjsondata[index]['Booth Number']);
            }
        }
    }

    this.loadDefaultData(this.distdefaultname, this.asseblydefaultname, this.bootdefaultname, this.boothjsondata)
}
loadDefaultData(distdefaultname, asseblydefaultname, bootdefaultname,  boothjsondata) {
  this.personData=[];
  console.log("loadDefaultData",distdefaultname, asseblydefaultname, bootdefaultname,boothjsondata);
     var index: any;
       for (index in this.boothjsondata) {
        if (this.boothjsondata[index]['Booth Number'] === this.bootdefaultname) {
            this.personData.push({
              "Name": this.boothjsondata[index].Name, "Age": this.boothjsondata[index].Age, "Phone number":
              this.boothjsondata[index]['Phone number'],"Gender":this.boothjsondata[index].Gender
            });
        }
    }
    console.log("personData",this.personData);


}
  changeDistrict(district){
    console.log("data from changeDistrict",district.currentTarget.value);
    this.assembly =[];
    this.boothNumbers=[];
    this.districtname = this.distdefaultname=district.currentTarget.value;
    var index: any;
        for (index in this.boothjsondata) {
            if (this.boothjsondata[index].District === this.districtname) {
                  if (this.assembly.indexOf(this.boothjsondata[index].Assembly) < 0) {

                  this.assembly.push(this.boothjsondata[index].Assembly);
                }
            }
        }
      // this.asseblydefaultname=this.assembly[0];
  }
  //monika (2/14/2019)
  changeAssembly(assembly){
    console.log("data from changeAssembly",assembly.currentTarget.value);
    this.boothNumbers =[];
    this.assemlyname=this.asseblydefaultname=assembly.currentTarget.value;
    var index :any;
    for(index in this.boothjsondata){
      if(this.boothjsondata[index].District ===this.distdefaultname && this.boothjsondata[index].Assembly === this.assemlyname){
        if (this.boothNumbers.indexOf(this.boothjsondata[index]['Booth Number']) < 0) {

          this.boothNumbers.push(this.boothjsondata[index]['Booth Number']);

        }

      }

    }
   // this.bootdefaultname=this.boothNumbers[0];
  }
  onChangeNumber(bootnumber){
    console.log("selected bootnumber",bootnumber.currentTarget.value)
    this.personData=[];
    this.name=this.bootdefaultname=bootnumber.currentTarget.value;
    var index:any;
    for(index in this.boothjsondata){
      if(this.boothjsondata[index]['Booth Number'] === this.name){
        if (this.personData.indexOf(this.boothjsondata[index].Name) < 0) {

          this.personData.push({
            "Name": this.boothjsondata[index].Name, "Age": this.boothjsondata[index].Age, "Phone number":
                this.boothjsondata[index]['Phone number'],"Gender":this.boothjsondata[index].Gender })
        }

      }

    }
    console.log(" this.personData", this.personData);


  }


  //monika (14-2-2019)

}
