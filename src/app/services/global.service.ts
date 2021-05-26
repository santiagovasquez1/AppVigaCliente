import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  sectionWidht: number
  minWidth: number
  constructor() {
    this.minWidth = 800;
  }

}
