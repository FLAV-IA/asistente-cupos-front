import { Injectable, signal, WritableSignal, Inject } from '@angular/core'
import { SugerenciaDeInscripcion } from '../../../domain/SugerenciaDeInscripcion'
import { LoggingService } from '../logging.service'
import {
  ASISTENTE_HTTP_CLIENT,
  AsistenteHttpClientPort,
} from '../asistente/asistente-http-client.port'
import {Comision} from "../../../domain/Comision";
import {ASIGNADOR_HTTP_CLIENT, AsignadorHttpClientPort} from "./asignador-http-client.port";
import {ComisionService} from "../comision/comision.service";

@Injectable({
  providedIn: 'root',
})
export class AsignadorService {
  private readonly _comisionesActualizadas: WritableSignal<Comision[]> =
    signal<Comision[]>([])
  private readonly _loading = signal(false)

  constructor(
    @Inject(ASIGNADOR_HTTP_CLIENT) private http: AsignadorHttpClientPort,
    private comisionService: ComisionService,
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
        this.comisionService.refrescaLasComisiones();
        this.logger.log('Consulta completada')
      },
    })
  }

  desasignarEstudiante(dni: string | undefined, codigo: string): void {
    if (!dni) {
      this.logger.error('DNI no definido, no se puede desasignar');
      return;
    }

    this._loading.set(true);

    this.http.deleteAsignacion(dni, codigo).subscribe({
      next: () => {
        this.logger.log(`Asignación eliminada para estudiante ${dni} de la comisión ${codigo}`);
        this._comisionesActualizadas.set([]); // o podrías volver a cargar si querés el estado actualizado
      },
      error: (error) => {
        this.logger.error(`Error al eliminar asignación de ${dni} en comisión ${codigo}:`, error);
        this._comisionesActualizadas.set([]);
      },
      complete: () => {
        this._loading.set(false);
        this.logger.log('Desasignación completada');
      },
    });
  }


}
