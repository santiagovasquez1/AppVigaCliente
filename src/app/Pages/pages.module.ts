import { DirectivesModule } from './../Directives/directives.module';
import { PipesModule } from './../Pipes/pipes.module';
import { AngularResizedEventModule } from 'angular-resize-event';
import { NgxMaskModule } from 'ngx-mask';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CortanteContainerComponent } from './CortanteViga/cortante-container/cortante-container.component';
import { BaseControlComponent } from './Bases/base-control/base-control.component';
import { VigaChequeoContainerComponent } from './ChequeoViga/viga-chequeo-container/viga-chequeo-container.component';
import { VigaContainerComponent } from './viga-container/viga-container.component';
import { VigaInputComponent } from './viga-input/viga-input.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VigaOutputComponent } from './viga-output/viga-output.component';
import { CortanteBaseControlComponent } from './Bases/cortante-base-control/cortante-base-control.component';
import { CortanteInputComponent } from './CortanteViga/cortante-input/cortante-input.component';
import { CortanteOutputComponent } from './CortanteViga/cortante-output/cortante-output.component';
import { ContainerBaseComponent } from './Bases/container-base/container-base.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { EspectroComponent } from './espectro/espectro.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    EspectroComponent,
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
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    AngularResizedEventModule,
    NgxMaskModule.forRoot(),
    PipesModule,
    DirectivesModule
  ],
  exports:[
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
    ContainerBaseComponent
  ]
})
export class PagesModule { }
