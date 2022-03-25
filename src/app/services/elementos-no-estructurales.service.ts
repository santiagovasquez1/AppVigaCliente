import { ServiceBaseService } from './service-base.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TipoAnclaje } from '../models/elementosNoEstructurales/tipoAnclaje';
import { Observable } from 'rxjs';
import { AmplificacionDinamica } from '../models/elementosNoEstructurales/amplificacionDinamica';

@Injectable({
  providedIn: 'root'
})
export class ElementosNoEstructuralesService extends ServiceBaseService {

  getTiposAnclajes(): Observable<TipoAnclaje[]> {
    let url = `${this.env.elementosNoEstructurales_url}/tiposAnclajes`;
    return this.http.get<any>(url, { headers: this.headers })
      .pipe(
        map(res => {
          return res.tiposAnclajes as TipoAnclaje[];
        })
      );
  }

  getAmplificacionesDinamicas(): Observable<AmplificacionDinamica[]> {
    let url = `${this.env.elementosNoEstructurales_url}/amplificacionesDinamicas`;
    return this.http.get<any>(url, { headers: this.headers })
      .pipe(
        map(res => {
          return res.amplificacionesDinamicas as AmplificacionDinamica[];
        })
      );
  }
}
