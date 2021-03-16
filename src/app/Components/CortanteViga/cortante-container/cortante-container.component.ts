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
  constructor(public cortanteVigaService: CortanteVigaService, private spinner: NgxSpinnerService, private cookieService: CookieService) {

  }

  ngOnInit(): void {
    this.cortanteVigaService.disenioCortante = this.cortanteVigaService.GetCortanteCookie('disenioCortante');
    this.cortanteVigaService.chequeoCortante = this.cortanteVigaService.GetCortanteCookie('chequeoCortante');
  }

  onVigaCalcEmitter(cortanteViga: CortanteViga) {
    this.spinner.show();
    if (this.selectOption == 'separacion') {
      cortanteViga.asCortante = 0;
    } else {
      cortanteViga.separacionAs = 0;
    }
    this.cortanteVigaService.disenioCortanteService(cortanteViga).subscribe(result => {
      this.cortanteVigaService.disenioCortante = result;
      this.cookieService.set('disenioCortante', JSON.stringify(result), {
        sameSite: 'Lax'
      });
      console.log(result);
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log(error);
    });
  }

  onSelectOptionEmitter(selectOption: string) {
    this.selectOption = selectOption;
  }

}
