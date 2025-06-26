import { CarouselModule } from 'primeng/carousel'
import { CommonModule } from '@angular/common'
import {Component, effect, inject, Input} from '@angular/core'
import { ComisionCardComponent } from '../../components/comision.card/comision.card.component'
import { Comision } from '../../../domain/Comision'
import { ProgressBarModule } from 'primeng/progressbar'
import {ComisionService} from "../../../application/service/comision/comision.service";

@Component({
  selector: 'previsualizador-comisiones',
  standalone: true,
  imports: [CommonModule, CarouselModule, ComisionCardComponent,ProgressBarModule],
  templateUrl: './previsualizador-comisiones.component.html',
})
export class previsualizadorComisionesComponent {
  @Input() comisiones: Comision[] = [];

  private readonly comisionService = inject(ComisionService);
  readonly obtenerComisiones = this.comisionService.comisionesActualizadas;

  constructor() {
    effect(() => {
      this.comisiones = this.obtenerComisiones();
    });
  }

  ngOnInit() {
    this.comisionService.obtenerComisiones();
  }



   hayAsignacionesNoConfirmadas(comision:Comision): boolean {
    return comision.cantidadInscriptosConfirmados < comision.cantidadInscriptos;
  }

   progreso(comision:Comision): number {
    return (comision.cantidadInscriptos / comision.cuposTotales) * 100;
  }



}
