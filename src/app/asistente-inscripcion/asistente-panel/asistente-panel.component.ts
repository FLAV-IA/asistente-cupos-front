import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  inject,
  effect
} from '@angular/core';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { AsistenteService } from '../service/asistente.service';

@Component({
  selector: 'asistente-panel',
  standalone: true,
  templateUrl: './asistente-panel.component.html',
  imports: [
    FormsModule,
    CommonModule,
    FileUploadModule,
    PanelModule,
    ButtonModule
  ]
})
export class AsistentePanelComponent {
  private readonly asistenteService = inject(AsistenteService);
  readonly respuesta = this.asistenteService.cuposSugeridos$;
  readonly loading = this.asistenteService.loading;

  selectedFile: File | null = null;
  archivoCargado = false;
  datosCSV: any[] = [];

  @Output() archivoCargadoEvent = new EventEmitter<any>();
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  @Output() sugerenciasDeInscripcionEvent = new EventEmitter<any[]>();

  constructor() {
    effect(() => {
      this.sugerenciasDeInscripcionEvent.emit(this.respuesta());
    });
  }

  seleccionarArchivo(event: any) {
    this.selectedFile = event.files?.[0] ?? null;
    this.archivoCargado = !!this.selectedFile;
  }

  limpiarArchivo() {
    this.fileUpload?.clear();
    this.archivoCargadoEvent.emit(null);
    this.selectedFile = null;
    this.archivoCargado = false;
    this.datosCSV = [];
  }

  consultar() {
    this.asistenteService.consultarConArchivo(this.selectedFile);
  }
}
