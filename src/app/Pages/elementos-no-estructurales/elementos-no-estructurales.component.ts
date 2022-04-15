import { CalcAxResponse } from './../../models/elementosNoEstructurales/calcAxResponse';
import { ElementosNoEstructuralesService } from './../../services/elementos-no-estructurales.service';
import { TipoAnclaje } from './../../models/elementosNoEstructurales/tipoAnclaje';
import { InfoPisoModel } from './../../models/elementosNoEstructurales/infoPisoModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { AmplificacionDinamica } from 'src/app/models/elementosNoEstructurales/amplificacionDinamica';
import { DecimalPipe } from '@angular/common';
import { CalculoPesoMuroRequest } from 'src/app/models/elementosNoEstructurales/calculoPesoMuroRequest';
import { ValidatorsService } from 'src/app/services/validators.service';
import { forkJoin, Observable, of } from 'rxjs';
import { CalcAxRequest } from 'src/app/models/elementosNoEstructurales/calcAxRequest';
import { CalcFpResponse } from 'src/app/models/elementosNoEstructurales/calcFpResponse';
import { CalcFpRequest } from 'src/app/models/elementosNoEstructurales/calcFpRequest';
import { DisenioMurosMampComponent } from '../disenio-muros-mamp/disenio-muros-mamp.component';

@Component({
  selector: 'app-elementos-no-estructurales',
  templateUrl: './elementos-no-estructurales.component.html',
  styleUrls: ['./elementos-no-estructurales.component.css']
})
export class ElementosNoEstructuralesComponent implements OnInit {

  public tittle: string = "Diseño de elementos no estructurales";
  public elementosNoEstructuralesForm: FormGroup;
  public displayedColumns: string[] = [
    'Losa',
    'Hw',
    'Hacum',
    'bMuro',
    'Wmuro',
    'ax',
    'Fp',
    'presionSismo',
  ];

  public tiposAnclajes: TipoAnclaje[];
  public amplificacionesDinamicas: AmplificacionDinamica[];
  public panelOpenState: boolean = false;
  public dataSource = new MatTableDataSource<InfoPisoModel>();
  public alturaEquivalente: number;

  public coefAa: number;
  public _coefAa(value: string) {
    this.coefAa = parseFloat(value);
  }

  public coefImportancia: number;
  public _coefImportancia(value: string) {
    this.coefImportancia = parseFloat(value);
  }

  public coefFa: number;
  public _coefFa(value: string) {
    this.coefFa = parseFloat(value);
  }

  public aceleracionSismo: number;
  public _aceleleracionSismo(value: string) {
    this.aceleracionSismo = parseFloat(value);
  }

  public isEspectroFormValid: boolean = false;
  public _isEspectroFormValid(value: boolean) {
    this.isEspectroFormValid = value;
  }
  public amplificacionDinamicaValue: string = "";

  get isAllValid(): boolean {
    if (this.isEspectroFormValid && this.elementosNoEstructuralesForm.valid) {
      return true;
    } else {
      return false;
    }
  }

  public numeroPisos: number;
  @ViewChild('paginator1', { static: true }) paginator1!: MatPaginator;
  @ViewChild('disenioMamposteria') disenioMamposteriaComponent:DisenioMurosMampComponent;
  constructor(private fb: FormBuilder,
    public spinnerServices: NgxSpinnerService,
    private elementosNoEstructuralesService: ElementosNoEstructuralesService,
    private numberPipe: DecimalPipe,
    private validatorsService: ValidatorsService
  ) {

  }

