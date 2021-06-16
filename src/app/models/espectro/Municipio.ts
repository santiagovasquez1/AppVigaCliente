import { EZonaSismica } from './EzonaSismica';
export class Municipio {

  constructor(
    public id: number,
    public nombre: string,
    public departamento: string,
    public aa: number,
    public av: number,
    public zonaSismica: EZonaSismica,
  ) {

  }
}
