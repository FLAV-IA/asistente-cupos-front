import {Injectable, signal, WritableSignal, Inject, effect} from '@angular/core'
import { LoggingService } from '../logging.service'
import {Comision} from "../../../domain/Comision";
import {COMISION_HTTP_CLIENT, ComisionHttpClientPort} from "./comision-http-client.port";
import {AsignadorService} from "../asignador/asignador.service";


@Injectable({
  providedIn: 'root',
})
export class ComisionService {
  constructor(
    @Inject(COMISION_HTTP_CLIENT) private http: ComisionHttpClientPort,
    private logger: LoggingService,
  ) {}
  private readonly _comisionesActualizadas: WritableSignal<Comision[]> = signal<Comision[]>([])
  private readonly _loading = signal(false)
  readonly comisionesActualizadas= this._comisionesActualizadas.asReadonly()
  readonly loading = this._loading.asReadonly()

  refrescaLasComisiones(): void {
    this._loading.set(true)

    this.http.getComisiones().subscribe({
      next: (response) => {
        const comisiones = (response ?? []).map(c => Comision.fromJson(c));
        this._comisionesActualizadas.set(comisiones);
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
