import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { SugerenciaDeInscripcion } from '../../domain/SugerenciaDeInscripcion';

export const ASISTENTE_HTTP_CLIENT = new InjectionToken<AsistenteHttpClientPort>('ASISTENTE_HTTP_CLIENT');

import { PeticionInscripcion } from '../../domain/PeticionInscripcion';

export interface AsistenteHttpClientPort {
  postConsultar(peticiones: PeticionInscripcion[]): Observable<SugerenciaDeInscripcion[]>;
}
