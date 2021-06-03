import { GlobalService } from './../../services/global.service';
import { BaseControlComponent } from './../Bases/base-control/base-control.component';
import { Component, Input, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flexion } from 'src/app/models/flexion';

@Component({
  selector: 'app-viga-input',
  templateUrl: './viga-input.component.html',
  styleUrls: ['./viga-input.component.css']
})
export class VigaInputComponent extends BaseControlComponent implements OnInit {

  @Input() isDisenio: boolean;
  constructor(public global: GlobalService) {
    super();
  }

  ngOnInit(): void {

  }

}
