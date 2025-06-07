import { Component, Input } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { ComisionCardComponent } from '../../../components/comision.card/comision.card.component';
import { Comision } from '../../../../domain/Comision';

@Component({
  selector: 'app-comisiones',
  standalone: true,
  imports: [CommonModule, ComisionCardComponent, PanelModule],
  templateUrl: './comisiones.component.html',
})
export class ComisionesComponent {
  @Input() comisiones: Comision[] = [
    new Comision('A01', 'Álgebra I', 'Lunes 8:00 - 10:00', 15, 30),
    new Comision('A02', 'Álgebra I', 'Miércoles 10:00 - 12:00', 4, 30),
    new Comision('B01', 'Análisis Matemático I', 'Martes 14:00 - 16:00', 0, 30),
    new Comision('B02', 'Análisis Matemático I', 'Jueves 16:00 - 18:00', 8, 30),
    new Comision('C01', 'Física I', 'Viernes 8:00 - 10:00', 25, 25),
    new Comision('C02', 'Física I', 'Miércoles 14:00 - 16:00', 2, 25),
    new Comision('D01', 'Química', 'Lunes 10:00 - 12:00', 10, 20),
    new Comision('D02', 'Química', 'Martes 8:00 - 10:00', 0, 20),
    new Comision('E01', 'Programación I', 'Miércoles 18:00 - 20:00', 20, 25),
    new Comision('E02', 'Programación I', 'Viernes 16:00 - 18:00', 3, 25),
  ];
}
