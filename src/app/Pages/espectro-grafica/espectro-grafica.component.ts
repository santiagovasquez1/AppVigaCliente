import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
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
  @ViewChild('canvasContainer') canvasContainer: ElementRef;
  @ViewChild('myCanvas') myCanvas: ElementRef;


  public canvasHeight: number;
  public canvasWitdh: number;
  public marginTop: number;
  public colors: Color[];
  public lineChartType: ChartType = 'line';

  public scatterChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Tiempo (s)",
            fontSize: 15,
            fontFamily: "Arial"
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Sa (g)",
            fontSize: 15,
            fontFamily: "Arial"
          }
        }
      ]
    }
  }

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

    this.canvasHeight = 500;
    this.canvasWitdh = 500;
    this.marginTop = 20;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }


}
