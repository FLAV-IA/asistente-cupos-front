import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  inject,
  effect,
} from '@angular/core'
import { FileUpload, FileUploadModule } from 'primeng/fileupload'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { PanelModule } from 'primeng/panel'
import { ButtonModule } from 'primeng/button'
import { AsistenteService } from '../../../application/service/asistente.service'
import { LoggingService } from '../../../application/service/logging.service'

@Component({
  selector: 'asistente-panel',
  standalone: true,
  templateUrl: './asistente-panel.component.html',
  imports: [
    FormsModule,
    CommonModule,
    FileUploadModule,
    PanelModule,
    ButtonModule,
  ],
})
export class AsistentePanelComponent {
  private readonly asistenteService = inject(AsistenteService)
  private readonly logger = inject(LoggingService)
  readonly respuesta = this.asistenteService.cuposSugeridos$
  readonly loading = this.asistenteService.loading

  selectedFile: File | null = null
  archivoCargado = false
  datosCSV: any[] = []
  mensajeError: string | null = null

  @Output() archivoCargadoEvent = new EventEmitter<any>()
  @ViewChild('fileUpload') fileUpload!: FileUpload
  @Output() sugerenciasDeInscripcionEvent = new EventEmitter<any[]>()

  constructor() {
    effect(() => {
      this.sugerenciasDeInscripcionEvent.emit(this.respuesta())
    })
  }

  seleccionarArchivo(event: any) {
    const file: File | null = event.files?.[0] ?? null
    if (!file) {
      this.mensajeError = 'No se seleccionó ningún archivo.'
      this.selectedFile = null
      this.archivoCargado = false
      this.archivoCargadoEvent.emit(null)
      return
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      this.mensajeError = 'El archivo debe tener extensión .csv.'
      this.logger.error('Archivo con extensión incorrecta')
      this.selectedFile = null
      this.archivoCargado = false
      this.archivoCargadoEvent.emit(null)
      return
    }

    this.mensajeError = null
    this.selectedFile = file
    this.archivoCargado = true
  }

  limpiarArchivo() {
    this.fileUpload?.clear()
    this.archivoCargadoEvent.emit(null)
    this.selectedFile = null
    this.archivoCargado = false
    this.mensajeError = null
    this.datosCSV = []
  }

  consultar() {
    if (!this.selectedFile) {
      this.mensajeError = 'Debe cargar un archivo CSV antes de consultar.'
      return
    }
    this.asistenteService.consultarConArchivo(this.selectedFile)
  }
}
