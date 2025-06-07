export class Comision {
  constructor(
    public codigo: string = '',
    public materia: string = '',
    public horario: string = '',
    public inscriptos: number = 0,
    public cuposTotales: number = 0,
  ) {}

  get cuposDisponibles(): number {
    return this.cuposTotales - this.inscriptos;
  }
}
