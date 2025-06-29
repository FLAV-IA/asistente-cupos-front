import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  inject,
} from '@angular/core';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { LoggingService } from '../../../application/service/logging.service';
import { AnimationOptions } from 'ngx-lottie';
import { LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'asistente-panel',
  standalone: true,
  templateUrl: './asistente-panel.component.html',
  styleUrls: ['./asistente-panel.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    FileUploadModule,
    PanelModule,
    ButtonModule,
    LottieComponent,
  ],
})
export class AsistentePanelComponent {
  private readonly logger = inject(LoggingService);

  selectedFile: File | null = null;
  archivoCargado = false;
  datosCSV: any[] = [];
  mensajeError: string | null = null;

  @Output() archivoCargadoEvent = new EventEmitter<File | null>();
  @Output() sugerenciasDeInscripcionEvent = new EventEmitter<any[]>();

  @ViewChild('fileUpload') fileUpload!: FileUpload;

  options: AnimationOptions = {
    path: '/assets/animaciones/asistente.json',
    loop: true,
    autoplay: true,
  };


  seleccionarArchivo(event: any) {
    const file: File | null = event.files?.[0] ?? null;

    if (!file) {
      this.mensajeError = 'No se seleccionó ningún archivo.';
      this.limpiarEstadoArchivo();
      this.archivoCargadoEvent.emit(null);
      return;
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      this.mensajeError = 'El archivo debe tener extensión .csv.';
      this.logger.error('Archivo con extensión incorrecta');
      this.limpiarEstadoArchivo();
      this.archivoCargadoEvent.emit(null);
      return;
    }

    // Archivo válido
    this.mensajeError = null;
    this.selectedFile = file;
    this.archivoCargado = true;
  }

  limpiarArchivo() {
    this.fileUpload?.clear();
    this.archivoCargadoEvent.emit(null);
    this.limpiarEstadoArchivo();
  }

  private limpiarEstadoArchivo() {
    this.selectedFile = null;
    this.archivoCargado = false;
    this.mensajeError = null;
    this.datosCSV = [];
  }
}
