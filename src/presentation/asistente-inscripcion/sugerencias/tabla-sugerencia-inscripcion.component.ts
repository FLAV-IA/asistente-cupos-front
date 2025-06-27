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
  @Output() consultarCupo = new EventEmitter<{ codigoComision: string;
                                              callback: (hayCupo: boolean) => void; }>();
  sugerenciasPreAsignadas: SugerenciaDeInscripcion[]= [];
  preasignado: boolean = false;

  visualizarHistoriaAcademicaDe(sugerencia: SugerenciaDeInscripcion) {
    this.mostrarHistoriaAcademica.emit(sugerencia);
  }

  cambioEnPreAsignacion(sugerencia: SugerenciaDeInscripcion, accion: any): void {
    const codigo :string  = sugerencia.codigoComision ? sugerencia.codigoComision : '';

    if (accion.checked) {
      this.consultarCupo.emit({
        codigoComision: codigo,
        callback: (hayCupo: boolean) => {
          if (hayCupo) {
            this.agregarSugerenciaPreasignada(sugerencia);
            this.preAsignarAComision.emit(sugerencia);
          }
          else{
            sugerencia.preasignado = false;
          }
        }
      });
    } else {
      this.removerSugerenciaPreasignada(sugerencia);
      this.eliminarPreasignacionComision.emit(sugerencia);
    }
  }


  private agregarSugerenciaPreasignada(sugerencia: SugerenciaDeInscripcion): void {
    if (!this.sugerenciasPreAsignadas.includes(sugerencia)) {
      this.sugerenciasPreAsignadas = [...this.sugerenciasPreAsignadas, sugerencia];
    }
  }

  private removerSugerenciaPreasignada(sugerencia: SugerenciaDeInscripcion): void {
    this.sugerenciasPreAsignadas = this.sugerenciasPreAsignadas
      .filter(s => s !== sugerencia);
  }

  asignarSugerencias() {
    this.asignarSugerenciasPreasignadas.emit(this.sugerenciasPreAsignadas);
    this.sugerenciasPreAsignadas.forEach(s=>{
      s.cupoAsignado = true;
      s.motivo = 'Asignado por el usuario';
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
