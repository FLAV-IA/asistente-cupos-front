import {Component, effect, inject, Input, OnInit} from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { ComisionCardComponent } from '../../../components/comision.card/comision.card.component';
import { Comision } from '../../../../domain/Comision';
import {CsvService} from "../../../../application/service/csv.service";
import {ComisionService} from "../../../../application/service/comision/comision.service";

@Component({
  selector: 'app-comisiones',
  standalone: true,
  imports: [CommonModule, ComisionCardComponent, PanelModule],
  templateUrl: './comisiones.component.html',
})
export class ComisionesComponent implements OnInit {
  private readonly comisionService = inject(ComisionService);
  readonly obtenerComisiones = this.comisionService.comisionesActualizadas;
  @Input() comisiones: Comision[] = [];

  constructor() {
    effect(() => {
      this.comisiones = this.obtenerComisiones();
    } )

  }
  ngOnInit() {
    console.log('ComisionesComponent initialized')
    this.comisionService.refrescaLasComisiones();
  }


}
