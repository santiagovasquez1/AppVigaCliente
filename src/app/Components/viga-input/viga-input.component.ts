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
export class VigaInputComponent implements OnInit {

  @Input() viga: Viga;
  formInput: FormGroup;
  @Output() vigaCalcEmitter = new EventEmitter<Viga>();

  constructor(private cookieService: CookieService, private spinner: NgxSpinnerService, private fb: FormBuilder) {
    this.formInput = this.fb.group({
      bw: ['', [Validators.required]],
      hw: ['', [Validators.required]],
      r: ['', [Validators.required]],
      fc: ['', [Validators.required]],
      fy: ['', [Validators.required]],
      Mu: ['', [Validators.required]],
      phiFlexion: ['', [Validators.required]]
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
        Mu: [this.viga.Mu, [Validators.required]],
        phiFlexion: [this.viga.phiFlexion = 0.90, [Validators.required]]
      });
      this.spinner.hide();
    }, 200);
  }

  onClick() {
    this.vigaCalcEmitter.emit(this.viga);
  }

  onChangeEvent(event: any) {
    this.viga[event.target.name] = event.target.value;
  }

}
