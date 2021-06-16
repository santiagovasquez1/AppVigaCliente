import { Flexion } from 'src/app/models/flexion';
import { HerramientasDisenioService } from './../../../services/herramientas-disenio.service';
import { GlobalService } from './../../../services/global.service';
import { Viga } from './../../../models/viga';
import { Component, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import { ContainerBaseComponent } from '../../Bases/container-base/container-base.component';
import { Etype } from 'src/app/models/etype';

@Component({
  selector: 'app-viga-chequeo-container',
  templateUrl: './viga-chequeo-container.component.html',
  styleUrls: ['./viga-chequeo-container.component.css']
})
export class VigaChequeoContainerComponent implements OnInit {

  vigaContainer: Viga;
  flexionCalculo: Flexion;
  isDisenio = false;

  constructor(private herramientasDisenioService: HerramientasDisenioService, private spinner: NgxSpinnerService, public global: GlobalService) {
    this.vigaContainer = this.global.GetVigaCookie('vigaFlexionChequeoCookie', Etype.Flexion);
    this.flexionCalculo = <Flexion>this.vigaContainer.calculo;
  }

  ngOnInit(): void {

  }

  onVigaCalcEmitter(viga: Viga) {
    this.vigaContainer = viga;
    this.ChequearSeccion();
  }

  private ChequearSeccion(): void {
    this.spinner.show();
    let params = {
      "bw": this.vigaContainer.bw,
      "hw": this.vigaContainer.hw,
      "rb": this.vigaContainer.rb,
      "fc": this.vigaContainer.fc,
      "fy": this.vigaContainer.fy,
      "mu": this.flexionCalculo.mu,
      "phiFlexion": this.flexionCalculo.phiFlexion,
      "asReq": this.flexionCalculo.aceroRequerido,
      "asReq2": this.flexionCalculo.aceroRequerido2
    }
    this.herramientasDisenioService.FlexuralCheck(params).subscribe(result => {
      this.vigaContainer = result;
      this.flexionCalculo = <Flexion>this.vigaContainer.calculo
      this.global.SetVigaCookie(this.vigaContainer, 'vigaFlexionChequeoCookie');
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log(error);
    });
  }

}
