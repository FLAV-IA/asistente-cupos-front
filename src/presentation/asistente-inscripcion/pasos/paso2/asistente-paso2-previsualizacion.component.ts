import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PrevisualizadorPeticionesComponent
} from "../../previsualizador-peticiones/previsualizador-peticiones.component";
import {AnimacionPlaceholderComponent} from "../../../animations/animation-container.component";
import {ButtonModule} from "primeng/button";
import {Estado} from "../../utils/constants";


@Component({
  selector: 'asistente-paso2-previsualizacion',
  standalone: true,
  imports: [
    CommonModule,
    PrevisualizadorPeticionesComponent,
    AnimacionPlaceholderComponent,
    ButtonModule,
  ],
  templateUrl: './asistente-paso2-previsualizacion.component.html',
})
export class AsistentePaso2PrevisualizacionComponent {
  @Input() filePeticiones: File | null = null;
  @Input() loading: boolean = false;
  @Output() consultar = new EventEmitter<void>();
  @Output() limpiar = new EventEmitter<void>();
  @Output() onChangeEstado = new EventEmitter<Estado>();


  cambioEnPrevisualizacion(preview: boolean): void {
    if (preview) {
      this.onChangeEstado.emit('previsualizando')
    }
  }


  solicitarConsulta() {

    this.onChangeEstado.emit('cargando');
    this.consultar.emit();
  }
}
