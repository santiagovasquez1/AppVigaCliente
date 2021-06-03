import { GlobalService } from './services/global.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  opened: boolean = false;
  title = 'Herramientas de diseño SVG';
  divSection: HTMLElement;

  constructor(private global:GlobalService){

  }

  ngOnInit(): void {

    this.divSection=document.getElementById("contenido");
    this.global.sectionWidht=this.divSection.clientWidth;
  }

  openNavBar() {
    if (this.opened === false) {
      this.opened = true;
    } else {
      this.opened = false;
    }
  }

  onSectionChange(event){
    this.global.sectionWidht=this.divSection.clientWidth;
  }
}
