import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { PanelModule } from 'primeng/panel';
import {CommonModule} from "@angular/common";
import {ComisionCardComponent} from "../../../components/comision.card/comision.card.component";
import {Comision} from "../../../domain/Comision";

@Component({
  selector: 'app-comisiones',
  standalone: true,
  imports: [CommonModule,ComisionCardComponent,PanelModule],
  templateUrl: './comisiones.component.html',
  styleUrl: './comisiones.component.css'
})
export class ComisionesComponent implements OnInit{
  @Input() comisiones: Comision[] = [];

  ngOnInit() {

    const comision1 = new Comision({ codigo: 'A01', materia: 'Álgebra I', horario: 'Lunes 8:00 - 10:00', inscriptos: 15, cuposTotales: 30 });
    const comision2 = new Comision({ codigo: 'A02', materia: 'Álgebra I', horario: 'Miércoles 10:00 - 12:00', inscriptos: 4, cuposTotales: 30 });
    const comision3 = new Comision({ codigo: 'B01', materia: 'Análisis Matemático I', horario: 'Martes 14:00 - 16:00', inscriptos: 0, cuposTotales: 30 });
    const comision4 = new Comision({ codigo: 'B02', materia: 'Análisis Matemático I', horario: 'Jueves 16:00 - 18:00', inscriptos: 8, cuposTotales: 30 });
    const comision5 = new Comision({ codigo: 'C01', materia: 'Física I', horario: 'Viernes 8:00 - 10:00', inscriptos: 25, cuposTotales: 25 });
    const comision6 = new Comision({ codigo: 'C02', materia: 'Física I', horario: 'Miércoles 14:00 - 16:00', inscriptos: 2, cuposTotales: 25 });
    const comision7 = new Comision({ codigo: 'D01', materia: 'Química', horario: 'Lunes 10:00 - 12:00', inscriptos: 10, cuposTotales: 20 });
    const comision8 = new Comision({ codigo: 'D02', materia: 'Química', horario: 'Martes 8:00 - 10:00', inscriptos: 0, cuposTotales: 20 });
    const comision9 = new Comision({ codigo: 'E01', materia: 'Programación I', horario: 'Miércoles 18:00 - 20:00', inscriptos: 20, cuposTotales: 25 });
    const comision10 = new Comision({ codigo: 'E02', materia: 'Programación I', horario: 'Viernes 16:00 - 18:00', inscriptos: 3, cuposTotales: 25 });

    this.comisiones.push(
      comision1, comision2, comision3, comision4, comision5,
      comision6, comision7, comision8, comision9, comision10
    );
  }



}
