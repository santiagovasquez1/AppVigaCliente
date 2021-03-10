import { BaseControlComponent } from './../Bases/base-control/base-control.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Viga } from './../../models/viga';
import { Observable } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { WebApiVigaService } from 'src/app/services/web-api-viga.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-viga-input',
  templateUrl: './viga-input.component.html',
  styleUrls: ['./viga-input.component.css']
})
export class VigaInputComponent extends BaseControlComponent implements OnInit {

  @Input() viga: Viga;
  @Input() isDisenio: boolean;
  constructor(private fb: FormBuilder) {
    super();

    this.formInput = this.fb.group({
      bw: ['', [Validators.required]],
      hw: ['', [Validators.required]],
      r: ['', [Validators.required]],
      fc: ['', [Validators.required]],
      fy: ['', [Validators.required]],
      mu: [''],
      asReq: [''],
      asReq2: [''],
      phiFlexion: ['']
    });
  }

  ngOnInit(): void {

    this.spinner.show();
    setTimeout(() => {
      this.formInput = this.fb.group({
        bw: [this.viga.bw, [Validators.required]],
        hw: [this.viga.hw, [Validators.required]],
        r: [this.viga.r, [Validators.required]],
        fc: [this.viga.fc, [Validators.required]],
        fy: [this.viga.fy, [Validators.required]],
        mu: [this.viga.Mu],
        asReq: [this.viga.asReq],
        asReq2: [this.viga.asReq2],
        phiFlexion: [this.viga.phiFlexion = 0.90]
      });
      this.spinner.hide();
    }, 500);
  }

}
