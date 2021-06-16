import { PagesModule } from './Pages/pages.module';
import { Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DestacarDirective } from './Directives/destacar.directive';
import { MultiplicarDirective } from './Directives/multiplicar.directive';
import { EncryptInfoPipe } from './Pipes/encrypt-info.pipe';
import { CookieService } from 'ngx-cookie-service';
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
import { MyInjector } from './Injectors/my-injector';
import {MatRadioModule} from '@angular/material/radio';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import * as $ from 'jquery';
import { AngularResizedEventModule } from 'angular-resize-event';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    DestacarDirective,
    MultiplicarDirective,
    EncryptInfoPipe,
    SecurityTellerIdComponent
  ],
  imports: [
    PagesModule,
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
