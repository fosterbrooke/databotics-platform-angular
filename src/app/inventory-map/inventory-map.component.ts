import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
declare const google: any;
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-inventory-map',
  templateUrl: './inventory-map.component.html',
  styleUrls: ['./inventory-map.component.css']
})
export class InventoryMapComponent implements OnInit, OnDestroy {
  dist = true;
  trackorder = false;
  selected: any
  map: any;
  warehousename: any;
  distributors: any
  rate: any = 100
  qty: any;
  newCurrentLocation: any;

  inventorydata: any

  /**Drop downs */
  categories: any =[];
  vehicle: any;
  spare: any;
  spare_part: any;
  categoryname: any;
  vehiclename; any;
  sparename: any;
  esttime: any;
  city: any;
  state: any;
  country: any;
  /**New */
  jsondata: any;
  selectcategory:any;

  stockitem: any;
  sparepart:any;
  selectedItem:any;

  categorydefaultname:any;
  stockItemdefaultname:any;
  sparepartdefaultname: any;
  availability:any;
  sparevalue:any ="Battery"
  title: any;

  constructor(public http: HttpClient, public route: ActivatedRoute) {
    var heading = this.route.snapshot.queryParamMap.get("title");
    if(heading == null || heading == ""){
      localStorage.setItem('title',"Stock Availability");
    }else{
      localStorage.setItem("title",heading);
    }
    this.categorydefaultname ="M Category";
    this.stockItemdefaultname ="M559";
    this.sparepartdefaultname ="Battery"
    if (localStorage.getItem('title') == "" || localStorage.getItem('title') == null || localStorage.getItem('title') == undefined) {
      this.title = '';
    } else {
      this.title = localStorage.getItem('title');
    }

   

}

  ngOnInit() {
    // this.categoryname = 'D Category';
    this.http.get('../../assets/data/stock.json').subscribe(data => {
      this.jsondata = data;
      // this.distributors = data['LOCATIONS'];
       var index: any;
      for (index in this.jsondata) {

        if (this.categories.indexOf(this.jsondata[index].Category) < 0) {
          this.categories.push(this.jsondata[index].Category);


        }
        this.loaddefaultcategory(this.categories,this.jsondata)
      }
     });

  }

  ngOnDestroy(){
    localStorage.removeItem("title");
  }

  loaddefaultcategory(category,jsondata){

    // this.getsparenames(categoryname)
    var index: any;
    this.stockitem = [];
    this.sparepart = [];
    for (index in this.jsondata) {
      if (jsondata[index].Category === this.categorydefaultname) {

        if (this.stockitem.indexOf(jsondata[index].Item) < 0) {
          this.stockitem.push(jsondata[index].Item);
         }
        }
    }

    this.loaddefaulteStock(jsondata,this.categorydefaultname,this.stockItemdefaultname)
}

loaddefaulteStock(jsondata,categorydefaultname,stockItemdefaultname){


  var index: any;
  // this.sparepart = [];
  for (index in jsondata) {
    if (jsondata[index].Item === stockItemdefaultname && jsondata[index].Category === categorydefaultname) {
      if (this.sparepart.indexOf(jsondata[index].Spare) < 0) {
        this.sparepart.push(jsondata[index].Spare);

        // console.log(this.jsondata[index].sparepart)
      }
    }
  }
  this.defaultSparePart(jsondata,categorydefaultname,stockItemdefaultname,this.sparepartdefaultname);
}

defaultSparePart(jsondata,categorydefaultname,stockItemdefaultname,sparepartdefaultname){
  var index: any;
  //  this.sparepart = [];
  for (index in jsondata) {
    if (jsondata[index].Item === stockItemdefaultname && jsondata[index].Category === categorydefaultname && jsondata[index].Spare === sparepartdefaultname) {
      this.availability =this.jsondata[index].Availabilty
      this.distributors = this.jsondata[index].Locations
      this.loadmap(this.distributors)
    }
  }
}

  changecategory(category) {

    var categoryname = this.categorydefaultname = category.currentTarget.value;
   var index: any;
    this.stockitem = [];
    this.sparepart = [];
    for (index in this.jsondata) {
      if (this.jsondata[index].Category === categoryname) {

        if (this.stockitem.indexOf(this.jsondata[index].Item) < 0) {
          this.stockitem.push(this.jsondata[index].Item);
         }
        }
    }
   }

   changeStock(item) {

    var stockitemname = this.selectedItem = item.currentTarget.value;
     var index: any;
    this.sparepart = [];
    for (index in this.jsondata) {
      if (this.jsondata[index].Item === stockitemname && this.jsondata[index].Category === this.categorydefaultname) {
        if (this.sparepart.indexOf(this.jsondata[index].Spare) < 0) {
          this.sparepart.push(this.jsondata[index].Spare);
          // console.log(this.sparepart)
          // alert(this.sparepart)
          }
      }
    }
  }

  changesparepart(event){
    var spare = this.sparevalue = event.currentTarget.value;
    var index;
    for (index in this.jsondata) {
      if (this.jsondata[index].Item === this.selectedItem && this.jsondata[index].Category === this.categorydefaultname && this.jsondata[index].Spare === spare) {

        this.availability =this.jsondata[index].Availabilty
        this.distributors = this.jsondata[index].Locations
          this.loadmap(this.distributors)



      }
    }

  }


loadmap(distributors) {
    var $this = this;

    // alert("hii")
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: new google.maps.LatLng(31.129707, -99.357130),
      // center:myLatlng
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false
    });

    var infowindow = new google.maps.InfoWindow();
    var marker;
    var i;
    var image = {
      url: '../../assets/images/warehouse.png',
      // This marker is 50 pixels wide by 50 pixels high.
      scaledSize: new google.maps.Size(50, 50),
      // The origin for this image is (0, 0).
    };

    for (i = 0; i < distributors.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(distributors[i].latitude, distributors[i].longtitude),
        map: this.map,
        icon:image
        // title: this.fleetMap[i].latlong[0].unit_number
      });


      attachSecretMessage(marker, distributors[i].est, distributors[i].warehouse, distributors[i].latitude, distributors[i].longtitude,distributors[i].availibility);
    }

    function attachSecretMessage(marker, est, warehouse, lat, long, availability) {
      var geocoder = new google.maps.Geocoder();
      marker.addListener('click', function () {
        var latlong1 = new google.maps.LatLng(lat, long);
        geocoder.geocode({ 'location': latlong1 }, function (res, status) {
          if (status == 'OK') {

            var currentLocation = res[0].address_components[2].long_name;
            $this.city = currentLocation;
            $this.state = res[0].address_components[4].long_name;
            $this.country = res[0].address_components[5].long_name;

            $this.esttime = est;
            infowindow = new google.maps.InfoWindow({
              content: '<b><p style="color:blue;text-weight:bold">' + warehouse + '</p></b>' +
                '<b><p style="color:blue;text-weight:bold">' + est + '</p></b>' +
                '<b><p style="color:blue;text-weight:bold">' + $this.city + '</p></b>'

            });
            $this.warehousename = warehouse;
            $this.availability = availability;
            // alert(this.warehousename)
            infowindow.open(this.map, marker);

          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
          marker.addListener('mouseout', function() {
            infowindow.close(marker.get('map'), marker);
          });
        });
      });


      marker.addListener('dblclick', function (mouseEvent) {
        // alert('Right click triggered');
        // this.map.setCenter(this.position);
        $(".modal-header .modal-title").text(this.title);
        //  $(".modal-body #modalLatLng").text(this.position);
        $('#myModal').modal('show');


      });
    }


  }



}
