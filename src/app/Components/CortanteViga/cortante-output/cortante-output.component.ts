import { Cortante } from './../../../models/cortante';
import { Component, Input, OnInit, Output } from '@angular/core';
import { CortanteBaseControlComponent } from '../../Bases/cortante-base-control/cortante-base-control.component';

@Component({
  selector: 'app-cortante-output',
  templateUrl: './cortante-output.component.html',
  styleUrls: ['./cortante-output.component.css']
})
export class CortanteOutputComponent extends CortanteBaseControlComponent implements OnInit {
  @Input() isSectionOk: Boolean;
  @Input() SectionMessage: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
