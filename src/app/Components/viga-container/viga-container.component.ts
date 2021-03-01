import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Viga } from 'src/app/models/viga';
import { WebApiVigaService } from 'src/app/services/web-api-viga.service';

@Component({
  selector: 'app-viga-container',
  templateUrl: './viga-container.component.html',
  styleUrls: ['./viga-container.component.css']
})
export class VigaContainerComponent implements OnInit {

  @Output() getViga = new EventEmitter<Viga>();
  vigaContainer: Viga;
  listVigas: Viga[];

  constructor(public vigaService: WebApiVigaService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.GetListVigas();
  }

  onVigaCalcEmitter(viga: Viga) {
    this.vigaContainer = viga;
    if (this.listVigas.length > 0) {
      this.UpdateViga(this.listVigas[0].id);
    } else {
      this.CreateViga();
    }

  }

  private UpdateViga(index): void {
    this.spinner.show();
    this.vigaService.UpdateVigaById(index, this.vigaContainer).subscribe(result => {
      this.vigaContainer = result;
      this.vigaService.currentViga = this.vigaContainer;
      console.log(this.vigaService.currentViga);
      this.vigaService.changeProperty = true;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      console.log(error);
    });
  }

  private CreateViga(): void {
    this.spinner.show();
    this.vigaService.setViga(this.vigaContainer).subscribe(result => {
      this.vigaContainer = result;
      this.vigaService.currentViga = this.vigaContainer;
      this.vigaService.changeProperty = true;
      this.listVigas.push(this.vigaContainer);
      console.log(this.vigaService.currentViga);
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private GetListVigas(): void {
    this.vigaService.GetVigas().subscribe(result => {
      this.listVigas = result.results;
      if (this.listVigas.length > 0) {
        this.vigaContainer = this.listVigas[0];
        this.vigaService.currentViga = this.listVigas[0];
      } else {
        this.vigaContainer = new Viga();
        this.vigaService.currentViga = new Viga();
      }
    }, error => {
      this.vigaService.currentViga = new Viga();
      console.log(error);
    });
  }

}
