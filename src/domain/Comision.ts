import {Estudiante} from "./Estudiante";

export class Comision {
  public estudiantesInscriptos: Estudiante[] = [];
  public cantidadInscriptosConfirmados = 0;

  constructor(
    public codigo: string = '',
    public materia: string = '',
    public horario: string = '',
    public cantidadInscriptos: number = 0,
    public cuposTotales: number = 0,
  ) {

  }

  get cuposDisponibles(): number {
    return this.cuposTotales - this.cantidadInscriptos;
  }
  recibirEstudiante(estudiante: Estudiante): void {
    this.estudiantesInscriptos.push(estudiante)
    this.cantidadInscriptos++;
  }
  eliminarEstudiante(estudiante: Estudiante): void {
    const index = this.estudiantesInscriptos.findIndex(e => e.dni === estudiante.dni);
    if (index !== -1) {
      this.estudiantesInscriptos.splice(index, 1);
      this.cantidadInscriptos = Math.max(0, this.cantidadInscriptos - 1);
    }
  }

  static fromJson(json: any): Comision {
    const comision = new Comision(
      json.codigo,
      json.materia,
      json.horario,
      json.cantidadInscriptos,
      json.cuposTotales
    );
    comision.cantidadInscriptosConfirmados = json.cantidadInscriptos ?? 0;
    comision.estudiantesInscriptos = (json.estudiantesInscriptos ?? []).map(
      (e: any) => new Estudiante(e.nombre, e.dni)
    );
    return comision;
  }

}
