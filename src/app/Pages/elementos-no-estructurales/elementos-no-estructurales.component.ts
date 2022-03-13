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
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs-compat/operator/distinctUntilChanged';

@Component({
  selector: 'app-elementos-no-estructurales',
  templateUrl: './elementos-no-estructurales.component.html',
  styleUrls: ['./elementos-no-estructurales.component.css']
})
export class ElementosNoEstructuralesComponent implements OnInit {

  public tittle: string = "Diseño de elementos no estructurales";
  public numeroPisos: number = 0;
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

  constructor(public spinnerServices: NgxSpinnerService) {
  }

  ngOnInit(): void {

  }

  
}
