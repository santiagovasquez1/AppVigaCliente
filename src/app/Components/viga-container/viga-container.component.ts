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
  isDisenio = true;

  constructor(public herramientasDisenioServer: HerramientasDisenioService, private spinner: NgxSpinnerService, public global: GlobalService) {
    this.vigaContainer = global.GetvigaFlexion();
  }

  ngOnInit(): void {

  }

  onVigaCalcEmitter(viga: Viga) {
    this.vigaContainer = viga;
    this.CreateViga();
  }

  private CreateViga(): void {
    this.spinner.show();
    this.herramientasDisenioServer.FlexuralDesign(this.vigaContainer).subscribe(result => {
      this.vigaContainer = result;
      this.global.SetVigaCookie(this.vigaContainer, 'vigaFlexionCookie');
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log(error);
    });
  }
}
