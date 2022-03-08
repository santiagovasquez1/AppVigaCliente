import { CalcSaRequest } from '../../models/espectroInfo/calcSaRequest';
import { CalcPeriodosRequest } from './../../models/espectroInfo/calcPeriodosRequest';
import { GrupoDeUsoModel } from './../../models/espectroInfo/grupoDeUsoModel';
import { CalcFaFvRequest } from './../../models/espectroInfo/calcFaFvRequest';
import { TipoSueloFullInfo } from './../../models/espectroInfo/tipoSueloFullInfoModel';
import { DecimalPipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { EspectroService } from './../../services/espectro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Departamento } from 'src/app/models/espectroInfo/departamentoModel';
import { Municipio } from 'src/app/models/espectroInfo/municipioModel';
import { ValidatorsService } from 'src/app/services/validators.service';
import { TipoEstructura } from 'src/app/models/espectroInfo/tipoDeEstructuraModel';

@Component({
  selector: 'app-elementos-no-estructurales',
  templateUrl: './elementos-no-estructurales.component.html',
  styleUrls: ['./elementos-no-estructurales.component.css']
})
export class ElementosNoEstructuralesComponent implements OnInit {

  public tittle: string = "Diseño de elementos no estructurales";
  public parametrosSismicosForm: FormGroup;
  public departamentos: Departamento[];
  public municipios: Municipio[];
  public tiposSuelo: TipoSueloFullInfo[];
  public gruposDeUso: GrupoDeUsoModel[];
  public tiposDeEstructuras: TipoEstructura[];
  public displayedColumns: string[] = [
    'Losa',
    'Hw',
    'Hacum',
    'bMuro',
    'Wmuro',
    'ax',
    'Fp',
    'prsionSismo',
    'relacionHT'
  ];

  public dataSource = new MatTableDataSource<any>();
  constructor(private fb: FormBuilder,
    private espectroInfoService: EspectroService,
    public spinnerServices: NgxSpinnerService,
    private numberPipe: DecimalPipe,
    private validatorsService: ValidatorsService) {
  }

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
    this.parametrosSismicosForm.get('ht').valueChanges.subscribe(data => this.onParametrosChange(data));
    this.parametrosSismicosForm.get('tipoEstructura').valueChanges.subscribe(data => this.onParametrosChange(data));
    this.parametrosSismicosForm.get('tipoSuelo').valueChanges.subscribe(data => this.onParametrosChange(data));
    this.parametrosSismicosForm.get('municipio').valueChanges.subscribe(data => this.onParametrosChange(data));
    this.parametrosSismicosForm.get('grupoDeUso').valueChanges.subscribe(data => this.onParametrosChange(data));
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
    let grupoUso: GrupoDeUsoModel = this.parametrosSismicosForm.get('grupoDeUso').value;

    let request: CalcPeriodosRequest = {
      ht: this.parametrosSismicosForm.get('ht').value,
      aa: this.parametrosSismicosForm.get('coefAa').value,
      av: this.parametrosSismicosForm.get('coefAv').value,
      fa: this.parametrosSismicosForm.get('coefFa').value,
      fv: this.parametrosSismicosForm.get('coefFv').value,
      ct: tipoEstructura.coeficiente_ct,
      alpha: tipoEstructura.coeficiente_alpha
    }

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

    let flag = this.validatorsService.validateRequest(request);
    let flag2 = this.validatorsService.validateRequest(saRequest);

    if (flag) {
      this.calcPeriodos(request);
    }

    if (flag2) {
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
