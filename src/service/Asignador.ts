import {Comision} from "../domain/Comision";
import {SugerenciaDeInscripcion} from "../domain/SugerenciaDeInscripcion";
import {Estudiante} from "../domain/Estudiante";
import {AsignadorService} from "../application/service/asignador.service";
import {effect, inject, Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class Asignador {
  private comisiones: Comision[] = [];
  readonly loading = inject(AsignadorService).loading
  private readonly asignadorService = inject(AsignadorService)
  readonly comisionesActualizadas = this.asignadorService.comisionesActualizadas

  public preasignarAComision(sugerencias: SugerenciaDeInscripcion[]) {
    this.comisiones= [];
    sugerencias.forEach((s) => this.preAsignarEstudiante(s));
  }

  public obtenerComisiones(): Comision[] {
    return this.comisiones;
  }

  private preAsignarEstudiante(sugerencia: SugerenciaDeInscripcion) {
    const estudiante = new Estudiante(sugerencia.nombreEstudiante, sugerencia.dniEstudiante);
    const comision = this.comisiones.find(c => c.codigo === sugerencia.codigoComision);

    if (!comision) {
      const nueva = new Comision(sugerencia.codigoComision, sugerencia.nombreMateria);
      nueva.estudiantesInscriptos = [estudiante];
      this.comisiones.push(nueva);
    } else {
      if (!this.estudianteYaInscripto(comision, estudiante)) {
        comision.estudiantesInscriptos.push(estudiante);
      }
    }
  }

  private estudianteYaInscripto(comision: Comision, estudiante: Estudiante): boolean {
    return comision.estudiantesInscriptos.some(e => e.dni === estudiante.dni);
  }

  asignarAComision(sugerenciasAsignables: SugerenciaDeInscripcion[]) {
    this.asignadorService.asignarSugerenciasAcomisiones(sugerenciasAsignables);
    this.comisiones = this.comisionesActualizadas();
  }
}
