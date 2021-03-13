import { NgxSpinnerService } from 'ngx-spinner';
import { CortanteVigaService } from './../../../services/cortante-viga.service';
import { FormGroup } from '@angular/forms';
import { CortanteViga } from './../../../models/cortante-viga';
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

  @Output() CortanteCalcEmitter = new EventEmitter<CortanteViga>();
  formInput: FormGroup;
  cortanteVigaService: CortanteVigaService;
  spinner: NgxSpinnerService;
  @Input() isDisenio: boolean;
  @Input() cortanteViga: CortanteViga;

  constructor() {
    try {
      const injector = MyInjector.getInjector();
      this.spinner = injector.get(NgxSpinnerService);
    } catch (error) {
      console.log('Failed initializing dependencies', error);
    }
  }

  ngOnInit(): void {

  }

  onChangeEvent(event: any, cortanteViga: CortanteViga) {
    cortanteViga[event.target.name] = event.target.value;
  }

  onClick(cortanteViga: CortanteViga) {
    this.CortanteCalcEmitter.emit(cortanteViga);
  }

}
