export class Comision {
  codigo: string;
  materia: string;
  horario: string;
  inscriptos: number;
  cuposTotales: number;

  constructor(init: Partial<Comision>) {
    this.codigo = init.codigo ?? '';
    this.materia = init.materia ?? '';
    this.horario = init.horario ?? '';
    this.inscriptos = init.inscriptos ?? 0;
    this.cuposTotales = init.cuposTotales ?? 0;
  }

  get cuposDisponibles(): number {
    return this.cuposTotales - this.inscriptos;
  }

  get totalCupos(): number {
    return this.cuposTotales;
  }
}
