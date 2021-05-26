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

    // this.divSection.addEventListener('resize',event=>{
    //   this.onSectionChange(event);
    // });

    // this.global.sectionWidht=this.divSection.clientWidth;

    // window.addEventListener('load',event=>{
    //   this.onWindowResize();
    // });
    // window.addEventListener('resize',event=>{
    //   this.onWindowResize();
    // });
  }

  onWindowResize(){
    this.global.sectionWidht=this.divSection.clientWidth;
  }

  openNavBar() {
    if (this.opened === false) {
      this.opened = true;
    } else {
      this.opened = false;
    }

  }


  onDrawerLoad(){
    this.global.sectionWidht=this.divSection.clientWidth;
    console.log("Resize desde open menu")
    console.log(this.global.sectionWidht);
  }

  onSectionChange(event){
    this.global.sectionWidht=this.divSection.clientWidth;
    console.log("Resize desde section change")
    console.log(this.global.sectionWidht);
  }
}
