import { ICalculo } from './icalculo';
export class Viga {

  constructor(
    public bw: number,
    public hw: number,
    public rb: number,
    public fc: number,
    public fy: number,
    public dw: number,
    public calculo: ICalculo) {

  }
}