  ngOnInit(): void {

    this.getAmplificacionesDinamicas();
    this.getTiposAnclajes();
    this.createElementosNoEstructuralesForm();

    this.paginator1._intl.itemsPerPageLabel = 'Elementos por página';
    this.paginator1._intl.nextPageLabel = 'Siguiente';
    this.paginator1._intl.previousPageLabel = 'Anterior';
    this.paginator1._intl.firstPageLabel = 'Primera página';
    this.paginator1._intl.lastPageLabel = 'Última página';
    this.paginator1._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    }
  }

  createElementosNoEstructuralesForm() {
    this.elementosNoEstructuralesForm = this.fb.group({
      numeroPisos: ['', [Validators.required]],
      ap: [{ value: '', disabled: true }, [Validators.required]],
      rp: [{ value: '', disabled: true }, [Validators.required]],
      densidadMuro: ['', [Validators.required]],
      hViga: ['', [Validators.required]],
      hEquivalente: [{ value: '', disabled: true }, [Validators.required]],
      tipoAnclaje: ['', [Validators.required]],
      amplificacionDinamica: ['', [Validators.required]]
    });

    this.elementosNoEstructuralesForm.get('numeroPisos').valueChanges.pipe(debounceTime(200)).subscribe(data => this.onNumeroPisosChange(data));
    this.elementosNoEstructuralesForm.get('tipoAnclaje').valueChanges.subscribe(data => this.onTipoAnclajeChange(data));
    this.elementosNoEstructuralesForm.get('amplificacionDinamica').valueChanges.subscribe(data => this.onAmplificacionDinamicaChange(data));
  }


  onNumeroPisosChange(data: number): void {
    this.spinnerServices.show();

    setTimeout(() => {

      let tempData = new Array<InfoPisoModel>(data);

      for (let i = 0; i < data; i++) {
        tempData[i] = {
          losa: `Losa ${i + 1}`,
          alturaPiso: 0,
          alturaAcumulada: 0,
          espesorMuro: 0,
          pesoMuro: 0,
          ax: 0,
          fp: 0,
          presionSismo: 0,
          relacionHT: 0
        }
      }

      this.dataSource = new MatTableDataSource<InfoPisoModel>(tempData);
      this.dataSource.paginator = this.paginator1;
      this.disenioMamposteriaComponent.onNumeroPisosChange(data);
      this.spinnerServices.hide();
    }, 300);

  }

  public onAlturaPisoChange(event: string, infoPiso: InfoPisoModel, index: number) {

    // infoPiso.alturaPiso = parseFloat(event);
    if (index === 0) {
      for (let i = 1; i < this.dataSource.data.length; i++) {
        this.dataSource.data[i].alturaPiso = infoPiso.alturaPiso;
      }
    }

    let hAcum = 0;
    for (let i = 0; i < this.dataSource.data.length; i++) {
      hAcum += this.dataSource.data[i].alturaPiso;
      this.dataSource.data[i].alturaAcumulada = hAcum;
    }
  }

  public onEspesorMuroChange(infoPiso: InfoPisoModel, index: number) {

    let calcPesoMuroRequest: CalculoPesoMuroRequest = {
      densidadMuro: this.elementosNoEstructuralesForm.get('densidadMuro').value,
      espesorMuro: infoPiso.espesorMuro,
      hPiso: infoPiso.alturaPiso,
      hViga: this.elementosNoEstructuralesForm.get('hViga').value,
    };

    if (this.validatorsService.validateRequest(calcPesoMuroRequest)) {
      infoPiso.pesoMuro = this.calcPesoMuro(calcPesoMuroRequest);
    }

    if (index === 0) {
      for (let i = 1; i < this.dataSource.data.length; i++) {
        this.dataSource.data[i].espesorMuro = infoPiso.espesorMuro;

        let calcPesoMuroRequest: CalculoPesoMuroRequest = {
          densidadMuro: this.elementosNoEstructuralesForm.get('densidadMuro').value,
          espesorMuro: this.dataSource.data[i].espesorMuro,
          hPiso: this.dataSource.data[i].alturaPiso,
          hViga: this.elementosNoEstructuralesForm.get('hViga').value
        };

        if (this.validatorsService.validateRequest(calcPesoMuroRequest)) {
          this.dataSource.data[i].pesoMuro = this.calcPesoMuro(calcPesoMuroRequest);
        }
      }
    }
  }

  private getTiposAnclajes(): void {
    this.elementosNoEstructuralesService.getTiposAnclajes().subscribe(result => {
      this.tiposAnclajes = result;
    }, error => {
      console.log(error);
    });
  }

  private getAmplificacionesDinamicas(): void {
    this.elementosNoEstructuralesService.getAmplificacionesDinamicas().subscribe(result => {
      this.amplificacionesDinamicas = result;
    }, error => {
      console.log(error);
    });
  }

  private onTipoAnclajeChange(data: any): void {
    let tipoAnclaje: TipoAnclaje = data as TipoAnclaje;
    this.elementosNoEstructuralesForm.patchValue({
      rp: this.numberPipe.transform(tipoAnclaje.rp, '1.2-2')
    });
  }

  private onAmplificacionDinamicaChange(data: any): void {
    let amplificacionDinamica: AmplificacionDinamica = data as AmplificacionDinamica;
    this.amplificacionDinamicaValue = amplificacionDinamica.nombre;
    this.elementosNoEstructuralesForm.patchValue({
      ap: this.numberPipe.transform(amplificacionDinamica.ap, '1.2-2')
    });
  }

  public calcAlturaEquivalente(alturaTotal: number) {
    this.alturaEquivalente = 0.75 * alturaTotal;
    this.elementosNoEstructuralesForm.patchValue({
      hEquivalente: this.numberPipe.transform(this.alturaEquivalente, '1.2-2')
    });
  }

  private calcPesoMuro(calculoPesoMuroRequest: CalculoPesoMuroRequest): number {
    let pesoMuro = calculoPesoMuroRequest.espesorMuro * (calculoPesoMuroRequest.hPiso - calculoPesoMuroRequest.hViga) * calculoPesoMuroRequest.densidadMuro;
    return pesoMuro;
  }

  private calcAxObservable(infoPiso: InfoPisoModel): Observable<CalcAxResponse> {

    let calcAxRequest: CalcAxRequest = {
      aa: this.coefAa,
      fa: this.coefFa,
      coefImportancia: this.coefImportancia,
      alturaEquivalente: this.alturaEquivalente,
      alturaAcumulada: infoPiso.alturaAcumulada - infoPiso.alturaPiso,
      amplificacionDinamica: this.elementosNoEstructuralesForm.get('amplificacionDinamica').value.ap,
      aceleracionSismica: this.aceleracionSismo,
      losa: infoPiso.losa,
    }

    if (this.validatorsService.validateRequest(calcAxRequest)) {
      return this.elementosNoEstructuralesService.calcAceleracionDinamica(calcAxRequest);
    } else {
      return of(null);
    }
  };

  private calcFpObservable(infoPiso: InfoPisoModel): Observable<CalcFpResponse> {
    let calcFpRequest: CalcFpRequest = {
      aa: this.coefAa,
      aceleracionSoporte: infoPiso.ax,
      ap: this.elementosNoEstructuralesForm.get('amplificacionDinamica').value.ap,
      coefImportancia: this.coefImportancia,
      mp: infoPiso.pesoMuro,
      rp: this.elementosNoEstructuralesForm.get('tipoAnclaje').value.rp,
      losa: infoPiso.losa,
      alturaPiso: infoPiso.alturaPiso
    }

    if (this.validatorsService.validateRequest(calcFpRequest)) {
      return this.elementosNoEstructuralesService.calcfuerzaSismica(calcFpRequest);
    } else {
      return of(null);
    }
  }

  public calcAxAllFloors() {

    let calcAxObservables: Observable<CalcAxResponse>[] = [];
    let calcFpObservables: Observable<CalcFpResponse>[] = [];

    this.spinnerServices.show();

    for (let i = 0; i < this.dataSource.data.length; i++) {
      calcAxObservables.push(this.calcAxObservable(this.dataSource.data[i]));
    }

    forkJoin(calcAxObservables).subscribe(result => {
      result.forEach((element, index) => {
        this.dataSource.data[index].ax = element.aceleracionSoporte;
        calcFpObservables.push(this.calcFpObservable(this.dataSource.data[index]));
      });
      forkJoin(calcFpObservables).subscribe(result => {
        console.log(result);
        result.forEach((element, index) => {
          this.dataSource.data[index].fp = element.fuerzaSismica;
          this.dataSource.data[index].presionSismo = element.presionSismica;
        });
        this.spinnerServices.hide();
      }, error => {
        console.log(error);
        this.spinnerServices.hide();
      })
    }, error => {
      console.log(error);
      this.spinnerServices.hide();
    });
  }

}
