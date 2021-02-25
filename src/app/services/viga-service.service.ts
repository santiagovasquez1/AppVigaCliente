import { Injectable } from '@angular/core';
import { Viga } from '../models/viga';

@Injectable({
  providedIn: 'root'
})
export class VigaServiceService {
  viga: Viga;
  listVigas: Viga[];
  constructor() { }
}
