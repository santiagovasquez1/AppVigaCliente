import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup } from '@angular/forms';
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

  // @Output() CortanteCalcEmitter = new EventEmitter<CortanteViga>();
  // formInput: FormGroup;
  // spinner: NgxSpinnerService;
  // @Input() isDisenio: boolean;
  // @Input() cortanteViga: CortanteViga;

  constructor() {
    // try {
    //   const injector = MyInjector.getInjector();
    //   this.spinner = injector.get(NgxSpinnerService);
    // } catch (error) {
    //   console.log('Failed initializing dependencies', error);
    // }
  }

  ngOnInit(): void {

  }

  onChangeEvent(event: any, cortanteViga: any) {
    // cortanteViga[event.target.name] = Number.parseFloat(event.target.value);
  }

  onClick(cortanteViga: any) {
    // this.CortanteCalcEmitter.emit(cortanteViga);
  }

}
