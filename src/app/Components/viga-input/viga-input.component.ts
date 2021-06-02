import { GlobalService } from './../../services/global.service';
import { BaseControlComponent } from './../Bases/base-control/base-control.component';
import { Component, Input, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viga-input',
  templateUrl: './viga-input.component.html',
  styleUrls: ['./viga-input.component.css']
})
export class VigaInputComponent extends BaseControlComponent implements OnInit {

  @Input() isDisenio: boolean;
  constructor(private fb: FormBuilder, public global: GlobalService) {
    super(global);
    this.formInput=new FormGroup({});
  }

  ngOnInit(): void {
    // this.spinner.show();
    setTimeout(() => {
      this.formInput = this.fb.group({
        bw: [this.viga.bw, [Validators.required]],
        hw: [this.viga.hw, [Validators.required]],
        r: [this.viga.rb, [Validators.required]],
        fc: [this.viga.fc, [Validators.required]],
        fy: [this.viga.fy, [Validators.required]],
        mu: [this.flexionCalculo.mu],
        phiFlexion: [this.flexionCalculo.phiFlexion]
      });
      // this.spinner.hide();
    }, 500);
  }

}
