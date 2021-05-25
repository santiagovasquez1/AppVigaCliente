import { FormGroup, FormBuilder } from '@angular/forms';
import { Viga } from 'src/app/models/viga';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebApiVigaService } from 'src/app/services/web-api-viga.service';
import { MyInjector } from 'src/app/Injectors/my-injector';
import { NgxSpinnerService } from 'ngx-spinner';

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
  formInput: FormGroup;
  vigaService: WebApiVigaService;
  spinner: NgxSpinnerService;


  constructor() {

    try {
      const injector = MyInjector.getInjector();
      this.vigaService = injector.get(WebApiVigaService);
      this.vigaService.currentViga.phiFlexion = 0.90;
      this.vigaService.vigaChequeo.phiFlexion = 0.90;
      this.spinner = injector.get(NgxSpinnerService);
    } catch (error) {
      console.log('Failed initializing dependencies', error);
    }

  }

  ngOnInit(): void {

  }



  onChangeEvent(event: any, viga: Viga) {
    viga[event.target.name] = event.target.value;
  }

  onClick(viga: Viga) {
    this.vigaCalcEmitter.emit(viga);
  }

}
