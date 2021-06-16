import { EZonaSismica } from 'src/app/models/espectro/EzonaSismica';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zonaSismica'
})
export class ZonaSismicaPipe implements PipeTransform {

  transform(value: EZonaSismica, ...args: unknown[]): unknown {
    let tempZona = EZonaSismica[value];
    return tempZona;
  }

}
