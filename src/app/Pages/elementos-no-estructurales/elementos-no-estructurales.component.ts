import { CalcAxResponse } from './../../models/elementosNoEstructurales/calcAxResponse';
import { ElementosNoEstructuralesService } from './../../services/elementos-no-estructurales.service';
import { TipoAnclaje } from './../../models/elementosNoEstructurales/tipoAnclaje';
import { InfoPisoModel } from './../../models/elementosNoEstructurales/infoPisoModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { AmplificacionDinamica } from 'src/app/models/elementosNoEstructurales/amplificacionDinamica';
import { DecimalPipe } from '@angular/common';
import { CalculoPesoMuroRequest } from 'src/app/models/elementosNoEstructurales/calculoPesoMuroRequest';
import { ValidatorsService } from 'src/app/services/validators.service';
import { forkJoin, Observable, of } from 'rxjs';
import { CalcAxRequest } from 'src/app/models/elementosNoEstructurales/calcAxRequest';

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
    'prsionSismo',
    'relacionHT'
  ];
  public tiposAnclajes: TipoAnclaje[];
  public amplificacionesDinamicas: AmplificacionDinamica[];
  public panelOpenState: boolean = false;
  public dataSource = new MatTableDataSource<InfoPisoModel>();
  public alturaEquivalente: number;

  public coefAa: number;
  public _coefAa(value: number) {
    this.coefAa = value;
  }

  public coefImportancia: number;
  public _coefImportancia(value: number) {
    this.coefImportancia = value;
  }

  public coefFa: number;
  public _coefFa(value: number) {
    this.coefFa = value;
  }

  public aceleracionSismo: number;
  public _aceleleracionSismo(value: number) {
    this.aceleracionSismo = value;
  }

  public isEspectroFormValid: boolean = false;
  public _isEspectroFormValid(value: boolean) {
    this.isEspectroFormValid = value;
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

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

    this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
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
      this.dataSource.paginator = this.paginator;
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
      alturaAcumulada: infoPiso.alturaAcumulada,
      amplificacionDinamica: this.elementosNoEstructuralesForm.get('amplificacionDinamica').value,
      aceleracionSismica: this.aceleracionSismo
    }

    if (this.validatorsService.validateRequest(calcAxRequest)) {
      return this.elementosNoEstructuralesService.calcAceleracionDinamica(calcAxRequest);
    } else {
      return of(null);
    }
  };

  public calcAxAllFloors() {

    let calcAxObservables: Observable<CalcAxResponse>[] = [];
    this.spinnerServices.show();

    for (let i = 0; i < this.dataSource.data.length; i++) {
      calcAxObservables.push(this.calcAxObservable(this.dataSource.data[i]));
    }

    forkJoin(calcAxObservables).subscribe(result => {
      console.log(result);
      this.spinnerServices.hide();
    }, error => {
      console.log(error);
      this.spinnerServices.hide();
    });
  }

  get isAllValid(): boolean {
    if (this.isEspectroFormValid && this.elementosNoEstructuralesForm.valid) {
      return true;
    } else {
      return false;
    }
  }
}
