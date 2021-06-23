import { TipoSuelo } from './../../models/espectro/TipoSuelo';
import { HerramientasDisenioService } from './../../services/herramientas-disenio.service';
import { GlobalService } from './../../services/global.service';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


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
  public suelos: TipoSuelo[];
  public suelosDisabled: boolean;
  public zonificacion: string;
  public selectedSuelo: string;

  @Output() sendSuelo = new EventEmitter();

  private _tipoSuelo: TipoSuelo;
  public get tipoSuelo(): TipoSuelo {
    return this._tipoSuelo;
  }
  public set tipoSuelo(value: TipoSuelo) {
    this._tipoSuelo = value;
    this.sendSuelo.emit(this._tipoSuelo);
  }

  constructor(private herramientasDisenioService: HerramientasDisenioService, public spinnerService: NgxSpinnerService) {
    this.zonificaciones = [];
    this.suelos = [];
    this.suelosDisabled = true;
    this.zonificacion = "";
    this.tipoSuelo = new TipoSuelo(0, "", "", 0, 0, 0, 0, 0);
    console.log(this.zonificaciones);
  }

  ngOnInit(): void {
    this.GetZonificaciones();
  }

  private GetZonificaciones() {
    this.spinnerService.show();

    this.herramientasDisenioService.getZonificaciones().subscribe(result => {
      this.zonificaciones = result.map(item => {
        let zonificiacionTemp: ZonificacionPlantilla;

        if (item.nombre.includes("Norma")) {
          zonificiacionTemp = new ZonificacionPlantilla(false, item.nombre);
        } else {
          zonificiacionTemp = new ZonificacionPlantilla(true, item.nombre);
        }
        return zonificiacionTemp;
      });
      this.spinnerService.hide();
    }, error => {
      console.log(error);
      this.spinnerService.hide();
    });
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
    this.tipoSuelo = new TipoSuelo(0, "", "", 0, 0, 0, 0, 0);
  }

  onIsMicroSelectChange() {
    if (this.zonificacion != "") {
      this.spinnerService.show();
      this.suelosDisabled = false;
      this.herramientasDisenioService.getTipoSuelo(this.zonificacion).subscribe(result => {
        this.suelos = result.map(item => {
          let suelo = new TipoSuelo(item.idSuelo, item.perfil, item.zonificacion, item.fa, item.fv, item.t0, item.tc, item.ti);
          return suelo;
        });
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      });
    } else {
      this.suelosDisabled = true;
      this.suelos = [];
      this.tipoSuelo = new TipoSuelo(0, "", "", 0, 0, 0, 0, 0);
    }
  }

  onTipoSueloChange() {
    if (this.selectedSuelo != "") {
      this.tipoSuelo = this.suelos.find(item => item.idSuelo == Number.parseInt(this.selectedSuelo));
    } else {
      this.tipoSuelo = new TipoSuelo(0, "", "", 0, 0, 0, 0, 0);
    }
  }
}
