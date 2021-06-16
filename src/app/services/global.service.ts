import { Etype } from './../models/etype';
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
    this.url = "https://localhost:44340/api"
  }

  GetVigaCookie(cookieName: string, type: Etype): Viga {
    const cookieViga = this.cookieService.get(cookieName);
    if (cookieViga === '' && type == Etype.Flexion) {
      let flexion = new Flexion(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.90, 0, 0, 0);
      return new Viga(0, 0, 0, 0, 4220, 0, flexion);
    } else if (cookieViga === '' && type == Etype.Cortante) {
      let cortante = new Cortante(0, 0, 0, 0, 0, 0, 0, 0.75, 0);
      return new Viga(0, 0, 0, 0, 4220, 0, cortante);
    }
    const viga = JSON.parse(cookieViga);
    return viga;
  }

  SetVigaCookie(viga: Viga, cookieName: string) {
    this.cookieService.set(cookieName, JSON.stringify(viga), {
      sameSite: 'Lax'
    });
  }
}
