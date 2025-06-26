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
  deleteAsignacion(dni: string, codigo: string): Observable<void> {
    console.log(`Simulando eliminación de asignación para estudiante ${dni} en comisión ${codigo}`);
    return of(undefined).pipe(delay(1500));
  }
}
