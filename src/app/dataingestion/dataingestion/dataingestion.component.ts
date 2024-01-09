import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatabotService } from '../../core/databot.service';
import { Todo } from '../../core/databot.service';
// import { PapaParseService } from 'ngx-papaparse';
import { Router, ActivatedRoute } from '@angular/router';

const URL = 'http://localhost:4000/file/upload';
export interface Emp {
  MTD: String
  QTD: String
  WTD: String
  YTD: String
  date: String
  labour: String
  manufacture: String
  volume: String
}

@Component({
  selector: 'app-dataingestion',
  templateUrl: './dataingestion.component.html',
  styleUrls: ['./dataingestion.component.css']
})
export class DataingestionComponent implements OnInit {

  testChart: any;
  options: any;
  fileToUpload: any;
  apiArray = [];
  tableHeaders = [];
  tableData: any = [];
  p: number = 1;

  uploader: FileUploader = new FileUploader({ url: URL });
  attachmentList: any = [];
  filesToUpload: Array<File> = [];
  fileReaded: any;
  result: any = [];
  csvkeys: any = [];
  newkeys: any = [];
  newkey: string;
  originalkey: string;
  collections: any = [];
  collectionsdata: any = [];

  finalcollection: any = [];
  finalArray: any = [];
  newkeyobj: Todo[];
  tablekeys: any = [];
  selectedcsv: any;
  selectednew: any;
  obj1: any = {};
  apivalue: any;


