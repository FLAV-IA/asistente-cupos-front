import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AsistentePanelComponent} from "../../asistente-panel/asistente-panel.component";
import {Estado, StepState} from "../../utils/constants";

@Component({
  selector: 'asistente-paso1-carga',
  standalone: true,
  imports: [CommonModule, AsistentePanelComponent],
  templateUrl: './asistente-paso1-carga.component.html',
})
export class AsistentePaso1CargaComponent {
  @Output() archivoCargado = new EventEmitter<File | null>();
  @Output() onChangeEstado = new EventEmitter<Estado>();


  darAvisoArchivoCargado(file: File) {
    this.onChangeEstado.emit(  file ? 'previsualizando' : 'inicial');
    this.archivoCargado.emit(file)
  }
}
