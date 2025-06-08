import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CsvHttpClientPort, CSV_HTTP_CLIENT } from './csv-http-client.port';
import { EnrichedCsvRow } from '../../domain/EnrichedCsvRow';

@Injectable({ providedIn: 'root' })
export class CsvHttpClientFake implements CsvHttpClientPort {
  postPreviewCsv(_: File): Observable<EnrichedCsvRow[]> {
    const rows: EnrichedCsvRow[] = [
      {
        dni: '12345678',
        nombre: 'Juan Pérez',
        materia: 'Matemática I',
        comisiones: ['C1', 'C2'],
      },
      {
        dni: '87654321',
        nombre: 'Ana Gómez',
        materia: 'Física I',
        comisiones: ['F1'],
      },
    ];
    return of(rows).pipe(delay(3000));
  }
}

export const CSV_HTTP_CLIENT_FAKE_PROVIDER = {
  provide: CSV_HTTP_CLIENT,
  useClass: CsvHttpClientFake,
};
