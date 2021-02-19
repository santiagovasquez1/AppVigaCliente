import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appMultiplicar]'
})
export class MultiplicarDirective {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  @Input() set appMultiplicar(numero: number) {
    for (let i = 0; i < numero; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
