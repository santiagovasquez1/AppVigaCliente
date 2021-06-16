import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesRoutingModule } from './Pages/pages.routing';

//Clase encargada de las rutas de la app
// canActivate: [AuthGuard]
const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
