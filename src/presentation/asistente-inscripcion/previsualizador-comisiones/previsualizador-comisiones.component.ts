import { CarouselModule } from 'primeng/carousel'
import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { ComisionCardComponent } from '../../components/comision.card/comision.card.component'
import { Comision } from '../../../domain/Comision'
import { ProgressBarModule } from 'primeng/progressbar'

@Component({
  selector: 'previsualizador-comisiones',
  standalone: true,
  imports: [CommonModule, CarouselModule, ComisionCardComponent,ProgressBarModule],
  templateUrl: './previsualizador-comisiones.component.html',
})
export class previsualizadorComisionesComponent {
  @Input() comisiones: Comision[] = []
}
