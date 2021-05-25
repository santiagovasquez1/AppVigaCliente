import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-base',
  template: `
    <p>
      container-base works!
    </p>
  `,
  styleUrls: ['./container-base.component.css']
})
export class ContainerBaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
