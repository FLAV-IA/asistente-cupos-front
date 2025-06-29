import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import {Comision} from "../../../domain/Comision";

export const COMISION_HTTP_CLIENT = new InjectionToken<ComisionHttpClientPort>('COMISION_HTTP_CLIENT');

export interface ComisionHttpClientPort {
  getComisiones(): Observable<Comision[]>;
}
