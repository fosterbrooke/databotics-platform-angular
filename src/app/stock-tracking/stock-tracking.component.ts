import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
declare const google: any;
import { HttpClient } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { RouteService } from '../service/route.service'
declare var $: any;

@Component({
  selector: 'app-stock-tracking',
  templateUrl: './stock-tracking.component.html',
  styleUrls: ['./stock-tracking.component.css']
})
export class StockTrackingComponent implements OnInit, OnDestroy {
  jsondata: any;
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
  categories: any = [];
  vehicle: any;
  spare: any;
  spare_part: any;
  categoryname: any;
  vehiclename; any;
  sparename: any;
  esttime: any;
  storeid: any;
  city: any;
  state: any;
  country: any;
  /** New */
  selectedRegion: any;
  stockitem: any;
  catehoryname: any;
  stockname:any;
  selectedItem:any
  stockitemname:any;
  sparepart:any;
  categorydefaultname:any;
  stockItemdefaultname:any;
  sparepartdefaultname: any;

  selectedcategory:any;
  title: any; 




  constructor(public http: HttpClient, public route: RouteService, public actroute: ActivatedRoute) {
    var heading = this.actroute.snapshot.queryParamMap.get("title");
    if(heading == null || heading == ""){
      localStorage.setItem('title',"Order Tracking");
    }else{
      localStorage.setItem("title",heading);
    }

    if (localStorage.getItem('title') == "" || localStorage.getItem('title') == null || localStorage.getItem('title') == undefined) {
      this.title = '';
    } else {
      this.title = localStorage.getItem('title');
    }
    this.categorydefaultname ="M Category";
    this.stockItemdefaultname ="M559";
    this.sparepartdefaultname ="Battery";
}

  ngOnInit() {


    // this.categoryname = 'D Category';
    this.stockname =1

    this.http.get('../../assets/data/stock.json').subscribe(data => {
      this.jsondata = data

      var index: any;
      for (index in this.jsondata) {

        if (this.categories.indexOf(this.jsondata[index].Category) < 0) {
          this.categories.push(this.jsondata[index].Category);
          // console.log(this.categories)

        }
       this.loaddefaultcategory(this.categories,this.jsondata)
      }


    });
    this.loadmap();
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
  // this.sparepart = [];
  for (index in jsondata) {
    if (jsondata[index].Item === stockItemdefaultname && jsondata[index].Category === categorydefaultname && jsondata[index].Spare === sparepartdefaultname) {
    //  this.loadmap();
    }
  }
}

  changecategory(category) {
    var categoryname = this.categorydefaultname = category.currentTarget.value;
    // this.getsparenames(categoryname)
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


          // console.log(this.jsondata[index].sparepart)


        }
      }
    }
  }

  changesparepart(event){
    var sparevalue = event.currentTarget.value;
    var index;
    for (index in this.jsondata) {
      if (this.jsondata[index].Item === this.stockItemdefaultname && this.jsondata[index].Category === this.categorydefaultname && this.jsondata[index].Spare === sparevalue) {
     this.loadmap();
      }
    }

  }





//   getsparenames(catehoryname) {
//     var index: any;
//     this.spare = [];
//     for (index in this.jsondata) {
//       if (this.jsondata[index].Category === catehoryname) {

//         if (this.spare.indexOf(this.jsondata[index].Spare) < 0) {
//           this.spare.push(this.jsondata[index].Spare);



//         }


//       }
//     }
// }


loadmap(){


  this.http.get('../../assets/data/location.json').subscribe(res => {
    var newmapdata = res;


    this.newMapData(newmapdata);
  });
}

