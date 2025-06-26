import {Component, effect, inject, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { SugerenciaDeInscripcion } from '../../domain/SugerenciaDeInscripcion';
import { Comision } from '../../domain/Comision';
import { AsistenteService } from '../../application/service/asistente.service';
import { CsvService } from '../../application/service/csv.service';
import { Asignador } from '../../service/Asignador';
import { previsualizadorComisionesComponent } from './previsualizador-comisiones/previsualizador-comisiones.component';
import { StepState } from './utils/constants';
import { AsistentePaso1CargaComponent } from './pasos/paso1/asistente-paso1-carga.component';
import { AsistentePaso2PrevisualizacionComponent } from './pasos/paso2/asistente-paso2-previsualizacion.component';
import { AsistentePaso3SugerenciasComponent } from './pasos/paso3/asistente-paso3-sugerencias.component';

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
  styleUrls: ['./asistente-inscripcion.component.css']

})
export class AsistenteComponent {
  estado: 'inicial' | 'previsualizando' | 'cargando' | 'mostrandoSugerencias' = 'inicial';
  filePeticiones: File | null = null;
  sugerenciasDeInscripcion: SugerenciaDeInscripcion[] = [];
  comisiones: Comision[] = [];
  stepActived: number = StepState.INICIAL;

  readonly loading = inject(AsistenteService).loading;
  private readonly asistenteService = inject(AsistenteService);
  private readonly csvService = inject(CsvService);
  private readonly asignador = inject(Asignador);

  items: MenuItem[] = [
    { label: 'Carga' },
    { label: 'Previsualización' },
    { label: 'Sugerencias' }
  ];

  constructor() {
    effect(() => {
      this.sugerenciasDeInscripcion = this.asistenteService.cuposSugeridos$()
      if (this.estado === 'cargando' && !this.loading()) {
        this.estado = 'mostrandoSugerencias'
      }
    })
  }


  onArchivoCargado(file: File|null) {
    this.filePeticiones = file;
  }
  consultar(): void {
    if (!this.filePeticiones) {
      return
    }
    const peticiones = this.csvService.previewData$()
    this.asistenteService.consultarConPeticiones(peticiones)
  }

  limpiarTodo(): void {
    this.filePeticiones = null
    this.sugerenciasDeInscripcion = []
    this.csvService.limpiarPrevisualizacion()
    this.asistenteService.limpiarSugerencias()
    this.modificarStep('inicial')
  }

  asignarAComision(sugerenciasAsignable: SugerenciaDeInscripcion): void {
    this.asignador.asignarSugerencia(sugerenciasAsignable)
    this.comisiones= this.ordernarComisiones()
  }
  desasignarAComision(sugerenciasAsignable: SugerenciaDeInscripcion) {
    this.asignador.desAsignarSugerencia(sugerenciasAsignable)
    this.comisiones= this.ordernarComisiones()
  }


  ordernarComisiones(): Comision[] {
    return [...this.asignador.obtenerComisiones()].sort((a, b) => {
      const aExcede = a.cantidadInscriptosConfirmados < a.cantidadInscriptos ? 1 : 0;
      const bExcede = b.cantidadInscriptosConfirmados < b.cantidadInscriptos ? 1 : 0;
      return bExcede - aExcede;
    });
  }

  confirmarAsignacion(sugerenciasAsignables: SugerenciaDeInscripcion[] = []) {
      this.asignador.confirmarAsignaciones(sugerenciasAsignables);
  }

  modificarStep(state: string) {
    this.estado = state as 'inicial' | 'previsualizando' | 'cargando' | 'mostrandoSugerencias'
    if('previsualizando' === state)
    this.cambiarAStep(StepState.PREVISUALIZACION);
    if('cargando' === state)
      this.cambiarAStep(StepState.ASIGNACION);
    if('inicial' === state)
      this.cambiarAStep(StepState.INICIAL);
  }

  cambiarAStep(paso: number): void {
    this.stepActived = paso;
  }


}
