import { Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VigaInputComponent } from './Components/viga-input/viga-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DestacarDirective } from './Directives/destacar.directive';
import { MultiplicarDirective } from './Directives/multiplicar.directive';
import { EncryptInfoPipe } from './Pipes/encrypt-info.pipe';
import { LoginComponent } from './Pages/Login/login/login.component';
import { VigaOutputComponent } from './Components/viga-output/viga-output.component';
import { CookieService } from 'ngx-cookie-service';
import { VigaContainerComponent } from './Components/viga-container/viga-container.component';
import { SecurityTellerIdComponent } from './shared/components/security-teller-id/security-teller-id.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { NgxSpinnerModule } from 'ngx-spinner';
import { VigaChequeoContainerComponent } from './Components/ChequeoViga/viga-chequeo-container/viga-chequeo-container.component';
import { BaseControlComponent } from './Components/Bases/base-control/base-control.component';
import { MyInjector } from './Injectors/my-injector';
import { CortanteContainerComponent } from './Components/CortanteViga/cortante-container/cortante-container.component';
import { CortanteBaseControlComponent } from './Components/Bases/cortante-base-control/cortante-base-control.component';
import { CortanteInputComponent } from './Components/CortanteViga/cortante-input/cortante-input.component';
import {MatRadioModule} from '@angular/material/radio';
import { CortanteOutputComponent } from './Components/CortanteViga/cortante-output/cortante-output.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import * as $ from 'jquery';
import { ContainerBaseComponent } from './Components/Bases/container-base/container-base.component';
import { AngularResizedEventModule } from 'angular-resize-event';
import { RedondeoPipe } from './pipes/redondeo.pipe';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    VigaInputComponent,
    DestacarDirective,
    MultiplicarDirective,
    EncryptInfoPipe,
    LoginComponent,
    VigaOutputComponent,
    VigaContainerComponent,
    SecurityTellerIdComponent,
    VigaChequeoContainerComponent,
    BaseControlComponent,
    CortanteContainerComponent,
    CortanteBaseControlComponent,
    CortanteInputComponent,
    CortanteOutputComponent,
    ContainerBaseComponent,
    RedondeoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
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
    NgxSpinnerModule,
    MatRadioModule,
    AngularResizedEventModule,
    NgxMaskModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(injector: Injector) {
    MyInjector.setInjector(injector);
  }
}
