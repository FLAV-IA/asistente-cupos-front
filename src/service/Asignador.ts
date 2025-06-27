import {Comision} from "../domain/Comision";
import {SugerenciaDeInscripcion} from "../domain/SugerenciaDeInscripcion";
import {Estudiante} from "../domain/Estudiante";
import {AsignadorService} from "../application/service/asignador.service";
import {effect, inject, Injectable, signal} from "@angular/core";
import {ComisionService} from "../application/service/comision/comision.service";
@Injectable({
  providedIn: 'root'
})
export class Asignador {
  private comisiones: Comision[] = [];
  readonly loading = inject(AsignadorService).loading
  private readonly asignadorService = inject(AsignadorService)
  private readonly comisionService = inject(ComisionService);
  readonly obtenerComisiones = this.comisionService.comisionesActualizadas;

  constructor() {
    effect(() => {
      this.comisiones = this.obtenerComisiones();
    });
  }


  public asignarSugerencia(sugerencia: SugerenciaDeInscripcion) {
    const estudiante = new Estudiante(sugerencia.nombreEstudiante, sugerencia.dniEstudiante);
    const comision = this.comisiones.find(c => c.codigo === sugerencia.codigoComision);

    if (comision && !this.estudianteYaInscripto(comision, estudiante)) {
        comision.recibirEstudiante(estudiante);
    }
  }
  public desAsignarSugerencia(sugerencia: SugerenciaDeInscripcion) {
    const estudiante = new Estudiante(sugerencia.nombreEstudiante, sugerencia.dniEstudiante);
    const comision = this.comisiones.find(c => c.codigo === sugerencia.codigoComision);

    if (comision) {
      comision.eliminarEstudiante(estudiante);
    }
  }



  private estudianteYaInscripto(comision: Comision, estudiante: Estudiante): boolean {
    return comision.estudiantesInscriptos.some(e => e.dni === estudiante.dni);
  }

  confirmarAsignaciones(sugerenciasAsignables: SugerenciaDeInscripcion[]) {
    this.asignadorService.asignarSugerenciasAcomisiones(sugerenciasAsignables);
  }


  confirmarDesAsignarSugerencia(dni: string | undefined, codigo: string) {
    this.asignadorService.desasignarEstudiante(dni, codigo);
  }
}
