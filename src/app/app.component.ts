import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  opened: boolean = false;
  title = 'Herramientas de diseño SVG';
  divSection: any
 
  ngOnInit(): void {

  }

  openNavBar() {
    if (this.opened === false) {
      this.opened = true;
    } else {
      this.opened = false;
    }
  }
}
