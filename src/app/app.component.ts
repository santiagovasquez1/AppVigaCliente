import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened: boolean = false;
  title = 'vigas-angular-electron';


  openNavBar() {
    if (this.opened === false) {
      this.opened = true;
    } else {
      this.opened = false;
    }
  }
}
