import { Injectable, signal, WritableSignal, Inject } from '@angular/core';
import * as Papa from 'papaparse';
import { PeticionInscripcion } from '../../domain/PeticionInscripcion';
import { CsvHttpClientPort, CSV_HTTP_CLIENT } from './csv-http-client.port';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  private readonly _previewData: WritableSignal<PeticionInscripcion[]> = signal<PeticionInscripcion[]>([]);
  private readonly _loading = signal(false);
  private readonly _errorMensaje = signal<string >('');
  readonly errorMensaje$ = this._errorMensaje.asReadonly();
  constructor(
    @Inject(CSV_HTTP_CLIENT) private httpClient: CsvHttpClientPort,
    private logger: LoggingService,
  ) {}

  readonly previewData$ = this._previewData.asReadonly();
  readonly loading = this._loading.asReadonly();

  previsualizarCsv(file: File | null): void {
    if (!file) {
      this.logger.error('No hay archivo seleccionado');
      this._previewData.set([]);
      return;
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      this.logger.error('El archivo debe tener extensión .csv.');
      this._previewData.set([]);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const csv = reader.result as string;
      const parsed = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        delimiter: '|',
      });
      const fields = parsed.meta.fields ?? [];
      if (!fields.includes('dni') || !fields.includes('codigos_comisiones')) {
        this.logger.error('El archivo CSV no contiene las columnas requeridas.');
        this._errorMensaje.set('El archivo CSV no contiene las columnas requeridas.');
        this._previewData.set([]);
        return;
      }
      this.enviarAlBackend(file);
    };
    reader.onerror = () => {
      this.logger.error('No se pudo leer el archivo CSV.');
      this._previewData.set([]);
    };
    reader.readAsText(file, 'UTF-8');
  }

  limpiarPrevisualizacion(): void {
    this._previewData.set([]);
  }

  private enviarAlBackend(file: File): void {
    this._loading.set(true);
    this.httpClient.postPreviewCsv(file).subscribe({
      next: (rows) => {
        this._previewData.set(rows ?? []);
        this.logger.log('Datos previsualizados recibidos', rows);
      },
      error: (err) => {
        this.logger.error('Error al previsualizar CSV', err);
        this._previewData.set([]);
      },
      complete: () => {
        this._loading.set(false);
      },
    });
  }
  resetearError(): void {
    this._errorMensaje.set('');
  }
}
