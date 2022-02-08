import { InfoRefuerzoResponse } from './../../models/refuerzo/infoRefuerzoResponse';
import { RefuerzoService } from './../../services/refuerzo.service';
import { EscalerasService } from './../../services/escaleras.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PesoPeldaniosRequest } from 'src/app/models/escaleras/pesoPeldanioRequest';

@Component({
  selector: 'app-escaleras',
  templateUrl: './escaleras.component.html',
  styleUrls: ['./escaleras.component.css'],

})
export class EscalerasComponent implements OnInit, AfterViewInit {
  public title: string = 'Diseño de Escaleras';
  public escalerasForm: FormGroup;
  public canvasContext: CanvasRenderingContext2D;
  public numPeldanios = 8;
  public longDesc = 1.20;
  public LongEscalera = 3.35;
  public alturaEscalera = 1.40;
  public padding = 60;
  public escalaHtal: number = 0;
  public escalaVcal: number = 0;
  public refuerzos: InfoRefuerzoResponse[];

  @ViewChild("escalerasContainer") escalerasContainer: ElementRef;
  @ViewChild("escaleraCanvas") escCanvas: ElementRef<HTMLCanvasElement>;
  constructor(private fb: FormBuilder,
    private numberPipe: DecimalPipe,
    private escalerasService: EscalerasService,
    private refuerzoService: RefuerzoService) {
    this.escalerasForm = new FormGroup({});
  }
  ngAfterViewInit(): void {
    let canvasWidth = this.escalerasContainer.nativeElement.offsetWidth;
    let canvasHeight = this.escalerasContainer.nativeElement.offsetHeight;

    this.escCanvas.nativeElement.width = canvasWidth;
    this.escCanvas.nativeElement.height = canvasHeight;

    this.escalaHtal = (canvasWidth - 2 * this.padding) / this.LongEscalera;
    this.escalaVcal = (canvasHeight - 2 * this.padding) / this.alturaEscalera;
    this.canvasContext = this.escCanvas.nativeElement.getContext('2d');
    this.drawEscalera(canvasWidth, canvasHeight);
  }

  ngOnInit(): void {
    this.getAreaRefuerzo();
    this.createForm();
  }

  createForm() {
    this.escalerasForm = this.fb.group({
      numPeldanios: ['', [Validators.required, Validators.min(1)]],
      altura: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
      alturaPeldano: ['', [Validators.required]],
      longitudPeldano: ['', [Validators.required]],
      espesor: [{ value: '', disabled: true }, [Validators.required]],
      espesorDef: ['', [Validators.required]],
      cargaAcabados: ['', [Validators.required]],
      cargaMuerta: [{ value: '', disabled: true }, [Validators.required]],
      cargaViva: ['', [Validators.required]],
      cargaUltima: [{ value: '', disabled: true }, [Validators.required]],
      momentoUltimo: [{ value: '', disabled: true }, [Validators.required]],
      cortanteUltimo: [{ value: '', disabled: true }, [Validators.required]],
      rhoMin: [0.0018, [Validators.required]],
      asMin: ['', [Validators.required]],
      phiMn: ['', [Validators.required]],
      phiVc: ['', [Validators.required]],
      asDef: ['', [Validators.required]],
      separacion: ['', [Validators.required]],
      phiMnDef: ['', [Validators.required]],
    });

    this.escalerasForm.get('longitud').valueChanges.subscribe(data => this.onValueChanged(data));
    this.escalerasForm.get('numPeldanios').valueChanges.subscribe(data => this.onInfoPeldanioChanged(data));
    this.escalerasForm.get('alturaPeldano').valueChanges.subscribe(data => this.onInfoPeldanioChanged(data));
    this.escalerasForm.get('longitudPeldano').valueChanges.subscribe(data => this.onInfoPeldanioChanged(data));
    this.escalerasForm.get('longitud').valueChanges.subscribe(data => this.onInfoPeldanioChanged(data));
  }

  onValueChanged(data: number): void {
    this.escalerasForm.patchValue({
      "espesor": this.numberPipe.transform(this.calcEspesorLosa(data), '1.3-3'),
    });
  }

