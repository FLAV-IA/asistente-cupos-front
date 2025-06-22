import {Component, effect, inject, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { SugerenciaDeInscripcion } from '../../domain/SugerenciaDeInscripcion';
import { HistoriaAcademica } from '../../domain/HistoriaAcademica';
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
  historiaAcademicaList: HistoriaAcademica[] = [];
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
      this.comisiones = this.asignador.comisionesActualizadas();
      this.sugerenciasDeInscripcion = this.asistenteService.cuposSugeridos$()
      if (this.estado === 'cargando' && !this.loading()) {
        this.estado = 'mostrandoSugerencias'
      }
    })
  }

  onStepChange(event: any): void {
    this.stepActived = event.index;
  }

  onArchivoCargado(file: File | null): void {
    this.filePeticiones = file;
    this.estado = file ? 'previsualizando' : 'inicial';
    if(file)
      this.cambiarAStep(StepState.PREVISUALIZACION);
  }

  onPrevisualizacion(preview: boolean): void {
    if (preview) {
      this.estado = 'previsualizando'
      return
    }
    if (!this.filePeticiones) {
      this.estado = 'inicial'
    } else if (
      this.estado !== 'cargando' &&
      this.estado !== 'mostrandoSugerencias'
    ) {
      this.estado = 'previsualizando'
    }
  }

  consultar(): void {
    if (!this.filePeticiones) {
      return
    }
    const peticiones = this.csvService.previewData$()
    this.estado = 'cargando'
    this.asistenteService.consultarConPeticiones(peticiones)
    this.cambiarAStep(StepState.ASIGNACION);
  }

  limpiarTodo(): void {
    this.filePeticiones = null
    this.sugerenciasDeInscripcion = []
    this.historiaAcademicaList = []
    this.estado = 'inicial'
    this.csvService.limpiarPrevisualizacion()
    this.asistenteService.limpiarSugerencias()
    this.cambiarAStep(StepState.INICIAL);
  }

  agregarHistoriaAcademica(sugerencia: SugerenciaDeInscripcion): void {
    const existe = this.historiaAcademicaList.some(
      (h) => h.dni === sugerencia.historiaAcademica?.dni
    );
    if (!existe && sugerencia.historiaAcademica) {
      this.historiaAcademicaList.push(sugerencia.historiaAcademica);
    }
  }

  eliminarHistoriaAcademica(item: HistoriaAcademica): void {
    this.historiaAcademicaList = this.historiaAcademicaList.filter(
      (h) => h !== item
    );
  }

  agregarSugerenciasPreAsignadaAComision(sugerenciasPreAsignadas: SugerenciaDeInscripcion[]): void {
    this.asignador.preasignarAComision(sugerenciasPreAsignadas);
    this.comisiones= this.asignador.obtenerComisiones();
  }

  asignarAComision(sugerenciasAsignables: SugerenciaDeInscripcion[]): void {
    this.asignador.asignarAComision(sugerenciasAsignables);
    this.comisiones = [...this.asignador.obtenerComisiones()];
  }

  private cambiarAStep(paso: number): void {
    this.stepActived = paso;
  }
}
