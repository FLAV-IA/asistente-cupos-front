import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PrevisualizadorPeticionesComponent
} from "../../previsualizador-peticiones/previsualizador-peticiones.component";
import {AnimacionPlaceholderComponent} from "../../../animations/animation-container.component";
import {ButtonModule} from "primeng/button";


@Component({
  selector: 'asistente-paso2-previsualizacion',
  standalone: true,
  imports: [
    CommonModule,
    PrevisualizadorPeticionesComponent,
    AnimacionPlaceholderComponent,
    ButtonModule,
  ],
  template: `
    <div class="grid">
      <div class="col-12">
        <ng-container *ngIf="filePeticiones; else noArchivo">
          <div class="flex justify-content-end gap-2 mb-3">
            <button
              pButton
              type="button"
              class="p-button-success p-button-rounded px-3"
              [icon]="loading ? 'pi pi-spin pi-spinner' : 'pi pi-search'"
              [label]="loading ? 'Procesando...' : 'Consultar'"
              (click)="consultar.emit()"
              [disabled]="loading">
            </button>
            <button
              pButton
              type="button"
              label="Limpiar"
              icon="pi pi-refresh"
              class="p-button-secondary p-button-rounded px-3"
              (click)="limpiar.emit()">
            </button>
          </div>

          <previsualizador-peticiones-component
            [archivoPeticiones]="filePeticiones"
            (previsualizacionEvent)="previsualizacion.emit($event)">
          </previsualizador-peticiones-component>
        </ng-container>

        <ng-template #noArchivo>
          <animacion-placeholder
            path="/assets/animaciones/contenidoNoDisponible.json"
            mensaje="Aún no cargaste un archivo de peticiones"
            [width]="500"
            [height]="500">
          </animacion-placeholder>
        </ng-template>
      </div>
    </div>
  `
})
export class AsistentePaso2PrevisualizacionComponent {
  @Input() filePeticiones: File | null = null;
  @Input() loading: boolean = false;
  @Output() consultar = new EventEmitter<void>();
  @Output() limpiar = new EventEmitter<void>();
  @Output() previsualizacion = new EventEmitter<boolean>();
}