  constructor(public http: HttpClient, private dataService: DatabotService, private router: Router) {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      var obj = JSON.parse(response);
      this.apiArray.push(obj.apiurl);
      //  console.log(this.apiArray);
    };
    //  this.newkeys = ['date', 'manufacture', 'labour','volume', 'YTD', 'QTD', 'WTD', 'MTD'];

  }

  // download(index) {
  //   const filename = this.attachmentList[index].uploadname;

  //   this._fileService.downloadFile(filename)
  //     .subscribe(
  //       data => console.log(data),
  //       error => console.error(error)
  //     );
  // }


  ngOnInit() {
    this.getDBCollections();
  }

  getDBCollections() {
    this.dataService.getDBCollections().subscribe(data => {
      // console.log(data);
      this.collectionsdata = data;
      console.log(this.collectionsdata);
      this.collections.push(Object.keys(data));
    });
  }

  changeValue(api) {
    this.newkeys = [];
    // this.tableHeaders = [];
    var apivalue = api.currentTarget.value;
    this.apivalue = api.currentTarget.value
    // console.log(apivalue + "" + typeof apivalue);
    // this.http.get(apivalue).subscribe(data => {
    //   console.log(data);
    //   this.tableData =  data;
    //   let responseData = data[0];
    //   for (var key in responseData) {
    //     if (responseData.hasOwnProperty(key)) {
    //         this.tableHeaders.push(key);
    //         console.log(this.tableHeaders);
    //     }
    //   }
    // });

    for (let item of this.collectionsdata[apivalue]) {
      this.newkeys.push(item['name']);
    }
    this.newkeys.splice(0, 2);
    var obj = this.newkeys.reduce(function (o, val) { o[val] = null; return o; }, {});
    this.newkeyobj = obj;

    this.finalcollection = [];
    for (let item of this.result) {

      this.finalcollection.push(this.newkeyobj);
    }
    this.finalcollection = this.finalcollection.map(function (el, i) {
      var o = Object.assign({}, el);
      o.uuid = i;
      return o;
    })
    console.log(this.finalcollection);

  }

  csv2Array(fileInput: any) {
    this.csvkeys = [];
    this.finalcollection = [];
    var files = fileInput.target.files; // FileList object
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      var csv = event.target.result; // Content of CSV file
      var lines = csv.split("\n");

      this.result = [];

      var headers = lines[0].split(",");

      for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }

        this.result.push(obj);

      }
      // this.result.pop();
      this.result = this.result.map(function (el, i) {
        var o = Object.assign({}, el);
        o.uuid = i;
        return o;
      })
      console.log(this.result);
      this.csvkeys = Object.keys(this.result[0]);
    }

    this.finalcollection = [];
    for (let item of this.result) {

      this.finalcollection.push(this.newkeyobj);
    }
    this.finalcollection = this.finalcollection.map(function (el, i) {
      var o = Object.assign({}, el);
      o.uuid = i;
      return o;
    })
    console.log(this.finalcollection);
  }
  isActive(item) {
    return this.selectedcsv === item;
  };
  isActivee(item) {
    return this.selectednew === item;
  };

  keyChange(event, n) {
    this.originalkey = '';
    this.selectedcsv = n;
    // this.originalkey = event.currentTarget.value;
    this.originalkey = event;
  }
  newChange(event, n) {
    this.newkey = '';
    // this.newkey = event.currentTarget.value;
    this.newkey = event;
    this.selectednew = n;
    // console.log(this.finalcollection);
    // this.tablekeys.push({ csvkey: this.originalkey, newkey: this.newkey });
    // this.changeKey(this.originalkey, this.newkey, this.result);
    // this.newkeys = this.newkeys.filter(item => item !== this.newkey);
    // console.log(this.newkeys);
  }
  Add() {
    this.tablekeys.push({ csvkey: this.originalkey, newkey: this.newkey });
    this.changeKey(this.originalkey, this.newkey, this.result);
  }
  delete(item) {

    var originalkey = item.newkey;
    var newkey = item.csvkey;
    // this.changeKey(originalkey,newkey,this.finalcollection);
    this.updateFinalcollection(originalkey);
    this.tablekeys = this.tablekeys.filter(items => items !== item);
  }

  changeKey(originalKey, newKey, arr) {
    var arr1 = this.collectionsdata;
    console.log(this.apivalue);
    var apivalue = this.apivalue;
    this.finalcollection.forEach(function (item) {
      if(arr.find(x => x.uuid === item.uuid)[originalKey] == ''){
        item[newKey] = null;
      }else{
        
        var loc = arr1[apivalue].find(x=> x.name == newKey);
        if(loc['type']=='java.lang.String'){
          item[newKey] = item[newKey] = arr.find(x => x.uuid === item.uuid)[originalKey].toString();
          console.log(typeof(item[newKey]));
        }else if(loc['type']=='java.lang.Long') {
          item[newKey] = parseInt(item[newKey] = arr.find(x => x.uuid === item.uuid)[originalKey]);
          console.log(typeof(item[newKey]));
        }else if(loc['type']=='java.lang.Boolean') {
          item[newKey] = Boolean(item[newKey] = arr.find(x => x.uuid === item.uuid)[originalKey]);
          console.log(typeof(item[newKey]));
        }else if(loc['type']=='java.lang.Double') {
          item[newKey] = parseInt(item[newKey] = arr.find(x => x.uuid === item.uuid)[originalKey]);
          console.log(typeof(item[newKey]));
        }else if(loc['type']=='java.lang.Integer') {
          item[newKey] = parseInt(item[newKey] = arr.find(x => x.uuid === item.uuid)[originalKey]);
          console.log(typeof(item[newKey]));
        }else if(loc['type']=='java.lang.List') {
          item[newKey] = item[newKey] = arr.find(x => x.uuid === item.uuid)[originalKey].toString();
          console.log(typeof(item[newKey]));
        }

      }
      
    })
    console.log(this.finalcollection);

  }

  updateFinalcollection(originalkey) {
    // var originalkey = item.newkey;
    // var newkey = item.csvkey;
    this.finalcollection.forEach(function (item) {
      item[originalkey] = null;
    })
    // console.log(this.finalcollection);
  }

  submit() {
    //  console.log(this.finalcollection);
     this.finalcollection = this.finalcollection.map(function (el, i) {
      var o = Object.assign({}, el);
      delete o.uuid
      return o;
    })
    console.log(this.finalcollection);
    //  var finalarray = JSON.parse(this.finalcollection);
     this.dataService.postDBCollections(this.finalcollection).subscribe(data => {
       console.log(data);
       if(data) {
         this.router.navigate(['/vendor-manager']);
       }
     });

  }

}
