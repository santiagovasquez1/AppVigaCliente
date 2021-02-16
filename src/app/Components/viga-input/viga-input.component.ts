import { Viga } from './../../models/viga';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { WebApiVigaService } from 'src/app/services/web-api-viga.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viga-input',
  templateUrl: './viga-input.component.html',
  styleUrls: ['./viga-input.component.css']
})
export class VigaInputComponent implements OnInit {

  public listVigas: Viga[];
  viga: Viga = {
    id: 0,
    bw: 0,
    hw: 0,
    r: 0,
    fc: 0,
    fy: 0,
    d: 0,
    cuantiaTemp: 0,
    cuantiaMin: 0,
    cuantiaMax: 0,
    cuantiaReq: 0,
    asTemp: 0,
    asMin: 0,
    asMax: 0,
    asReq: 0,
    Mu: 0,
    phiFlexion: 0.90,
    aWhitney: 0,
    phiMn: 0,
  };
  fg: FormGroup;

  constructor(private vigaService: WebApiVigaService, fb: FormBuilder) {
    this.fg = fb.group({
      fy: [4220, Validators.required],
      fc: [210, Validators.required],
      b: [30, Validators.required],
      h: [40, Validators.required],
      dSup: [6, Validators.required],
      Mu: [15, Validators.required]
    });
  }

  ngOnInit(): void {
    this.GetListVigas();
  }


  private GetListVigas() {
    this.vigaService.GetVigas().subscribe(result => {
      this.listVigas = result;
      console.log(this.listVigas);
    },
      error => {
        console.log(error);
      });
  }

  onClick() {

    const dataModel = {
      bw: this.fg.controls.b.value,
      hw: this.fg.controls.h.value,
      r: this.fg.controls.dSup.value,
      fc: this.fg.controls.fc.value,
      fy: this.fg.controls.fy.value,
      Mu: this.fg.controls.Mu.value,
      phiFlexion: 0.90,
    };

    this.vigaService.setViga(dataModel).subscribe(result => {
      this.viga = result;
      this.GetListVigas();
      console.log(this.viga);
    },
      error => {
        console.log(error);
      });

    return false;
  }

}
