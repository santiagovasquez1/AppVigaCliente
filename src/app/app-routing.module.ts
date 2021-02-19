import { AuthGuard } from './security/auth.guard';
import { VigaInputComponent } from './Components/viga-input/viga-input.component';
import { LoginComponent } from './Pages/Login/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Clase encargada de las rutas de la app
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'disenioflexion', component: VigaInputComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
