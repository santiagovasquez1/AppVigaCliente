import { Viga } from './../models/viga';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiVigaService {

  private readonly apiEndPoint = 'http://localhost:8000/vigas/';

  // private vigas: Array<Viga>;
  currentViga: Viga = new Viga();
  changeProperty = false;

  constructor(private http: HttpClient) { }

  GetVigas(): Observable<any> {
    console.log('Request is sent!');
    return this.http.get<any>(this.apiEndPoint);
  }

  setViga(dataInput): Observable<Viga> {
    console.log('Request is sent!');
    return this.http.post<Viga>(this.apiEndPoint, dataInput);
  }

  GetVigaById(index): Observable<Viga> {
    const url = this.apiEndPoint + index;
    console.log('Request is sent!');
    return this.http.get<Viga>(url);
  }

  UpdateVigaById(index, dataInput): Observable<Viga> {
    const url = this.apiEndPoint + index + '/' + 'updateFlexion/';
    console.log('Request is sent!');
    return this.http.post<Viga>(url, dataInput);
  }

  sentViga(): Observable<Viga> {

    const sendVigaObservable = new Observable<Viga>(observer => {

      if (this.changeProperty){
        observer.next(this.currentViga);
      }
        // setTimeout(() => {
        //   observer.next(this.currentViga);
        // }, 500);

    });

    return sendVigaObservable;
  }

  // GetVigas2():Observable<any></any>{
  //   return this.http.get(this.apiEndPoint);
  // }

}
