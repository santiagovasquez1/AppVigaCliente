import { AngularMaterialModule } from './../angular-material.module';
import { SecurityTellerIdComponent } from './components/security-teller-id/security-teller-id.component';
import { TittleComponent } from './tittle/tittle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    TittleComponent,
    SecurityTellerIdComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    TittleComponent,
    SecurityTellerIdComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
