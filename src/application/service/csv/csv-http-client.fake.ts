import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { CsvHttpClientPort, CSV_HTTP_CLIENT } from './csv-http-client.port'
import { PeticionInscripcion } from '../../../domain/PeticionInscripcion'
import { HistoriaAcademica } from '../../../domain/HistoriaAcademica'

@Injectable({ providedIn: 'root' })
export class CsvHttpClientFake implements CsvHttpClientPort {
  postPreviewCsv(_: File): Observable<PeticionInscripcion[]> {
    const data: PeticionInscripcion[] = [
      {
        nombre: 'Juan Pérez',
        dni: '12345678',
        historiaAcademica: new HistoriaAcademica(
          '12345678',
          10,
          8,
          7.5,
          true,
          ['MAT101'],
          ['MAT202'],
        ),
        materias: [
          {
            nombreMateria: 'Matemática I',
            codigoMateria: 'MAT101',
            codigosComisionesSolicitadas: ['C1', 'C2'],
            cumpleCorrelativa: true,
          },
        ],
      },
      {
        nombre: 'Ana Gómez',
        dni: '87654321',
        historiaAcademica: new HistoriaAcademica(
          '87654321',
          5,
          4,
          6.3,
          false,
          ['FIS101'],
          [''],
        ),
        materias: [
          {
            nombreMateria: 'Física I',
            codigoMateria: 'FIS101',
            codigosComisionesSolicitadas: ['F1'],
            cumpleCorrelativa: false,
          },
        ],
      },
    ]
    return of(data).pipe(delay(3000))
  }
}
