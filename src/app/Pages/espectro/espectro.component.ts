import { element } from 'protractor';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { TipoSuelo } from './../../models/espectro/TipoSuelo';
import { EGrupoUso } from './../../models/espectro/EGrupoUso';
import { ETipoEstructura } from './../../models/espectro/ETipoEstructura';
import { EstructuraInfo } from '../../models/espectro/EstructuraInfo';
import { EZonaSismica } from './../../models/espectro/EzonaSismica';
import { Municipio } from './../../models/espectro/Municipio';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { HerramientasDisenioService } from 'src/app/services/herramientas-disenio.service';
import { ECapacidad } from 'src/app/models/espectro/ECapacidad';
import { param } from 'jquery';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-espectro',
  templateUrl: './espectro.component.html',
  styles: [
  ]
})
export class EspectroComponent implements OnInit {

  public departamentos: string[];
  public municipios: Municipio[];
  public selectDepartamento: string;
  public selectMunicipio: string;
  public myMunicipio: Municipio;
  public tipoSuelo: TipoSuelo;
  public estructuraInfo: EstructuraInfo;
  public departamentosDisabled: boolean;
  public municipiosDisabled: boolean;
  public Labels: Label[];
  public Data: ChartDataSets[];


  private _zonaSismica: string;
  public get zonaSismica(): string {
    return EZonaSismica[this.myMunicipio.zonaSismica];
  }
  public set zonaSismica(value: string) {
    this._zonaSismica = EZonaSismica[this.myMunicipio.zonaSismica];
  }

  constructor(private herramientaDisenioService: HerramientasDisenioService, public spinnerService: NgxSpinnerService) {
    this.departamentos = [];
    this.municipios = [];
    this.Labels = [];
    this.Data = [];
    this.selectDepartamento = "";
    this.selectMunicipio = "";
    this.myMunicipio = new Municipio(0, "", "", 0, 0, EZonaSismica.Baja);
    this.tipoSuelo = new TipoSuelo(0, "", "", 0, 0, 0, 0, 0);
    this.estructuraInfo = new EstructuraInfo(ETipoEstructura.Porticos, 0, ECapacidad.DMO, EGrupoUso.I);
    this.departamentosDisabled = true;
    this.municipiosDisabled = true;
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.herramientaDisenioService.getDepartments().subscribe(result => {
      this.departamentos = (<string[]>result).map(item => {
        return item;
      });
      this.departamentosDisabled = false;
      this.spinnerService.hide();
    }, error => {
      console.log(error);
      this.spinnerService.hide();
    });
  }

  onSubmit(form: NgForm) {
    let params = {
      "municipio": this.myMunicipio,
      "suelo": this.tipoSuelo,
      "estructura": this.estructuraInfo
    }

    this.Labels = [];
    let data = [];

    this.spinnerService.show();
    this.herramientaDisenioService.setEspectro(params)
      .subscribe(result => {
        result.ta_Sa.forEach(element => {
          let { item1, item2 } = element;
          this.Labels.push(item1.toFixed(2).toString());
          data.push(item2);
        });
        this.Data = [{
          data: data,
          label: `Espectro ${this.myMunicipio.nombre} Suelo tipo ${this.tipoSuelo.perfil}`
        }];
        console.log(result);
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      });

  }

  onDepartamentoChange(departamento: string) {

    if (departamento != "") {
      this.spinnerService.show();
      this.herramientaDisenioService.getMunicipios(departamento).subscribe(result => {
        this.municipios = result.map(item => {
          let municipio = new Municipio(item.id, item.nombre, item.departamento, item.aa, item.av, item.zonaSismica);
          return municipio;
        });
        this.municipiosDisabled = false;
        console.log(this.municipios);
        this.spinnerService.hide();
      }, error => {
        console.log(error);
        this.spinnerService.hide();
      });
    } else {
      this.municipios = [];
      this.municipiosDisabled = true;
    }
  }

  onMunicipioChange(municipioName: string) {
    if (municipioName != "") {
      this.myMunicipio = this.municipios.find(item => item.nombre == municipioName);
    } else {
      this.myMunicipio = new Municipio(0, "", "", 0, 0, EZonaSismica.Baja);
    }
  }

  getSuelo(event: TipoSuelo) {
    this.tipoSuelo = event;
  }

}
