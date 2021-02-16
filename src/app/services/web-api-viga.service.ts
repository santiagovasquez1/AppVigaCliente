import { Viga } from './../models/viga';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiVigaService {

  private readonly apiEndPoint = 'http://localhost:8000/vigas/';

  private modelViga: Viga = {
    id: 0,
    bw: 0,
    hw: 0,
    r: 0,
    fc: 0,
    fy: 0,
    d: 0,
    cuantiaTemp: 0,
    cuantiaMin: 0,
    cuantiaMax: 0,
    cuantiaReq: 0,
    asTemp: 0,
    asMin: 0,
    asMax: 0,
    asReq: 0,
    Mu: 0,
    phiFlexion: 0,
    aWhitney: 0,
    phiMn: 0,
  };

  // private vigas: Array<Viga>;

  constructor(private http: HttpClient) { }

  GetVigas(): Observable<Viga[]> {
    console.log('Request is sent!');
    return this.http.get<Viga[]>(this.apiEndPoint);
  }

  setViga(dataInput): Observable<Viga> {
    console.log('Request is sent!');
    return this.http.post<Viga>(this.apiEndPoint, dataInput);
  }

  // GetVigas2():Observable<any></any>{
  //   return this.http.get(this.apiEndPoint);
  // }

}
