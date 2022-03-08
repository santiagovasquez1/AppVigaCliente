import { CalcSaRequest } from '../models/espectroInfo/calcSaRequest';
import { CalcPeriodosResponse } from './../models/espectroInfo/calcPeriodosResponse';
import { CalcPeriodosRequest } from './../models/espectroInfo/calcPeriodosRequest';
import { GrupoDeUsoModel } from './../models/espectroInfo/grupoDeUsoModel';
import { TipoEstructura } from './../models/espectroInfo/tipoDeEstructuraModel';
import { TipoSueloFullInfo } from './../models/espectroInfo/tipoSueloFullInfoModel';
import { Municipio } from './../models/espectroInfo/municipioModel';
import { Departamento } from './../models/espectroInfo/departamentoModel';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ServiceBaseService } from './service-base.service';
import { map } from 'rxjs/operators';
import { CalcFaFvRequest } from '../models/espectroInfo/calcFaFvRequest';
import { CalcFaFvResponse } from '../models/espectroInfo/calcFaFvResponse';
import { CalcSaResponse } from '../models/espectroInfo/calcSaResponse';

@Injectable({
  providedIn: 'root'
})
export class EspectroService extends ServiceBaseService {

  getDepartamentos(): Observable<Departamento[]> {
    let url = `${this.env.espectro_url}/departamentos`;
    return this.http.get<any>(url, { headers: this.headers })
      .pipe(
        map(res => {
          return res.departamentos as Departamento[];
        })
      );
  }

  getMunicipios(idDepartamento: number): Observable<Municipio[]> {
    let url = `${this.env.espectro_url}/municipios/${idDepartamento}`;
    return this.http.get<any>(url, { headers: this.headers })
      .pipe(
        map(res => {
          return res.municipios as Municipio[];
        })
      );
  }

  getTiposSueloFullInfo(): Observable<TipoSueloFullInfo[]> {
    let url = `${this.env.espectro_url}/tiposSuelos`;
    return this.http.get<any>(url, { headers: this.headers })
      .pipe(
        map(res => {
          return res.tiposSuelos as TipoSueloFullInfo[];
        })
      );
  }

  getTiposDeEstructuras(): Observable<TipoEstructura[]> {
    let url = `${this.env.espectro_url}/tiposDeEstructuras`;
    return this.http.get<any>(url, { headers: this.headers })
      .pipe(
        map(res => {
          return res.tiposDeEstructuras as TipoEstructura[];
        })
      );
  }

  getGruposDeUso(): Observable<GrupoDeUsoModel[]> {
    let url = `${this.env.espectro_url}/gruposDeUso`;
    return this.http.get<any>(url, { headers: this.headers })
      .pipe(
        map(res => {
          return res.gruposDeUso as GrupoDeUsoModel[];
        })
      );
  }

  calcFaFv(calcFaFvRequest: CalcFaFvRequest): Observable<CalcFaFvResponse> {
    let url = `${this.env.espectro_url}/calcFaFv`;
    return this.http.post<CalcFaFvResponse>(url, calcFaFvRequest, { headers: this.headers });
  }

  calcPeriodos(calcPeriodosRequest: CalcPeriodosRequest): Observable<CalcPeriodosResponse> {
    let url = `${this.env.espectro_url}/calcPeriodos`;
    return this.http.post<CalcPeriodosResponse>(url, calcPeriodosRequest, { headers: this.headers });
  }

  calcSa(calcSaRequest: CalcSaRequest): Observable<CalcSaResponse> {
    let url = `${this.env.espectro_url}/calcSa`;
    return this.http.post<CalcSaResponse>(url, calcSaRequest, { headers: this.headers });
  }
}
