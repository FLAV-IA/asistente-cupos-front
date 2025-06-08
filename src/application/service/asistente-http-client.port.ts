import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { SugerenciaDeInscripcion } from '../../domain/SugerenciaDeInscripcion';

export const ASISTENTE_HTTP_CLIENT = new InjectionToken<AsistenteHttpClientPort>('ASISTENTE_HTTP_CLIENT');

export interface AsistenteHttpClientPort {
  postConsultar(file: File): Observable<SugerenciaDeInscripcion[]>;
}
