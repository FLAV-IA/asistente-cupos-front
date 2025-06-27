import { Injectable, signal, WritableSignal, Inject } from '@angular/core'
import { SugerenciaDeInscripcion } from '../../domain/SugerenciaDeInscripcion'
import { PeticionInscripcion } from '../../domain/PeticionInscripcion'
import { LoggingService } from './logging.service'
import {
  ASISTENTE_HTTP_CLIENT,
  AsistenteHttpClientPort,
} from './asistente-http-client.port'

@Injectable({
  providedIn: 'root',
})
export class AsistenteService {
  private readonly _cuposSugeridos: WritableSignal<SugerenciaDeInscripcion[]> = signal([])
  private readonly _loading: WritableSignal<boolean> = signal(false)
  private readonly _errorMensaje: WritableSignal<string | null> = signal(null)

  readonly cuposSugeridos$ = this._cuposSugeridos.asReadonly()
  readonly loading = this._loading.asReadonly()
  readonly errorMensaje = this._errorMensaje.asReadonly()

  constructor(
    @Inject(ASISTENTE_HTTP_CLIENT) private http: AsistenteHttpClientPort,
    private logger: LoggingService,
  ) {}

  consultarConPeticiones(peticiones: PeticionInscripcion[]): void {
    if (!peticiones || peticiones.length === 0) {
      this.logger.error('No hay peticiones para consultar')
      return
    }

    this._loading.set(true)
    this._errorMensaje.set(null) // limpio error previo

    this.http.postConsultar(peticiones).subscribe({
      next: (response) => {
        this._cuposSugeridos.set(response ?? [])
        this.logger.log('Respuesta recibida:', response)
        this._errorMensaje.set(null)
      },
      error: (error) => {
        const mensaje = error?.message ?? 'Error desconocido en la consulta'
        this.logger.error('Error al consultar:', error)
        this._cuposSugeridos.set([])
        this._errorMensaje.set(mensaje)
        this._loading.set(false)

      },
      complete: () => {
        this._loading.set(false)
        this.logger.log('Consulta completada')
      },
    })
  }

  limpiarSugerencias(): void {
    this._cuposSugeridos.set([])
  }
}
