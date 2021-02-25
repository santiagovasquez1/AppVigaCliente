import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
