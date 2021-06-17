import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-espectro-grafica',
  templateUrl: './espectro-grafica.component.html',
  styles: [
  ]
})
export class EspectroGraficaComponent implements OnInit {

  @Input() public Labels: Label[];
  @Input() public Data: ChartDataSets[];
  public colors: Color[];
  public lineChartType: ChartType = 'line';

  constructor() {

    this.Data = [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: "Espectro"
      }
    ];
    this.Labels = ["0", "2", "3", "4", "5", "6", "7"]
    this.colors = [
      {
        backgroundColor: 'rgba(25, 118, 210, 0.6)',
        borderColor: "#1976D2"
      }

    ];
  }

  ngOnInit(): void {
  }

}
