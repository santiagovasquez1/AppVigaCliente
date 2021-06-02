import { Cortante } from './../../../models/cortante';
import { HerramientasDisenioService } from './../../../services/herramientas-disenio.service';
import { Viga } from 'src/app/models/viga';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MyInjector } from 'src/app/Injectors/my-injector';

@Component({
  selector: 'app-cortante-base-control',
  template: `
    <p>
      cortante-base-control works!
    </p>
  `,
  styleUrls: ['./cortante-base-control.component.css']
})
export class CortanteBaseControlComponent implements OnInit {

  @Input() isDisenio: boolean;
  @Input() viga: Viga;
  @Input() cortanteCalculo: Cortante
  @Output() CortanteCalcEmitter = new EventEmitter<Viga>();
  spinner: NgxSpinnerService;
  herramientasDisenioSevice: HerramientasDisenioService

  constructor() {
    try {
      const injector = MyInjector.getInjector();
      this.herramientasDisenioSevice = injector.get(HerramientasDisenioService);
      this.spinner = injector.get(NgxSpinnerService);
    } catch (error) {
      console.log('Failed initializing dependencies', error);
    }
  }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    this.CortanteCalcEmitter.emit(this.viga);
  }


}
