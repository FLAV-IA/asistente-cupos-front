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
  template: `
    <div class="grid">
      <ng-container *ngIf="estado === 'mostrandoSugerencias'; else sinSugerencias">
        <div [ngClass]="historiaAcademica.length > 0 ? 'col-10' : 'col-12'">
          <tabla-sugerencia-inscripcion
            [sugerenciasDeInscripcion]="sugerencias"
            (verHistoria)="verHistoria.emit($event)"
            (cambioDeSugerenciasPreAsignadas)="cambioSugerencias.emit($event)"
            (asignarSugerenciasPreasignadas)="asignar.emit($event)">
          </tabla-sugerencia-inscripcion>
        </div>

        <div class="col-2" *ngIf="historiaAcademica.length > 0">
          <historia-academica-list
            [historiaAcademicaList]="historiaAcademica"
            (eliminarHistoria)="eliminarHistoria.emit($event)">
          </historia-academica-list>
        </div>
      </ng-container>

      <ng-template #sinSugerencias>
        <div class="col-12">
          <animacion-placeholder
            [path]="estado === 'cargando' ? '/assets/animaciones/consultando.json' : '/assets/animaciones/contenidoNoDisponible.json'"
            [mensaje]="estado === 'cargando' ? 'Estamos buscando la mejor opción' : 'Aún no tenemos sugerencias para vos'"
            [width]="500"
            [height]="500">
          </animacion-placeholder>
        </div>
      </ng-template>
    </div>
  `
})
export class AsistentePaso3SugerenciasComponent {
  @Input() estado!: string;
  @Input() sugerencias: SugerenciaDeInscripcion[] = [];
  @Input() historiaAcademica: HistoriaAcademica[] = [];

  @Output() verHistoria = new EventEmitter<SugerenciaDeInscripcion>();
  @Output() eliminarHistoria = new EventEmitter<HistoriaAcademica>();
  @Output() cambioSugerencias = new EventEmitter<SugerenciaDeInscripcion[]>();
  @Output() asignar = new EventEmitter<SugerenciaDeInscripcion[]>();
}
