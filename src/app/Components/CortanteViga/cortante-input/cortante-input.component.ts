import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CortanteBaseControlComponent } from '../../Bases/cortante-base-control/cortante-base-control.component';

@Component({
  selector: 'app-cortante-input',
  templateUrl: './cortante-input.component.html',
  styleUrls: ['./cortante-input.component.css']
})
export class CortanteInputComponent extends CortanteBaseControlComponent implements OnInit {

  conditions: string[];
  private _selectedCondition: string;

  public get selectedCondition(): string {
    return this._selectedCondition;
  }
  public set selectedCondition(value: string) {
    this._selectedCondition = value;
    this.onOpcionSelected();
  }
  prueba: string;
  @Output() selectOptionEmitter = new EventEmitter<string>();

  constructor() {
    super();
    this.conditions = ['separacion', 'AsVertical'];
    this.selectedCondition = "";
    this.prueba = "";
  }

  ngOnInit(): void {
    this.selectedCondition = this.conditions[0];
  }

  onOpcionSelected() {
    if(this.cortanteCalculo!=undefined){
      if (this.selectedCondition == this.conditions[0]) {
        this.cortanteCalculo.asCortante = 0;
      } else {
        this.cortanteCalculo.separacionAs = 0;
      }
    }
  }
}
