import { CarouselModule } from 'primeng/carousel'
import { CommonModule } from '@angular/common'
import {Component, effect, EventEmitter, inject, Input, Output} from '@angular/core'
import { ComisionCardComponent } from '../../components/comision.card/comision.card.component'
import { Comision } from '../../../domain/Comision'
import { ProgressBarModule } from 'primeng/progressbar'
import {ComisionService} from "../../../application/service/comision/comision.service";
import {Estudiante} from "../../../domain/Estudiante";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'previsualizador-comisiones',
  standalone: true,
  imports: [CommonModule, CarouselModule, ComisionCardComponent,ProgressBarModule,ButtonModule,DialogModule,ConfirmDialogModule],
  templateUrl: './previsualizador-comisiones.component.html',
  providers: [ConfirmationService]

})
export class previsualizadorComisionesComponent {

  @Input() comisiones: Comision[] = [];
  private readonly comisionService = inject(ComisionService);
  readonly obtenerComisiones = this.comisionService.comisionesActualizadas;
  comisionSeleccionada: Comision | null = null;
  mostrarDialogo: boolean = false;
  @Output() desasignarEstudiante = new EventEmitter<{ estudiante: Estudiante, comision: Comision }>();

  constructor(private confirmationService: ConfirmationService) {
    effect(() => {
      this.comisiones = this.obtenerComisiones();
    });
  }

  ngOnInit() {
    this.comisionService.refrescaLasComisiones();
  }

  hayAsignacionesNoConfirmadas(comision:Comision): boolean {
    return comision.cantidadInscriptosConfirmados < comision.cantidadInscriptos;
  }

   porcentajeDeInscriptos(comision:Comision): number {
    return (comision.cantidadInscriptos / comision.cuposTotales) * 100;
  }

  mostrarInscriptosEn(comision: Comision) {
    this.comisionSeleccionada = comision;
    this.mostrarDialogo = true;
  }

  desasignar(estudiante: Estudiante, comision: Comision) {
    comision.estudiantesInscriptos = comision.estudiantesInscriptos.filter(e => e.dni !== estudiante.dni);
    comision.cantidadInscriptos = comision.estudiantesInscriptos.length;
    this.desasignarEstudiante.emit({ estudiante, comision });
  }

  confirmarDesasignacion(estudiante: Estudiante, comision: Comision) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que querés desasignar a ${estudiante.nombre}?`,
      header: 'Confirmar desasignación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.desasignar(estudiante, comision);
      }
    });
  }
}
