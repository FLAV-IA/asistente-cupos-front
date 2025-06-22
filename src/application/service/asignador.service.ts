import { Injectable, signal, WritableSignal, Inject } from '@angular/core'
import { SugerenciaDeInscripcion } from '../../domain/SugerenciaDeInscripcion'
import { LoggingService } from './logging.service'
import {
  ASISTENTE_HTTP_CLIENT,
  AsistenteHttpClientPort,
} from './asistente-http-client.port'
import {Comision} from "../../domain/Comision";
import {ASIGNADOR_HTTP_CLIENT, AsignadorHttpClientPort} from "./asignador-http-client.port";

@Injectable({
  providedIn: 'root',
})
export class AsignadorService {
  private readonly _comisionesActualizadas: WritableSignal<Comision[]> =
    signal<Comision[]>([])
  private readonly _loading = signal(false)

  constructor(
    @Inject(ASIGNADOR_HTTP_CLIENT) private http: AsignadorHttpClientPort,
    private logger: LoggingService,
  ) {}

  readonly comisionesActualizadas = this._comisionesActualizadas.asReadonly()
  readonly loading = this._loading.asReadonly()

  asignarSugerenciasAcomisiones(sugerencias : SugerenciaDeInscripcion[]): void {

    this._loading.set(true)

    this.http.postAsignar(sugerencias).subscribe({
      next: (response) => {
        this._comisionesActualizadas.set( response ?? [])
        this.logger.log('Respuesta recibida:', response)
      },
      error: (error) => {
        this.logger.error('Error al consultar:', error)
        this._comisionesActualizadas.set([])
      },
      complete: () => {
        this._loading.set(false)
        this.logger.log('Consulta completada')
      },
    })
  }


}
