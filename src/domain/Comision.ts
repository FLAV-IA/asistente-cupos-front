import {Estudiante} from "./Estudiante";

export class Comision {
  public estudiantesInscriptos: Estudiante[] = [];

  constructor(
    public codigo: string = '',
    public materia: string = '',
    public horario: string = '',
    public cantidadinscriptos: number = 0,
    public cuposTotales: number = 0,
  ) {}

  get cuposDisponibles(): number {
    return this.cuposTotales - this.cantidadinscriptos;
  }
}
