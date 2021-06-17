import { EGrupoUso } from './../../models/espectro/EGrupoUso';
import { ETipoEstructura } from './../../models/espectro/ETipoEstructura';
import { Component, Input, OnInit } from '@angular/core';
import { ECapacidad } from 'src/app/models/espectro/ECapacidad';
import { EstructuraInfo } from 'src/app/models/espectro/EstrcutruaInfo';

@Component({
  selector: 'app-estructura-info',
  templateUrl: './estructura-info.component.html',
  styles: [
  ]
})
export class EstructuraInfoComponent implements OnInit {

  public capacidades: string[];
  public tipoEstructuras: string[];
  public gruposUsos: string[];
  @Input() public estructuraInfo: EstructuraInfo;

  public selectCapacidad: string;
  public selectTipoEstructura: string;
  public selectGrupoUso: string;

  constructor() {

    this.capacidades = this.loadLists(ECapacidad);
    this.tipoEstructuras = this.loadLists(ETipoEstructura);
    this.gruposUsos = this.loadLists(EGrupoUso);

    this.selectCapacidad = "";
    this.estructuraInfo = new EstructuraInfo(ETipoEstructura.Porticos, 0, ECapacidad.DMO, EGrupoUso.I);
  }

  ngOnInit(): void {
  }

  onCapacidadChange() {
    if (this.selectCapacidad != "") {
      let capacidad = ECapacidad[this.selectCapacidad];
      this.estructuraInfo.Capacidad = capacidad;
    }
  }

  onTipoChange() {
    if (this.selectTipoEstructura != "") {
      let tipo = ETipoEstructura[this.selectTipoEstructura];
      this.estructuraInfo.Sistema = tipo;
    }
  }

  onGrupoChange() {
    if (this.selectTipoEstructura != "") {
      let grupo = EGrupoUso[this.selectGrupoUso];
      this.estructuraInfo.GrupoUso = grupo;
    }
  }

  loadLists(typeEnum: any): string[] {
    let list: string[] = [];

    for (let value in typeEnum) {
      if (isNaN(Number(value))) {
        list.push(value);
      }
    }
    return list;
  }



}
