import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'million'
})
export class MillionPipe implements PipeTransform {

  transform(input: any, args?: any): any {
    var exp, rounded,
      suffixes = ['K', 'M', 'G', 'T', 'P', 'E'];
    if (input == undefined) {
      return 0;
    }

    if (input < 1000) {
      return input;
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));

    return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1]  //suffixes[exp - 1] //M;


  }
}
