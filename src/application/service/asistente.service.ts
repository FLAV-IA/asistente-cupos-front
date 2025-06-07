import { Injectable, signal, WritableSignal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { SugerenciaDeInscripcion } from '../../domain/SugerenciaDeInscripcion'
import { environment } from '../../environments/environment'
import { LoggingService } from './logging.service'

@Injectable({
  providedIn: 'root',
})
export class AsistenteService {
  private readonly BASE_URL = environment.apiBaseUrl
  private readonly CONSULTAR_ENDPOINT =
    'asistente/sugerencia-inscripcion-con-csv'

  private readonly _cuposSugeridos: WritableSignal<SugerenciaDeInscripcion[]> =
    signal<SugerenciaDeInscripcion[]>([])
  private readonly _loading = signal(false)

  constructor(private http: HttpClient, private logger: LoggingService) {}

  // Accesores de solo lectura para el componente
  readonly cuposSugeridos$ = this._cuposSugeridos.asReadonly()
  readonly loading = this._loading.asReadonly()

  consultarConArchivo(file: File | null): void {
    if (!file) {
      this.logger.error('No hay archivo seleccionado')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    this._loading.set(true)

    this.http
      .post<
        SugerenciaDeInscripcion[]
      >(`${this.BASE_URL}${this.CONSULTAR_ENDPOINT}`, formData)
      .subscribe({
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
}
