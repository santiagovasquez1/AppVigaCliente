import { AngularMaterialModule } from './../angular-material.module';
import { SecurityTellerIdComponent } from './components/security-teller-id/security-teller-id.component';
import { TittleComponent } from './tittle/tittle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ParamatrosSismicosComponent } from './paramatros-sismicos/paramatros-sismicos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TittleComponent,
    SecurityTellerIdComponent,
    NavbarComponent,
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
    ParamatrosSismicosComponent
  ]
})
export class SharedModule { }
