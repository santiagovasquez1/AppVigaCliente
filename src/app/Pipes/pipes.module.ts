import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedondeoPipe } from './redondeo.pipe';
import { ZonaSismicaPipe } from './zona-sismica.pipe';



@NgModule({
  declarations: [
    RedondeoPipe,
    ZonaSismicaPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    RedondeoPipe,
    ZonaSismicaPipe
  ]
})
export class PipesModule { }
