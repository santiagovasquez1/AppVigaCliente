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
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    SecurityTellerIdComponent
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
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
