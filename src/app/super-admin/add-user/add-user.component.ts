import { DatabotService } from './../../core/databot.service';
import { UserRegister } from './../../../models/clientregister.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  userRegister = {} as UserRegister;

  constructor(private formBuilder: FormBuilder, private databotService: DatabotService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      lastName:['',Validators.compose([Validators.required,Validators.minLength(4)])],
      emailId:['',Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
      alternateEmailId:['',Validators.compose([Validators.required])],
      userName:['',Validators.compose([Validators.required,Validators.minLength(4)])],
      password:['',Validators.compose([Validators.required,Validators.minLength(8)])],
      designation:['',Validators.compose([Validators.required,Validators.minLength(4)])],
      location:['',Validators.compose([Validators.required,Validators.minLength(4)])],
      contactNumber:['',Validators.compose([Validators.required,Validators.minLength(4)])]
    });
  }

  onSubmit() {
    // console.log(this.userForm.value);
    this.userRegister.organizationId = "8189f71d-ed34-40c1-bb03-b1a14f285c41";
    this.userRegister.userName = this.userForm.value.userName;
    this.userRegister.firstName = this.userForm.value.firstName;
    this.userRegister.lastName = this.userForm.value.lastName;
    this.userRegister.emailId = this.userForm.value.emailId;
    this.userRegister.alternateEmail = this.userForm.value.alternateEmailId;
    this.userRegister.password = this.userForm.value.password;
    this.userRegister.designation = this.userForm.value.designation;
    this.userRegister.phone = this.userForm.value.contactNumber;
    this.userRegister.location = this.userForm.value.location;

    console.log(this.userRegister);

    this.databotService.userRegistration(this.userRegister).subscribe(data => {
      console.log(data);
    });
  }

}
