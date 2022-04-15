import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { InfoMuroPisoModel } from 'src/app/models/elementosNoEstructurales/infoMuroPisoModel';

@Component({
  selector: 'app-disenio-muros-mamp',
  templateUrl: './disenio-muros-mamp.component.html',
  styleUrls: ['./disenio-muros-mamp.component.css']
})
export class DisenioMurosMampComponent implements OnInit {
  public displayedColumns: string[] = [
    'Losa',
    'h/t',
    'Re',
    'Fa',
    'fa',
    'Fb',
    'fb',
    'Fa/fa + Fb/fb',
  ];


  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  public dataSource = new MatTableDataSource<InfoMuroPisoModel>();

  constructor(public spinnerServices: NgxSpinnerService) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    }
  }

  onNumeroPisosChange(event: number) {
    console.log(event);
    let tempData = new Array<InfoMuroPisoModel>(event);
    for (let i = 0; i < event; i++) {
      tempData[i] = {
        losa:`Losa ${i + 1}`,
        ht: 0,
        re: 0,
        fa: 0,
        subFa: 0,
        fb: 0,
        subFb: 0,
        SumatoriaFaFb: 0
      }
    }
    this.dataSource=new MatTableDataSource<InfoMuroPisoModel>(tempData);
    this.dataSource.paginator = this.paginator;
  }

}
