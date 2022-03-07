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
}
