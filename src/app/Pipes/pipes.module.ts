import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedondeoPipe } from './redondeo.pipe';



@NgModule({
  declarations: [
    RedondeoPipe,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    RedondeoPipe,    
  ]
})
export class PipesModule { }
