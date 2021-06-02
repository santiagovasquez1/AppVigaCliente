import { Cortante } from './../models/cortante';
import { Viga } from 'src/app/models/viga';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Flexion } from '../models/flexion';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  sectionWidht: number;
  minWidth: number;
  url: string;

  constructor(private cookieService: CookieService) {
    this.minWidth = 800;
    this.url = "https://localhost:44340/api/Vigas/"
  }

  GetvigaFlexion(): Viga {
    const cookieVigaFlexion = this.cookieService.get('vigaFlexionCookie');
    if (cookieVigaFlexion === '') {
      let flexion = new Flexion();
      flexion.mu = 0;
      flexion.phiFlexion = 0.90;
      return new Viga(0, 0, 0, 0, 4220, 0, flexion);
    }
    const viga = JSON.parse(cookieVigaFlexion);
    return viga;
  }

  GetVigaCortante(): Viga {
    const cookieVigaCortante = this.cookieService.get('vigaCortanteCookie');
    if (cookieVigaCortante === '') {
      let cortante = new Cortante();
      cortante.vu = 0;
      cortante.phiCortante = 0.75;
      return new Viga(30, 50, 6, 210, 4220, 25, cortante);
    }
    const viga = JSON.parse(cookieVigaCortante);
    return viga;
  }

  SetVigaCookie(viga: Viga, cookieName: string) {
    this.cookieService.set(cookieName, JSON.stringify(viga), {
      sameSite: 'Lax'
    });
  }
}
