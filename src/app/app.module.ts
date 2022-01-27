import { AngularMaterialModule } from './angular-material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularResizedEventModule } from 'angular-resize-event';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyInjector } from './Injectors/my-injector';
import { PagesModule } from './Pages/pages.module';
import { EncryptInfoPipe } from './Pipes/encrypt-info.pipe';
import { SharedModule } from './shared/shared.module';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    EncryptInfoPipe
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
    AngularResizedEventModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    AngularMaterialModule
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
