import { ClientRegister } from './../../../models/clientregister.model';
import { DatabotService } from './../../core/databot.service';
import { CustomValidators } from './../../../validators/customvalidator';
import { EmailValidator } from './../../../validators/email';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.css']
})
export class AddTenantComponent implements OnInit {
  clientForm: FormGroup;
  organizationCategories = [
    "Manufacturing/Supply chain",
    "Transportation",
    "Finance",
    "Human Resource",
    "Health Care"
  ];
  clientRegister= {}  as ClientRegister;
  constructor(private formBuilder: FormBuilder, public databotService: DatabotService) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      organizationName: ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      contactNumber: ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      organizationCategory: ['', Validators.compose([Validators.required])],
      officialMailId: ['', Validators.compose([Validators.required,Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i), EmailValidator.checkEmail])],
      adminName: ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      password: ['', Validators.compose([Validators.required, CustomValidators.patternValidator(/\d/, {
        hasNumber: true
      }),
      // check whether the entered password has upper case letter
      CustomValidators.patternValidator(/[A-Z]/, {
        hasCapitalCase: true
      }),
      // check whether the entered password has a lower case letter
      CustomValidators.patternValidator(/[a-z]/, {
        hasSmallCase: true
      }),
      // check whether the entered password has a special character
      CustomValidators.patternValidator(
        /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        {
          hasSpecialCharacters: true
        }
      ),
      Validators.minLength(8)])],
      alternativeEmail: ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      userName:['', Validators.compose([Validators.required,Validators.minLength(4)])],
      secQues1: ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      answer1: ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      secQues2: ['', Validators.compose([Validators.required,Validators.minLength(4)])],
      answer2: ['', Validators.compose([Validators.required,Validators.minLength(4)])]
    },
    {
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator
    });
  }

  onSubmit() {
    this.clientRegister.adminId = "5f94cd80-cd06-4f6f-a50e-66c356252328";
    this.clientRegister.adminName = this.clientForm.value.adminName;
    this.clientRegister.organizationName = this.clientForm.value.organizationName;
    this.clientRegister.organizationCode = "5f94cd80-cd06-4f6f-a50e-66c356252328";
    this.clientRegister.organizationCategory = this.clientForm.value.organizationCategory;
    this.clientRegister.contactNumber = this.clientForm.value.contactNumber;
    this.clientRegister.adminRole = "Client";
    this.clientRegister.emailId = this.clientForm.value.officialMailId;
    this.clientRegister.alternativeEmailId = this.clientForm.value.alternativeEmail;
    this.clientRegister.userName = this.clientForm.value.userName;
    this.clientRegister.password = this.clientForm.value.confirmPassword;
    this.clientRegister.securityQuestions = [
      {question: this.clientForm.value.secQues1 , answer : this.clientForm.value.answer1},
      {question: this.clientForm.value.secQues2 , answer : this.clientForm.value.answer2}
    ];

    console.log(this.clientRegister);
    this.databotService.clientRegistration(this.clientRegister).subscribe(data => {
      console.log(data);
    })
  }

}
