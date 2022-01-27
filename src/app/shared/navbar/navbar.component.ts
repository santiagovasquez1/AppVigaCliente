import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<boolean>();
  private isToggle: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSidenav() {
    if (this.isToggle) {
      this.isToggle = false;
    } else {
      this.isToggle = true;
    }
    this.toggleSidenav.emit(this.isToggle);
  }

}
