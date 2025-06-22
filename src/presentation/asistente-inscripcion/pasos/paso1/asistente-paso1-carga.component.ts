import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AsistentePanelComponent} from "../../asistente-panel/asistente-panel.component";

@Component({
  selector: 'asistente-paso1-carga',
  standalone: true,
  imports: [CommonModule, AsistentePanelComponent],
  template: `
    <div class="grid">
      <div class="col-12">
        <asistente-panel (archivoCargadoEvent)="archivoCargado.emit($event)"></asistente-panel>
      </div>
    </div>
  `
})
export class AsistentePaso1CargaComponent {
  @Output() archivoCargado = new EventEmitter<File | null>();
}
