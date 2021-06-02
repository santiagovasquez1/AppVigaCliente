import { Flexion } from './../../../models/flexion';
import { HerramientasDisenioService } from './../../../services/herramientas-disenio.service';
import { ICalculo } from './../../../models/icalculo';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Viga } from 'src/app/models/viga';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MyInjector } from 'src/app/Injectors/my-injector';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-base-control',
  template: `
    <p>
      base-control works!
    </p>
  `,
  styleUrls: ['./base-control.component.css']
})
export class BaseControlComponent implements OnInit {

  @Output() vigaCalcEmitter = new EventEmitter<Viga>();
  @Input() viga:Viga;
  formInput: FormGroup;
  spinner: NgxSpinnerService;
  flexionCalculo: Flexion
  herramientasDisenioSevice: HerramientasDisenioService

  constructor(public global: GlobalService) {

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

  onblurEvent(event: any, viga: Viga) {
    viga[event.target.name] = event.target.value;
  }

  onClick(viga: Viga) {
    this.vigaCalcEmitter.emit(viga);
  }

}
