import { WebApiVigaService } from 'src/app/services/web-api-viga.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Viga } from 'src/app/models/viga';

@Component({
  selector: 'app-viga-output',
  templateUrl: './viga-output.component.html',
  styleUrls: ['./viga-output.component.css']
})
export class VigaOutputComponent implements OnInit {

  outputForm: FormGroup;
  @Input() viga: Viga;
  @Input() isDisenio: boolean;

  constructor() {

  }

  ngOnInit(): void {

  }

}
