import { Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';

import { SugerenciaDeInscripcion } from '../../domain/SugerenciaDeInscripcion';
import { Comision } from '../../domain/Comision';
import { Estudiante } from '../../domain/Estudiante';

import { AsistenteService } from '../../application/service/asistente.service';
import { CsvService } from '../../application/service/csv.service';
import { Asignador } from '../../service/Asignador';

import { previsualizadorComisionesComponent } from './previsualizador-comisiones/previsualizador-comisiones.component';
import { AsistentePaso1CargaComponent } from './pasos/paso1/asistente-paso1-carga.component';
import { AsistentePaso2PrevisualizacionComponent } from './pasos/paso2/asistente-paso2-previsualizacion.component';
import { AsistentePaso3SugerenciasComponent } from './pasos/paso3/asistente-paso3-sugerencias.component';

import { StepState } from './utils/constants';

@Component({
  selector: 'asistente-inscripcion2',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    StepperModule,
    StepsModule,
    previsualizadorComisionesComponent,
    AsistentePaso1CargaComponent,
    AsistentePaso2PrevisualizacionComponent,
    AsistentePaso3SugerenciasComponent
  ],
  templateUrl: './asistente-inscripcion.component.html',
  styleUrls: ['./asistente-inscripcion.component.css'],
})
export class AsistenteComponent {
  // --- Estado interno ---
  estado: 'inicial' | 'previsualizando' | 'cargando' | 'mostrandoSugerencias' |'error' = 'inicial';
  stepActived: number = StepState.INICIAL;
  filePeticiones: File | null = null;
  sugerenciasDeInscripcion: SugerenciaDeInscripcion[] = [];
  comisiones: Comision[] = [];

  // --- Inyecciones ---
  private readonly asistenteService = inject(AsistenteService);
  readonly loading = this.asistenteService.loading;
  private readonly csvService = inject(CsvService);
  private readonly asignador = inject(Asignador);

  mensajeErrorConsultaSugerencia = this.asistenteService.errorMensaje;


  constructor() {
    effect(() => {
      this.sugerenciasDeInscripcion = this.asistenteService.cuposSugeridos$();

      if (this.estado === 'cargando' && !this.loading()) {
        this.estado = 'mostrandoSugerencias';
      }

      if (this.asistenteService.errorMensaje()) {
        this.estado = 'error';
      }
    });

  }

  onArchivoCargado(file: File | null) {
    this.filePeticiones = file;
  }

  consultar(): void {
    console.log('Consultando sugerencias con el archivo:', this.filePeticiones);
    const peticiones = this.csvService.previewData$();
    this.asistenteService.consultarConPeticiones(peticiones);
  }

  limpiarTodo(): void {
    this.filePeticiones = null;
    this.sugerenciasDeInscripcion = [];
    this.csvService.limpiarPrevisualizacion();
    this.asistenteService.limpiarSugerencias();
    this.modificarStep('inicial');
  }

  asignarAComision(sugerencia: SugerenciaDeInscripcion): void {
    this.asignador.asignarSugerencia(sugerencia);
    this.comisiones = this.ordernarComisiones();
  }

  desasignarAComision(sugerencia: SugerenciaDeInscripcion): void {
    this.asignador.desAsignarSugerencia(sugerencia);
    this.comisiones = this.ordernarComisiones();
  }

  confirmarAsignacion(sugerenciasAsignables: SugerenciaDeInscripcion[] = []) {
    this.asignador.confirmarAsignaciones(sugerenciasAsignables);
  }

  confirmarDesasignacion(solicitudDesasignacion: { estudiante: Estudiante; comision: Comision }) {
    const { estudiante, comision } = solicitudDesasignacion;
    this.asignador.confirmarDesAsignarSugerencia(estudiante.dni, comision.codigo);
    this.resetSugerencia(comision, estudiante);
  }


  private resetSugerencia(comision: Comision, estudiante: Estudiante) {
    this.sugerenciasDeInscripcion = this.sugerenciasDeInscripcion.map(sugerencia => {
      let sugerenciaRelacionadaConSolicitud = sugerencia.codigoComision === comision.codigo && sugerencia.historiaAcademica?.dni === estudiante.dni;
      let sugerenciaReseteada = {...sugerencia,
                                 confirmada: false,
                                 motivo: 'Desasignado por el usuario',
                                 cupoAsignado: false,
                                 preasignado: false};
      return sugerenciaRelacionadaConSolicitud
          ? sugerenciaReseteada
          : sugerencia;
      }
    );
  }

  ordernarComisiones(): Comision[] {
    return [...this.asignador.obtenerComisiones()].sort((a, b) => {
      const aExcede = a.cantidadInscriptosConfirmados < a.cantidadInscriptos ? 1 : 0;
      const bExcede = b.cantidadInscriptosConfirmados < b.cantidadInscriptos ? 1 : 0;
      return bExcede - aExcede;
    });
  }

  modificarStep(state: string) {
    this.estado = state as 'inicial' | 'previsualizando' | 'cargando' | 'mostrandoSugerencias';

    switch (state) {
      case 'previsualizando':
        this.cambiarAStep(StepState.PREVISUALIZACION);
        break;
      case 'cargando':
        this.cambiarAStep(StepState.ASIGNACION);
        break;
      case 'inicial':
        this.cambiarAStep(StepState.INICIAL);
        break;
    }
  }

  cambiarAStep(paso: number): void {
    this.stepActived = paso;
  }

}
