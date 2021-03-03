import { VigaChequeoContainerComponent } from './Components/ChequeoViga/viga-chequeo-container/viga-chequeo-container.component';
import { VigaContainerComponent } from './Components/viga-container/viga-container.component';
import { AuthGuard } from './security/auth.guard';
import { VigaInputComponent } from './Components/viga-input/viga-input.component';
import { LoginComponent } from './Pages/Login/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Clase encargada de las rutas de la app
//canActivate: [AuthGuard]
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'disenioflexion', component: VigaContainerComponent },
  { path: 'chequeoSeccionFlexion', component: VigaChequeoContainerComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
