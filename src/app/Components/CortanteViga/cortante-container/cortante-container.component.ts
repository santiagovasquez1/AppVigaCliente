import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CortanteViga } from './../../../models/cortante-viga';
import { CortanteVigaService } from './../../../services/cortante-viga.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cortante-container',
  templateUrl: './cortante-container.component.html',
  styleUrls: ['./cortante-container.component.css']
})
export class CortanteContainerComponent implements OnInit {

  isDisenio = true;
  selectOption: string;
  isSectionOk = true;
  SectionMessage = "";
  constructor(public cortanteVigaService: CortanteVigaService, private spinner: NgxSpinnerService, private cookieService: CookieService) {

  }

  ngOnInit(): void {
    this.cortanteVigaService.disenioCortante = this.cortanteVigaService.GetCortanteCookie('disenioCortante');
    this.cortanteVigaService.chequeoCortante = this.cortanteVigaService.GetCortanteCookie('chequeoCortante');
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