  onInfoPeldanioChanged(event) {
    let longEscalera = this.escalerasForm.get('longitud').value;
    if (longEscalera !== null && longEscalera !== undefined && longEscalera !== '' && longEscalera !== 0) {
      this.calcPesoPeldanios();
    }
  }

  onCanvasResize(event) {
    let canvasWidth = this.escalerasContainer.nativeElement.offsetWidth;
    let canvasHeight = this.escalerasContainer.nativeElement.offsetHeight;

    this.escCanvas.nativeElement.width = canvasWidth;
    this.escCanvas.nativeElement.height = canvasHeight;

    this.escalaHtal = (canvasWidth - 2 * this.padding) / this.LongEscalera;
    this.escalaVcal = (canvasHeight - 2 * this.padding) / this.alturaEscalera;
    this.drawEscalera(canvasWidth, canvasHeight);
  }

  private getAreaRefuerzo() {
    this.refuerzoService.getRefuerzos().subscribe(result => {
      this.refuerzos = result;
    }, error => {
      console.log(error);
    });
  }

  private calcPesoPeldanios() {

    let request: PesoPeldaniosRequest = {
      numPeldanios: this.escalerasForm.get('numPeldanios').value,
      hPeld: this.escalerasForm.get('alturaPeldano').value,
      lPeld: this.escalerasForm.get('longitudPeldano').value,
      lEscalera: this.escalerasForm.get('longitud').value,
    }

    let flag = false;

    for (var key in request) {
      if (request[key] === null || request[key] === undefined || request[key] === '') {
        flag = false;
        break;
      }
      flag = true;
    }

    if (flag) {
      this.escalerasService.calculoPesoPeldanios(request).subscribe(result => {
        this.escalerasForm.patchValue({
          "cargaMuerta": this.numberPipe.transform(result.pesoPeldanios, '1.3-3'),
        });
      }, error => {
        console.log(error);
      });
    }
  }

  private drawEscalera(canvasWidth: number, canvasHeight: number) {
    this.canvasContext.fillStyle = '#BCBCBA';

    let hPeldanio = this.alturaEscalera / this.numPeldanios;
    let lPeldanio = (this.LongEscalera - this.longDesc) / (this.numPeldanios - 1);

    let hPeldanioPx = hPeldanio * this.escalaVcal;
    let lPeldanioPx = lPeldanio * this.escalaHtal;


    this.canvasContext.lineCap = 'square';
    //Inicio de dibujo de escaleras
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(this.padding, canvasHeight - this.padding);
    let hAcumulado = canvasHeight - this.padding;
    let lAcumulado = this.padding;

    let x1 = 0;
    let x2 = 0;
    let y1 = 0;
    let y2 = 0;

    for (let i = 0; i < this.numPeldanios - 1; i++) {

      this.canvasContext.lineTo(lAcumulado, hAcumulado - hPeldanioPx);
      this.canvasContext.lineTo(lAcumulado + lPeldanioPx, hAcumulado - hPeldanioPx);

      if (i === (this.numPeldanios / 2) - 1) {
        x1 = 0.90 * lAcumulado;
        x2 = 0.90 * lAcumulado;
        y1 = hAcumulado;
        y2 = hAcumulado - hPeldanioPx;
      }

      lAcumulado += lPeldanioPx;
      hAcumulado -= hPeldanioPx;
    }

    this.canvasContext.lineTo(lAcumulado, hAcumulado - hPeldanioPx);
    this.canvasContext.lineTo(lAcumulado + this.longDesc * this.escalaHtal, hAcumulado - hPeldanioPx);
    this.canvasContext.lineTo(lAcumulado + this.longDesc * this.escalaHtal, hAcumulado);
    this.canvasContext.lineTo(lAcumulado + lPeldanioPx, hAcumulado);
    this.canvasContext.lineTo(this.padding + lPeldanioPx, canvasHeight - this.padding);
    this.canvasContext.lineTo(this.padding, canvasHeight - this.padding);
    this.canvasContext.stroke();
    this.canvasContext.closePath();
    this.canvasContext.fill();

    this.drawMuroApoyo(canvasWidth, canvasHeight, hPeldanio);
    this.drawCotas(canvasWidth, canvasHeight);
    this.drawCotasEscalers(x1, x2, y1, y2, 'Ep');

    x1 = (lAcumulado + this.longDesc * this.escalaHtal) + 30;
    x2 = (lAcumulado + this.longDesc * this.escalaHtal) + 30;
    y1 = hAcumulado;
    y2 = hAcumulado - hPeldanioPx;

    this.drawCotasEscalers(x1, x2, y1, y2, 'El');
  }

