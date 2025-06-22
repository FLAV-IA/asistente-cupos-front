import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { SugerenciaDeInscripcion } from '../../domain/SugerenciaDeInscripcion'
import { Comision } from "../../domain/Comision";
import { AsignadorHttpClientPort } from "./asignador-http-client.port";

@Injectable({ providedIn: 'root' })
export class AsignadorHttpClientFake implements AsignadorHttpClientPort {
  postAsignar(_: SugerenciaDeInscripcion[]): Observable<Comision[]> {
    const data: Comision[] = [
     new Comision("com1","mate","lunes 10 a 20",10,20)
    ]
    return of(data).pipe(delay(3000))
  }
}
