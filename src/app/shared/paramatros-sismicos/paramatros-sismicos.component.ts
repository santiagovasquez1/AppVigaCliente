import { DecimalPipe } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime } from 'rxjs/operators';
import { CalcFaFvRequest } from 'src/app/models/espectroInfo/calcFaFvRequest';
import { CalcPeriodosRequest } from 'src/app/models/espectroInfo/calcPeriodosRequest';
import { CalcSaRequest } from 'src/app/models/espectroInfo/calcSaRequest';
import { Departamento } from 'src/app/models/espectroInfo/departamentoModel';
import { GrupoDeUsoModel } from 'src/app/models/espectroInfo/grupoDeUsoModel';
import { Municipio } from 'src/app/models/espectroInfo/municipioModel';
import { TipoEstructura } from 'src/app/models/espectroInfo/tipoDeEstructuraModel';
import { TipoSueloFullInfo } from 'src/app/models/espectroInfo/tipoSueloFullInfoModel';
import { EspectroService } from 'src/app/services/espectro.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-paramatros-sismicos',
  templateUrl: './paramatros-sismicos.component.html',
  styleUrls: ['./paramatros-sismicos.component.css']
})
export class ParamatrosSismicosComponent implements OnInit {

  public parametrosSismicosForm: FormGroup;
  public departamentos: Departamento[];
  public municipios: Municipio[];
  public tiposSuelo: TipoSueloFullInfo[];
  public gruposDeUso: GrupoDeUsoModel[];
  public tiposDeEstructuras: TipoEstructura[];

