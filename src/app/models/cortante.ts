import { ICalculo } from './icalculo';
export class Cortante implements ICalculo {

  constructor(
    public vu: number,
    public phiVc: number,
    public phiVs: number,
    public phiVsMax: number,
    public phiVnMax: number,
    public asCortante: number,
    public separacionAs: number,
    public phiCortante: number,
    public phiVn: number
  ) {

  }
}
