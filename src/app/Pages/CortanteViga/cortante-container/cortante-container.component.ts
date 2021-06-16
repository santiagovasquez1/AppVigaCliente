import { Cortante } from './../../../models/cortante';
import { HerramientasDisenioService } from './../../../services/herramientas-disenio.service';
import { GlobalService } from './../../../services/global.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Viga } from 'src/app/models/viga';
import { Etype } from 'src/app/models/etype';


@Component({
  selector: 'app-cortante-container',
  templateUrl: './cortante-container.component.html',
  styleUrls: ['./cortante-container.component.css']
})
export class CortanteContainerComponent implements OnInit {

  isDisenio = true;
  vigaContainer: Viga;
  cortanteCalculo: Cortante;
  selectOption: string;
  isSectionOk = true;
  SectionMessage = "";

  constructor(public herramientasDisenioServer: HerramientasDisenioService, private spinner: NgxSpinnerService, private cookieService: CookieService, public global: GlobalService) {
    this.vigaContainer = this.global.GetVigaCookie('vigaCortanteCookie', Etype.Cortante);
    this.cortanteCalculo = <Cortante>this.vigaContainer.calculo;
  }

  ngOnInit(): void {

  }

  onVigaCalcEmitter(viga: Viga) {
    this.vigaContainer = viga;
    this.calcularCortante();
  }

  calcularCortante(): void {
    this.spinner.show();

    let params = {
      "bw": this.vigaContainer.bw,
      "hw": this.vigaContainer.hw,
      "rb": this.vigaContainer.rb,
      "fc": this.vigaContainer.fc,
      "fy": this.vigaContainer.fy,
      "vu": this.cortanteCalculo.vu,
      "phiCortante": this.cortanteCalculo.phiCortante,
      "separacion": this.cortanteCalculo.separacionAs,
      "asCortante": this.cortanteCalculo.asCortante
    };

    this.herramientasDisenioServer.ShearDesign(params).subscribe(result => {
      this.vigaContainer = result;
      this.cortanteCalculo = <Cortante>this.vigaContainer.calculo;
      this.global.SetVigaCookie(this.vigaContainer, 'vigaCortanteCookie');
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log(error);
    });
  }

  checkDimensions(viga: Viga) {
    // if (Number.parseFloat(viga.Vu.toString()) > Number.parseFloat(viga.phiVnMax.toString())) {
    //   this.isSectionOk = false;
    //   this.SectionMessage = "¡¡Cortante ultimo mayor a la capacidad máxima de la sección!!"
    // } else if (Number.parseFloat(viga.phiVs.toString()) > Number.parseFloat(viga.phiVsMax.toString())) {
    //   this.isSectionOk = false;
    //   this.SectionMessage = " ¡¡Cortante aportado por el acero mayor a la capacidad máxima de la sección!!"
    // } else {
    //   this.isSectionOk = true;
    // }
  }

  onSelectOptionEmitter(selectOption: string) {
    this.selectOption = selectOption;
  }

}
