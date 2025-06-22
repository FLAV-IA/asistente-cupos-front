import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { SugerenciaDeInscripcion } from '../../domain/SugerenciaDeInscripcion';
import {Comision} from "../../domain/Comision";

export const ASIGNADOR_HTTP_CLIENT = new InjectionToken<AsignadorHttpClientPort>('ASIGNADOR_HTTP_CLIENT');

export interface AsignadorHttpClientPort {
  postAsignar(sugerenciasAsignables: SugerenciaDeInscripcion[]): Observable<Comision[]>;
}
