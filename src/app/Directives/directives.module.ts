import { MultiplicarDirective } from './multiplicar.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestacarDirective } from './destacar.directive';


@NgModule({
  declarations: [
    DestacarDirective,
    MultiplicarDirective,

  ],
  imports: [
    CommonModule
  ],
  exports:[
    DestacarDirective,
    MultiplicarDirective,

  ]
})
export class DirectivesModule { }
