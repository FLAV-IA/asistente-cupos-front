import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Comision } from "../../../domain/Comision";
import {ComisionHttpClientPort} from "./comision-http-client.port";


@Injectable({
  providedIn: 'root',
})
export class ComisionHttpClientAdapter implements ComisionHttpClientPort {
  private readonly BASE_URL = environment.apiBaseUrl
  private readonly ENDPOINT = 'comisiones/obtenerComisiones'

  constructor(private http: HttpClient) {}

  getComisiones(): Observable<Comision[]> {
    return this.http.get<Comision[]>(`${this.BASE_URL}${this.ENDPOINT}`)
  }
}



