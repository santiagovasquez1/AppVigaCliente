import { Flexion } from './../../models/flexion';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Viga } from 'src/app/models/viga';

@Component({
  selector: 'app-viga-output',
  templateUrl: './viga-output.component.html',
  styleUrls: ['./viga-output.component.css']
})
export class VigaOutputComponent implements OnInit {

  @Input() viga: Viga;
  @Input() isDisenio: boolean;
  flexion: Flexion;

  constructor() {

  }

  ngOnInit(): void {
    this.flexion = <Flexion>this.viga.calculo
  }

}
