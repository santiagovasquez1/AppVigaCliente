import { Viga } from 'src/app/models/viga';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HerramientasDisenioService {

  headers: HttpHeaders;
  constructor(private global: GlobalService, private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  FlexuralDesign(viga: any): Observable<any> {
    let url = `${this.global.url}/Vigas/FlexuralDesign`;
    let params = JSON.stringify(viga);
    console.log('Request is sent!');
    return this.http.post<any>(url, params, { headers: this.headers });
  }

  FlexuralCheck(viga: any): Observable<any> {
    let url = `${this.global.url}/Vigas/FlexuralCheck`;
    let params = JSON.stringify(viga);
    console.log('Request is sent!');
    return this.http.post<any>(url, params, { headers: this.headers });
  }

  ShearDesign(viga: any): Observable<any> {
    let url = `${this.global.url}/Vigas/ShearDesign`;
    let params = JSON.stringify(viga);
    console.log('Request is sent!');
    return this.http.post<any>(url, params, { headers: this.headers });
  }

  getDepartments(): Observable<any> {
    let url = `${this.global.url}/Municipios/GetDepartmentos`;
    console.log('Request is sent!');
    return this.http.get<any>(url, { headers: this.headers });
  }

  getMunicipios(departamento:string):Observable<any>{
    let url = `${this.global.url}/Municipios/GetMunicipioByDeparment/${departamento}`;
    console.log('Request is sent!');
    return this.http.get<any>(url, { headers: this.headers });
  }

}
