import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  demo:any;
   commentForm: FormGroup;
    submitted = false;
    commentedData : boolean;
  Addcomments = [];
  tsetDataArray : any = [];
  commentDataArray : any = [];
  commentDataArray1 : any = [];
  myDate :Date;
  myDate1 :Date;
  addtimestampform = false;
  showassignedData = false;


  constructor(private formBuilder:FormBuilder) {
    this.demo="awesome"
   }

  ngOnInit() {
    this.commentForm =this.formBuilder.group({
      inputby:[''],
      inputfor:[''],
      Weightage1:[''],
      Weightage2:[''],
      Weightage3:[''],
      Weightage4:[''],
      Comment1:[''],
      Comment2:[''],
      Comment3:[''],
      Comment4:[''],
    });
    this.myDate = new Date();
    this.tsetDataArray=[
      {
       "Project Id":"C54851485",
        "Invoice":"INC21548512",
        "Date":"01-03-2020",
        "Weightage":1,
        "Rating":4
      },
      {
        "Project Id":"C54851485",
         "Invoice":"INC21548512",
         "Date":"04-03-2020",
         "Weightage":2,
         "Rating":2
       },
       {
        "Project Id":"C54851485",
         "Invoice":"INC21548512",
         "Date":"02-03-2020",
         "Weightage":3,
         "Rating":1
       },
       {
        "Project Id":"C54851485",
         "Invoice":"INC21548512",
         "Date":"09-03-2020",
         "Weightage":4,
         "Rating":3
       },
       {
        "Project Id":"C54851485",
         "Invoice":"INC21548512",
         "Date":"09-03-2020",
         "Weightage":8,
         "Rating":4
       },
       {
        "Project Id":"C54851485",
         "Invoice":"INC21548512",
         "Date":"09-03-2020",
         "Weightage":2,
         "Rating":4
       },{
        "Project Id":"C54851485",
         "Invoice":"INC21548512",
         "Date":"09-03-2020",
         "Weightage":6,
         "Rating":4
       },{
        "Project Id":"C54851485",
         "Invoice":"INC21548512",
         "Date":"09-03-2020",
         "Weightage":9,
         "Rating":4
       }
    ]

    this.commentDataArray = [
      {
       'inputby':'hanu',
       'inputfor':'satheesh',
       'Weightage1':5,
       'Weightage2':6,
       'Weightage3':7,
       'Weightage4':2,
       'Comment1':'awsome',
       'Comment2':'awsome',
       'Comment3':'awsome',
       'Comment4':'awsome'

      }
    ]
  }
  timeStamps(){
    this.showassignedData = true;

  }
  addtimestamp(){
    this.addtimestampform=true;
    this.Addcomments.push("1");

  }
  removeItem(i: number): void {
    this.Addcomments.splice(i, 1);
  }

  submit(){
    this.submitted = true;
    let obj={
      inputby:this.commentForm.value.inputby,
      inputfor:this.commentForm.value.inputfor,
      Weightage1:this.commentForm.value.Weightage1,
      Weightage2:this.commentForm.value.Weightage2,
      Weightage3:this.commentForm.value.Weightage3,
      Weightage4:this.commentForm.value.Weightage4,
      Comment1:this.commentForm.value.Comment1,
      Comment2:this.commentForm.value.Comment2,
      Comment3:this.commentForm.value.Comment3,
      Comment4:this.commentForm.value.Comment4,
    }
    this.commentDataArray1.push(obj);
    console.log("this.commentDataArray1",this.commentDataArray1);
    this.commentedData = true;
    sessionStorage.setItem("commentData",JSON.stringify(this.commentDataArray1));
    let newArray=sessionStorage.getItem("commentData");
       // localStorage.setItem("this.tsetDataArray",this.tsetDataArray);
    console.log("this.commentForm object from newArray",JSON.parse(newArray));
    console.log("this.tsetDataArray",this.tsetDataArray);
  }
}