newMapData(newmapdata) {
  // console.log(JSON.stringify(newmapdata) + "value");
  var lat_lng = new Array();

  // let that;


  for (var i = 0; i < newmapdata.length; i++) {
    var lat = newmapdata[i].Latitude;
    var long = newmapdata[i].Longitude;
    var myLatlng = new google.maps.LatLng(lat, long);
    var map = new google.maps.Map(document.getElementById('Map'), {
      zoom: 8,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      }

    });
    lat_lng.push(myLatlng);
    var image = {
      url: '../../assets/images/warehouse.png',
      // This marker is 50 pixels wide by 50 pixels high.
      scaledSize: new google.maps.Size(50, 50),
      // The origin for this image is (0, 0).
    };

    var imagetruck = {
      url: '../../assets/images/truck_top.png',
      // This marker is 50 pixels wide by 50 pixels high.
      scaledSize: new google.maps.Size(30, 30),
      // The origin for this image is (0, 0).
    };


    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, long),
      map: map,
      icon: imagetruck,
    });
    var marker1 = new google.maps.Marker({
      position: new google.maps.LatLng(32.542, -93.604),
      map: map,
      icon: image,
    });

    // var infowindow = new google.maps.InfoWindow({
    //   content: '<b><p style="color:red;text-weight:bold">Tire Position:' + JSON.stringify(tirepos) + '</p></b>' +
    //     '<b><p style="color:red;text-weight:bold">Tire Pressure:' + JSON.stringify(tirepsi) + '</p></b>'


    // });
    var infowindow1 = new google.maps.InfoWindow({
      content: '<b><p style="color:black">1</p>'


    });
    // infowindow.open(map, marker);
    infowindow1.open(map, marker1);

    setInterval(function () {
      map.panTo(marker.getPosition());
    }, 5000);
  }

  var service = new google.maps.DirectionsService();
  var delayFactor = 0;

  function m_get_directions_route(request, latlong) {
    service.route(request, function (result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        //Process you route here
        var path = new google.maps.MVCArray();

        var polylineoptns = {
          strokeOpacity: 0.8,
          strokeWeight: 3,
          strokeColor: "blue",
          map: map,
        };


        var poly = new google.maps.Polyline(polylineoptns);
        poly.setPath(path);

        var infowindow_polygon_1 = new google.maps.InfoWindow({ content: 'Stock' });
        google.maps.event.addListener(poly, "mouseover", function (event) {
          this.setOptions({ fillColor: "#00FF00" });
          infowindow_polygon_1.setPosition(event.latLng);
          infowindow_polygon_1.open(map);
        });
        google.maps.event.addListener(poly, "mouseout", function (event) {
          this.setOptions({ fillColor: "#00FF00" });
          //infowindow_polygon_1.setPosition(event.latLng);
          infowindow_polygon_1.close(map);
        });

        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
          path.push(result.routes[0].overview_path[i]);
          marker.setPosition(result.routes[0].overview_path[i]);
        }
      } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
        delayFactor++;
        setTimeout(function () {
          m_get_directions_route(request, latlong);
        }, delayFactor * 1000);
      } else {
        //console.log("Route: " + status);
      }
    });
  }


  for (i = 0; i < lat_lng.length; i++) {
    if ((i + 1) < lat_lng.length) {
      var src = lat_lng[i];
      var des = lat_lng[i + 1];
      var request = {
        origin: src,
        destination: des,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      };


      m_get_directions_route(request, lat_lng);

    }
  }


}

// getstock(catehoryname) {
//   var index: any;
//   this.stocks = [];
//   for (index in this.jsondata) {
//     if (this.jsondata[index].Category === catehoryname) {

//       if (this.stocks.indexOf(this.jsondata[index].StockID) < 0) {
//         this.stocks.push(this.jsondata[index].StockID);



//       }


//     }
//   }
// }






  // loadDefaultData(inventorydefault) {
  //   for (let i = 0; i < inventorydefault.length; i++) {
  //     if (inventorydefault[i].main_value === this.categoryname) {
  //       this.distributors = inventorydefault[i].Locations;
  //       this.spare_part = this.categoryname;
  //       this.loadmap(this.distributors);
  //     }
  //   }
  // }

  // loadmap(distributors) {
  //   var $this = this;

  //   // alert("hii")
  //   this.map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 5,
  //     center: new google.maps.LatLng(31.129707, -99.357130),
  //     // center:myLatlng
  //     mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     mapTypeControl: false,
  //     streetViewControl: false
  //   });

  //   var infowindow = new google.maps.InfoWindow();
  //   var marker;
  //   var i;
  //   for (i = 0; i < distributors.length; i++) {
  //     marker = new google.maps.Marker({
  //       position: new google.maps.LatLng(distributors[i].latitude, distributors[i].longtitude),
  //       map: this.map,
  //       // title: this.fleetMap[i].latlong[0].unit_number
  //     });


  //     attachSecretMessage(marker, distributors[i].est, distributors[i].warehouse, distributors[i].latitude, distributors[i].longtitude);
  //   }

  //   function attachSecretMessage(marker, est, warehouse, lat, long) {
  //     var geocoder = new google.maps.Geocoder();
  //     marker.addListener('click', function () {
  //       var latlong1 = new google.maps.LatLng(lat, long);
  //       geocoder.geocode({ 'location': latlong1 }, function (res, status) {
  //         if (status == 'OK') {

  //           var currentLocation = res[0].address_components[2].long_name;
  //           $this.city = currentLocation;
  //           $this.state = res[0].address_components[4].long_name;
  //           $this.country = res[0].address_components[5].long_name;

  //           $this.esttime = est;
  //           infowindow = new google.maps.InfoWindow({
  //             content: '<b><p style="color:blue;text-weight:bold">' + warehouse + '</p></b>' +
  //               '<b><p style="color:blue;text-weight:bold">' + est + '</p></b>' +
  //               '<b><p style="color:blue;text-weight:bold">' + $this.city + '</p></b>'

  //           });
  //           $this.warehousename = warehouse;
  //           // alert(this.warehousename)
  //           infowindow.open(this.map, marker);

  //         } else {
  //           alert('Geocode was not successful for the following reason: ' + status);
  //         }
  //       });
  //     });


  //     marker.addListener('dblclick', function (mouseEvent) {
  //       // alert('Right click triggered');
  //       // this.map.setCenter(this.position);
  //       $(".modal-header .modal-title").text(this.title);
  //       //  $(".modal-body #modalLatLng").text(this.position);
  //       $('#myModal').modal('show');


  //     });
  //   }


  // }



}
