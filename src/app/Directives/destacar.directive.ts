import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDestacar]'
})
export class DestacarDirective {

  constructor(private el: ElementRef) {
    //el elemento que va a cambiar
    el.nativeElement.style.background = 'red';
  }

}
