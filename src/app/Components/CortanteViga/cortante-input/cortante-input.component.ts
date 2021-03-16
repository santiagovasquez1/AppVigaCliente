import { CortanteViga } from './../../../models/cortante-viga';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CortanteBaseControlComponent } from '../../Bases/cortante-base-control/cortante-base-control.component';

@Component({
  selector: 'app-cortante-input',
  templateUrl: './cortante-input.component.html',
  styleUrls: ['./cortante-input.component.css']
})
export class CortanteInputComponent extends CortanteBaseControlComponent implements OnInit {

  conditions: string[] = ['separacion', 'AsVertical'];
  @Output() selectOptionEmitter = new EventEmitter<string>();
  constructor(private fb: FormBuilder) {
    super();

    this.formInput = this.fb.group({
      bw: ['', [Validators.required]],
      hw: ['', [Validators.required]],
      r: ['', [Validators.required]],
      fc: ['', [Validators.required]],
      fy: ['', [Validators.required]],
      separacionAs: ['', Validators.required],
      asCortante: ['', [Validators.required]],
      Vu: ['', [Validators.required]],
      selectedCondition: [''],
    });
  }

  ngOnInit(): void {

    let selectConditions = "";
    if (this.cortanteViga.asCortante > 0) {
      selectConditions = this.conditions[1];
    } else {
      selectConditions = this.conditions[0];
    }

    this.spinner.show();
    setTimeout(() => {
      this.formInput = this.fb.group({
        bw: [this.cortanteViga.bw, [Validators.required]],
        hw: [this.cortanteViga.hw, [Validators.required]],
        r: [this.cortanteViga.r, [Validators.required]],
        fc: [this.cortanteViga.fc, [Validators.required]],
        fy: [this.cortanteViga.fy, [Validators.required]],
        separacionAs: [this.cortanteViga.separacionAs, Validators.required],
        asCortante: [this.cortanteViga.asCortante, [Validators.required]],
        Vu: [this.cortanteViga.Vu, [Validators.required]],
        selectedCondition: [selectConditions, [Validators.required]],
      });
      this.spinner.hide();
    }, 500);
  }

  onOpcionSelected() {
    let selectConditions = this.formInput.get('selectedCondition').value;
    this.selectOptionEmitter.emit(selectConditions);
  }
}
