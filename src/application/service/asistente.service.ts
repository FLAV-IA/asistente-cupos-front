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
  private readonly _cuposSugeridos: WritableSignal<SugerenciaDeInscripcion[]> =
    signal<SugerenciaDeInscripcion[]>([])
  private readonly _loading = signal(false)

  constructor(
    @Inject(ASISTENTE_HTTP_CLIENT) private http: AsistenteHttpClientPort,
    private logger: LoggingService,
  ) {}

  // Accesores de solo lectura para el componente
  readonly cuposSugeridos$ = this._cuposSugeridos.asReadonly()
  readonly loading = this._loading.asReadonly()

  consultarConPeticiones(peticiones: PeticionInscripcion[]): void {
    if (!peticiones || peticiones.length === 0) {
      this.logger.error('No hay peticiones para consultar')
      return
    }

    this._loading.set(true)

    this.http.postConsultar(peticiones).subscribe({
      next: (response) => {
        this._cuposSugeridos.set(response ?? [])
        this.logger.log('Respuesta recibida:', response)
      },
      error: (error) => {
        this.logger.error('Error al consultar:', error)
        this._cuposSugeridos.set([])
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
