import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'redondeo'
})
export class RedondeoPipe implements PipeTransform {

  transform(value: number, numberDecimals:number): any {
    let roundValue=value.toFixed(numberDecimals);
    return roundValue;
  }

}
