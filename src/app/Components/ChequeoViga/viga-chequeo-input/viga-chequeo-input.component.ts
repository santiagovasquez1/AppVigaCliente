import { BaseControlComponent } from './../../Bases/base-control/base-control.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebApiVigaService } from 'src/app/services/web-api-viga.service';
import { Viga } from './../../../models/viga';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-viga-chequeo-input',
  templateUrl: './viga-chequeo-input.component.html',
  styleUrls: ['./viga-chequeo-input.component.css']
})
export class VigaChequeoInputComponent extends BaseControlComponent implements OnInit {

  constructor(private fb: FormBuilder) {

    super(fb);
    this.formInput = this.fb.group({
      bw: ['', [Validators.required]],
      hw: ['', [Validators.required]],
      r: ['', [Validators.required]],
      fc: ['', [Validators.required]],
      fy: ['', [Validators.required]],
      asReq: ['', [Validators.required]],
      asReq2: ['', [Validators.required]],
      phiFlexion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.formInput = this.fb.group({
        bw: [this.vigaService.vigaChequeo.bw, [Validators.required]],
        hw: [this.vigaService.vigaChequeo.hw, [Validators.required]],
        r: [this.vigaService.vigaChequeo.r, [Validators.required]],
        fc: [this.vigaService.vigaChequeo.fc, [Validators.required]],
        fy: [this.vigaService.vigaChequeo.fy, [Validators.required]],
        asReq: [this.vigaService.vigaChequeo.asReq, [Validators.required]],
        asReq2: [this.vigaService.vigaChequeo.asReq2, [Validators.required]],
        phiFlexion: [this.vigaService.vigaChequeo.phiFlexion = 0.90, [Validators.required]]
      });
      this.spinner.hide();
    }, 200);
  }

}
