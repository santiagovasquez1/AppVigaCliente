import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encryptInfo'
})
export class EncryptInfoPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): any {
    value = value.replace(/[a-zA-Z1-9]/gi, '*');
    return value;
  }

}
