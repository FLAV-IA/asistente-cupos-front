import { Component, effect, inject } from '@angular/core'
import { HistoriaAcademicaListComponent } from './historia-academica/historia-academica-list.component'
import { CommonModule } from '@angular/common'
import { AsistentePanelComponent } from './asistente-panel/asistente-panel.component'
import { TablaSugerenciaInscripcionComponent } from './sugerencias/tabla-sugerencia-inscripcion.component'
import { PrevisualizadorPeticionesComponent } from './previsualizador-peticiones/previsualizador-peticiones.component'
import { SugerenciaDeInscripcion } from '../../domain/SugerenciaDeInscripcion'
import { HistoriaAcademica } from '../../domain/HistoriaAcademica'
import { AsistenteService } from '../../application/service/asistente.service'
import { CsvService } from '../../application/service/csv.service'
import { ButtonModule } from 'primeng/button'
import {previsualizadorComisionesComponent} from "./previsualizador-comisiones/previsualizador-comisiones.component";
import {Comision} from "../../domain/Comision";
import {Estudiante} from "../../domain/Estudiante";
import {Asignador} from "../../service/Asignador";

@Component({
  selector: 'asistente-inscripcion2',
  standalone: true,
  imports: [
    HistoriaAcademicaListComponent,
    AsistentePanelComponent,
    TablaSugerenciaInscripcionComponent,
    PrevisualizadorPeticionesComponent,
    previsualizadorComisionesComponent,
    CommonModule,
    ButtonModule,
  ],

  templateUrl: './asistente-inscripcion.component.html',
})
export class AsistenteComponent {
  estado: 'inicial' | 'previsualizando' | 'cargando' | 'mostrandoSugerencias' =
    'inicial'
  filePeticiones: File | null = null
  sugerenciasDeInscripcion: SugerenciaDeInscripcion[] = []
  historiaAcademicaList: HistoriaAcademica[] = []
  readonly loading = inject(AsistenteService).loading
  private readonly asistenteService = inject(AsistenteService)
  private readonly csvService = inject(CsvService)
  comisiones: Comision[] = [];

  constructor() {
    effect(() => {
      this.sugerenciasDeInscripcion = this.asistenteService.cuposSugeridos$()
      if (this.estado === 'cargando' && !this.loading()) {
        this.estado = 'mostrandoSugerencias'
      }
    })
  }

  agregarHistoriaAcademica(sugerencia: SugerenciaDeInscripcion): void {
    const existe = this.historiaAcademicaList.some(
      (h) => h.dni === sugerencia.historiaAcademica?.dni,
    )
    if (!existe) {
      const historiaItem: HistoriaAcademica = sugerencia.historiaAcademica!
      this.historiaAcademicaList.push(historiaItem)
    }
  }
  eliminarHistoriaAcademica(item: HistoriaAcademica): void {
    this.historiaAcademicaList = this.historiaAcademicaList.filter(
      (h) => h !== item,
    )
  }

  onArchivoCargado(file: File | null): void {
    this.filePeticiones = file
    this.estado = file ? 'previsualizando' : 'inicial'
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
    this.estado = 'cargando'
    this.asistenteService.consultarConArchivo(this.filePeticiones)
  }

  limpiarTodo(): void {
    this.filePeticiones = null
    this.sugerenciasDeInscripcion = []
    this.historiaAcademicaList = []
    this.estado = 'inicial'
    this.csvService.limpiarPrevisualizacion()
    this.asistenteService.limpiarSugerencias()
  }

  agregarSugerenciasPreAsignadaAComision(sugerenciasPreAsignadas: SugerenciaDeInscripcion[]) {
    const asignador = new Asignador();
    asignador.agregarSugerenciasPreAsignadas(sugerenciasPreAsignadas);
    this.comisiones= asignador.obtenerComisiones();
  }


}
