import { ICalculo } from './icalculo';
export class Flexion implements ICalculo {

  constructor(
    public cuantiaTemperatura: number,
    public cuantiaMin: number,
    public cuantiaMax: number,
    public cuantiaRequerida: number,
    public aceroTemperatura: number,
    public aceroMinimo: number,
    public aceroMaximo: number,
    public aceroRequerido: number,
    public aceroRequerido2: number,
    public mu: number,
    public phiFlexion: number,
    public aWhitney: number,
    public phiMn: number,
    public phiMnMax: number
  ) {

  }
}
