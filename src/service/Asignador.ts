import {Comision} from "../domain/Comision";
import {SugerenciaDeInscripcion} from "../domain/SugerenciaDeInscripcion";
import {Estudiante} from "../domain/Estudiante";

export class Asignador {
  private comisiones: Comision[] = [];

  constructor(comisionesIniciales: Comision[] = []) {
    this.comisiones = [...comisionesIniciales];
  }

  public agregarSugerenciasPreAsignadas(sugerencias: SugerenciaDeInscripcion[]) {
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
}
