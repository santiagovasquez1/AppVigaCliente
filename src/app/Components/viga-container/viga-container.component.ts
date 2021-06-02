import { Flexion } from './../../models/flexion';
import { HerramientasDisenioService } from './../../services/herramientas-disenio.service';
import { GlobalService } from './../../services/global.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Viga } from 'src/app/models/viga';
import * as $ from 'jquery';
import { ContainerBaseComponent } from '../Bases/container-base/container-base.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-viga-container',
  templateUrl: './viga-container.component.html',
  styleUrls: ['./viga-container.component.css']
})
export class VigaContainerComponent implements OnInit {

  vigaContainer: Viga;
  flexionCalculo: Flexion;
  isDisenio = true;

  constructor(public herramientasDisenioServer: HerramientasDisenioService, private spinner: NgxSpinnerService, public global: GlobalService) {
    this.vigaContainer = global.GetvigaFlexion();
    this.flexionCalculo = <Flexion>this.vigaContainer.calculo;
  }

  ngOnInit(): void {

  }

  onVigaCalcEmitter(viga: Viga) {
    this.vigaContainer = viga;
    this.CalcularFlexion();
  }

  private CalcularFlexion(): void {
    this.spinner.show();
    let params={
      "bw":this.vigaContainer.bw,
      "hw":this.vigaContainer.hw,
      "rb":this.vigaContainer.rb,
      "fc":this.vigaContainer.fc,
      "fy":this.vigaContainer.fy,
      "mu":this.flexionCalculo.mu,
      "phiFlexion":this.flexionCalculo.phiFlexion
    }
    this.herramientasDisenioServer.FlexuralDesign(params).subscribe(result => {
      this.vigaContainer = result;
      this.flexionCalculo=<Flexion>this.vigaContainer.calculo
      this.global.SetVigaCookie(this.vigaContainer, 'vigaFlexionCookie');
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log(error);
    });
  }
}
