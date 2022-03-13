import { ParamatrosSismicosComponent } from './paramatros-sismicos/paramatros-sismicos.component';
import { AngularMaterialModule } from './../angular-material.module';
import { SecurityTellerIdComponent } from './components/security-teller-id/security-teller-id.component';
import { TittleComponent } from './tittle/tittle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NumericInputDirective } from './directives/numeric-input.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TittleComponent,
    SecurityTellerIdComponent,
    NavbarComponent,
    NumericInputDirective,
    ParamatrosSismicosComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TittleComponent,
    SecurityTellerIdComponent,
    NavbarComponent,
    NumericInputDirective,
    ParamatrosSismicosComponent
  ]
})
export class SharedModule { }
