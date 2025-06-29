import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { PeticionInscripcion } from '../../../domain/PeticionInscripcion';

export const CSV_HTTP_CLIENT = new InjectionToken<CsvHttpClientPort>('CSV_HTTP_CLIENT');

export interface CsvHttpClientPort {
  postPreviewCsv(file: File): Observable<PeticionInscripcion[]>;
}
