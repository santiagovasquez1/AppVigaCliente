import { AngularMaterialModule } from './../angular-material.module';
import { SecurityTellerIdComponent } from './components/security-teller-id/security-teller-id.component';
import { TittleComponent } from './tittle/tittle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NumericInputDirective } from './directives/numeric-input.directive';



@NgModule({
  declarations: [
    TittleComponent,
    SecurityTellerIdComponent,
    NavbarComponent,
    NumericInputDirective
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    TittleComponent,
    SecurityTellerIdComponent,
    NavbarComponent,
    NumericInputDirective
  ]
})
export class SharedModule { }
