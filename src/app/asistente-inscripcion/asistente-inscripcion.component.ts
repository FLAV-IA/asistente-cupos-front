import { Component, effect, signal } from '@angular/core';
import {HistoriaAcademicaListComponent} from "./historia-academica/historia-academica-list.component";
import {CommonModule} from "@angular/common";
import {AsistentePanelComponent} from "./asistente-panel/asistente-panel.component";
import {TablaSugerenciaInscripcionComponent} from "./sugerencias/tabla-sugerencia-inscripcion.component";
import {PrevisualizadorPeticionesComponent} from "./previsualizador-peticiones/previsualizador-peticiones.component";
import {SugerenciaDeInscripcion} from "../core/domain/SugerenciaDeInscripcion";
import {HistoriaAcademica} from "../core/domain/HistoriaAcademica";

class CupoAsignado {
}

@Component({
  selector: 'asistente-inscripcion2',
  standalone: true,
  imports: [HistoriaAcademicaListComponent,AsistentePanelComponent,TablaSugerenciaInscripcionComponent,PrevisualizadorPeticionesComponent,CommonModule,],

  templateUrl: './asistente-inscripcion.component.html',
})
export class AsistenteComponent {
  fueCargadoElArchivo: boolean = false;
  filePeticiones: File | null = null;
  sugerenciasDeInscripcion: SugerenciaDeInscripcion[]=[];
  historiaAcademicaList: HistoriaAcademica[] = [];

  agregarHistoriaAcademica(sugerencia: SugerenciaDeInscripcion): void {
    const existe = this.historiaAcademicaList.some(h => h.dni === sugerencia.historiaAcademica?.dni);
    if (!existe) {
      const historiaItem: HistoriaAcademica =sugerencia.historiaAcademica!;
      this.historiaAcademicaList.push(historiaItem);
    }
  }
  eliminarHistoriaAcademica(item: HistoriaAcademica): void {
    this.historiaAcademicaList = this.historiaAcademicaList.filter(h => h !== item);
  }
}
