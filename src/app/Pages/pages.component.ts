import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ],
})
export class PagesComponent implements OnInit, AfterViewInit {
  public isToogle: boolean = false;
  public divSection: HTMLElement;
  ngOnInit(): void {
  }

  onToggleSidenav(event: boolean) {
    this.isToogle = event;
  }

  ngAfterViewInit(): void {
    this.divSection = document.getElementById("contenido");
    this.global.sectionWidht = this.divSection.clientWidth;
  }

  constructor(private global: GlobalService) {

  }

  onSectionChange(event) {
    this.global.sectionWidht = this.divSection.clientWidth;
  }


}
