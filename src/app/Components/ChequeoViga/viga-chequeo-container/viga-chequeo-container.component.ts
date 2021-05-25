import { Viga } from './../../../models/viga';
import { WebApiVigaService } from 'src/app/services/web-api-viga.service';
import { Component, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import { ContainerBaseComponent } from '../../Bases/container-base/container-base.component';

@Component({
  selector: 'app-viga-chequeo-container',
  templateUrl: './viga-chequeo-container.component.html',
  styleUrls: ['./viga-chequeo-container.component.css']
})
export class VigaChequeoContainerComponent extends ContainerBaseComponent implements OnInit {

  isDisenio = false;

  constructor(public vigaService: WebApiVigaService, private spinner: NgxSpinnerService) {
    super();
  }

  ngOnInit(): void {

    this.infoContainerLeft = $(".infoContainer-left");
    this.infoContainerRight = $(".infoContainer-right");
    this.onComponentInit();

    this.vigaService.GetVigas().subscribe(result => {
      const vigas = result.results as Viga[];
      if (vigas.length > 1) {
        this.vigaService.vigaChequeo = vigas[vigas.length - 1];
      } else {
        this.vigaService.vigaChequeo.id = vigas.length + 1;
      }
    }, error => {
      console.log(error);
    });
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

  onVigaCalcEmitter(viga: Viga) {
    this.GetVigaChequeo(viga.id, viga);
  }

  private GetVigaChequeo(index, dataViga): void {
    this.spinner.show();
    this.vigaService.ChequeoVigaById(index, dataViga).subscribe(result => {
      this.vigaService.vigaChequeo = result;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log(error);
    });
  }

}
