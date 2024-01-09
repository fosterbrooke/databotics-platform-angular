import { MAILS } from './../models/publicmails.model';
import {FormControl, AbstractControl} from '@angular/forms';

export class EmailValidator {

 static checkEmail(control: AbstractControl){

   console.log("e-mail check");

   var requiredDomains = MAILS;
   var lowercaseValue = control.value.toLowerCase();
   var providedDomain = lowercaseValue.substr(lowercaseValue.indexOf('@')+1);
   var returnVal: any;

   for (var i = 0; i < requiredDomains.length; i++) {
     if(requiredDomains[i] == providedDomain) {
       returnVal =  {"invalid_domain": true};
       i = requiredDomains.length;
     }
   }

   return returnVal;
 }

}