  @Output("AlturaTotalChange") AlturaChangeEventEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output("CoefAaChange") coefAaChangeEventEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output("CoefImportanciaChange") CoefImportanciaChangeEventEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output("CoefFaChange") CoefFaChangeEventEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output("AceleracionSismoChange") AceleracionSismoChangeEventEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output("IsFormValid") IsFormValidEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder,
    private espectroInfoService: EspectroService,
    public spinnerServices: NgxSpinnerService,
    private numberPipe: DecimalPipe,
    private validatorsService: ValidatorsService) { }

  ngOnInit(): void {
    this.getDepartamentos();
    this.getTiposSuelo();
    this.getTiposEstucturas();
    this.getGruposDeUso();
    this.createParamsSismicosForm();
  }

  createParamsSismicosForm() {
    this.parametrosSismicosForm = this.fb.group({
      departamento: ['', Validators.required],
      municipio: [{ value: '', disabled: true }, [Validators.required]],
      tipoSuelo: ['', [Validators.required]],
      tipoEstructura: ['', [Validators.required]],
      grupoDeUso: [{ value: '', disabled: false }, [Validators.required]],
      coefAa: [{ value: '', disabled: true }, [Validators.required]],
      coefAv: [{ value: '', disabled: true }, [Validators.required]],
      coefFa: [{ value: '', disabled: true }, [Validators.required]],
      coefFv: [{ value: '', disabled: true }, [Validators.required]],
      ht: ['', [Validators.required]],
      ta: [{ value: '', disabled: true }, [Validators.required]],
      sa: [{ value: '', disabled: true }, [Validators.required]],
      t0: [{ value: '', disabled: true }, [Validators.required]],
      tc: [{ value: '', disabled: true }, [Validators.required]],
      tl: [{ value: '', disabled: true }, [Validators.required]],
    });

    this.parametrosSismicosForm.get('departamento').valueChanges.subscribe(data => this.onDepartamentoChange(data));
    this.parametrosSismicosForm.get('municipio').valueChanges.subscribe(data => this.onMunicipioChange(data));
    this.parametrosSismicosForm.get('tipoSuelo').valueChanges.subscribe(data => this.onTipoSueloChange(data));
    this.parametrosSismicosForm.get('municipio').valueChanges.subscribe(data => this.onTipoSueloChange(data));

    ///Calculo periodo y sa
    this.parametrosSismicosForm.get('ht').valueChanges.pipe(
      debounceTime(200)).subscribe(data => this.onParametrosChange(data));
    this.parametrosSismicosForm.get('ht').valueChanges.subscribe(data => this.onAlturaChange(data));
    this.parametrosSismicosForm.get('tipoEstructura').valueChanges.subscribe(data => this.onParametrosChange(data));
    this.parametrosSismicosForm.get('tipoSuelo').valueChanges.subscribe(data => this.onParametrosChange(data));
    this.parametrosSismicosForm.get('municipio').valueChanges.subscribe(data => this.onParametrosChange(data));
    this.parametrosSismicosForm.get('grupoDeUso').valueChanges.subscribe(data => this.onTaChange(data));
    this.parametrosSismicosForm.get('ta').valueChanges.subscribe(data => this.onTaChange(data));

    this.parametrosSismicosForm.get('coefAa').valueChanges.subscribe(data => this.onCoefAaChange(data));
    this.parametrosSismicosForm.get('coefFa').valueChanges.subscribe(data => this.onCoefFaChange(data));
    this.parametrosSismicosForm.get('grupoDeUso').valueChanges.subscribe(data => this.onCoefImportanciaChange(data));
    this.parametrosSismicosForm.get('sa').valueChanges.subscribe(data => this.onSaChange(data));

    this.parametrosSismicosForm.statusChanges.subscribe(data => this.onFormStatusChange(data));
  }

  onFormStatusChange(data: any): void {
    if (data === 'VALID') {
      this.IsFormValidEventEmitter.emit(true);
    }
    else {
      this.IsFormValidEventEmitter.emit(false);
    }
  }

  private onAlturaChange(data: number): void {
    this.AlturaChangeEventEmitter.emit(data);
  }

  private onCoefImportanciaChange(data: GrupoDeUsoModel) {
    let coefImportancia = data.coeficiente;
    this.CoefImportanciaChangeEventEmitter.emit(coefImportancia);
  }

  private onCoefFaChange(data: number) {
    this.CoefFaChangeEventEmitter.emit(data);
  }

  private onCoefAaChange(data: number) {
    this.coefAaChangeEventEmitter.emit(data);
  }

  private onSaChange(data: number) {
    this.AceleracionSismoChangeEventEmitter.emit(data);
  }

  onMunicipioChange(municipio: Municipio): void {
    if (municipio != null || municipio != undefined) {
      this.parametrosSismicosForm.patchValue({
        "coefAa": this.numberPipe.transform(municipio.aa, '1.2-2'),
        "coefAv": this.numberPipe.transform(municipio.av, '1.2-2')
      });
    } else {
      this.parametrosSismicosForm.patchValue({
        "coefAa": '',
        "coefAv": ''
      });
    }
  }

  private onDepartamentoChange(idDepartamento: number) {
    this.parametrosSismicosForm.patchValue({
      "municipio": '',
      "coefAa": '',
      "coefAv": '',
      "coefFa": '',
      "coefFv": ''
    });
    this.getMunicipios(idDepartamento);
    this.parametrosSismicosForm.get('municipio').enable();
  }

  private onParametrosChange(data: any) {

    let tipoEstructura: TipoEstructura = this.parametrosSismicosForm.get('tipoEstructura').value;

    let request: CalcPeriodosRequest = {
      ht: this.parametrosSismicosForm.get('ht').value,
      aa: this.parametrosSismicosForm.get('coefAa').value,
      av: this.parametrosSismicosForm.get('coefAv').value,
      fa: this.parametrosSismicosForm.get('coefFa').value,
      fv: this.parametrosSismicosForm.get('coefFv').value,
      ct: tipoEstructura.coeficiente_ct,
      alpha: tipoEstructura.coeficiente_alpha
    }

    let flag = this.validatorsService.validateRequest(request);

    if (flag) {
      this.calcPeriodos(request);
    }
  }

  private onTaChange(data: any) {
    let grupoUso: GrupoDeUsoModel = this.parametrosSismicosForm.get('grupoDeUso').value;

    let saRequest: CalcSaRequest = {
      aa: this.parametrosSismicosForm.get('coefAa').value,
      av: this.parametrosSismicosForm.get('coefAv').value,
      fa: this.parametrosSismicosForm.get('coefFa').value,
      fv: this.parametrosSismicosForm.get('coefFv').value,
      t: this.parametrosSismicosForm.get('ta').value,
      coefImportancia: grupoUso.coeficiente,
      t0: this.parametrosSismicosForm.get('t0').value,
      tc: this.parametrosSismicosForm.get('tc').value,
      tl: this.parametrosSismicosForm.get('tl').value
    }

    let flag = this.validatorsService.validateRequest(saRequest);
    if (flag) {
      this.calcSa(saRequest);
    }
  }

  private onTipoSueloChange(data: any) {

    let request: CalcFaFvRequest = {
      idTipoSuelo: this.parametrosSismicosForm.get('tipoSuelo').value,
      aa: this.parametrosSismicosForm.get('coefAa').value,
      av: this.parametrosSismicosForm.get('coefAv').value
    }

    let flag = this.validatorsService.validateRequest(request);
    if (flag) {
      this.calcFaFv(request);
    }
  }

  private getDepartamentos() {
    this.spinnerServices.show();
    this.espectroInfoService.getDepartamentos().subscribe(
      (res: Departamento[]) => {
        this.departamentos = res;
        this.spinnerServices.hide();
      }, error => {
        console.log(error);
        this.spinnerServices.hide();
      });
  }

  private getMunicipios(idDepartamento: number) {
    this.spinnerServices.show();
    this.espectroInfoService.getMunicipios(idDepartamento).subscribe(
      (res: Municipio[]) => {
        this.municipios = res;
        this.spinnerServices.hide();
      }, error => {
        console.log(error);
        this.spinnerServices.hide();
      });
  }

  private getTiposSuelo() {
    this.spinnerServices.show();
    this.espectroInfoService.getTiposSueloFullInfo().subscribe(
      (res: TipoSueloFullInfo[]) => {
        this.tiposSuelo = res;
        this.spinnerServices.hide();
      }, error => {
        console.log(error);
        this.spinnerServices.hide();
      });
  }

  private getTiposEstucturas() {
    this.spinnerServices.show();
    this.espectroInfoService.getTiposDeEstructuras().subscribe(
      (res: TipoEstructura[]) => {
        this.tiposDeEstructuras = res;
        this.spinnerServices.hide();
      }, error => {
        console.log(error);
        this.spinnerServices.hide();
      });
  }

  private getGruposDeUso() {
    this.spinnerServices.show();
    this.espectroInfoService.getGruposDeUso().subscribe(
      (res: GrupoDeUsoModel[]) => {
        this.gruposDeUso = res;
        this.spinnerServices.hide();
      }, error => {
        console.log(error);
        this.spinnerServices.hide();
      });
  }

  private calcFaFv(calcFaFvRequest: CalcFaFvRequest) {
    this.spinnerServices.show();
    this.espectroInfoService.calcFaFv(calcFaFvRequest).subscribe(result => {
      this.parametrosSismicosForm.patchValue({
        "coefFa": this.numberPipe.transform(result.fa, '1.2-2'),
        "coefFv": this.numberPipe.transform(result.fv, '1.2-2')
      });
      this.spinnerServices.hide();
    }, error => {
      console.log(error);
      this.spinnerServices.hide();
    });
  }

  private calcPeriodos(calcPeriodosRequest: CalcPeriodosRequest) {
    this.spinnerServices.show();
    this.espectroInfoService.calcPeriodos(calcPeriodosRequest).subscribe(result => {
      this.parametrosSismicosForm.patchValue({
        "ta": this.numberPipe.transform(result.ta, '1.2-2'),
        "t0": this.numberPipe.transform(result.t0, '1.2-2'),
        "tc": this.numberPipe.transform(result.tc, '1.2-2'),
        "tl": this.numberPipe.transform(result.tl, '1.2-2')
      });
      this.spinnerServices.hide();
    }, error => {
      console.log(error);
      this.spinnerServices.hide();
    });
  }

  private calcSa(calcSaRequest: CalcSaRequest) {
    this.spinnerServices.show();
    this.espectroInfoService.calcSa(calcSaRequest).subscribe(result => {
      this.parametrosSismicosForm.patchValue({
        "sa": this.numberPipe.transform(result.sa, '1.2-2')
      });
      this.spinnerServices.hide();
    }, error => {
      console.log(error);
      this.spinnerServices.hide();
    });
  }
}
