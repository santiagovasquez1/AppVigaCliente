import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';


export interface AppConfig {
  apiEndPoint: string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndPoint: 'http://localhost:8000/vigas/'
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

@Injectable({
  providedIn: 'root'
})
export class VigaLoadService {

  constructor(private http: HttpClient) { }

  async intializeVigasState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
  }


}
