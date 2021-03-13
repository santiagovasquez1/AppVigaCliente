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
  constructor(public cortanteVigaService: CortanteVigaService, private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.cortanteVigaService.disenioCortante = this.cortanteVigaService.GetCortanteCookie('disenioCortante');
    this.cortanteVigaService.chequeoCortante = this.cortanteVigaService.GetCortanteCookie('chequeoCortante');
  }

  onVigaCalcEmitter(cortanteViga: CortanteViga) {
    this.spinner.show();
    this.cortanteVigaService.disenioCortanteService(cortanteViga).subscribe(result => {
      this.cortanteVigaService.disenioCortante = result;
      console.log(result);
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log(error);
    });

  }


}
