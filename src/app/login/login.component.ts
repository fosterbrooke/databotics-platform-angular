import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { trigger, style, state, transition, animate, animation, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { DatabotService } from '../core/databot.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  // userName: any;
  // password: any;
  modelText: any;
  constructor(private fb: FormBuilder, private router: Router, private dataService:DatabotService) { }
  login: FormGroup;
  ngOnInit() {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  redirectRegister() {
    this.router.navigate(['./sign-up']);
  }


  onSubmit() {
    this.dataService.login(this.loginForm.value).subscribe(data=>{
      sessionStorage.setItem("token",data['token']);
      sessionStorage.setItem("userId",data['userData']['id']);
      console.log(data['userData']['id']);
      this.router.navigate(['/industries']);
    },err=>{
      this.modelText = "Wrong Credentials";
        $('#myModal').modal('show');
    })
    // if(this.userName =="Demo" && this.password =="Demo123"){

    // }
    // console.log(register.value)
    // this.modelText = '';
    // localStorage.removeItem("title");

    // if (register.value.user == "" || register.value.password == "") {
    //   this.modelText = "Please enter username or password";
    //   $('#myModal').modal('show');
    // }
    // else if ((register.value.user == "Databotics" || register.value.user == "databotics") && register.value.password == "Databot@2016#") {
    //   this.router.navigate(['/industries']);
    //   localStorage.setItem('userid', '1');
    //   localStorage.setItem('username',register.value.user);
    // } else if ((register.value.user == "MelrosePark" || register.value.user == "melrosepark") && register.value.password == "data@melrose") {
    //   this.router.navigate(['/industries']);
    //   localStorage.setItem('userid', '2');
    //   localStorage.setItem('username',register.value.user);
    // } else if ((register.value.user == "Supplychain" || register.value.user == "supplychain") && register.value.password == "Databot@12345") {
    //   this.router.navigate(['/industries']);
    //   localStorage.setItem('userid', '3');
    //   localStorage.setItem('username',register.value.user);
    // }
    // else if ((register.value.user == "Politics" || register.value.user == "politics") && register.value.password == "Databot@12345") {
    //   this.router.navigate(['/industries']);
    //   localStorage.setItem('userid', '4');
    //   localStorage.setItem('username',register.value.user);
    // }


    // else if ((register.value.user == "SriP" || register.value.user == "srip") && register.value.password == "DataAgile@2019") {
    //   this.router.navigate(['/industries']);
    //   localStorage.setItem('userid', '5');
    //   localStorage.setItem('username',register.value.user);
    // }
    // else if ((register.value.user == "OToni" || register.value.user == "otoni") && register.value.password == "DataAgile@2019") {
    //   this.router.navigate(['/industries']);
    //   localStorage.setItem('userid', '6');
    //   localStorage.setItem('username',register.value.user);
    // }
    // else if ((register.value.user == "Pfrank" || register.value.user == "pfrank") && register.value.password == "DataAgile@2019") {
    //   this.router.navigate(['/industries']);
    //   localStorage.setItem('userid', '7');
    //   localStorage.setItem('username',register.value.user);
    // }
    // else if ((register.value.user == "Melroseparkuser" || register.value.user == "melroseparkuser") && register.value.password == "DataAgile@2019") {
    //   this.router.navigate(['/industries']);
    //   localStorage.setItem('userid', '8');
    //   localStorage.setItem('username',register.value.user);
    // }

    // else {
    //   this.modelText = "Wrong Credentials";
    //   $('#myModal').modal('show');

    // }

  }

}
