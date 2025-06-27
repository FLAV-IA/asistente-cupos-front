import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeticionInscripcion } from '../../../domain/PeticionInscripcion';
import { CsvHttpClientPort, CSV_HTTP_CLIENT } from './csv-http-client.port';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CsvHttpClientAdapter implements CsvHttpClientPort {
  private readonly BASE_URL = environment.apiBaseUrl;
  private readonly ENDPOINT = 'csv/previsualizar';

  constructor(private http: HttpClient) {}

  postPreviewCsv(file: File): Observable<PeticionInscripcion[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<PeticionInscripcion[]>(
      `${this.BASE_URL}${this.ENDPOINT}`,
      formData,
    );
  }
}

export const CSV_HTTP_CLIENT_PROVIDER = {
  provide: CSV_HTTP_CLIENT,
  useExisting: CsvHttpClientAdapter,
};
