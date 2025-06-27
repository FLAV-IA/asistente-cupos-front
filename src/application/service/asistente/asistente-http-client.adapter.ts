import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { SugerenciaDeInscripcion } from '../../../domain/SugerenciaDeInscripcion'
import {
  ASISTENTE_HTTP_CLIENT,
  AsistenteHttpClientPort,
} from './asistente-http-client.port'
import { PeticionInscripcion } from '../../../domain/PeticionInscripcion'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AsistenteHttpClientAdapter implements AsistenteHttpClientPort {
  private readonly BASE_URL = environment.apiBaseUrl
  private readonly ENDPOINT = 'asistente/consultar-sugerencia'

  constructor(private http: HttpClient) {}

  postConsultar(
    peticiones: PeticionInscripcion[],
  ): Observable<SugerenciaDeInscripcion[]> {
    return this.http.post<SugerenciaDeInscripcion[]>(
      `${this.BASE_URL}${this.ENDPOINT}`,
      peticiones,
    )
  }
}

export const ASISTENTE_HTTP_CLIENT_PROVIDER = {
  provide: ASISTENTE_HTTP_CLIENT,
  useExisting: AsistenteHttpClientAdapter,
}
