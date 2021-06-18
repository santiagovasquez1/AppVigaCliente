import { Component, OnInit } from '@angular/core';

class ZonificacionPlantilla {
  constructor(
    public isDisabled: boolean,
    public zonificacion: string
  ) {

  }
};

@Component({
  selector: 'app-suelo-info',
  templateUrl: './suelo-info.component.html',
  styles: [
  ]
})
export class SueloInfoComponent implements OnInit {

  public microSelec: boolean;
  public zonificaciones: ZonificacionPlantilla[];
  public suelos: string[];
  public suelosDisabled: boolean;
  public zonificacion: string;
  public tipoSuelo: string;

  constructor() {
    this.zonificaciones = [
      new ZonificacionPlantilla(false, "NSR10"),
      new ZonificacionPlantilla(true, "Bogota"),
      new ZonificacionPlantilla(true, "Medellin")
    ];
    this.suelos = ["A","B","C","D"];
    this.suelosDisabled = true;
    this.zonificacion = "";
    this.tipoSuelo = "";
    console.log(this.zonificaciones);
  }

  ngOnInit(): void {
  }

  onIsMicroChange() {

    this.zonificaciones.forEach(zonificacion => {

      if (this.microSelec) {
        if (!zonificacion.isDisabled) {
          zonificacion.isDisabled = true;
        } else {
          zonificacion.isDisabled = false;
        }
      }
      else {
        if (zonificacion.isDisabled) {
          zonificacion.isDisabled = false;
        } else {
          zonificacion.isDisabled = true;
        }
      }
    });
    this.zonificacion = "";
    this.suelosDisabled = true;
    this.tipoSuelo = "";
  }

  onIsMicroSelectChange() {
    if (this.zonificacion != "") {
      this.suelosDisabled = false;
    } else {
      this.suelosDisabled = true;
      this.tipoSuelo = "";
    }
  }
}
