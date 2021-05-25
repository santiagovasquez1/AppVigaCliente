import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CortanteViga } from './../../../models/cortante-viga';
import { CortanteVigaService } from './../../../services/cortante-viga.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-cortante-container',
  templateUrl: './cortante-container.component.html',
  styleUrls: ['./cortante-container.component.css']
})
export class CortanteContainerComponent implements OnInit {

  isDisenio = true;
  selectOption: string;
  isSectionOk = true;
  infoContainerRight: JQuery<HTMLElement>;
  infoContainerLeft: JQuery<HTMLElement>;

  SectionMessage = "";
  constructor(public cortanteVigaService: CortanteVigaService, private spinner: NgxSpinnerService, private cookieService: CookieService) {

  }

  ngOnInit(): void {

    this.infoContainerLeft = $(".infoContainer-left");
    this.infoContainerRight = $(".infoContainer-right");

    this.onResizeWindow();

    window.addEventListener('load', event => {
      this.onResizeWindow();
    });

    window.addEventListener('resize', event => {
      this.onResizeWindow();
    });

    this.cortanteVigaService.disenioCortante = this.cortanteVigaService.GetCortanteCookie('disenioCortante');
    this.cortanteVigaService.chequeoCortante = this.cortanteVigaService.GetCortanteCookie('chequeoCortante');
  }

  onResizeWindow() {

    if (window.innerWidth <= 750) {
      this.infoContainerLeft.css("width", "80%").css("float", "none").css("margin", "0px auto");
      this.infoContainerRight.css("width", "80%").css("float", "none").css("margin", "0px auto");;
    } else {
      this.infoContainerLeft.css("width", "40%").css("float", "left").css("margin-left", "20px");
      this.infoContainerRight.css("width", "40%").css("float", "right").css("margin-right", "20px");
    }
  }

  onVigaCalcEmitter(cortanteViga: CortanteViga) {
    this.spinner.show();
    this.cortanteVigaService.disenioCortanteService(cortanteViga).subscribe(result => {
      this.cortanteVigaService.disenioCortante = result;
      this.cookieService.set('disenioCortante', JSON.stringify(result), {
        sameSite: 'Lax'
      });
      console.log(result);
      this.checkDimensions(result);
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log(error);
    });
  }

  checkDimensions(viga: CortanteViga) {
    if (Number.parseFloat(viga.Vu.toString()) > Number.parseFloat(viga.phiVnMax.toString())) {
      this.isSectionOk = false;
      this.SectionMessage="¡¡Cortante ultimo mayor a la capacidad máxima de la sección!!"
    } else if (Number.parseFloat(viga.phiVs.toString()) > Number.parseFloat(viga.phiVsMax.toString())) {
      this.isSectionOk = false;
      this.SectionMessage=" ¡¡Cortante aportado por el acero mayor a la capacidad máxima de la sección!!"
    }else{
      this.isSectionOk = true;
    }
  }

  onSelectOptionEmitter(selectOption: string) {
    this.selectOption = selectOption;
  }

}
