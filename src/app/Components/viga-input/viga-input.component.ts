import { Viga } from './../../models/viga';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
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

  listVigas: Viga[] = [];
  viga: Viga;
  myForm: FormGroup;

  constructor(private vigaService: WebApiVigaService, private cookieService: CookieService) {
    this.GetListVigas();
  }

  ngOnInit(): void {

  }

  private GetListVigas(): void {
    this.vigaService.GetVigas().subscribe(result => {
      this.listVigas = result.results;
      if (this.listVigas !== undefined) {
        this.viga = this.listVigas[0];
      } else {
        this.viga = new Viga();
      }
      this.loadFormGroup();
    }, error => {
      console.log(error);
    });


  }

  private loadFormGroup() {
    this.myForm = new FormGroup({
      bw: new FormControl(this.viga.bw, [Validators.required]),
      hw: new FormControl(this.viga.hw, [Validators.required]),
      r: new FormControl(this.viga.r, [Validators.required]),
      fc: new FormControl(this.viga.fc, [Validators.required]),
      fy: new FormControl(this.viga.fy, [Validators.required]),
      Mu: new FormControl(this.viga.Mu, [Validators.required]),
      phiFlexion: new FormControl(this.viga.phiFlexion, [Validators.required])
    });
  }

  private UpdateViga(index): void {

    this.vigaService.UpdateVigaById(index, this.viga).subscribe(result => {
      this.viga = result;
    }, error => {
      console.log(error);
    });
  }

  private CreateViga(): void {
    this.vigaService.setViga(this.viga).subscribe(result => {
      this.viga = result;
      console.log(this.viga);
    },
      error => {
        console.log(error);
      });
  }

  onClick() {
    if (this.listVigas.length > 0) {
      this.UpdateViga(this.viga.id);
    }
    else {
      this.CreateViga();
    }

    return false;
  }

  onChangeEvent(event: any) {
    this.viga[event.target.name] = event.target.value;
  }

}
