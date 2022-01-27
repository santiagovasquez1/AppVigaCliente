import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations'

@Component({
  selector: 'app-espectro-info',
  templateUrl: './espectro-info.component.html',
  styles: [
  ],
  animations: [
    trigger('inOutAnimation', [
      transition(
        ':enter', [
        style({ opacity: 0 }),
        animate('0.3s',
          style({
            opacity: 1
          }))
      ]), transition(
        ':leave',[
          style({  opacity: 1 }),
          animate('0.3s',
            style({
              opacity: 0
            }))
        ]
      )
    ])
  ]
})

export class EspectroInfoComponent implements OnInit {
  public isOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  onHeaderClick() {
    this.isOpen = !this.isOpen;
  }

}
