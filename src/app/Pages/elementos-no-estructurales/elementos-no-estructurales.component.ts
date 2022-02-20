import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elementos-no-estructurales',
  templateUrl: './elementos-no-estructurales.component.html',
  styleUrls: ['./elementos-no-estructurales.component.css']
})
export class ElementosNoEstructuralesComponent implements OnInit {

  public tittle: string = "Diseño de elementos no estructurales";
  public parametrosSismicosForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createParamsSismicosForm() {
    this.parametrosSismicosForm = this.fb.group({
      municipio: ['', [Validators.required]],
      tipoSuelo: ['', [Validators.required]],
      tipoEstructura: ['', [Validators.required]],
      coefImportancia: ['', [Validators.required]],
      coefAa: [{ value: '', disabled: true }, [Validators.required]],
      coefAv: [{ value: '', disabled: true }, [Validators.required]],
      cofFa: [{ value: '', disabled: true }, [Validators.required]],
      coefFv: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

}
