import {Component, Input, Output, EventEmitter, inject, effect} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { KnobModule } from 'primeng/knob';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { InputIconModule } from 'primeng/inputicon';
import { ListboxModule } from 'primeng/listbox';
import { IconFieldModule } from 'primeng/iconfield';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SugerenciaDeInscripcion } from '../../../domain/SugerenciaDeInscripcion';
import { HistoriaAcademica } from '../../../domain/HistoriaAcademica';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'tabla-sugerencia-inscripcion',
  standalone: true,
  templateUrl: './tabla-sugerencia-inscripcion.component.html',
  imports: [
    FormsModule,
    InputSwitchModule,
    CommonModule,
    FileUploadModule,
    InputTextareaModule,
    TableModule,
    KnobModule,
    ButtonModule,
    TagModule,
    PanelModule,
    CardModule,
    InputIconModule,
    ListboxModule,
    IconFieldModule,
    OverlayPanelModule,
    InputSwitchModule
  ],
})
export class TablaSugerenciaInscripcionComponent {
  @Input() sugerenciasDeInscripcion: SugerenciaDeInscripcion[] = [];
  @Input() historiaAcademicaList: HistoriaAcademica[] = [];
  @Output() mostrarHistoriaAcademica = new EventEmitter<any>();
  @Output() cambioDeSugerenciasPreAsignadas = new EventEmitter<SugerenciaDeInscripcion[]>();
  @Output() asignarSugerenciasPreasignadas = new EventEmitter<SugerenciaDeInscripcion[]>();
  @Output() preAsignarAComision = new EventEmitter<SugerenciaDeInscripcion>();
  @Output() eliminarPreasignacionComision = new EventEmitter<SugerenciaDeInscripcion>();
  sugerenciasPreAsignadas: SugerenciaDeInscripcion[]= [];
  preasignado: boolean = false;

  visualizarHistoriaAcademicaDe(sugerencia: SugerenciaDeInscripcion) {
    this.mostrarHistoriaAcademica.emit(sugerencia);
  }

  cambioEnPreAsignacion(sugerenciaDeInscripcion: SugerenciaDeInscripcion, accion: any) {
    this.preasignarSugerencia(sugerenciaDeInscripcion, accion);
   if(accion.checked)
     this.preAsignarAComision.emit(sugerenciaDeInscripcion);
   else
      this.eliminarPreasignacionComision.emit(sugerenciaDeInscripcion);
  }

  preasignarSugerencia(sugerenciaDeInscripcion: SugerenciaDeInscripcion, accion: any) {
    const modificarSugerencia = accion.checked
      ? (arr: any[]) => [...arr, sugerenciaDeInscripcion]
      : (arr: any[]) => arr.filter(s => s !== sugerenciaDeInscripcion);

    this.sugerenciasPreAsignadas = modificarSugerencia(this.sugerenciasPreAsignadas);
  }

  asignarSugerencias() {
    this.asignarSugerenciasPreasignadas.emit(this.sugerenciasPreAsignadas);
    this.sugerenciasPreAsignadas.forEach(s=>{
      s.cupoAsignado = true;
      s.motivo = 'Asignación por usuario';
      s.confirmada = true;
    });
    this.sugerenciasPreAsignadas = [];

  }

  limpiarComisiones() {
    this.sugerenciasPreAsignadas= [];
    this.cambioDeSugerenciasPreAsignadas.emit(this.sugerenciasPreAsignadas);
    this.preasignado = false;
    this.sugerenciasDeInscripcion.forEach(s => s.confirmada = false);
  }
}
