import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnrichedCsvRow } from '../../domain/EnrichedCsvRow';
import { CsvHttpClientPort, CSV_HTTP_CLIENT } from './csv-http-client.port';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CsvHttpClientAdapter implements CsvHttpClientPort {
  private readonly BASE_URL = environment.apiBaseUrl;
  private readonly ENDPOINT = 'asistente/previsualizar-csv';

  constructor(private http: HttpClient) {}

  postPreviewCsv(file: File): Observable<EnrichedCsvRow[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<EnrichedCsvRow[]>(
      `${this.BASE_URL}${this.ENDPOINT}`,
      formData,
    );
  }
}

export const CSV_HTTP_CLIENT_PROVIDER = {
  provide: CSV_HTTP_CLIENT,
  useExisting: CsvHttpClientAdapter,
};
