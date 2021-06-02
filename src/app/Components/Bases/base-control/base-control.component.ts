import { Flexion } from './../../../models/flexion';
import { HerramientasDisenioService } from './../../../services/herramientas-disenio.service';
import { NgForm } from '@angular/forms';
import { Viga } from 'src/app/models/viga';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MyInjector } from 'src/app/Injectors/my-injector';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-base-control',
  template: `
    <p>
      base-control works!
    </p>
  `,
  styleUrls: []
})
export class BaseControlComponent implements OnInit {

  @Input() viga: Viga;
  @Input() flexionCalculo: Flexion
  @Output() vigaCalcEmitter = new EventEmitter<Viga>();
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
    this.vigaCalcEmitter.emit(this.viga);
  }
}
