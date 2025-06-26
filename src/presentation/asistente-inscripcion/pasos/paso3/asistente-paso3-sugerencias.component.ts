import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimacionPlaceholderComponent } from "../../../animations/animation-container.component";
import { HistoriaAcademicaListComponent } from "../../historia-academica/historia-academica-list.component";
import { TablaSugerenciaInscripcionComponent } from "../../sugerencias/tabla-sugerencia-inscripcion.component";
import {HistoriaAcademica} from "../../../../domain/HistoriaAcademica";
import {SugerenciaDeInscripcion} from "../../../../domain/SugerenciaDeInscripcion";


@Component({
  selector: 'asistente-paso3-sugerencias',
  standalone: true,
  imports: [
    CommonModule,
    TablaSugerenciaInscripcionComponent,
    HistoriaAcademicaListComponent,
    AnimacionPlaceholderComponent
  ],
  templateUrl: './asistente-paso3-sugerencias.component.html',
})
export class AsistentePaso3SugerenciasComponent {
  @Input() estado!: string;
  @Input() sugerencias: SugerenciaDeInscripcion[] = [];
  @Input() listaDehistoriaAcademica: HistoriaAcademica[] = [];
  @Output() cambioSugerencias = new EventEmitter<SugerenciaDeInscripcion[]>();
  @Output() asignar = new EventEmitter<SugerenciaDeInscripcion>();
  @Output() desasignar = new EventEmitter<SugerenciaDeInscripcion>();
  @Output() confirmarAsignacion = new EventEmitter<SugerenciaDeInscripcion[]>();


  verHistoria(sugerencia: SugerenciaDeInscripcion): void {
    const existe = this.listaDehistoriaAcademica.some(
      (h) => h.dni === sugerencia.historiaAcademica?.dni
    );
    if (!existe && sugerencia.historiaAcademica) {
      this.listaDehistoriaAcademica.push(sugerencia.historiaAcademica);
    }
  }

  eliminarHistoria(item: HistoriaAcademica): void {
    this.listaDehistoriaAcademica = this.listaDehistoriaAcademica.filter(
      (h) => h !== item
    );
  }



}
