import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-warehouse-overview',
  templateUrl: './warehouse-overview.component.html',
  styleUrls: ['./warehouse-overview.component.css']
})
export class WarehouseOverviewComponent implements OnInit {
  jsondata: any;
  regions: any = [];
  states: any;
  warehouses: any;
  selectedRegion: any;
  selectedState: any;
  regionname: any;
  statename: any;
  warehousename: any;

  cashtocashtime: any;
  customerordertime: any;
  supplychaintime: any;
  inventorydays: any;
  region :any;
  constructor(public http: HttpClient) { 
    this.regionname ="South";
    this.statename ="Florida";
    this.warehousename= "Warehouse 100143"
  }

  ngOnInit() {
    
    this.getDropdownData();  
  }
  
  
  getDropdownData() {
    this.http.get('../../assets/data/warehouse.json').subscribe(data => {
      // console.log(data);
      this.jsondata = data;
      // console.log(this.jsondata)
      var index: any;
      for (index in this.jsondata) {

        if (this.regions.indexOf(this.jsondata[index].Region) < 0) {
          this.regions.push(this.jsondata[index].Region);

        }
       
      }
      this.loaddefaultstate(this.jsondata,this.regionname);
    });
  }

  loaddefaultstate(jsondata,regionname){

    var index: any;
    this.states = [];
    for (index in jsondata) {
      if (jsondata[index].Region === regionname) {
        
        if (this.states.indexOf(jsondata[index].State) < 0) {
          this.states.push(jsondata[index].State);
          

        }
      }
    }

    this.loaddefaultwarehouse(jsondata,regionname, this.statename)
}
loaddefaultwarehouse(jsondata,regionname,statename){
  var index: any;
  this.warehouses = [];
  for (index in jsondata) {
    if (jsondata[index].State === statename && jsondata[index].Region === regionname) {
      if (this.warehouses.indexOf(jsondata[index].WareHouse) < 0) {
        this.warehouses.push(jsondata[index].WareHouse);

        
      }
    }
  }
  this.loaddefaultdata(jsondata,regionname,statename,this.warehousename)

}
loaddefaultdata(jsondata,regionname,statename,warehousename){
  var index: any;
    var $this = this;
    for (index in jsondata) {
      if (jsondata[index].State ===statename && jsondata[index].Region === regionname &&
             jsondata[index].WareHouse === warehousename) {
              $this.cashtocashtime = jsondata[index]['Cash to Cash Cycle Time'];
              $this.supplychaintime = jsondata[index]['Supply Chain cycle Time'];
              $this.customerordertime = jsondata[index]['Customer Order Cycle Time'];
              $this.inventorydays = jsondata[index]['Inventory Days of Supply'];

              console.log($this.cashtocashtime + '' + $this.supplychaintime + '' + $this.customerordertime + '' + $this.inventorydays);
      } else {
        // console.log('hihiohi');
      }
    }
}


  changeRegion(region) {
    var regionname = this.selectedRegion = region.currentTarget.value;
    var index: any;
    this.states = [];
    for (index in this.jsondata) {
      if (this.jsondata[index].Region === regionname) {
        
        if (this.states.indexOf(this.jsondata[index].State) < 0) {
          this.states.push(this.jsondata[index].State);
          console.log(this.jsondata[index].State)

        }
      }
    }
  }


  changeState(state) {
    var statename = this.selectedState = state.currentTarget.value;
    var index: any;
    this.warehouses = [];
    for (index in this.jsondata) {
      if (this.jsondata[index].State === statename && this.jsondata[index].Region === this.selectedRegion) {
        if (this.warehouses.indexOf(this.jsondata[index].WareHouse) < 0) {
          this.warehouses.push(this.jsondata[index].WareHouse);

          console.log(this.jsondata[index].WareHouse)
        }
      }
    }
  }

  changeWarehouse(warehouse) {
    var warehousename = warehouse.currentTarget.value;
    var index: any;
    var $this = this;
    for (index in this.jsondata) {
      if (this.jsondata[index].State === this.selectedState && this.jsondata[index].Region === this.selectedRegion &&
              this.jsondata[index].WareHouse === warehousename) {
              $this.cashtocashtime = this.jsondata[index]['Cash to Cash Cycle Time'];
              $this.supplychaintime = this.jsondata[index]['Supply Chain cycle Time'];
              $this.customerordertime = this.jsondata[index]['Customer Order Cycle Time'];
              $this.inventorydays = this.jsondata[index]['Inventory Days of Supply'];

              console.log($this.cashtocashtime + '' + $this.supplychaintime + '' + $this.customerordertime + '' + $this.inventorydays);
      } else {
        // console.log('hihiohi');
      }
    }
  }


}
