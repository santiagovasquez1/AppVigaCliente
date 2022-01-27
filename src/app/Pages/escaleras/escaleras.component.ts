import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escaleras',
  templateUrl: './escaleras.component.html',
  styleUrls: ['./escaleras.component.css'],

})
export class EscalerasComponent implements OnInit {
  public title: string = 'Diseño de Escaleras';
  public escalerasForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.escalerasForm = new FormGroup({});

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.escalerasForm = this.fb.group({
      altura: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
      alturaPeldano: ['', [Validators.required]],
      longitudPeldano: ['', [Validators.required]],
      espesor: ['', [Validators.required]],
      espesorDef: ['', [Validators.required]],
      cargaAcabados: ['', [Validators.required]],
      cargaMuerta: ['', [Validators.required]],
      cargaViva: ['', [Validators.required]],
      cargaUltima: ['', [Validators.required]],
      momentoUltimo: ['', [Validators.required]],
      cortanteUltimo: ['', [Validators.required]],
      rhoMin: [0.0018, [Validators.required]],
      asMin:['', [Validators.required]],
      phiMn: ['', [Validators.required]],
      phiVc: ['', [Validators.required]],
      asDef: ['', [Validators.required]],
      separacion: ['', [Validators.required]],
      phiMnDef: ['', [Validators.required]],
    });
  }

}
