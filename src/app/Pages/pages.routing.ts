import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VigaContainerComponent } from './viga-container/viga-container.component';
import { VigaChequeoContainerComponent } from './ChequeoViga/viga-chequeo-container/viga-chequeo-container.component';
import { CortanteContainerComponent } from './CortanteViga/cortante-container/cortante-container.component';

const routes: Routes = [
  {
    path:"dashboard",
    component:PagesComponent,
    children:[
      { path: 'disenioflexion', component: VigaContainerComponent },
      { path: 'chequeoSeccionFlexion', component: VigaChequeoContainerComponent },
      { path: 'disenioCortante', component: CortanteContainerComponent },
      { path: '**', component: VigaContainerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
