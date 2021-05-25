import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

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

  infoContainerRight: JQuery<HTMLElement>;
  infoContainerLeft: JQuery<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
  }

  onComponentInit(){
    this.onResizeWindow();

    window.addEventListener('load', event => {
      this.onResizeWindow();
    });

    window.addEventListener('resize', event => {
      this.onResizeWindow();
    });
  }

  onResizeWindow() {

    if (window.innerWidth <= 750) {
      this.infoContainerLeft.css("width", "80%").css("float", "none").css("margin", "0px auto");
      this.infoContainerRight.css("width", "80%").css("float", "none").css("margin", "0px auto");;
    } else {
      this.infoContainerLeft.css("width", "40%").css("float", "left").css("margin-left", "20px");
      this.infoContainerRight.css("width", "40%").css("float", "right").css("margin-right", "20px");
    }
  }


}
