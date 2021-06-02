import { HerramientasDisenioService } from './../../../services/herramientas-disenio.service';
import { GlobalService } from './../../../services/global.service';
import { Viga } from './../../../models/viga';
import { Component, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import { ContainerBaseComponent } from '../../Bases/container-base/container-base.component';

@Component({
  selector: 'app-viga-chequeo-container',
  templateUrl: './viga-chequeo-container.component.html',
  styleUrls: ['./viga-chequeo-container.component.css']
})
export class VigaChequeoContainerComponent implements OnInit {

  isDisenio = false;
  constructor(private herramientasDisenioService: HerramientasDisenioService, private spinner: NgxSpinnerService, public global: GlobalService) {

  }

  ngOnInit(): void {
    // this.vigaService.GetVigas().subscribe(result => {
    //   const vigas = result.results as Viga[];
    //   if (vigas.length > 1) {
    //     this.vigaService.vigaChequeo = vigas[vigas.length - 1];
    //   } else {
    //     this.vigaService.vigaChequeo.id = vigas.length + 1;
    //   }
    // }, error => {
    //   console.log(error);
    // });
  }

  onVigaCalcEmitter(viga: Viga) {
    // this.GetVigaChequeo(viga.id, viga);
  }

  private GetVigaChequeo(index, dataViga): void {
    // this.spinner.show();
    // this.vigaService.ChequeoVigaById(index, dataViga).subscribe(result => {
    //   this.vigaService.vigaChequeo = result;
    //   this.spinner.hide();
    // }, error => {
    //   this.spinner.hide();
    //   console.log(error);
    // });
  }

}
