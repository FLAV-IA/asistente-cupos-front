import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { ComisionHttpClientPort } from './comision-http-client.port'
import { Comision } from '../../../domain/Comision'

@Injectable({ providedIn: 'root' })
export class ComisionHttpClientFake implements ComisionHttpClientPort {

  getComisiones(): Observable<Comision[]> {
    const comisiones: Comision[] = [
      new Comision('F2', 'Física I', 'Jueves 14:00 - 16:00', 2, 25),
      new Comision('M1', 'Química', 'Viernes 8:00 - 10:00', 10, 20),
      new Comision('P1', 'Programación I', 'Miércoles 18:00 - 20:00', 15, 25),
      new Comision('C1', 'Matemática I', 'Lunes 8:00 - 10:00', 25, 30),   // Coincide con sugerencia de Juan Pérez
      new Comision('F1', 'Física I', 'Martes 10:00 - 12:00', 20, 25),    // Coincide con sugerencia de Ana Gómez
    ]

    // Simulación de inscriptos confirmados
    comisiones[0].cantidadInscriptosConfirmados = 26 // Para que muestre exceso
    comisiones[1].cantidadInscriptosConfirmados = 20
    comisiones[2].cantidadInscriptosConfirmados = 2
    comisiones[3].cantidadInscriptosConfirmados = 10
    comisiones[4].cantidadInscriptosConfirmados = 15

    return of(comisiones).pipe(delay(1000))
  }
}
