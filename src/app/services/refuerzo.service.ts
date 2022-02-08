import { InfoRefuerzoResponse } from './../models/refuerzo/infoRefuerzoResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RefuerzoService {
  env = environment;
  constructor(private http: HttpClient) { }

  getRefuerzos(): Observable<InfoRefuerzoResponse[]> {
    let url = `${this.env.herramientas_url}/areaRefuerzo`;
    return this.http.get<any>(url)
      .pipe(
        map(res => {
          return res.refuerzos as InfoRefuerzoResponse[];
        })
      );
  }
}
