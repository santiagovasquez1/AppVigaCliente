import { AngularMaterialModule } from './../angular-material.module';
import { SharedModule } from './../shared/shared.module';
import { DirectivesModule } from './../Directives/directives.module';
import { PipesModule } from './../Pipes/pipes.module';
import { AngularResizedEventModule } from 'angular-resize-event';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { CortanteContainerComponent } from './CortanteViga/cortante-container/cortante-container.component';
import { BaseControlComponent } from './Bases/base-control/base-control.component';
import { VigaChequeoContainerComponent } from './ChequeoViga/viga-chequeo-container/viga-chequeo-container.component';
import { VigaContainerComponent } from './viga-container/viga-container.component';
import { VigaInputComponent } from './viga-input/viga-input.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { VigaOutputComponent } from './viga-output/viga-output.component';
import { CortanteBaseControlComponent } from './Bases/cortante-base-control/cortante-base-control.component';
import { CortanteInputComponent } from './CortanteViga/cortante-input/cortante-input.component';
import { CortanteOutputComponent } from './CortanteViga/cortante-output/cortante-output.component';
import { ContainerBaseComponent } from './Bases/container-base/container-base.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { EscalerasComponent } from './escaleras/escaleras.component';
import { ElementosNoEstructuralesComponent } from './elementos-no-estructurales/elementos-no-estructurales.component';

@NgModule({
  declarations: [
    PagesComponent,
    VigaInputComponent,
    VigaOutputComponent,
    VigaContainerComponent,
    VigaChequeoContainerComponent,
    BaseControlComponent,
    CortanteContainerComponent,
    CortanteBaseControlComponent,
    CortanteInputComponent,
    CortanteOutputComponent,
    ContainerBaseComponent,
    EscalerasComponent,
    ElementosNoEstructuralesComponent,
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularResizedEventModule,
    NgxMaskModule.forRoot(),
    PipesModule,
    DirectivesModule,
    ChartsModule,
    SharedModule
  ],
  exports: [
    PagesComponent,
    VigaInputComponent,
    VigaOutputComponent,
    VigaContainerComponent,
    VigaChequeoContainerComponent,
    BaseControlComponent,
    CortanteContainerComponent,
    CortanteBaseControlComponent,
    CortanteInputComponent,
    CortanteOutputComponent,
    ContainerBaseComponent,
    EscalerasComponent
  ],
  providers: [
    DecimalPipe
  ],
})
export class PagesModule { }
