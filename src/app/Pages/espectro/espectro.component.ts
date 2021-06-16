import { EZonaSismica } from './../../models/espectro/EzonaSismica';
import { Municipio } from './../../models/espectro/Municipio';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { HerramientasDisenioService } from 'src/app/services/herramientas-disenio.service';
import { ECapacidad } from 'src/app/models/espectro/ECapacidad';

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
  public departamentosDisabled: boolean;
  public municipiosDisabled: boolean;

  private _zonaSismica: string;

  public get zonaSismica(): string {
    return EZonaSismica[this.myMunicipio.zonaSismica];
  }
  public set zonaSismica(value: string) {
    this._zonaSismica = EZonaSismica[this.myMunicipio.zonaSismica];
  }

  public capacidades: string[];

  constructor(private herramientaDisenioService: HerramientasDisenioService, public spinnerService: NgxSpinnerService) {
    this.departamentos = [];
    this.municipios = [];
    this.selectDepartamento = "";
    this.selectMunicipio = "";
    this.myMunicipio = new Municipio(0, "", "", 0, 0, EZonaSismica.Baja);
    this.departamentosDisabled = true;
    this.municipiosDisabled = true;

    this.capacidades=[];

    for (let value in ECapacidad) {
      if(isNaN(Number(value))){
        this.capacidades.push(value);
      }
    }

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
    console.log("Send");
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

}
