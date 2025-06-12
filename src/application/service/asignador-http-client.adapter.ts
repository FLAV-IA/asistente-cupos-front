import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { Comision } from "../../domain/Comision";
import { AsignadorHttpClientPort } from "./asignador-http-client.port";
import { SugerenciaDeInscripcion } from "../../domain/SugerenciaDeInscripcion";

@Injectable({
  providedIn: 'root',
})
export class AsignadorHttpClientAdapter implements AsignadorHttpClientPort {
  private readonly BASE_URL = environment.apiBaseUrl
  private readonly ENDPOINT = 'asignador/asignar-sugerencias'

  constructor(private http: HttpClient) {}

  postAsignar(sugerencias: SugerenciaDeInscripcion[]): Observable<Comision[]> {
    return this.http.post<Comision[]>(
      `${this.BASE_URL}${this.ENDPOINT}`,
      sugerencias
    );
  }
}

