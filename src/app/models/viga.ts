import { ICalculo } from './icalculo';
export class Viga {

  private _bw: number;
  public get bw(): number {
    return this._bw;
  }
  public set bw(value: number) {
    this._bw = value;
  }

  constructor(
    bw: number,
    public hw: number,
    public rb: number,
    public fc: number,
    public fy: number,
    public dw: number,
    public calculo: ICalculo) {
    this._bw = bw;
  }
}

