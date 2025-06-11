import { Component, Input, Output, EventEmitter } from '@angular/core';
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
import {ToggleButtonModule} from "primeng/togglebutton";

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
  @Output() verHistoria = new EventEmitter<any>();
  sugerenciasPreAsignadas: SugerenciaDeInscripcion[]= [];
  @Output() cambioDeSugerenciasPreAsignadas = new EventEmitter<SugerenciaDeInscripcion[]>();
  preasignado: boolean = false;

  agregarConsulta(cupo: any) {
    this.verHistoria.emit(cupo);
  }

  preAsignarAComision(sugerenciaDeInscripcion: SugerenciaDeInscripcion, accion: any) {
    const  modificarSugerencia= accion.checked
      ? (arr: any[]) => [...arr, sugerenciaDeInscripcion]
      : (arr: any[]) => arr.filter(s => s !== sugerenciaDeInscripcion);

    this.sugerenciasPreAsignadas = modificarSugerencia(this.sugerenciasPreAsignadas);
  }

  preasignarSugerencias() {
    this.cambioDeSugerenciasPreAsignadas.emit(this.sugerenciasPreAsignadas);
    this.preasignado = true;
  }

  asignarSugerencias() {
  }

  limpiarComisiones() {
    this.sugerenciasPreAsignadas= [];
    this.cambioDeSugerenciasPreAsignadas.emit(this.sugerenciasPreAsignadas);
    this.preasignado = false;
    this.sugerenciasDeInscripcion.forEach(s => s.preasignado = false);
    this.sugerenciasDeInscripcion = [...this.sugerenciasDeInscripcion];
  }
}
