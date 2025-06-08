import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  effect,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TableModule } from 'primeng/table'
import { ListboxModule } from 'primeng/listbox'
import { LoggingService } from '../../../application/service/logging.service'
import { CsvService } from '../../../application/service/csv.service'

@Component({
  selector: 'previsualizador-peticiones-component',
  templateUrl: './previsualizador-peticiones.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ListboxModule],
})
export class PrevisualizadorPeticionesComponent {
  readonly datosEnriquecidos = inject(CsvService).previewData$;
  readonly loading = inject(CsvService).loading;
  private readonly csvService = inject(CsvService);
  private readonly logger = inject(LoggingService);
  errorMensaje: string | null = null;
  private archivoCargado = false;

  @Output() previsualizacionEvent = new EventEmitter<boolean>();

  constructor() {
    effect(() => {
      if (this.archivoCargado && !this.loading()) {
        this.previsualizacionEvent.emit(true);
      }
    });
  }

  @Input()
  set archivoPeticiones(value: File | null) {
    if (value) {
      this.archivoCargado = true;
      this.csvService.previsualizarCsv(value);
    } else {
      this.csvService.limpiarPrevisualizacion();
      this.previsualizacionEvent.emit(false);
      this.archivoCargado = false;
    }
  }

  formatCodigoList(codigos: string[]): { label: string; value: string }[] {
    return codigos
      ? codigos.map((codigo) => ({ label: codigo, value: codigo }))
      : [];
  }
}
