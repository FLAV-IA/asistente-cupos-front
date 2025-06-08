import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ASISTENTE_HTTP_CLIENT, AsistenteHttpClientPort } from './asistente-http-client.port';
import { SugerenciaDeInscripcion } from '../../domain/SugerenciaDeInscripcion';
import { HistoriaAcademica } from '../../domain/HistoriaAcademica';

@Injectable({ providedIn: 'root' })
export class AsistenteHttpClientFake implements AsistenteHttpClientPort {
  postConsultar(_: File): Observable<SugerenciaDeInscripcion[]> {
    const data: SugerenciaDeInscripcion[] = [
      new SugerenciaDeInscripcion(
        'Juan Pérez',
        '12345678',
        'Matemática I',
        'C1',
        80,
        true,
        'Asignado por prioridad',
        new HistoriaAcademica('12345678', 10, 8, 8.5, true, ['MAT1'], ['MAT2']),
      ),
      new SugerenciaDeInscripcion(
        'Ana Gómez',
        '98765432',
        'Física I',
        'F1',
        60,
        false,
        'Sin cupo',
        new HistoriaAcademica('98765432', 5, 4, 7.2, false, ['FIS1'], []),
      ),
    ];
    return of(data).pipe(delay(3000));
  }
}

export const ASISTENTE_HTTP_CLIENT_FAKE_PROVIDER = {
  provide: ASISTENTE_HTTP_CLIENT,
  useClass: AsistenteHttpClientFake,
};