  private drawMuroApoyo(canvasWidth: number, canvasHeight: number, hPeldanio: number) {

    this.canvasContext.fillStyle = '#E67F43';
    let espesorMuroPxl = 0.15 * this.escalaHtal;
    let hMuroPxl = (this.alturaEscalera - hPeldanio - 0.01) * this.escalaVcal;

    this.canvasContext.strokeRect(canvasWidth - this.padding - espesorMuroPxl, canvasHeight - this.padding - hMuroPxl, espesorMuroPxl, hMuroPxl);
    this.canvasContext.fillRect(canvasWidth - this.padding - espesorMuroPxl, canvasHeight - this.padding - hMuroPxl, espesorMuroPxl, hMuroPxl);
  }

  private drawCotas(canvasWidth: number, canvasHeight: number) {

    this.canvasContext.fillStyle = 'black';

    this.canvasContext.moveTo(this.padding, canvasHeight - 0.25 * this.padding);
    this.canvasContext.lineTo(this.padding, canvasHeight - 0.75 * this.padding);

    this.canvasContext.moveTo(this.padding, canvasHeight - 0.5 * this.padding);
    this.canvasContext.lineTo(canvasWidth - this.padding, canvasHeight - 0.5 * this.padding);

    this.canvasContext.moveTo(canvasWidth - this.padding, canvasHeight - 0.25 * this.padding);
    this.canvasContext.lineTo(canvasWidth - this.padding, canvasHeight - 0.75 * this.padding);

    this.canvasContext.font = "15px Arial";
    this.canvasContext.fillText('Longitud Escalera', (canvasWidth - this.padding) / 2, canvasHeight - 0.55 * this.padding);

    this.canvasContext.moveTo(0.25 * this.padding, canvasHeight - this.padding);
    this.canvasContext.lineTo(0.75 * this.padding, canvasHeight - this.padding);

    this.canvasContext.moveTo(0.5 * this.padding, canvasHeight - this.padding);
    this.canvasContext.lineTo(0.5 * this.padding, this.padding);

    this.canvasContext.moveTo(0.25 * this.padding, this.padding);
    this.canvasContext.lineTo(0.75 * this.padding, this.padding);

    this.canvasContext.stroke();

    this.canvasContext.rotate(-0 * Math.PI / 180);
    this.canvasContext.fillText('Altura Escalera', 0.5 * this.padding, (canvasHeight - this.padding) / 2);
  }

  private drawCotasEscalers(x1: number, x2: number, y1: number, y2: number, text: string) {

    if (x1 === x2) {
      this.canvasContext.moveTo((x1 - 5), y2);
      this.canvasContext.lineTo((x2 + 5), y2);

      this.canvasContext.moveTo((x1 - 5), y1);
      this.canvasContext.lineTo((x2 + 5), y1);

      this.canvasContext.font = "15px Arial";
      this.canvasContext.fillText(text, x1 - 20, ((y2 - y1) / 2) + y1);

    }
    else if (y1 === y2) {
      this.canvasContext.moveTo(x1, 0.95 * y1);
      this.canvasContext.lineTo(x2, 1.05 * y2);
    }


    this.canvasContext.moveTo(x1, y1);
    this.canvasContext.lineTo(x2, y2);

    this.canvasContext.stroke();
  }

  private calcEspesorLosa(LongEscalera: number) {
    return LongEscalera / 18;
  }
}
